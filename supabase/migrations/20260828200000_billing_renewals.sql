-- Billing renewals and dunning support
alter table public.subscriptions
  add column if not exists past_due_since timestamptz,
  add column if not exists renewal_attempts integer not null default 0,
  add column if not exists last_renewal_attempt_at timestamptz;

create index if not exists idx_subscriptions_renewal
  on public.subscriptions(status, current_period_end)
  where status in ('active', 'past_due');

create index if not exists idx_subscriptions_trial_end
  on public.subscriptions(status, trial_ends_at)
  where status = 'trialing';
