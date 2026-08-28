import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useT } from "@/i18n/useT";
import { useLocalePath } from "@/i18n/useLocalePath";
import { useLocalizedPricing } from "@/hooks/useLocalizedPricing";
import { trackBillingEvent } from "@/lib/analytics";
import {
  ENTERPRISE_SEAT_MONTHLY_EUR,
  PREMIUM_ANNUAL_EUR,
  PREMIUM_MONTHLY_EUR,
  TRIAL_DAYS,
} from "@/types/billing";
import { cn } from "@/lib/utils";

type BillingInterval = "monthly" | "annual";

export function PricingCards() {
  const t = useT();
  const lp = useLocalePath();
  const { formatPrice } = useLocalizedPricing();
  const [interval, setInterval] = useState<BillingInterval>("monthly");

  useEffect(() => {
    trackBillingEvent("pricing_view");
  }, []);

  const premiumEur =
    interval === "monthly" ? PREMIUM_MONTHLY_EUR : PREMIUM_ANNUAL_EUR;
  const premiumPrice = formatPrice(premiumEur);
  const enterprisePrice = formatPrice(ENTERPRISE_SEAT_MONTHLY_EUR);
  const premiumSuffix =
    interval === "monthly"
      ? t("billing.pricing.perMonth")
      : t("billing.pricing.perYear");

  return (
    <div>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-lg border border-white/10 bg-bg-2 p-1">
          <button
            type="button"
            onClick={() => setInterval("monthly")}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition",
              interval === "monthly"
                ? "bg-bg text-fg shadow-sm"
                : "text-fg-2 hover:text-fg",
            )}
          >
            {t("billing.pricing.monthly")}
          </button>
          <button
            type="button"
            onClick={() => setInterval("annual")}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition",
              interval === "annual"
                ? "bg-bg text-fg shadow-sm"
                : "text-fg-2 hover:text-fg",
            )}
          >
            {t("billing.pricing.annual")}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <PricingCard
          name={t("billing.pricing.free.name")}
          price={t("billing.pricing.free.price")}
          description={t("billing.pricing.free.description")}
          features={[
            t("billing.pricing.features.text"),
            t("billing.pricing.features.exercises"),
            t("billing.pricing.features.quizzes"),
          ]}
          cta={
            <Link to={lp("/auth")}>
              <Button variant="ghost" className="w-full">
                {t("billing.pricing.free.cta")}
              </Button>
            </Link>
          }
        />

        <PricingCard
          highlighted
          badge={t("billing.pricing.popular")}
          name={t("billing.pricing.premium.name")}
          price={premiumPrice.formatted}
          priceNote={
            premiumPrice.isEstimated ? t("billing.pricing.estimated") : undefined
          }
          priceSuffix={premiumSuffix}
          description={t("billing.pricing.premium.description", {
            days: TRIAL_DAYS,
          })}
          features={[
            t("billing.pricing.features.videos"),
            t("billing.pricing.features.allCourses"),
            t("billing.pricing.features.trial", { days: TRIAL_DAYS }),
          ]}
          cta={
            <Link
              to={lp(
                `/checkout?plan=${interval === "monthly" ? "premium_monthly" : "premium_annual"}`,
              )}
              onClick={() => trackBillingEvent("checkout_start")}
            >
              <Button className="w-full">{t("billing.pricing.premium.cta")}</Button>
            </Link>
          }
        />

        <PricingCard
          name={t("billing.pricing.enterprise.name")}
          price={enterprisePrice.formatted}
          priceNote={
            enterprisePrice.isEstimated ? t("billing.pricing.estimated") : undefined
          }
          priceSuffix={t("billing.pricing.perSeatMonth")}
          description={t("billing.pricing.enterprise.description")}
          features={[
            t("billing.pricing.features.videos"),
            t("billing.pricing.features.teamSeats"),
            t("billing.pricing.features.centralBilling"),
          ]}
          cta={
            <Link to={lp("/contact")}>
              <Button variant="ghost" className="w-full">
                {t("billing.pricing.enterprise.cta")}
              </Button>
            </Link>
          }
        />
      </div>
    </div>
  );
}

function PricingCard({
  name,
  price,
  priceNote,
  priceSuffix,
  description,
  features,
  cta,
  highlighted = false,
  badge,
}: {
  name: string;
  price: string;
  priceNote?: string;
  priceSuffix?: string;
  description: string;
  features: string[];
  cta: React.ReactNode;
  highlighted?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border p-6",
        highlighted
          ? "border-accent/40 bg-bg-2 shadow-lg shadow-accent/5"
          : "border-white/10 bg-bg-2/50",
      )}
    >
      {badge && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-bg">
          {badge}
        </span>
      )}
      <h3 className="text-lg font-bold text-fg">{name}</h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold tracking-tight">{price}</span>
        {priceSuffix && (
          <span className="text-sm text-fg-2">{priceSuffix}</span>
        )}
      </div>
      {priceNote && (
        <p className="mt-1 text-[11px] uppercase tracking-wide text-fg-2/80">
          {priceNote}
        </p>
      )}
      <p className="mt-3 text-[13px] leading-relaxed text-fg-2">{description}</p>
      <ul className="mt-6 flex-1 space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-[13px] text-fg-2">
            <Check size={14} className="mt-0.5 shrink-0 text-accent-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">{cta}</div>
    </div>
  );
}
