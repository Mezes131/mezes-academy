export type PaymentMethodType = "card" | "mobile_money" | "bank" | "wallet";

export type PaymentFieldType = "select" | "tel" | "text";

export interface PaymentFieldOption {
  value: string;
  label: string;
}

export interface PaymentFieldSchema {
  name: string;
  type: PaymentFieldType;
  required?: boolean;
  label?: string;
  prefix?: string;
  options?: PaymentFieldOption[];
}

export interface PaymentMethodOption {
  id: string;
  slug: string;
  type: PaymentMethodType;
  labelKey: string;
  icon: string;
  providerSlug: string;
  currencies: string[];
  fields: PaymentFieldSchema[];
  sortOrder: number;
  defaultCurrency: string | null;
}

export interface PaymentMethodsResponse {
  country: string;
  methods: PaymentMethodOption[];
}

export type PaymentSessionType = "redirect" | "widget" | "push";

export interface PaymentSession {
  type: PaymentSessionType;
  redirectUrl?: string;
  widgetConfig?: Record<string, unknown>;
  externalRef: string;
  userMessage?: string;
}

export type EntitlementSource = "subscription" | "organization" | "trial";

export interface UserEntitlement {
  feature: string;
  source: EntitlementSource;
  source_id: string;
  expires_at: string | null;
}

export type BillingPlanId =
  | "premium_monthly"
  | "premium_annual"
  | "enterprise_seat_monthly";

export interface BillingPlan {
  id: BillingPlanId;
  name: string;
  priceEurCents: number;
  interval: "month" | "year";
  seatBased: boolean;
}

export const PREMIUM_MONTHLY_EUR = 20;
export const PREMIUM_ANNUAL_EUR = 150;
export const ENTERPRISE_SEAT_MONTHLY_EUR = 20;
export const TRIAL_DAYS = 7;
