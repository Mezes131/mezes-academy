import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import {
  addDays,
  addPlanInterval,
  convertEurCentsToCurrency,
  createBillingService,
  createServiceClient,
  getUserFromRequest,
  isPremiumPlan,
  TRIAL_DAYS,
} from "../_shared/billing-helpers.ts";

type FieldSchemaItem = {
  name: string;
  type: string;
  required?: boolean;
};

function validateFields(
  schema: FieldSchemaItem[],
  fields: Record<string, string>,
): string | null {
  for (const field of schema) {
    const value = (fields[field.name] ?? "").trim();
    if (field.required && !value) {
      return `Missing required field: ${field.name}`;
    }
    if (field.name === "msisdn" && value) {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 8 || digits.length > 15) {
        return "Invalid mobile number";
      }
    }
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json() as {
      plan_id?: string;
      payment_method_id?: string;
      fields?: Record<string, string>;
      country_code?: string;
      start_trial?: boolean;
      seat_count?: number;
    };

    const planId = body.plan_id?.trim();
    const paymentMethodId = body.payment_method_id?.trim();
    const countryCode = (body.country_code ?? "DEFAULT").toUpperCase();
    const fields = body.fields ?? {};
    const seatCount = Math.max(1, body.seat_count ?? 1);

    if (!planId || !paymentMethodId) {
      return new Response(JSON.stringify({ error: "Missing plan or payment method" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createServiceClient();
    const billing = createBillingService();

    const { data: plan, error: planError } = await supabase
      .from("plans")
      .select("id, name, price_eur_cents, interval, interval_count, seat_based, active")
      .eq("id", planId)
      .eq("active", true)
      .single();

    if (planError || !plan) {
      return new Response(JSON.stringify({ error: "Plan not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: method, error: methodError } = await supabase
      .from("payment_methods")
      .select("id, slug, provider_slug, fields_schema, currencies, active")
      .eq("id", paymentMethodId)
      .eq("active", true)
      .single();

    if (methodError || !method) {
      return new Response(JSON.stringify({ error: "Payment method not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: availability } = await supabase
      .from("country_payment_availability")
      .select("config")
      .eq("country_code", countryCode)
      .eq("payment_method_id", paymentMethodId)
      .eq("enabled", true)
      .maybeSingle();

    if (!availability) {
      return new Response(JSON.stringify({ error: "Payment method unavailable in country" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fieldError = validateFields(
      (method.fields_schema ?? []) as FieldSchemaItem[],
      fields,
    );
    if (fieldError) {
      return new Response(JSON.stringify({ error: fieldError }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: existingSub } = await supabase
      .from("subscriptions")
      .select("id")
      .eq("user_id", user.id)
      .in("status", ["trialing", "active", "past_due"])
      .maybeSingle();

    if (existingSub) {
      return new Response(JSON.stringify({ error: "Active subscription already exists" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, trial_used")
      .eq("id", user.id)
      .single();

    const wantsTrial = body.start_trial === true;
    const trialEligible =
      wantsTrial && isPremiumPlan(planId) && !profile?.trial_used;

    const now = new Date();
    const periodEnd = trialEligible
      ? addDays(now, TRIAL_DAYS)
      : addPlanInterval(now, plan.interval, plan.interval_count);

    const methodConfig = {
      ...fields,
      methodSlug: method.slug,
      phonePrefix:
        typeof availability.config?.phone_prefix === "string"
          ? availability.config.phone_prefix
          : undefined,
    };

    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .insert({
        user_id: user.id,
        plan_id: planId,
        status: trialEligible ? "trialing" : "active",
        seat_count: seatCount,
        payment_method_id: paymentMethodId,
        payment_provider_slug: method.provider_slug,
        payment_method_config: methodConfig,
        trial_ends_at: trialEligible ? periodEnd.toISOString() : null,
        current_period_start: now.toISOString(),
        current_period_end: periodEnd.toISOString(),
      })
      .select("*")
      .single();

    if (subError || !subscription) {
      throw new Error(subError?.message ?? "Failed to create subscription");
    }

    if (trialEligible) {
      await billing.grantVideoEntitlement({
        userId: user.id,
        source: "trial",
        sourceId: subscription.id,
        expiresAt: periodEnd.toISOString(),
      });

      await supabase
        .from("profiles")
        .update({ trial_used: true })
        .eq("id", user.id);

      return new Response(
        JSON.stringify({
          subscription_id: subscription.id,
          trialing: true,
          trial_ends_at: periodEnd.toISOString(),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const currency =
      typeof availability.config?.default_currency === "string"
        ? availability.config.default_currency
        : method.currencies?.[0] ?? "EUR";

    const amount = await convertEurCentsToCurrency(
      supabase,
      plan.price_eur_cents,
      currency,
      seatCount,
    );

    const siteUrl = Deno.env.get("SITE_URL") ?? "http://localhost:5173";
    const functionsUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const session = await billing.initiatePayment({
      subscription,
      paymentMethodId: method.id,
      providerSlug: method.provider_slug,
      amountCents: amount,
      currency,
      customerEmail: user.email ?? "",
      customerName: profile?.full_name ?? user.email ?? "Customer",
      description: plan.name,
      methodConfig,
      returnUrl: `${siteUrl}/checkout?plan=${planId}&status=return`,
      webhookUrl: `${functionsUrl}/functions/v1/webhook-payment/kpay`,
    });

    return new Response(
      JSON.stringify({
        subscription_id: subscription.id,
        session,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
