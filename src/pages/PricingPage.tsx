import { PricingCards } from "@/components/billing/PricingCards";
import { useT } from "@/i18n/useT";

export function PricingPage() {
  const t = useT();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-fg-3">
          {t("billing.pricing.kicker")}
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-fg md:text-5xl">
          {t("billing.pricing.title")}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-fg-2">
          {t("billing.pricing.subtitle")}
        </p>
      </div>
      <PricingCards />
    </div>
  );
}
