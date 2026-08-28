import { corsHeaders } from "../_shared/cors.ts";
import {
  createBillingService,
  createServiceClient,
  verifyCronAuth,
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

  if (!verifyCronAuth(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = createServiceClient();
    const billing = createBillingService();
    const now = new Date().toISOString();

    const { data: dueTrials } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("status", "trialing")
      .is("canceled_at", null)
      .lte("trial_ends_at", now);

    const { data: dueRenewals } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("status", "active")
      .is("canceled_at", null)
      .lte("current_period_end", now);

    const { data: pastDue } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("status", "past_due")
      .is("canceled_at", null);

    const renewals = [...(dueTrials ?? []), ...(dueRenewals ?? [])];
    const renewalResults = [];

    for (const subscription of renewals) {
      const result = await billing.renewSubscription(subscription);
      renewalResults.push({ id: subscription.id, ...result });
    }

    const dunningResults = [];
    for (const subscription of pastDue ?? []) {
      const action = await billing.processDunning(subscription);
      dunningResults.push({ id: subscription.id, action });
    }

    return new Response(
      JSON.stringify({
        ok: true,
        renewals: renewalResults.length,
        dunning: dunningResults.length,
        renewalResults,
        dunningResults,
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
