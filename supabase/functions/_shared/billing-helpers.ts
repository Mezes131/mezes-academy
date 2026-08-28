import { createClient, type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import { BillingService } from "./payments/billing-service.ts";
import { createKPayAdapter } from "./payments/adapters/kpay.ts";
import { createPayoneerAdapter } from "./payments/adapters/payoneer.ts";
import { createRegistry, type PaymentProviderRegistry } from "./payments/registry.ts";

const TRIAL_DAYS = 7;

export function createServiceClient(): SupabaseClient {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) {
    throw new Error("Supabase service credentials are not configured");
  }
  return createClient(url, key);
}

export function createPaymentRegistry(): PaymentProviderRegistry {
  return createRegistry([createKPayAdapter(), createPayoneerAdapter()]);
}

export function createBillingService(): BillingService {
  return new BillingService(createServiceClient(), createPaymentRegistry());
}

export async function getUserFromRequest(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const url = Deno.env.get("SUPABASE_URL");
  const anon = Deno.env.get("SUPABASE_ANON_KEY");
  if (!url || !anon) return null;

  const token = authHeader.slice("Bearer ".length);
  const client = createClient(url, anon);
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function addPlanInterval(
  start: Date,
  interval: "month" | "year",
  intervalCount: number,
): Date {
  const next = new Date(start);
  if (interval === "month") {
    next.setMonth(next.getMonth() + intervalCount);
  } else {
    next.setFullYear(next.getFullYear() + intervalCount);
  }
  return next;
}

export async function convertEurCentsToCurrency(
  supabase: SupabaseClient,
  eurCents: number,
  currency: string,
  seatCount = 1,
): Promise<number> {
  const eurAmount = (eurCents / 100) * seatCount;
  if (currency === "EUR") return Math.round(eurAmount);

  const { data } = await supabase
    .from("exchange_rates")
    .select("rate_from_eur")
    .eq("currency", currency)
    .maybeSingle();

  const rate = Number(data?.rate_from_eur ?? 1);
  return Math.round(eurAmount * rate);
}

export function isPremiumPlan(planId: string): boolean {
  return planId === "premium_monthly" || planId === "premium_annual";
}

export { TRIAL_DAYS };
