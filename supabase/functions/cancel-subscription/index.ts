import { corsHeaders } from "../_shared/cors.ts";
import {
  createBillingService,
  createServiceClient,
  getUserFromRequest,
} from "../_shared/billing-helpers.ts";

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

    const body = await req.json() as { subscription_id?: string };
    const subscriptionId = body.subscription_id?.trim();
    if (!subscriptionId) {
      return new Response(JSON.stringify({ error: "Missing subscription_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createServiceClient();
    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("id, user_id, status, canceled_at")
      .eq("id", subscriptionId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (error || !subscription) {
      return new Response(JSON.stringify({ error: "Subscription not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (subscription.canceled_at) {
      return new Response(JSON.stringify({ error: "Already canceled" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const billing = createBillingService();
    const revokeImmediately = subscription.status === "trialing";
    await billing.cancelSubscription(subscription.id, revokeImmediately);

    return new Response(
      JSON.stringify({
        ok: true,
        revoked_immediately: revokeImmediately,
      }),
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
