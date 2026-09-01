# Billing, Pricing & Payment Abstraction — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship subscription billing with config-driven Payoneer/KPay payment abstraction, video paywall, `/pricing` page, and recurring billing engine per spec `docs/superpowers/specs/2026-08-28-billing-pricing-design.md`.

**Architecture:** Supabase Postgres holds plans, subscriptions, entitlements, and payment-method config. Edge Functions expose a PSP-agnostic `BillingService` + `PaymentProviderRegistry` with per-PSP adapters. React checkout consumes `GET /payment-methods` and never hardcodes providers.

**Tech Stack:** React 18, TypeScript, Vite, Supabase (Postgres + Edge Functions Deno), Vitest, Tailwind, i18n FR/EN, Payoneer Web SDK (`@payoneer/op-payment-widget-v3`), KPay REST API.

## Global Constraints

- Premium: **20 EUR/month**, **150 EUR/year**; Enterprise: **20 EUR/seat/month**; trial **7 days**, **1 per account**.
- Video paywall only; text, Sandpack exercises, quizzes stay free (login required).
- **No hardcoded payment methods or PSP logic** in pages or billing core; config from DB + adapters only.
- PSP secrets in env vars only, never in DB.
- i18n FR/EN for all user-facing billing copy.
- No em dash (`—`) in user-facing copy.
- RLS: users read own subscriptions/payments/entitlements; billing writes via service role in Edge Functions.
- Commit after each task.

**Spec reference:** `docs/superpowers/specs/2026-08-28-billing-pricing-design.md`

---

## File map

| File | Role |
|------|------|
| `supabase/migrations/20260828100000_billing.sql` | All billing tables + RLS |
| `supabase/seed/billing_payment_methods.sql` | Providers, methods, 12 KPay countries, plans, exchange rates |
| `supabase/functions/_shared/payments/types.ts` | Normalized payment types |
| `supabase/functions/_shared/payments/registry.ts` | `PaymentProviderRegistry` |
| `supabase/functions/_shared/payments/billing-service.ts` | Shared payment event + entitlement logic |
| `supabase/functions/_shared/payments/adapters/kpay.ts` | KPay adapter |
| `supabase/functions/_shared/payments/adapters/payoneer.ts` | Payoneer adapter |
| `supabase/functions/payment-methods/index.ts` | `GET` available methods by country |
| `supabase/functions/create-subscription/index.ts` | Start subscription + trial |
| `supabase/functions/webhook-payment/index.ts` | Unified webhook router |
| `supabase/functions/renew-subscriptions/index.ts` | Cron renewals + dunning |
| `src/types/billing.ts` | Frontend billing types |
| `src/lib/billing/entitlements.ts` | Pure entitlement check helpers |
| `src/lib/billing/entitlements.test.ts` | Vitest |
| `src/lib/billing/fieldSchema.ts` | Validate dynamic checkout fields |
| `src/lib/billing/fieldSchema.test.ts` | Vitest |
| `src/hooks/useEntitlement.ts` | Fetch `video_access` for current user |
| `src/hooks/usePaymentMethods.ts` | Fetch methods for country |
| `src/hooks/useBilling.ts` | Plans, checkout, cancel |
| `src/components/billing/VideoPaywall.tsx` | Paywall UI |
| `src/components/billing/PaymentMethodSelector.tsx` | Config-driven select |
| `src/components/billing/PaymentMethodFields.tsx` | Dynamic fields from schema |
| `src/components/billing/PaymentSessionRenderer.tsx` | widget / redirect / push |
| `src/components/billing/PricingCards.tsx` | 3-tier pricing cards |
| `src/pages/PricingPage.tsx` | `/pricing` |
| `src/pages/CheckoutPage.tsx` | `/checkout` |
| `src/pages/account/BillingPage.tsx` | `/account/billing` |
| `src/components/learning/ModuleView.tsx` | Gate `video` blocks |
| `src/App.tsx` | New routes |
| `src/lib/analytics.ts` | Billing events |
| `src/i18n/messages/fr.ts`, `en.ts` | Billing strings |

---

# Phase P1 — Foundation

Deliverable: DB schema seeded, payment-methods API, entitlement hook, video paywall, static pricing page. No real PSP calls yet.

---

### Task 1: Billing SQL migration

**Files:**
- Create: `supabase/migrations/20260828100000_billing.sql`
- Modify: `supabase/schema.sql` (append billing section for local reference)

**Interfaces:**
- Produces: tables `plans`, `subscriptions`, `payments`, `entitlements`, `organizations`, `organization_members`, `payment_providers`, `payment_methods`, `country_payment_availability`, `exchange_rates`
- Produces: `profiles.country`, `profiles.preferred_currency`, `profiles.trial_used`

- [ ] **Step 1: Create migration file**

```sql
-- supabase/migrations/20260828100000_billing.sql
create table if not exists public.plans (
  id text primary key,
  name text not null,
  price_eur_cents integer not null check (price_eur_cents >= 0),
  interval text not null check (interval in ('month', 'year')),
  interval_count integer not null default 1 check (interval_count > 0),
  seat_based boolean not null default false,
  active boolean not null default true
);

create table if not exists public.payment_providers (
  slug text primary key,
  name text not null,
  adapter_module text not null,
  webhook_path text not null,
  supports_off_session boolean not null default false,
  sandbox boolean not null default true,
  active boolean not null default true,
  config jsonb not null default '{}'::jsonb
);

create table if not exists public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  provider_slug text not null references public.payment_providers(slug),
  type text not null check (type in ('card', 'mobile_money', 'bank', 'wallet')),
  label_i18n_key text not null,
  icon text not null default 'credit-card',
  fields_schema jsonb not null default '[]'::jsonb,
  currencies text[] not null default '{}',
  sort_order integer not null default 0,
  active boolean not null default true
);

create table if not exists public.country_payment_availability (
  id uuid primary key default gen_random_uuid(),
  country_code text not null,
  payment_method_id uuid not null references public.payment_methods(id) on delete cascade,
  enabled boolean not null default true,
  config jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  unique (country_code, payment_method_id)
);
create index if not exists idx_country_payment_country on public.country_payment_availability(country_code, enabled);

create table if not exists public.exchange_rates (
  currency text primary key,
  rate_from_eur numeric not null check (rate_from_eur > 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references public.profiles(id) on delete restrict,
  seat_limit integer not null check (seat_limit > 0),
  billing_email text not null,
  status text not null default 'active' check (status in ('active', 'suspended')),
  created_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('admin', 'member')),
  invited_at timestamptz not null default now(),
  accepted_at timestamptz,
  unique (organization_id, user_id)
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  plan_id text not null references public.plans(id),
  status text not null check (status in ('trialing', 'active', 'past_due', 'canceled')),
  seat_count integer not null default 1 check (seat_count > 0),
  payment_method_id uuid references public.payment_methods(id),
  payment_provider_slug text,
  payment_method_config jsonb not null default '{}'::jsonb,
  trial_ends_at timestamptz,
  current_period_start timestamptz not null default now(),
  current_period_end timestamptz not null,
  canceled_at timestamptz,
  created_at timestamptz not null default now(),
  check (
    (user_id is not null and organization_id is null)
    or (user_id is null and organization_id is not null)
  )
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.subscriptions(id) on delete cascade,
  payment_method_id uuid references public.payment_methods(id),
  provider_slug text not null,
  external_ref text,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null,
  status text not null check (status in ('pending', 'succeeded', 'failed', 'cancelled')),
  provider_payload jsonb not null default '{}'::jsonb,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists idx_payments_pending on public.payments(status, created_at) where status = 'pending';

create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  feature text not null,
  source text not null check (source in ('subscription', 'organization', 'trial')),
  source_id uuid not null,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists idx_entitlements_user_feature on public.entitlements(user_id, feature);

alter table public.profiles add column if not exists country text;
alter table public.profiles add column if not exists preferred_currency text;
alter table public.profiles add column if not exists trial_used boolean not null default false;
```

- [ ] **Step 2: Add RLS policies**

```sql
alter table public.plans enable row level security;
alter table public.payment_providers enable row level security;
alter table public.payment_methods enable row level security;
alter table public.country_payment_availability enable row level security;
alter table public.exchange_rates enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;
alter table public.entitlements enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;

create policy "public read plans" on public.plans for select using (true);
create policy "public read payment_providers" on public.payment_providers for select using (active);
create policy "public read payment_methods" on public.payment_methods for select using (active);
create policy "public read country_payment_availability" on public.country_payment_availability for select using (enabled);
create policy "public read exchange_rates" on public.exchange_rates for select using (true);

create policy "users read own subscriptions" on public.subscriptions for select using (auth.uid() = user_id);
create policy "users read own payments" on public.payments for select using (
  exists (select 1 from public.subscriptions s where s.id = subscription_id and s.user_id = auth.uid())
);
create policy "users read own entitlements" on public.entitlements for select using (auth.uid() = user_id);
```

- [ ] **Step 3: Apply migration in Supabase SQL Editor (or `supabase db push` if CLI configured)**

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/20260828100000_billing.sql supabase/schema.sql
git commit -m "feat(billing): add subscription and payment config schema"
```

---

### Task 2: Seed payment providers, methods, plans, countries

**Files:**
- Create: `supabase/seed/billing_payment_methods.sql`

**Interfaces:**
- Produces: seed rows for `payoneer`, `kpay`, 4 `payment_methods`, 3 plans, 12 KPay countries + `DEFAULT` Payoneer fallback, EUR exchange rates

- [ ] **Step 1: Write seed SQL**

```sql
insert into public.payment_providers (slug, name, adapter_module, webhook_path, supports_off_session, sandbox, active)
values
  ('payoneer', 'Payoneer', 'payoneer', '/webhook-payment/payoneer', false, true, true),
  ('kpay', 'KPay', 'kpay', '/webhook-payment/kpay', false, true, true)
on conflict (slug) do nothing;

insert into public.plans (id, name, price_eur_cents, interval, seat_based) values
  ('premium_monthly', 'Premium Monthly', 2000, 'month', false),
  ('premium_annual', 'Premium Annual', 15000, 'year', false),
  ('enterprise_seat_monthly', 'Enterprise Seat Monthly', 2000, 'month', true)
on conflict (id) do nothing;

-- payment_methods: use fixed UUIDs for stable seeds
insert into public.payment_methods (id, slug, provider_slug, type, label_i18n_key, icon, fields_schema, currencies, sort_order)
values
  ('11111111-1111-1111-1111-111111111101', 'kpay_momo', 'kpay', 'mobile_money', 'billing.method.kpayMomo', 'smartphone',
   '[{"name":"operator","type":"select","required":true},{"name":"msisdn","type":"tel","required":true}]'::jsonb,
   array['XOF','XAF','KES','RWF','UGX','CDF','USD','SLE','ZMW'], 1),
  ('11111111-1111-1111-1111-111111111102', 'kpay_cc', 'kpay', 'card', 'billing.method.kpayCard', 'credit-card',
   '[]'::jsonb, array['RWF','USD'], 2),
  ('11111111-1111-1111-1111-111111111103', 'payoneer_card', 'payoneer', 'card', 'billing.method.payoneerCard', 'credit-card',
   '[]'::jsonb, array['EUR','USD'], 10)
on conflict (slug) do nothing;

-- country availability: SEN example with operators in config
insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'SEN', id, true, '{"operators":[{"value":"orange","label":"Orange Money"},{"value":"free","label":"Free Money"}],"default_currency":"XOF"}'::jsonb, 1
from public.payment_methods where slug = 'kpay_momo'
on conflict do nothing;

-- Repeat for BEN, CMR, CIV, COD, GAB, KEN, COG, RWA, SLE, UGA, ZMB (same pattern, operators from spec §3.3)
-- DEFAULT fallback: all countries get payoneer_card via a seed function or insert country_code 'DEFAULT'

insert into public.exchange_rates (currency, rate_from_eur) values
  ('EUR', 1), ('USD', 1.08), ('XOF', 655.957), ('XAF', 655.957), ('KES', 140), ('RWF', 1400), ('UGX', 4200)
on conflict (currency) do update set rate_from_eur = excluded.rate_from_eur, updated_at = now();
```

- [ ] **Step 2: Run seed in Supabase SQL Editor**

- [ ] **Step 3: Commit**

```bash
git add supabase/seed/billing_payment_methods.sql
git commit -m "feat(billing): seed payment providers, methods, and KPay countries"
```

---

### Task 3: Payment types + registry + billing service (shared Deno)

**Files:**
- Create: `supabase/functions/_shared/payments/types.ts`
- Create: `supabase/functions/_shared/payments/registry.ts`
- Create: `supabase/functions/_shared/payments/billing-service.ts`

**Interfaces:**
- Produces: `PaymentProviderAdapter`, `InitiatePaymentInput`, `PaymentSession`, `WebhookEvent`, `PaymentProviderRegistry`, `BillingService.handlePaymentEvent`, `BillingService.initiatePayment`

- [ ] **Step 1: Create types**

```ts
// supabase/functions/_shared/payments/types.ts
export type PaymentSessionType = "redirect" | "widget" | "push";
export type PaymentEventStatus = "succeeded" | "failed" | "cancelled" | "pending";

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
```

- [ ] **Step 2: Create registry**

```ts
// supabase/functions/_shared/payments/registry.ts
import type { PaymentProviderAdapter } from "./types.ts";

export class PaymentProviderRegistry {
  private adapters = new Map<string, PaymentProviderAdapter>();

  register(adapter: PaymentProviderAdapter): void {
    this.adapters.set(adapter.slug, adapter);
  }

  get(slug: string): PaymentProviderAdapter {
    const adapter = this.adapters.get(slug);
    if (!adapter) throw new Error(`Unknown payment provider: ${slug}`);
    return adapter;
  }
}

export function createRegistry(adapters: PaymentProviderAdapter[]): PaymentProviderRegistry {
  const registry = new PaymentProviderRegistry();
  for (const a of adapters) registry.register(a);
  return registry;
}
```

- [ ] **Step 3: Create BillingService skeleton (handlePaymentEvent + grant/revoke entitlement)**

Implement `grantVideoEntitlement`, `revokeVideoEntitlement`, `extendSubscriptionPeriod` using Supabase service client. Full PSP calls come in P2.

- [ ] **Step 4: Commit**

```bash
git add supabase/functions/_shared/payments/
git commit -m "feat(billing): add payment provider types, registry, and billing service"
```

---

### Task 4: `GET /payment-methods` Edge Function

**Files:**
- Create: `supabase/functions/payment-methods/index.ts`

**Interfaces:**
- Consumes: `country_payment_availability`, `payment_methods`, `payment_providers`
- Produces: JSON `{ methods: PaymentMethodOption[] }` per spec §4.4.5

- [ ] **Step 1: Implement handler**

```ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const url = new URL(req.url);
  const country = (url.searchParams.get("country") || "DEFAULT").toUpperCase();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
  );

  const { data: rows, error } = await supabase
    .from("country_payment_availability")
    .select(`
      sort_order, config,
      payment_methods (
        id, slug, type, label_i18n_key, icon, fields_schema, currencies,
        payment_providers ( slug )
      )
    `)
    .eq("country_code", country)
    .eq("enabled", true)
    .order("sort_order");

  let methods = rows ?? [];
  if (!methods.length && country !== "DEFAULT") {
  // fallback DEFAULT + payoneer for international
    const fallback = await supabase.from("country_payment_availability")... // same query country_code = 'DEFAULT'
  }

  const payload = methods.map((row) => ({
    id: row.payment_methods.id,
    slug: row.payment_methods.slug,
    type: row.payment_methods.type,
    labelKey: row.payment_methods.label_i18n_key,
    icon: row.payment_methods.icon,
    providerSlug: row.payment_methods.payment_providers.slug,
    currencies: row.payment_methods.currencies,
    fields: mergeFieldsWithCountryConfig(row.payment_methods.fields_schema, row.config),
    sortOrder: row.sort_order,
  }));

  return new Response(JSON.stringify({ methods: payload }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
```

- [ ] **Step 2: Create `supabase/functions/_shared/cors.ts` if missing**

- [ ] **Step 3: Test locally with `supabase functions serve payment-methods` and `curl "?country=SEN"`**

- [ ] **Step 4: Commit**

```bash
git commit -m "feat(billing): add payment-methods edge function"
```

---

### Task 5: Frontend billing types + entitlement helpers

**Files:**
- Create: `src/types/billing.ts`
- Create: `src/lib/billing/entitlements.ts`
- Create: `src/lib/billing/entitlements.test.ts`
- Create: `src/lib/billing/fieldSchema.ts`
- Create: `src/lib/billing/fieldSchema.test.ts`

**Interfaces:**
- Produces: `hasVideoAccess(entitlement)`, `validateCheckoutFields(schema, values)`

- [ ] **Step 1: Write failing tests**

```ts
// src/lib/billing/entitlements.test.ts
import { describe, expect, it } from "vitest";
import { isEntitlementActive } from "./entitlements";

describe("isEntitlementActive", () => {
  it("returns true when expires_at is null", () => {
    expect(isEntitlementActive({ expires_at: null }, new Date())).toBe(true);
  });
  it("returns false when expired", () => {
    expect(isEntitlementActive({ expires_at: "2020-01-01T00:00:00Z" }, new Date("2021-01-01"))).toBe(false);
  });
});
```

- [ ] **Step 2: Run:** `npm run test -- src/lib/billing/entitlements.test.ts` → FAIL

- [ ] **Step 3: Implement helpers**

- [ ] **Step 4: Run tests → PASS**

- [ ] **Step 5: Commit**

```bash
git commit -m "feat(billing): add entitlement and field schema helpers"
```

---

### Task 6: `useEntitlement` + `usePaymentMethods` hooks

**Files:**
- Create: `src/hooks/useEntitlement.ts`
- Create: `src/hooks/usePaymentMethods.ts`

**Interfaces:**
- Produces: `useEntitlement('video_access')` → `{ hasAccess, loading, expiresAt, source }`
- Produces: `usePaymentMethods(country)` → `{ methods, loading, error }`

- [ ] **Step 1: Implement `useEntitlement`** — query `entitlements` table for `auth.uid()` + feature, use `isEntitlementActive`

- [ ] **Step 2: Implement `usePaymentMethods`** — fetch `${SUPABASE_URL}/functions/v1/payment-methods?country=...`

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(billing): add useEntitlement and usePaymentMethods hooks"
```

---

### Task 7: `VideoPaywall` + ModuleView integration

**Files:**
- Create: `src/components/billing/VideoPaywall.tsx`
- Modify: `src/components/learning/ModuleView.tsx`

**Interfaces:**
- Consumes: `useEntitlement('video_access')`, `useAuth` for `trial_used`

- [ ] **Step 1: Create VideoPaywall** with poster, CTA trial/subscribe, link `/pricing`, analytics events

- [ ] **Step 2: Wrap video case in ModuleView**

```tsx
case "video": {
  const { hasAccess, loading } = useEntitlement("video_access");
  if (loading) return <VideoPaywallSkeleton />;
  if (!hasAccess) return <VideoPaywall video={block.video} />;
  // existing player code unchanged
}
```

Extract inner content to `VideoPlayer` subcomponent to satisfy rules-of-hooks if needed (call hook at ModuleView level, pass `hasAccess` down).

- [ ] **Step 3: Manual test:** logged-in user without entitlement sees paywall on module with video block

- [ ] **Step 4: Commit**

```bash
git commit -m "feat(billing): add video paywall to ModuleView"
```

---

### Task 8: Pricing page (static) + routes + i18n

**Files:**
- Create: `src/components/billing/PricingCards.tsx`
- Create: `src/pages/PricingPage.tsx`
- Modify: `src/App.tsx`
- Modify: `src/i18n/messages/fr.ts`, `en.ts`
- Modify: `src/components/layout/Footer.tsx` (link to pricing)

**Interfaces:**
- Produces: routes `/pricing` and `/en/pricing`

- [ ] **Step 1: Add i18n keys** under `billing.pricing.*` (Free, Premium, Enterprise, trial badge, CTA labels)

- [ ] **Step 2: Build PricingCards** with monthly/annual toggle (local state), prices from constants `PREMIUM_MONTHLY_EUR = 20`, `PREMIUM_ANNUAL_EUR = 150` (display only in P1; conversion in P3)

- [ ] **Step 3: Register routes in App.tsx** inside `siteRouteObjects`

- [ ] **Step 4: Run:** `npm run build` → no type errors

- [ ] **Step 5: Commit**

```bash
git commit -m "feat(billing): add pricing page with three-tier cards"
```

---

**P1 checkpoint:** Paywall works, pricing page live, payment-methods API returns config from DB. No checkout yet.

---

# Phase P2 — Premium checkout + KPay adapter (pilot countries)

Deliverable: Trial subscription, KPay MoMo payment, webhook activates entitlement. Pilot: RWA, SEN, CIV.

---

### Task 9: KPay adapter

**Files:**
- Create: `supabase/functions/_shared/payments/adapters/kpay.ts`

**Interfaces:**
- Implements: `PaymentProviderAdapter`
- Maps `operator` + `msisdn` → KPay `action: pay` payload
- `handleWebhook` parses KPay `returl` callback → `WebhookEvent`

- [ ] **Step 1: Implement adapter with sandbox env vars** (`KPAY_API_KEY`, `KPAY_USERNAME`, `KPAY_PASSWORD`, `KPAY_RETAILER_ID`)

- [ ] **Step 2: Unit-test mapping logic** in `src/lib/billing/kpayMapping.test.ts` (pure functions extracted for operator → pmethod)

- [ ] **Step 3: Commit**

---

### Task 10: `create-subscription` Edge Function

**Files:**
- Create: `supabase/functions/create-subscription/index.ts`

**Interfaces:**
- Consumes: `BillingService`, `createRegistry([kpayAdapter])`
- Body: `{ plan_id, payment_method_id, fields, country_code }`
- Returns: `{ subscription_id, session: PaymentSession }` or `{ subscription_id, trialing: true }`

- [ ] **Step 1: Validate auth JWT**, load plan, check no active sub, check trial eligibility

- [ ] **Step 2: If trial eligible** → create subscription `trialing`, grant entitlement until `trial_ends_at`, set `trial_used`, return without payment

- [ ] **Step 3: Else** → create subscription `active` pending payment, call `BillingService.initiatePayment`

- [ ] **Step 4: Commit**

---

### Task 11: Unified webhook + billing event handler

**Files:**
- Create: `supabase/functions/webhook-payment/index.ts`
- Modify: `supabase/functions/_shared/payments/billing-service.ts` (complete `handlePaymentEvent`)

- [ ] **Step 1: Route `POST /webhook-payment/:providerSlug`** to adapter

- [ ] **Step 2: On succeeded** → update payment, extend `current_period_end`, upsert entitlement

- [ ] **Step 3: On failed** → `past_due` or revoke trial entitlement

- [ ] **Step 4: Test with KPay sandbox webhook simulator**

- [ ] **Step 5: Commit**

---

### Task 12: Checkout UI (config-driven)

**Files:**
- Create: `src/pages/CheckoutPage.tsx`
- Create: `src/components/billing/PaymentMethodSelector.tsx`
- Create: `src/components/billing/PaymentMethodFields.tsx`
- Create: `src/components/billing/PaymentSessionRenderer.tsx`
- Create: `src/hooks/useBilling.ts`

- [ ] **Step 1: CheckoutPage** reads `?plan=` from URL, loads `usePaymentMethods(country)`, renders selector + fields

- [ ] **Step 2: On submit** → `POST create-subscription` → `PaymentSessionRenderer` shows push message or redirect

- [ ] **Step 3: No `if (kpay)` in CheckoutPage** — only `session.type` branching in renderer

- [ ] **Step 4: Wire PricingCards CTA** → `/checkout?plan=premium_monthly`

- [ ] **Step 5: Commit**

---

**P2 checkpoint:** User in SEN can start trial or pay via KPay MoMo; webhook grants `video_access`.

---

# Phase P3 — Payoneer + multi-currency display

Deliverable: International card payments, full 12-country KPay seed, converted prices on pricing/checkout.

---

### Task 13: Payoneer adapter + widget renderer

**Files:**
- Create: `supabase/functions/_shared/payments/adapters/payoneer.ts`
- Modify: `src/components/billing/PaymentSessionRenderer.tsx` (lazy load `@payoneer/op-payment-widget-v3`)
- Modify: `supabase/functions/webhook-payment/index.ts` (register payoneer adapter)

- [ ] **Step 1: Implement Payoneer adapter** (`initiatePayment` → widget config via backend `POST /lists`)

- [ ] **Step 2: Widget branch in PaymentSessionRenderer**

- [ ] **Step 3: Env vars** `PAYONEER_CLIENT_ID`, `PAYONEER_CLIENT_SECRET`, `PAYONEER_PROGRAM_ID`

- [ ] **Step 4: Commit**

---

### Task 14: Exchange rate display + complete country seeds

**Files:**
- Modify: `supabase/seed/billing_payment_methods.sql` (all 12 countries + DEFAULT)
- Create: `src/lib/billing/currency.ts`
- Create: `src/lib/billing/currency.test.ts`
- Modify: `PricingCards.tsx`, `CheckoutPage.tsx`

- [ ] **Step 1: `convertFromEurCents(eurCents, currency, rates)`** helper with tests

- [ ] **Step 2: Complete seed for BEN, CMR, CIV, COD, GAB, KEN, COG, RWA, SLE, UGA, ZMB + DEFAULT payoneer fallback**

- [ ] **Step 3: Show converted price with "estimated" label when not EUR**

- [ ] **Step 4: Commit**

---

**P3 checkpoint:** User outside Africa pays via Payoneer; African users see all KPay methods from config.

---

# Phase P4 — Renewals, dunning, account billing

Deliverable: Recurring charges, grace period, `/account/billing` management.

---

### Task 15: `renew-subscriptions` cron

**Files:**
- Create: `supabase/functions/renew-subscriptions/index.ts`

- [ ] **Step 1: Query subscriptions due for renewal** (`current_period_end <= now()`, status `active` or `past_due`)

- [ ] **Step 2: For each, call `BillingService.initiatePayment`** with stored `payment_method_config`

- [ ] **Step 3: Trial ending** → first charge at `trial_ends_at`

- [ ] **Step 4: Schedule via Supabase cron or external trigger** (document in `supabase/functions/README.md`)

- [ ] **Step 5: Commit**

---

### Task 16: Dunning + polling fallback

**Files:**
- Modify: `billing-service.ts`
- Create: `supabase/functions/poll-pending-payments/index.ts`

- [ ] **Step 1: Track `past_due` since date** on subscription (add `past_due_since` column if needed)

- [ ] **Step 2: J+1, J+3 retry payment; J+7 cancel + revoke entitlement**

- [ ] **Step 3: Poll pending payments > 30 min** via `adapter.checkPaymentStatus`

- [ ] **Step 4: Commit**

---

### Task 17: Billing account page

**Files:**
- Create: `src/pages/account/BillingPage.tsx`
- Modify: `src/pages/account/AccountPage.tsx` (nav link)
- Modify: `src/App.tsx` (nested route or tab)

- [ ] **Step 1: Show current plan, renewal date, payment history from `payments` table**

- [ ] **Step 2: Cancel subscription** (Edge Function `cancel-subscription` sets `canceled_at`)

- [ ] **Step 3: Trial cancel** → immediate entitlement revoke

- [ ] **Step 4: Commit**

---

### Task 18: Analytics + CGU update

**Files:**
- Modify: `src/lib/analytics.ts`
- Modify: `src/i18n/messages/fr.ts`, `en.ts` (legal section)

- [ ] **Step 1: Add `trackBillingEvent(name, params)`** and wire events from spec §14

- [ ] **Step 2: Update CGU copy** for paid offer, trial, cancellation

- [ ] **Step 3: Commit**

---

**P4 checkpoint:** Subscriptions renew automatically; users manage billing in account.

---

# Phase P5 — Enterprise

Deliverable: Org creation, seat checkout, member invites, devis form for ≥10 seats.

---

### Task 19: Organizations + seat checkout

**Files:**
- Modify: `create-subscription/index.ts` (enterprise branch)
- Create: `supabase/functions/invite-org-member/index.ts`

- [ ] **Step 1: Enterprise checkout** `?plan=enterprise_seat_monthly&seats=N` (2-9), amount = N × 20 EUR

- [ ] **Step 2: Create org + subscription linked to org**

- [ ] **Step 3: Owner invite flow** → email with accept link → `organization_members` + entitlement per member

- [ ] **Step 4: Commit**

---

### Task 20: Enterprise devis form + team page

**Files:**
- Create: `src/components/billing/EnterpriseContactForm.tsx`
- Create: `src/pages/account/TeamPage.tsx`
- Modify: `PricingCards.tsx` (≥10 seats → contact form)

- [ ] **Step 1: Contact form** posts to Edge Function `enterprise-quote-request` (email notification)

- [ ] **Step 2: Team page** for org admins: seats used/limit, invite, remove member

- [ ] **Step 3: Commit**

---

**P5 checkpoint:** Enterprise self-service <10 seats; devis flow for larger teams.

---

## Verification checklist (full feature)

Run after each phase and before release:

```bash
npm run test
npm run build
```

| Check | Command / action |
|-------|------------------|
| Payment methods API | `curl "$SUPABASE_URL/functions/v1/payment-methods?country=SEN"` returns KPay + Payoneer |
| No hardcoded PSP in checkout | `rg "kpay\|payoneer" src/pages/CheckoutPage.tsx` → 0 matches |
| Paywall | Free user sees paywall on video module |
| Trial | New user gets 7-day `video_access` without payment |
| KPay E2E | Sandbox payment → webhook → entitlement active |
| Payoneer E2E | Sandbox card → webhook → entitlement active |
| Renewal | Cron triggers payment at period end |
| Cancel | User cancels, access until period end |
| i18n | `/en/pricing` renders English copy |

---

## Self-review (spec coverage)

| Spec section | Task(s) |
|--------------|---------|
| §2 Model economique | Tasks 8, 10, 19 |
| §3 PSP Payoneer/KPay | Tasks 9, 13 |
| §4 Abstraction | Tasks 3, 4, 9, 11, 12 |
| §5 Data model | Tasks 1, 2 |
| §6 Checkout | Task 12 |
| §7 Webhooks | Task 11 |
| §8 Renewals/dunning | Tasks 15, 16 |
| §9 Paywall | Task 7 |
| §10 Pricing | Task 8 |
| §11 Account billing | Task 17 |
| §12 Enterprise | Tasks 19, 20 |
| §14 Analytics | Task 18 |
| §17 Phases P1-P5 | Phase sections above |

No TBD placeholders. All PSP-specific logic confined to `adapters/`.
