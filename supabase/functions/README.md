# Supabase Edge Functions — Billing

## Deployed functions

| Function | Auth | Purpose |
|----------|------|---------|
| `payment-methods` | Public | List payment methods by country |
| `create-subscription` | User JWT | Trial or initial payment |
| `webhook-payment/:provider` | Provider webhook | Payment status updates |
| `cancel-subscription` | User JWT | Cancel subscription |
| `invite-org-member` | User JWT (org admin) | Invite teammate by email |
| `accept-org-invite` | User JWT | Accept team invitation |
| `remove-org-member` | User JWT (org admin) | Remove teammate |
| `enterprise-quote-request` | Public | Quote request for 10+ seats |
| `renew-subscriptions` | `CRON_SECRET` | Renewals + dunning retries |
| `poll-pending-payments` | `CRON_SECRET` | Poll stale pending payments |
| `video-playback` | User JWT | Signed MinIO URL for premium lesson video |

## video-playback

Returns a presigned GET URL for MinIO objects under `courses/`. Requires active `video_access` entitlement.

**Secrets:**

```
MINIO_ENDPOINT=          # reachable from Supabase Edge in prod (public URL/TLS)
MINIO_ACCESS_KEY=
MINIO_SECRET_KEY=
MINIO_BUCKET=mezes-videos
MINIO_REGION=us-east-1
VIDEO_SIGNED_URL_TTL_SECONDS=3600
```

Use a MinIO service account with read-only policy on `mezes-videos/*` — not root credentials.

**Local dev:** MinIO runs via `docker compose up minio minio-init`. Edge Functions on Supabase cloud cannot reach `http://minio:9000` — use a public staging endpoint or test playback locally with `supabase functions serve`.

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
RESEND_API_KEY= (optional, for invite/quote emails)
ENTERPRISE_QUOTE_EMAIL=contact@mezescorp.com
```
