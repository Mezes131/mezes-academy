import { corsHeaders } from "../_shared/cors.ts";
import {
  countOrgSeatsUsed,
  isOrgAdmin,
  sendTransactionalEmail,
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
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json() as {
      organization_id?: string;
      email?: string;
    };

    const organizationId = body.organization_id?.trim();
    const email = body.email?.trim().toLowerCase();
    if (!organizationId || !email) {
      return new Response(JSON.stringify({ error: "Missing organization or email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createServiceClient();

    if (!(await isOrgAdmin(supabase, organizationId, user.id))) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: org } = await supabase
      .from("organizations")
      .select("id, name, seat_limit")
      .eq("id", organizationId)
      .single();

    if (!org) {
      return new Response(JSON.stringify({ error: "Organization not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const seatsUsed = await countOrgSeatsUsed(supabase, organizationId);
    if (seatsUsed >= org.seat_limit) {
      return new Response(JSON.stringify({ error: "Seat limit reached" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: usersList } = await supabase.auth.admin.listUsers();
    const invitedUser = usersList.users.find(
      (u) => u.email?.toLowerCase() === email,
    );

    const { data: invite, error: inviteError } = await supabase
      .from("organization_members")
      .insert({
        organization_id: organizationId,
        user_id: invitedUser?.id ?? null,
        invite_email: invitedUser ? null : email,
        role: "member",
      })
      .select("id")
      .single();

    if (inviteError) {
      const message = inviteError.message.includes("duplicate")
        ? "Member already invited"
        : inviteError.message;
      return new Response(JSON.stringify({ error: message }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const siteUrl = Deno.env.get("SITE_URL") ?? "http://localhost:5173";
    const acceptUrl = `${siteUrl}/account/team?invite=${invite.id}`;

    await sendTransactionalEmail(
      email,
      `Invitation Mezes Academy — ${org.name}`,
      `<p>You have been invited to join <strong>${org.name}</strong> on Mezes Academy.</p>
       <p><a href="${acceptUrl}">Accept invitation</a></p>`,
    );

    return new Response(
      JSON.stringify({ ok: true, invite_id: invite.id, accept_url: acceptUrl }),
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
