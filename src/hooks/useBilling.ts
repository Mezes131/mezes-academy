import { useCallback, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { trackBillingEvent } from "@/lib/analytics";
import type { PaymentSession } from "@/types/billing";

export type CreateSubscriptionResult =
  | { subscriptionId: string; trialing: true; trialEndsAt: string }
  | { subscriptionId: string; trialing: false; session: PaymentSession };

export function useBilling() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSubscription = useCallback(
    async (params: {
      planId: string;
      paymentMethodId: string;
      fields: Record<string, string>;
      countryCode: string;
      startTrial?: boolean;
    }): Promise<CreateSubscriptionResult | null> => {
      if (!isSupabaseConfigured || !supabase) {
        setError("billing.errors.notConfigured");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token;
        if (!token) {
          setError("billing.errors.authRequired");
          return null;
        }

        const base = import.meta.env.VITE_SUPABASE_URL;
        const res = await fetch(
          `${String(base).replace(/\/$/, "")}/functions/v1/create-subscription`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              plan_id: params.planId,
              payment_method_id: params.paymentMethodId,
              fields: params.fields,
              country_code: params.countryCode,
              start_trial: params.startTrial ?? false,
            }),
          },
        );

        const data = await res.json();
        if (!res.ok) {
          trackBillingEvent("payment_failed", { plan: params.planId });
          throw new Error(data.error ?? "Subscription failed");
        }

        if (data.trialing) {
          return {
            subscriptionId: data.subscription_id,
            trialing: true,
            trialEndsAt: data.trial_ends_at,
          };
        }

        return {
          subscriptionId: data.subscription_id,
          trialing: false,
          session: data.session as PaymentSession,
        };
      } catch (err) {
        setError(err instanceof Error ? err.message : "billing.errors.loadFailed");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const cancelSubscription = useCallback(async (subscriptionId: string) => {
    if (!isSupabaseConfigured || !supabase) {
      setError("billing.errors.notConfigured");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) {
        setError("billing.errors.authRequired");
        return false;
      }

      const base = import.meta.env.VITE_SUPABASE_URL;
      const res = await fetch(
        `${String(base).replace(/\/$/, "")}/functions/v1/cancel-subscription`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscription_id: subscriptionId }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Cancel failed");
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "billing.errors.loadFailed");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createSubscription, cancelSubscription, loading, error };
}
