import { useCallback, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export type SubscriptionStatus = "trialing" | "active" | "past_due" | "canceled";

export interface BillingSubscription {
  id: string;
  planId: string;
  planName: string;
  status: SubscriptionStatus;
  seatCount: number;
  trialEndsAt: string | null;
  currentPeriodEnd: string;
  canceledAt: string | null;
}

export interface BillingPayment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paidAt: string | null;
  createdAt: string;
}

export function useBillingAccount() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<BillingSubscription | null>(null);
  const [payments, setPayments] = useState<BillingPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!user || !isSupabaseConfigured || !supabase) {
      setSubscription(null);
      setPayments([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let subRow = null;

      const { data: personalSub, error: personalError } = await supabase
        .from("subscriptions")
        .select(
          "id, plan_id, status, seat_count, trial_ends_at, current_period_end, canceled_at, plans(name)",
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (personalError) throw personalError;
      subRow = personalSub;

      if (!subRow) {
        const { data: membership } = await supabase
          .from("organization_members")
          .select("organization_id")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .not("accepted_at", "is", null)
          .limit(1)
          .maybeSingle();

        if (membership?.organization_id) {
          const { data: orgSub, error: orgSubError } = await supabase
            .from("subscriptions")
            .select(
              "id, plan_id, status, seat_count, trial_ends_at, current_period_end, canceled_at, plans(name)",
            )
            .eq("organization_id", membership.organization_id)
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle();

          if (orgSubError) throw orgSubError;
          subRow = orgSub;
        }
      }

      if (!subRow) {
        setSubscription(null);
        setPayments([]);
        return;
      }

      const plan = subRow.plans as { name?: string } | null;
      setSubscription({
        id: subRow.id,
        planId: subRow.plan_id,
        planName: plan?.name ?? subRow.plan_id,
        status: subRow.status as SubscriptionStatus,
        seatCount: subRow.seat_count,
        trialEndsAt: subRow.trial_ends_at,
        currentPeriodEnd: subRow.current_period_end,
        canceledAt: subRow.canceled_at,
      });

      const { data: paymentRows, error: payError } = await supabase
        .from("payments")
        .select("id, amount_cents, currency, status, paid_at, created_at")
        .eq("subscription_id", subRow.id)
        .order("created_at", { ascending: false })
        .limit(20);

      if (payError) throw payError;

      setPayments(
        (paymentRows ?? []).map((row) => ({
          id: row.id,
          amount: row.amount_cents,
          currency: row.currency,
          status: row.status,
          paidAt: row.paid_at,
          createdAt: row.created_at,
        })),
      );
    } catch {
      setError("billing.errors.loadFailed");
      setSubscription(null);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { subscription, payments, loading, error, reload };
}
