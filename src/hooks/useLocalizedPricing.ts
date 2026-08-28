import { useCallback, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import {
  formatEurWholeAmount,
  resolveBillingCurrency,
} from "@/lib/billing/currency";
import { useLocale } from "@/i18n/LocaleProvider";

export function useLocalizedPricing() {
  const { profile } = useAuth();
  const { rates, loading } = useExchangeRates();
  const { locale } = useLocale();
  const intlLocale = locale === "fr" ? "fr-FR" : "en-US";

  const country = profile?.country ?? "DEFAULT";
  const currency = useMemo(
    () => resolveBillingCurrency(country, profile?.preferredCurrency),
    [country, profile?.preferredCurrency],
  );

  const formatPrice = useCallback(
    (eurWhole: number) =>
      formatEurWholeAmount(eurWhole, currency, rates, intlLocale),
    [currency, rates, intlLocale],
  );

  return { currency, formatPrice, loading };
}
