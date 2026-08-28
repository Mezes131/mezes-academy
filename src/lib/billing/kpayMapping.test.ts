import { describe, expect, it } from "vitest";
import {
  buildKPayPayPayload,
  mapKPayWebhookStatus,
  normalizeMsisdn,
  resolveKPayPmethod,
} from "./kpayMapping";

describe("resolveKPayPmethod", () => {
  it("maps method slugs to KPay pmethod", () => {
    expect(resolveKPayPmethod("kpay_momo")).toBe("momo");
    expect(resolveKPayPmethod("kpay_cc")).toBe("cc");
    expect(resolveKPayPmethod("kpay_spenn")).toBe("spenn");
  });
});

describe("normalizeMsisdn", () => {
  it("prefixes local numbers with country code", () => {
    expect(normalizeMsisdn("771234567", "221")).toBe("221771234567");
  });

  it("keeps numbers that already include prefix", () => {
    expect(normalizeMsisdn("221771234567", "221")).toBe("221771234567");
  });
});

describe("buildKPayPayPayload", () => {
  it("builds a pay payload with payment id as refid", () => {
    const payload = buildKPayPayPayload({
      paymentId: "pay-123",
      amount: 13119,
      currency: "XOF",
      email: "user@example.com",
      customerName: "Ada Lovelace",
      description: "Premium Monthly",
      methodSlug: "kpay_momo",
      msisdn: "771234567",
      phonePrefix: "221",
      retailerId: "retailer-1",
      returl: "https://api.example.com/webhook",
      redirecturl: "https://app.example.com/checkout/success",
    });

    expect(payload.refid).toBe("pay-123");
    expect(payload.pmethod).toBe("momo");
    expect(payload.msisdn).toBe("221771234567");
    expect(payload.amount).toBe(13119);
  });
});

describe("mapKPayWebhookStatus", () => {
  it("maps success statuses", () => {
    expect(mapKPayWebhookStatus({ status: "success" })).toBe("succeeded");
    expect(mapKPayWebhookStatus({ result: "paid" })).toBe("succeeded");
  });

  it("maps failure statuses", () => {
    expect(mapKPayWebhookStatus({ status: "failed" })).toBe("failed");
    expect(mapKPayWebhookStatus({ status: "cancelled" })).toBe("cancelled");
  });
});
