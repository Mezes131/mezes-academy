import { corsHeaders } from "../_shared/cors.ts";
import { isOrgAdmin } from "../_shared/org-helpers.ts";
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
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json() as { member_id?: string };
    const memberId = body.member_id?.trim();
    if (!memberId) {
      return new Response(JSON.stringify({ error: "Missing member_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createServiceClient();
    const { data: member, error } = await supabase
      .from("organization_members")
      .select("id, organization_id, user_id, role, organizations(owner_id)")
      .eq("id", memberId)
      .maybeSingle();

    if (error || !member) {
      return new Response(JSON.stringify({ error: "Member not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const org = member.organizations as { owner_id: string } | null;
    if (org?.owner_id === member.user_id) {
      return new Response(JSON.stringify({ error: "Cannot remove organization owner" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!(await isOrgAdmin(supabase, member.organization_id, user.id))) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("id")
      .eq("organization_id", member.organization_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (member.user_id && subscription) {
      await supabase
        .from("entitlements")
        .delete()
        .eq("user_id", member.user_id)
        .eq("feature", "video_access")
        .eq("source_id", subscription.id);
    }

    const { error: deleteError } = await supabase
      .from("organization_members")
      .delete()
      .eq("id", memberId);

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
