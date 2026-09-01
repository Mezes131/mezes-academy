export type PaymentSessionType = "redirect" | "widget" | "push";
export type PaymentEventStatus =
  | "succeeded"
  | "failed"
  | "cancelled"
  | "pending";

export interface InitiatePaymentInput {
  paymentId: string;
  amountCents: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  description: string;
  methodConfig: Record<string, unknown>;
  returnUrl: string;
  webhookUrl: string;
}

export interface PaymentSession {
  type: PaymentSessionType;
  redirectUrl?: string;
  widgetConfig?: Record<string, unknown>;
  externalRef: string;
  userMessage?: string;
}

export interface PaymentStatusResult {
  status: PaymentEventStatus;
  providerPayload?: unknown;
}

export interface WebhookEvent {
  externalRef: string;
  status: PaymentEventStatus;
  providerPayload: unknown;
}

export interface PaymentProviderAdapter {
  readonly slug: string;
  initiatePayment(input: InitiatePaymentInput): Promise<PaymentSession>;
  checkPaymentStatus(externalRef: string): Promise<PaymentStatusResult>;
  handleWebhook(rawBody: string, headers: Headers): Promise<WebhookEvent>;
  supportsOffSessionRenewal(): boolean;
}
