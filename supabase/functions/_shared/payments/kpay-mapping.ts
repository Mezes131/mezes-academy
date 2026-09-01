export type KPayPmethod = "momo" | "cc" | "spenn";

export function resolveKPayPmethod(methodSlug: string): KPayPmethod {
  if (methodSlug === "kpay_cc") return "cc";
  if (methodSlug === "kpay_spenn") return "spenn";
  return "momo";
}

export function normalizeMsisdn(msisdn: string, phonePrefix?: string): string {
  const digits = msisdn.replace(/\D/g, "");
  if (!phonePrefix) return digits;
  const prefix = phonePrefix.replace(/\D/g, "");
  if (digits.startsWith(prefix)) return digits;
  return `${prefix}${digits}`;
}

export function buildKPayPayPayload(input: {
  paymentId: string;
  amount: number;
  currency: string;
  email: string;
  customerName: string;
  description: string;
  methodSlug: string;
  msisdn: string;
  phonePrefix?: string;
  retailerId: string;
  returl: string;
  redirecturl: string;
}) {
  return {
    action: "pay",
    msisdn: normalizeMsisdn(input.msisdn, input.phonePrefix),
    email: input.email,
    details: input.description,
    refid: input.paymentId,
    amount: input.amount,
    currency: input.currency,
    cname: input.customerName,
    cnumber: input.paymentId,
    pmethod: resolveKPayPmethod(input.methodSlug),
    retailerid: input.retailerId,
    returl: input.returl,
    redirecturl: input.redirecturl,
  };
}

export function mapKPayWebhookStatus(
  payload: Record<string, unknown>,
): "succeeded" | "failed" | "cancelled" | "pending" {
  const status = String(
    payload.status ?? payload.payment_status ?? payload.result ?? "",
  ).toLowerCase();

  if (
    ["success", "succeeded", "paid", "completed", "00", "0"].includes(status)
  ) {
    return "succeeded";
  }
  if (["cancelled", "canceled", "cancel"].includes(status)) {
    return "cancelled";
  }
  if (["failed", "error", "rejected", "declined"].includes(status)) {
    return "failed";
  }
  return "pending";
}

export function extractKPayWebhookRef(payload: Record<string, unknown>): string {
  const ref = payload.refid ?? payload.ref_id ?? payload.reference ?? payload.id;
  return String(ref ?? "");
}
