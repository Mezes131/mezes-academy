export type ExchangeRates = Record<string, number>;

const COUNTRY_DEFAULT_CURRENCY: Record<string, string> = {
  BEN: "XOF",
  CMR: "XAF",
  CIV: "XOF",
  COD: "CDF",
  GAB: "XAF",
  KEN: "KES",
  COG: "XAF",
  RWA: "RWF",
  SEN: "XOF",
  SLE: "SLE",
  UGA: "UGX",
  ZMB: "ZMW",
  DEFAULT: "EUR",
};

export function getDefaultCurrencyForCountry(country: string): string {
  return COUNTRY_DEFAULT_CURRENCY[country.toUpperCase()] ?? "EUR";
}

export function resolveBillingCurrency(
  country: string,
  preferredCurrency?: string | null,
): string {
  if (preferredCurrency?.trim()) {
    return preferredCurrency.trim().toUpperCase();
  }
  return getDefaultCurrencyForCountry(country);
}

export function convertFromEurCents(
  eurCents: number,
  currency: string,
  rates: ExchangeRates,
): number {
  const eurAmount = eurCents / 100;
  if (currency === "EUR") {
    return Math.round(eurAmount * 100) / 100;
  }

  const rate = rates[currency] ?? 1;
  return Math.round(eurAmount * rate);
}

export function formatMoney(
  amount: number,
  currency: string,
  locale: string,
): string {
  const fractionDigits = currency === "EUR" || currency === "USD" ? 2 : 0;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}

export function formatEurWholeAmount(
  eurWhole: number,
  currency: string,
  rates: ExchangeRates,
  locale: string,
): { amount: number; formatted: string; isEstimated: boolean } {
  const amount = convertFromEurCents(eurWhole * 100, currency, rates);
  return {
    amount,
    formatted: formatMoney(amount, currency, locale),
    isEstimated: currency !== "EUR",
  };
}
