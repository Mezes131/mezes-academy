# Deploy billing migrations, seed, and Edge Functions to Supabase.
# Prerequisites:
#   1. npx supabase login   OR   set SUPABASE_ACCESS_TOKEN
#   2. Optional secrets in Supabase Dashboard → Edge Functions → Secrets

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

$ProjectRef = "bnkdfkdwsxbkmmycrtlk"

Write-Host "==> Linking project $ProjectRef..."
npx supabase link --project-ref $ProjectRef

Write-Host "==> Pushing database migrations..."
npx supabase db push

Write-Host "==> Running billing seed..."
$seed = Join-Path $Root "supabase\seed\billing_payment_methods.sql"
if (Test-Path $seed) {
  npx supabase db execute --file $seed
} else {
  Write-Warning "Seed file not found: $seed"
}

Write-Host "==> Deploying Edge Functions..."

# Public / custom auth — disable platform JWT check
npx supabase functions deploy payment-methods --no-verify-jwt
npx supabase functions deploy webhook-payment --no-verify-jwt
npx supabase functions deploy renew-subscriptions --no-verify-jwt
npx supabase functions deploy poll-pending-payments --no-verify-jwt
npx supabase functions deploy enterprise-quote-request --no-verify-jwt

# User JWT required (default)
npx supabase functions deploy create-subscription
npx supabase functions deploy cancel-subscription
npx supabase functions deploy invite-org-member
npx supabase functions deploy accept-org-invite
npx supabase functions deploy remove-org-member

Write-Host "==> Done. Configure secrets in Supabase Dashboard:"
Write-Host "  SITE_URL, SUPABASE_SERVICE_ROLE_KEY, CRON_SECRET"
Write-Host "  KPAY_* / PAYONEER_* / RESEND_API_KEY (optional)"
