# Supabase Edge Functions — Billing

## Deployed functions

| Function | Auth | Purpose |
|----------|------|---------|
| `payment-methods` | Public | List payment methods by country |
| `create-subscription` | User JWT | Trial or initial payment |
| `webhook-payment/:provider` | Provider webhook | Payment status updates |
| `cancel-subscription` | User JWT | Cancel subscription |
| `renew-subscriptions` | `CRON_SECRET` | Renewals + dunning retries |
| `poll-pending-payments` | `CRON_SECRET` | Poll stale pending payments |

## Cron scheduling

Set `CRON_SECRET` in Edge Function secrets, then schedule via **Supabase Dashboard → Database → Cron** (pg_cron) or an external scheduler.

### renew-subscriptions

Run hourly:

```sql
select net.http_post(
  url := 'https://<project-ref>.supabase.co/functions/v1/renew-subscriptions',
  headers := jsonb_build_object(
    'Authorization', 'Bearer <CRON_SECRET>',
    'Content-Type', 'application/json'
  ),
  body := '{}'::jsonb
);
```

### poll-pending-payments

Run every 15–30 minutes:

```sql
select net.http_post(
  url := 'https://<project-ref>.supabase.co/functions/v1/poll-pending-payments',
  headers := jsonb_build_object(
    'Authorization', 'Bearer <CRON_SECRET>',
    'Content-Type', 'application/json'
  ),
  body := '{}'::jsonb
);
```

## Required secrets

```
CRON_SECRET=
SITE_URL=
SUPABASE_SERVICE_ROLE_KEY=
KPAY_* / PAYONEER_* (see billing spec)
```
