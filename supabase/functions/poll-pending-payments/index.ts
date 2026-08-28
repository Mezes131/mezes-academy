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
    const staleBefore = new Date(Date.now() - 30 * 60 * 1000).toISOString();

    const { data: pendingPayments, error } = await supabase
      .from("payments")
      .select("id, subscription_id, provider_slug, external_ref, status, created_at")
      .eq("status", "pending")
      .lt("created_at", staleBefore);

    if (error) throw error;

    const results = [];
    for (const payment of pendingPayments ?? []) {
      try {
        await billing.pollPendingPayment(payment);
        results.push({ id: payment.id, polled: true });
      } catch (pollError) {
        const message = pollError instanceof Error
          ? pollError.message
          : "poll failed";
        results.push({ id: payment.id, polled: false, error: message });
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        polled: results.length,
        results,
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
