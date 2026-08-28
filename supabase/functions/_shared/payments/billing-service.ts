import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import type { PaymentProviderRegistry } from "./registry.ts";
import type {
  InitiatePaymentInput,
  PaymentSession,
  WebhookEvent,
} from "./types.ts";

type SubscriptionRow = {
  id: string;
  user_id: string | null;
  organization_id: string | null;
  plan_id: string;
  status: string;
  seat_count: number;
  payment_method_id: string | null;
  payment_provider_slug: string | null;
  payment_method_config: Record<string, unknown>;
  trial_ends_at: string | null;
  current_period_start: string;
  current_period_end: string;
};

type PaymentRow = {
  id: string;
  subscription_id: string;
  provider_slug: string;
  external_ref: string | null;
  status: string;
};

type PlanRow = {
  id: string;
  price_eur_cents: number;
  interval: "month" | "year";
  interval_count: number;
  seat_based: boolean;
};

export class BillingService {
  constructor(
    private readonly supabase: SupabaseClient,
    private readonly registry: PaymentProviderRegistry,
  ) {}

  async initiatePayment(params: {
    subscription: SubscriptionRow;
    paymentMethodId: string;
    providerSlug: string;
    amountCents: number;
    currency: string;
    customerEmail: string;
    customerName: string;
    description: string;
    methodConfig: Record<string, unknown>;
    returnUrl: string;
    webhookUrl: string;
  }): Promise<PaymentSession> {
    const { data: payment, error: paymentError } = await this.supabase
      .from("payments")
      .insert({
        subscription_id: params.subscription.id,
        payment_method_id: params.paymentMethodId,
        provider_slug: params.providerSlug,
        amount_cents: params.amountCents,
        currency: params.currency,
        status: "pending",
      })
      .select("id")
      .single();

    if (paymentError || !payment) {
      throw new Error(paymentError?.message ?? "Failed to create payment");
    }

    const adapter = this.registry.get(params.providerSlug);
    const input: InitiatePaymentInput = {
      paymentId: payment.id,
      amountCents: params.amountCents,
      currency: params.currency,
      customerEmail: params.customerEmail,
      customerName: params.customerName,
      description: params.description,
      methodConfig: params.methodConfig,
      returnUrl: params.returnUrl,
      webhookUrl: params.webhookUrl,
    };

    const session = await adapter.initiatePayment(input);

    await this.supabase
      .from("payments")
      .update({ external_ref: session.externalRef })
      .eq("id", payment.id);

    return session;
  }

  async handlePaymentEvent(event: WebhookEvent): Promise<void> {
    const payment = await this.findPayment(event.externalRef);
    if (!payment) {
      throw new Error(`Payment not found for ref: ${event.externalRef}`);
    }

    if (payment.status === "succeeded" && event.status === "succeeded") {
      return;
    }

    const now = new Date().toISOString();
    const paymentUpdate: Record<string, unknown> = {
      status: event.status,
      provider_payload: event.providerPayload,
    };
    if (event.status === "succeeded") {
      paymentUpdate.paid_at = now;
    }

    await this.supabase
      .from("payments")
      .update(paymentUpdate)
      .eq("id", payment.id);

    const subscription = await this.getSubscription(payment.subscription_id);
    if (!subscription) return;

    if (event.status === "succeeded") {
      await this.onPaymentSucceeded(subscription);
      return;
    }

    if (event.status === "failed" || event.status === "cancelled") {
      await this.onPaymentFailed(subscription);
    }
  }

  private async onPaymentSucceeded(subscription: SubscriptionRow): Promise<void> {
    const periodEnd = this.computeNextPeriodEnd(
      subscription.current_period_end,
      await this.getPlan(subscription.plan_id),
    );

    await this.supabase
      .from("subscriptions")
      .update({
        status: "active",
        current_period_start: new Date().toISOString(),
        current_period_end: periodEnd.toISOString(),
        trial_ends_at: null,
      })
      .eq("id", subscription.id);

    const userIds = await this.resolveEntitledUserIds(subscription);
    for (const userId of userIds) {
      await this.grantVideoEntitlement({
        userId,
        source: subscription.status === "trialing" ? "trial" : "subscription",
        sourceId: subscription.id,
        expiresAt: periodEnd.toISOString(),
      });
    }
  }

  private async onPaymentFailed(subscription: SubscriptionRow): Promise<void> {
    if (subscription.status === "trialing") {
      await this.supabase
        .from("subscriptions")
        .update({ status: "canceled", canceled_at: new Date().toISOString() })
        .eq("id", subscription.id);

      const userIds = await this.resolveEntitledUserIds(subscription);
      for (const userId of userIds) {
        await this.revokeVideoEntitlement(userId, subscription.id);
      }
      return;
    }

    await this.supabase
      .from("subscriptions")
      .update({ status: "past_due" })
      .eq("id", subscription.id);
  }

  async grantVideoEntitlement(params: {
    userId: string;
    source: "subscription" | "organization" | "trial";
    sourceId: string;
    expiresAt: string | null;
  }): Promise<void> {
    await this.revokeVideoEntitlement(params.userId, params.sourceId);
    await this.supabase.from("entitlements").insert({
      user_id: params.userId,
      feature: "video_access",
      source: params.source,
      source_id: params.sourceId,
      expires_at: params.expiresAt,
    });
  }

  async revokeVideoEntitlement(userId: string, sourceId: string): Promise<void> {
    await this.supabase
      .from("entitlements")
      .delete()
      .eq("user_id", userId)
      .eq("feature", "video_access")
      .eq("source_id", sourceId);
  }

  private async findPayment(externalRef: string): Promise<PaymentRow | null> {
    const { data } = await this.supabase
      .from("payments")
      .select("id, subscription_id, provider_slug, external_ref, status")
      .or(`id.eq.${externalRef},external_ref.eq.${externalRef}`)
      .maybeSingle();
    return data;
  }

  private async getSubscription(id: string): Promise<SubscriptionRow | null> {
    const { data } = await this.supabase
      .from("subscriptions")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    return data;
  }

  private async getPlan(planId: string): Promise<PlanRow> {
    const { data, error } = await this.supabase
      .from("plans")
      .select("id, price_eur_cents, interval, interval_count, seat_based")
      .eq("id", planId)
      .single();
    if (error || !data) {
      throw new Error(error?.message ?? `Plan not found: ${planId}`);
    }
    return data as PlanRow;
  }

  private computeNextPeriodEnd(
    fromIso: string,
    plan: PlanRow,
  ): Date {
    const base = new Date(fromIso);
    const next = new Date(base);
    if (plan.interval === "month") {
      next.setMonth(next.getMonth() + plan.interval_count);
    } else {
      next.setFullYear(next.getFullYear() + plan.interval_count);
    }
    return next;
  }

  private async resolveEntitledUserIds(
    subscription: SubscriptionRow,
  ): Promise<string[]> {
    if (subscription.user_id) {
      return [subscription.user_id];
    }
    if (!subscription.organization_id) return [];

    const { data: members } = await this.supabase
      .from("organization_members")
      .select("user_id")
      .eq("organization_id", subscription.organization_id)
      .not("accepted_at", "is", null);

    return (members ?? []).map((m) => m.user_id as string);
  }
}
