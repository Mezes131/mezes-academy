import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

export async function isOrgAdmin(
  supabase: SupabaseClient,
  organizationId: string,
  userId: string,
): Promise<boolean> {
  const { data } = await supabase
    .from("organization_members")
    .select("id")
    .eq("organization_id", organizationId)
    .eq("user_id", userId)
    .eq("role", "admin")
    .not("accepted_at", "is", null)
    .maybeSingle();

  return Boolean(data);
}

export async function countOrgSeatsUsed(
  supabase: SupabaseClient,
  organizationId: string,
): Promise<number> {
  const { count, error } = await supabase
    .from("organization_members")
    .select("id", { count: "exact", head: true })
    .eq("organization_id", organizationId);

  if (error) throw error;
  return count ?? 0;
}

export async function getActiveOrgSubscription(
  supabase: SupabaseClient,
  organizationId: string,
) {
  const { data } = await supabase
    .from("subscriptions")
    .select("id, status, current_period_end")
    .eq("organization_id", organizationId)
    .in("status", ["active", "past_due", "trialing"])
    .is("canceled_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data;
}

export async function grantOrgMemberEntitlement(
  supabase: SupabaseClient,
  userId: string,
  subscriptionId: string,
  expiresAt: string | null,
): Promise<void> {
  await supabase
    .from("entitlements")
    .delete()
    .eq("user_id", userId)
    .eq("feature", "video_access")
    .eq("source_id", subscriptionId);

  await supabase.from("entitlements").insert({
    user_id: userId,
    feature: "video_access",
    source: "organization",
    source_id: subscriptionId,
    expires_at: expiresAt,
  });
}

export async function sendTransactionalEmail(
  to: string,
  subject: string,
  html: string,
): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("BILLING_EMAIL_FROM") ?? "Mezes Academy <billing@mezescorp.com>";

  if (!apiKey) {
    console.log("[email]", { to, subject, html });
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Email send failed: ${text}`);
  }
}
