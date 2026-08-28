import { corsHeaders } from "../_shared/cors.ts";
import {
  getActiveOrgSubscription,
  grantOrgMemberEntitlement,
} from "../_shared/org-helpers.ts";
import { createServiceClient, getUserFromRequest } from "../_shared/billing-helpers.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const user = await getUserFromRequest(req);
    if (!user || !user.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json() as { invite_id?: string };
    const inviteId = body.invite_id?.trim();
    if (!inviteId) {
      return new Response(JSON.stringify({ error: "Missing invite_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createServiceClient();
    const { data: invite, error } = await supabase
      .from("organization_members")
      .select("id, organization_id, user_id, invite_email, accepted_at, role")
      .eq("id", inviteId)
      .maybeSingle();

    if (error || !invite) {
      return new Response(JSON.stringify({ error: "Invitation not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (invite.accepted_at) {
      return new Response(JSON.stringify({ ok: true, already_accepted: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailMatch = invite.invite_email?.toLowerCase() === user.email.toLowerCase();
    const userMatch = invite.user_id === user.id;
    if (!emailMatch && !userMatch) {
      return new Response(JSON.stringify({ error: "Invitation not for this account" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const now = new Date().toISOString();
    const { error: updateError } = await supabase
      .from("organization_members")
      .update({
        user_id: user.id,
        invite_email: null,
        accepted_at: now,
      })
      .eq("id", inviteId);

    if (updateError) {
      throw new Error(updateError.message);
    }

    const subscription = await getActiveOrgSubscription(
      supabase,
      invite.organization_id,
    );

    if (subscription) {
      await grantOrgMemberEntitlement(
        supabase,
        user.id,
        subscription.id,
        subscription.current_period_end,
      );
    }

    return new Response(
      JSON.stringify({ ok: true, organization_id: invite.organization_id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
