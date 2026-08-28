import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useBilling } from "@/hooks/useBilling";
import { useBillingAccount } from "@/hooks/useBillingAccount";
import { formatMoney } from "@/lib/billing/currency";
import { trackBillingEvent } from "@/lib/analytics";
import { useLocale } from "@/i18n/LocaleProvider";
import { useLocalePath } from "@/i18n/useLocalePath";
import { useT } from "@/i18n/useT";
import type { MessageKey } from "@/i18n/useT";

const STATUS_KEYS = {
  trialing: "billing.account.statuses.trialing",
  active: "billing.account.statuses.active",
  past_due: "billing.account.statuses.past_due",
  canceled: "billing.account.statuses.canceled",
} as const satisfies Record<string, MessageKey>;

const PAYMENT_STATUS_KEYS = {
  pending: "billing.account.paymentStatuses.pending",
  succeeded: "billing.account.paymentStatuses.succeeded",
  failed: "billing.account.paymentStatuses.failed",
  cancelled: "billing.account.paymentStatuses.cancelled",
} as const satisfies Record<string, MessageKey>;

export function BillingTab() {
  const t = useT();
  const lp = useLocalePath();
  const { locale } = useLocale();
  const intlLocale = locale === "fr" ? "fr-FR" : "en-US";
  const { subscription, payments, loading, error, reload } = useBillingAccount();
  const { cancelSubscription, loading: canceling, error: cancelError } = useBilling();
  const [cancelDone, setCancelDone] = useState(false);

  async function onCancel() {
    if (!subscription) return;
    const ok = window.confirm(t("billing.account.cancelConfirm"));
    if (!ok) return;

    const success = await cancelSubscription(subscription.id);
    if (success) {
      trackBillingEvent("subscription_canceled", { plan: subscription.planId });
      setCancelDone(true);
      await reload();
    }
  }

  if (loading) {
    return <div className="rounded-2xl border-base bg-bg-2 p-6 animate-pulse h-40" />;
  }

  if (error) {
    return <p className="text-sm text-red-400">{t("billing.errors.loadFailed")}</p>;
  }

  if (!subscription) {
    return (
      <div className="rounded-2xl border-base bg-bg-2 p-6">
        <p className="text-fg-2">{t("billing.account.noSubscription")}</p>
        <Link to={lp("/pricing")} className="mt-4 inline-block">
          <Button>{t("billing.paywall.ctaPricing")}</Button>
        </Link>
      </div>
    );
  }

  const renewalDate = new Date(
    subscription.status === "trialing" && subscription.trialEndsAt
      ? subscription.trialEndsAt
      : subscription.currentPeriodEnd,
  );

  const canCancel =
    !subscription.canceledAt &&
    (subscription.status === "trialing" ||
      subscription.status === "active" ||
      subscription.status === "past_due");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border-base bg-bg-2 p-6">
        <h2 className="text-lg font-bold text-fg">{t("billing.account.currentPlan")}</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-fg-2">{t("billing.account.plan")}</dt>
            <dd className="font-medium text-fg">{subscription.planName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-fg-2">{t("billing.account.status")}</dt>
            <dd className="font-medium text-fg">
              {t(STATUS_KEYS[subscription.status])}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-fg-2">
              {subscription.status === "trialing"
                ? t("billing.account.trialEnds")
                : t("billing.account.renewsOn")}
            </dt>
            <dd className="font-medium text-fg">
              {renewalDate.toLocaleDateString(intlLocale)}
            </dd>
          </div>
        </dl>

        {subscription.canceledAt && (
          <p className="mt-4 text-[13px] text-fg-2">
            {t("billing.account.canceledOn", {
              date: new Date(subscription.canceledAt).toLocaleDateString(intlLocale),
            })}
          </p>
        )}

        {canCancel && (
          <Button
            variant="ghost"
            className="mt-6 text-red-400 hover:text-red-300"
            disabled={canceling}
            onClick={onCancel}
          >
            {t("billing.account.cancel")}
          </Button>
        )}

        {cancelDone && (
          <p className="mt-3 text-[13px] text-emerald-300">
            {subscription.status === "trialing"
              ? t("billing.account.cancelTrialDone")
              : t("billing.account.cancelDone")}
          </p>
        )}

        {cancelError && <p className="mt-3 text-sm text-red-400">{cancelError}</p>}
      </div>

      <div className="rounded-2xl border-base bg-bg-2 p-6">
        <h2 className="text-lg font-bold text-fg">{t("billing.account.paymentHistory")}</h2>
        {payments.length === 0 ? (
          <p className="mt-3 text-sm text-fg-2">{t("billing.account.noPayments")}</p>
        ) : (
          <ul className="mt-4 divide-y divide-white/5">
            {payments.map((payment) => (
              <li
                key={payment.id}
                className="flex items-center justify-between gap-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-fg">
                    {formatMoney(payment.amount, payment.currency, intlLocale)}
                  </p>
                  <p className="text-[12px] text-fg-2">
                    {new Date(payment.paidAt ?? payment.createdAt).toLocaleDateString(
                      intlLocale,
                    )}
                  </p>
                </div>
                <span className="text-[12px] uppercase tracking-wide text-fg-2">
                  {t(
                    PAYMENT_STATUS_KEYS[payment.status as keyof typeof PAYMENT_STATUS_KEYS] ??
                      "billing.account.paymentStatuses.pending",
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
