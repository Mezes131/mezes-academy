-- Seed billing payment providers, methods, plans, country availability, exchange rates.
-- Run after migrations/20260828100000_billing.sql

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

insert into public.payment_methods (id, slug, provider_slug, type, label_i18n_key, icon, fields_schema, currencies, sort_order)
values
  (
    '11111111-1111-1111-1111-111111111101',
    'kpay_momo',
    'kpay',
    'mobile_money',
    'billing.method.kpayMomo',
    'smartphone',
    '[{"name":"operator","type":"select","required":true},{"name":"msisdn","type":"tel","required":true}]'::jsonb,
    array['XOF','XAF','KES','RWF','UGX','CDF','USD','SLE','ZMW'],
    1
  ),
  (
    '11111111-1111-1111-1111-111111111102',
    'kpay_cc',
    'kpay',
    'card',
    'billing.method.kpayCard',
    'credit-card',
    '[]'::jsonb,
    array['RWF','USD'],
    2
  ),
  (
    '11111111-1111-1111-1111-111111111104',
    'kpay_spenn',
    'kpay',
    'wallet',
    'billing.method.kpaySpenn',
    'wallet',
    '[]'::jsonb,
    array['RWF'],
    3
  ),
  (
    '11111111-1111-1111-1111-111111111103',
    'payoneer_card',
    'payoneer',
    'card',
    'billing.method.payoneerCard',
    'credit-card',
    '[]'::jsonb,
    array['EUR','USD'],
    10
  )
on conflict (slug) do update set
  provider_slug = excluded.provider_slug,
  type = excluded.type,
  label_i18n_key = excluded.label_i18n_key,
  icon = excluded.icon,
  fields_schema = excluded.fields_schema,
  currencies = excluded.currencies,
  sort_order = excluded.sort_order,
  active = true;

-- Helper: insert country rows for a payment method slug
-- BEN
insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'BEN', pm.id, true,
  '{"operators":[{"value":"mtn","label":"MTN"},{"value":"moov","label":"Moov"}],"default_currency":"XOF","phone_prefix":"229"}'::jsonb,
  1
from public.payment_methods pm where pm.slug = 'kpay_momo'
on conflict (country_code, payment_method_id) do update set config = excluded.config, enabled = true;

insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'BEN', pm.id, true, '{"default_currency":"XOF"}'::jsonb, 10
from public.payment_methods pm where pm.slug = 'payoneer_card'
on conflict (country_code, payment_method_id) do nothing;

-- CMR
insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'CMR', pm.id, true,
  '{"operators":[{"value":"mtn","label":"MTN"},{"value":"orange","label":"Orange"}],"default_currency":"XAF","phone_prefix":"237"}'::jsonb,
  1
from public.payment_methods pm where pm.slug = 'kpay_momo'
on conflict (country_code, payment_method_id) do update set config = excluded.config, enabled = true;

insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'CMR', pm.id, true, '{"default_currency":"XAF"}'::jsonb, 10
from public.payment_methods pm where pm.slug = 'payoneer_card'
on conflict (country_code, payment_method_id) do nothing;

-- CIV
insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'CIV', pm.id, true,
  '{"operators":[{"value":"mtn","label":"MTN"},{"value":"orange","label":"Orange"}],"default_currency":"XOF","phone_prefix":"225"}'::jsonb,
  1
from public.payment_methods pm where pm.slug = 'kpay_momo'
on conflict (country_code, payment_method_id) do update set config = excluded.config, enabled = true;

insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'CIV', pm.id, true, '{"default_currency":"XOF"}'::jsonb, 10
from public.payment_methods pm where pm.slug = 'payoneer_card'
on conflict (country_code, payment_method_id) do nothing;

-- COD
insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'COD', pm.id, true,
  '{"operators":[{"value":"vodacom","label":"Vodacom M-Pesa"},{"value":"airtel","label":"Airtel"},{"value":"orange","label":"Orange"}],"default_currency":"CDF","phone_prefix":"243"}'::jsonb,
  1
from public.payment_methods pm where pm.slug = 'kpay_momo'
on conflict (country_code, payment_method_id) do update set config = excluded.config, enabled = true;

insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'COD', pm.id, true, '{"default_currency":"USD"}'::jsonb, 2
from public.payment_methods pm where pm.slug = 'kpay_cc'
on conflict (country_code, payment_method_id) do nothing;

insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'COD', pm.id, true, '{"default_currency":"USD"}'::jsonb, 10
from public.payment_methods pm where pm.slug = 'payoneer_card'
on conflict (country_code, payment_method_id) do nothing;

-- GAB
insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'GAB', pm.id, true,
  '{"operators":[{"value":"airtel","label":"Airtel"}],"default_currency":"XAF","phone_prefix":"241"}'::jsonb,
  1
from public.payment_methods pm where pm.slug = 'kpay_momo'
on conflict (country_code, payment_method_id) do update set config = excluded.config, enabled = true;

insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'GAB', pm.id, true, '{"default_currency":"XAF"}'::jsonb, 10
from public.payment_methods pm where pm.slug = 'payoneer_card'
on conflict (country_code, payment_method_id) do nothing;

-- KEN
insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'KEN', pm.id, true,
  '{"operators":[{"value":"mpesa","label":"M-Pesa"}],"default_currency":"KES","phone_prefix":"254"}'::jsonb,
  1
from public.payment_methods pm where pm.slug = 'kpay_momo'
on conflict (country_code, payment_method_id) do update set config = excluded.config, enabled = true;

insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'KEN', pm.id, true, '{"default_currency":"KES"}'::jsonb, 10
from public.payment_methods pm where pm.slug = 'payoneer_card'
on conflict (country_code, payment_method_id) do nothing;

-- COG
insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'COG', pm.id, true,
  '{"operators":[{"value":"airtel","label":"Airtel"}],"default_currency":"XAF","phone_prefix":"242"}'::jsonb,
  1
from public.payment_methods pm where pm.slug = 'kpay_momo'
on conflict (country_code, payment_method_id) do update set config = excluded.config, enabled = true;

insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'COG', pm.id, true, '{"default_currency":"XAF"}'::jsonb, 10
from public.payment_methods pm where pm.slug = 'payoneer_card'
on conflict (country_code, payment_method_id) do nothing;

-- RWA
insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'RWA', pm.id, true,
  '{"operators":[{"value":"airtel","label":"Airtel"},{"value":"mtn","label":"MTN"}],"default_currency":"RWF","phone_prefix":"250"}'::jsonb,
  1
from public.payment_methods pm where pm.slug = 'kpay_momo'
on conflict (country_code, payment_method_id) do update set config = excluded.config, enabled = true;

insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'RWA', pm.id, true, '{"default_currency":"RWF"}'::jsonb, 2
from public.payment_methods pm where pm.slug = 'kpay_cc'
on conflict (country_code, payment_method_id) do nothing;

insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'RWA', pm.id, true, '{"default_currency":"RWF"}'::jsonb, 3
from public.payment_methods pm where pm.slug = 'kpay_spenn'
on conflict (country_code, payment_method_id) do nothing;

insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'RWA', pm.id, true, '{"default_currency":"RWF"}'::jsonb, 10
from public.payment_methods pm where pm.slug = 'payoneer_card'
on conflict (country_code, payment_method_id) do nothing;

-- SEN
insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'SEN', pm.id, true,
  '{"operators":[{"value":"orange","label":"Orange Money"},{"value":"free","label":"Free Money"}],"default_currency":"XOF","phone_prefix":"221"}'::jsonb,
  1
from public.payment_methods pm where pm.slug = 'kpay_momo'
on conflict (country_code, payment_method_id) do update set config = excluded.config, enabled = true;

insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'SEN', pm.id, true, '{"default_currency":"XOF"}'::jsonb, 10
from public.payment_methods pm where pm.slug = 'payoneer_card'
on conflict (country_code, payment_method_id) do nothing;

-- SLE
insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'SLE', pm.id, true,
  '{"operators":[{"value":"orange","label":"Orange"}],"default_currency":"SLE","phone_prefix":"232"}'::jsonb,
  1
from public.payment_methods pm where pm.slug = 'kpay_momo'
on conflict (country_code, payment_method_id) do update set config = excluded.config, enabled = true;

insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'SLE', pm.id, true, '{"default_currency":"SLE"}'::jsonb, 10
from public.payment_methods pm where pm.slug = 'payoneer_card'
on conflict (country_code, payment_method_id) do nothing;

-- UGA
insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'UGA', pm.id, true,
  '{"operators":[{"value":"airtel","label":"Airtel"},{"value":"mtn","label":"MTN"}],"default_currency":"UGX","phone_prefix":"256"}'::jsonb,
  1
from public.payment_methods pm where pm.slug = 'kpay_momo'
on conflict (country_code, payment_method_id) do update set config = excluded.config, enabled = true;

insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'UGA', pm.id, true, '{"default_currency":"UGX"}'::jsonb, 10
from public.payment_methods pm where pm.slug = 'payoneer_card'
on conflict (country_code, payment_method_id) do nothing;

-- ZMB
insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'ZMB', pm.id, true,
  '{"operators":[{"value":"airtel","label":"Airtel"},{"value":"mtn","label":"MTN"},{"value":"zamtel","label":"Zamtel"}],"default_currency":"ZMW","phone_prefix":"260"}'::jsonb,
  1
from public.payment_methods pm where pm.slug = 'kpay_momo'
on conflict (country_code, payment_method_id) do update set config = excluded.config, enabled = true;

insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'ZMB', pm.id, true, '{"default_currency":"ZMW"}'::jsonb, 10
from public.payment_methods pm where pm.slug = 'payoneer_card'
on conflict (country_code, payment_method_id) do nothing;

-- DEFAULT: international fallback (Payoneer only)
insert into public.country_payment_availability (country_code, payment_method_id, enabled, config, sort_order)
select 'DEFAULT', pm.id, true, '{"default_currency":"EUR"}'::jsonb, 1
from public.payment_methods pm where pm.slug = 'payoneer_card'
on conflict (country_code, payment_method_id) do nothing;

insert into public.exchange_rates (currency, rate_from_eur) values
  ('EUR', 1),
  ('USD', 1.08),
  ('XOF', 655.957),
  ('XAF', 655.957),
  ('KES', 140),
  ('RWF', 1400),
  ('UGX', 4200),
  ('CDF', 2800),
  ('SLE', 24),
  ('ZMW', 28)
on conflict (currency) do update
  set rate_from_eur = excluded.rate_from_eur,
      updated_at = now();
