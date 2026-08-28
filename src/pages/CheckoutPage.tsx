import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { PaymentMethodFields } from "@/components/billing/PaymentMethodFields";
import { PaymentMethodSelector } from "@/components/billing/PaymentMethodSelector";
import { PaymentSessionRenderer } from "@/components/billing/PaymentSessionRenderer";
import { useAuth } from "@/hooks/useAuth";
import { useBilling } from "@/hooks/useBilling";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";
import { hasFieldErrors, validateCheckoutFields } from "@/lib/billing/fieldSchema";
import { trackBillingEvent } from "@/lib/analytics";
import { useT } from "@/i18n/useT";
import { useLocalePath } from "@/i18n/useLocalePath";
import type { BillingPlanId, PaymentSession } from "@/types/billing";
import { TRIAL_DAYS } from "@/types/billing";

const VALID_PLANS: BillingPlanId[] = [
  "premium_monthly",
  "premium_annual",
  "enterprise_seat_monthly",
];

export function CheckoutPage() {
  const t = useT();
  const lp = useLocalePath();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { profile } = useAuth();
  const { createSubscription, loading, error } = useBilling();

  const planId = (searchParams.get("plan") ?? "premium_monthly") as BillingPlanId;
  const country = profile?.country ?? "DEFAULT";
  const { methods, loading: methodsLoading } = usePaymentMethods(country);

  const [selectedMethodId, setSelectedMethodId] = useState("");
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [startTrial, setStartTrial] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [session, setSession] = useState<PaymentSession | null>(null);
  const [completed, setCompleted] = useState(false);

  const trialEligible = profile?.trialUsed === false && planId.startsWith("premium");

  const selectedMethod = useMemo(
    () => methods.find((m) => m.id === selectedMethodId) ?? null,
    [methods, selectedMethodId],
  );

  useEffect(() => {
    trackBillingEvent("checkout_start", { plan: planId });
  }, [planId]);

  useEffect(() => {
    if (!selectedMethodId && methods.length) {
      setSelectedMethodId(methods[0].id);
    }
  }, [methods, selectedMethodId]);

  useEffect(() => {
    setFieldValues({});
    setFieldErrors({});
  }, [selectedMethodId]);

  if (!VALID_PLANS.includes(planId)) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <p className="text-fg-2">{t("billing.checkout.invalidPlan")}</p>
        <Link to={lp("/pricing")} className="mt-4 inline-block text-accent-2 underline">
          {t("billing.paywall.ctaPricing")}
        </Link>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedMethod) return;

    const errors = validateCheckoutFields(selectedMethod.fields, fieldValues);
    setFieldErrors(errors);
    if (hasFieldErrors(errors)) return;

    trackBillingEvent("payment_method_selected", {
      method: selectedMethod.slug,
    });

    const result = await createSubscription({
      planId,
      paymentMethodId: selectedMethod.id,
      fields: fieldValues,
      countryCode: country,
      startTrial: trialEligible && startTrial,
    });

    if (!result) return;

    if (result.trialing) {
      trackBillingEvent("trial_started", { plan: planId });
      setCompleted(true);
      return;
    }

    setSession(result.session);
  }

  if (completed) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-fg">{t("billing.checkout.trialActiveTitle")}</h1>
        <p className="mt-3 text-fg-2">
          {t("billing.checkout.trialActiveBody", { days: TRIAL_DAYS })}
        </p>
        <Button className="mt-6" onClick={() => navigate(lp("/secure-vibe-coding"))}>
          {t("billing.checkout.startLearning")}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight text-fg">
        {t("billing.checkout.title")}
      </h1>
      <p className="mt-2 text-fg-2">{t("billing.checkout.subtitle")}</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        {trialEligible && (
          <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-bg-2 p-4">
            <input
              type="checkbox"
              className="mt-1"
              checked={startTrial}
              onChange={(e) => setStartTrial(e.target.checked)}
            />
            <span className="text-sm text-fg-2">
              {t("billing.checkout.trialOption", { days: TRIAL_DAYS })}
            </span>
          </label>
        )}

        {!(trialEligible && startTrial) && (
          <>
            <PaymentMethodSelector
              methods={methods}
              value={selectedMethodId}
              onChange={setSelectedMethodId}
              disabled={methodsLoading || loading}
            />

            {selectedMethod && (
              <PaymentMethodFields
                fields={selectedMethod.fields}
                values={fieldValues}
                disabled={loading}
                onChange={(name, value) =>
                  setFieldValues((prev) => ({ ...prev, [name]: value }))
                }
              />
            )}

            {hasFieldErrors(fieldErrors) && (
              <p className="text-sm text-red-400">{t("billing.checkout.fieldErrors")}</p>
            )}
          </>
        )}

        {error && <p className="text-sm text-red-400">{error}</p>}

        {session && <PaymentSessionRenderer session={session} />}

        <Button type="submit" className="w-full" disabled={loading || methodsLoading}>
          {trialEligible && startTrial
            ? t("billing.checkout.startTrial")
            : t("billing.checkout.payNow")}
        </Button>
      </form>
    </div>
  );
}
