import { describe, expect, it } from "vitest";
import {
  convertFromEurCents,
  formatEurWholeAmount,
  formatMoney,
  getDefaultCurrencyForCountry,
  resolveBillingCurrency,
} from "./currency";

const rates = {
  EUR: 1,
  USD: 1.08,
  XOF: 655.957,
  RWF: 1400,
};

describe("getDefaultCurrencyForCountry", () => {
  it("maps African countries to local currencies", () => {
    expect(getDefaultCurrencyForCountry("SEN")).toBe("XOF");
    expect(getDefaultCurrencyForCountry("RWA")).toBe("RWF");
    expect(getDefaultCurrencyForCountry("DEFAULT")).toBe("EUR");
  });
});

describe("resolveBillingCurrency", () => {
  it("prefers user currency when set", () => {
    expect(resolveBillingCurrency("SEN", "USD")).toBe("USD");
  });

  it("falls back to country default", () => {
    expect(resolveBillingCurrency("SEN", null)).toBe("XOF");
  });
});

describe("convertFromEurCents", () => {
  it("keeps EUR amounts as euros", () => {
    expect(convertFromEurCents(2000, "EUR", rates)).toBe(20);
  });

  it("converts EUR cents to local whole units", () => {
    expect(convertFromEurCents(2000, "XOF", rates)).toBe(13119);
    expect(convertFromEurCents(2000, "RWF", rates)).toBe(28000);
  });
});

describe("formatMoney", () => {
  it("formats EUR with decimals", () => {
    expect(formatMoney(20, "EUR", "fr-FR")).toContain("20");
  });
});

describe("formatEurWholeAmount", () => {
  it("marks non-EUR prices as estimated", () => {
    const result = formatEurWholeAmount(20, "XOF", rates, "fr-FR");
    expect(result.isEstimated).toBe(true);
    expect(result.amount).toBe(13119);
  });

  it("does not mark EUR as estimated", () => {
    const result = formatEurWholeAmount(20, "EUR", rates, "fr-FR");
    expect(result.isEstimated).toBe(false);
  });
});
