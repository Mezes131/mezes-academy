import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { PaymentMethodFields } from "@/components/billing/PaymentMethodFields";
import { PaymentMethodSelector } from "@/components/billing/PaymentMethodSelector";
import { PaymentSessionRenderer } from "@/components/billing/PaymentSessionRenderer";
import { useAuth } from "@/hooks/useAuth";
import { useBilling } from "@/hooks/useBilling";
import { useLocalizedPricing } from "@/hooks/useLocalizedPricing";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";
import { hasFieldErrors, validateCheckoutFields } from "@/lib/billing/fieldSchema";
import { trackBillingEvent } from "@/lib/analytics";
import { useT } from "@/i18n/useT";
import { useLocalePath } from "@/i18n/useLocalePath";
import type { BillingPlanId, PaymentSession } from "@/types/billing";
import {
  ENTERPRISE_MAX_SELF_SERVICE_SEATS,
  ENTERPRISE_MIN_SEATS,
  ENTERPRISE_SEAT_MONTHLY_EUR,
  PREMIUM_ANNUAL_EUR,
  PREMIUM_MONTHLY_EUR,
  TRIAL_DAYS,
} from "@/types/billing";

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
  const { formatPrice } = useLocalizedPricing();

  const planId = (searchParams.get("plan") ?? "premium_monthly") as BillingPlanId;
  const isEnterprise = planId === "enterprise_seat_monthly";
  const seatCount = isEnterprise
    ? Math.min(
        ENTERPRISE_MAX_SELF_SERVICE_SEATS,
        Math.max(
          ENTERPRISE_MIN_SEATS,
          Number(searchParams.get("seats") ?? ENTERPRISE_MIN_SEATS),
        ),
      )
    : 1;
  const country = profile?.country ?? "DEFAULT";
  const { methods, loading: methodsLoading } = usePaymentMethods(country);

  const [selectedMethodId, setSelectedMethodId] = useState("");
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [startTrial, setStartTrial] = useState(true);
  const [organizationName, setOrganizationName] = useState("");
  const [orgNameError, setOrgNameError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [session, setSession] = useState<PaymentSession | null>(null);
  const [completed, setCompleted] = useState(false);

  const trialEligible = profile?.trialUsed === false && planId.startsWith("premium");

  const planEur = isEnterprise
    ? ENTERPRISE_SEAT_MONTHLY_EUR * seatCount
    : planId === "premium_annual"
      ? PREMIUM_ANNUAL_EUR
      : PREMIUM_MONTHLY_EUR;
  const planPrice = formatPrice(planEur);

  const selectedMethod = useMemo(
    () => methods.find((m) => m.id === selectedMethodId) ?? null,
    [methods, selectedMethodId],
  );

  useEffect(() => {
    trackBillingEvent("checkout_start", { plan: planId });
  }, [planId]);

  useEffect(() => {
    if (searchParams.get("status") === "return") {
      trackBillingEvent("subscription_activated", { plan: planId });
    }
  }, [searchParams, planId]);

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
    if (isEnterprise && !organizationName.trim()) {
      setOrgNameError(true);
      return;
    }
    setOrgNameError(false);

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
      seatCount,
      organizationName: isEnterprise ? organizationName.trim() : undefined,
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

      {!(trialEligible && startTrial) && (
        <div className="mt-6 rounded-xl border border-white/10 bg-bg-2 p-4">
          <p className="text-sm text-fg-2">{t("billing.checkout.amountLabel")}</p>
          <p className="mt-1 text-2xl font-bold text-fg">{planPrice.formatted}</p>
          {isEnterprise && (
            <p className="mt-1 text-[12px] text-fg-2">
              {t("billing.checkout.enterpriseSeats", { count: seatCount })}
            </p>
          )}
          {planPrice.isEstimated && (
            <p className="mt-1 text-[12px] text-fg-2">
              {t("billing.checkout.estimatedNote")}
            </p>
          )}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        {isEnterprise && (
          <div>
            <label className="block text-sm font-medium text-fg">
              {t("billing.checkout.organizationName")}
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-white/10 bg-bg-2 px-3 py-2 text-sm"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              required
            />
            {orgNameError && (
              <p className="mt-1 text-sm text-red-400">
                {t("billing.checkout.organizationNameRequired")}
              </p>
            )}
          </div>
        )}

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
