import { corsHeaders } from "../_shared/cors.ts";
import { createBillingService } from "../_shared/billing-helpers.ts";
import { createKPayAdapter } from "../_shared/payments/adapters/kpay.ts";
import { PaymentProviderRegistry } from "../_shared/payments/registry.ts";

function getProviderSlugFromUrl(url: URL): string | null {
  const parts = url.pathname.split("/").filter(Boolean);
  const idx = parts.indexOf("webhook-payment");
  if (idx === -1 || !parts[idx + 1]) return null;
  return parts[idx + 1];
}

function buildRegistry(providerSlug: string): PaymentProviderRegistry {
  const registry = new PaymentProviderRegistry();
  if (providerSlug === "kpay") {
    registry.register(createKPayAdapter());
  }
  return registry;
}

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
    const providerSlug = getProviderSlugFromUrl(new URL(req.url));
    if (!providerSlug) {
      return new Response(JSON.stringify({ error: "Missing provider slug" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const registry = buildRegistry(providerSlug);
    if (!registry.has(providerSlug)) {
      return new Response(JSON.stringify({ error: "Unknown provider" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rawBody = await req.text();
    const adapter = registry.get(providerSlug);
    const event = await adapter.handleWebhook(rawBody, req.headers);

    const billing = createBillingService();
    await billing.handlePaymentEvent(event);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[webhook-payment]", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
