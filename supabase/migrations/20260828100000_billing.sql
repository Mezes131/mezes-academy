-- Billing: plans, payment config, subscriptions, entitlements, organizations.
-- Apply via Supabase SQL Editor or `supabase db push`.

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

create index if not exists idx_country_payment_country
  on public.country_payment_availability(country_code, enabled);

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

create index if not exists idx_payments_pending
  on public.payments(status, created_at)
  where status = 'pending';

create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  feature text not null,
  source text not null check (source in ('subscription', 'organization', 'trial')),
  source_id uuid not null,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_entitlements_user_feature
  on public.entitlements(user_id, feature);

alter table public.profiles add column if not exists country text;
alter table public.profiles add column if not exists preferred_currency text;
alter table public.profiles add column if not exists trial_used boolean not null default false;

-- Row level security
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

drop policy if exists "public read plans" on public.plans;
create policy "public read plans"
  on public.plans for select using (true);

drop policy if exists "public read payment_providers" on public.payment_providers;
create policy "public read payment_providers"
  on public.payment_providers for select using (active);

drop policy if exists "public read payment_methods" on public.payment_methods;
create policy "public read payment_methods"
  on public.payment_methods for select using (active);

drop policy if exists "public read country_payment_availability" on public.country_payment_availability;
create policy "public read country_payment_availability"
  on public.country_payment_availability for select using (enabled);

drop policy if exists "public read exchange_rates" on public.exchange_rates;
create policy "public read exchange_rates"
  on public.exchange_rates for select using (true);

drop policy if exists "users read own subscriptions" on public.subscriptions;
create policy "users read own subscriptions"
  on public.subscriptions for select using (auth.uid() = user_id);

drop policy if exists "org members read org subscriptions" on public.subscriptions;
create policy "org members read org subscriptions"
  on public.subscriptions for select using (
    organization_id is not null
    and exists (
      select 1
      from public.organization_members om
      where om.organization_id = subscriptions.organization_id
        and om.user_id = auth.uid()
        and om.accepted_at is not null
    )
  );

drop policy if exists "users read own payments" on public.payments;
create policy "users read own payments"
  on public.payments for select using (
    exists (
      select 1
      from public.subscriptions s
      where s.id = payments.subscription_id
        and s.user_id = auth.uid()
    )
  );

drop policy if exists "org members read org payments" on public.payments;
create policy "org members read org payments"
  on public.payments for select using (
    exists (
      select 1
      from public.subscriptions s
      join public.organization_members om on om.organization_id = s.organization_id
      where s.id = payments.subscription_id
        and om.user_id = auth.uid()
        and om.role = 'admin'
        and om.accepted_at is not null
    )
  );

drop policy if exists "users read own entitlements" on public.entitlements;
create policy "users read own entitlements"
  on public.entitlements for select using (auth.uid() = user_id);

drop policy if exists "users read own organizations" on public.organizations;
create policy "users read own organizations"
  on public.organizations for select using (
    owner_id = auth.uid()
    or exists (
      select 1
      from public.organization_members om
      where om.organization_id = organizations.id
        and om.user_id = auth.uid()
        and om.accepted_at is not null
    )
  );

drop policy if exists "users read organization memberships" on public.organization_members;
create policy "users read organization memberships"
  on public.organization_members for select using (
    user_id = auth.uid()
    or exists (
      select 1
      from public.organization_members om
      where om.organization_id = organization_members.organization_id
        and om.user_id = auth.uid()
        and om.role = 'admin'
        and om.accepted_at is not null
    )
  );
