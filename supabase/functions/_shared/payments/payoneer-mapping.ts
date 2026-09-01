import type { PaymentEventStatus } from "./types.ts";

type PayoneerWebhookPayload = Record<string, unknown>;

const SUCCESS_STATUSES = new Set([
  "paid",
  "completed",
  "success",
  "succeeded",
  "charged",
]);

const FAILURE_STATUSES = new Set([
  "failed",
  "declined",
  "error",
  "expired",
]);

const CANCEL_STATUSES = new Set(["cancelled", "canceled", "voided"]);

export function extractPayoneerWebhookRef(
  payload: PayoneerWebhookPayload,
): string | null {
  const candidates = [
    payload.client_reference_id,
    payload.clientReferenceId,
    payload.reference_id,
    payload.referenceId,
    payload.payment_id,
    payload.paymentId,
    payload.transaction_id,
    payload.transactionId,
  ];

  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  const data = payload.data;
  if (data && typeof data === "object") {
    return extractPayoneerWebhookRef(data as PayoneerWebhookPayload);
  }

  return null;
}

export function mapPayoneerWebhookStatus(
  payload: PayoneerWebhookPayload,
): PaymentEventStatus {
  const raw =
    payload.status ??
    payload.payment_status ??
    payload.paymentStatus ??
    payload.event_type ??
    payload.eventType;

  const status = typeof raw === "string" ? raw.toLowerCase() : "";

  if (SUCCESS_STATUSES.has(status)) return "succeeded";
  if (FAILURE_STATUSES.has(status)) return "failed";
  if (CANCEL_STATUSES.has(status)) return "cancelled";
  return "pending";
}

export function buildPayoneerListPayload(input: {
  paymentId: string;
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
  customerName: string;
  returnUrl: string;
  webhookUrl: string;
}): Record<string, unknown> {
  return {
    client_reference_id: input.paymentId,
    amount: {
      value: input.amount,
      currency: input.currency,
    },
    description: input.description,
    customer: {
      email: input.customerEmail,
      name: input.customerName,
    },
    return_url: input.returnUrl,
    notification_url: input.webhookUrl,
  };
}
