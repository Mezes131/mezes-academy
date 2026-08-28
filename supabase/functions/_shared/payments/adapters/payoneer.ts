import type {
  InitiatePaymentInput,
  PaymentProviderAdapter,
  PaymentSession,
  PaymentStatusResult,
  WebhookEvent,
} from "../types.ts";
import {
  buildPayoneerListPayload,
  extractPayoneerWebhookRef,
  mapPayoneerWebhookStatus,
} from "../payoneer-mapping.ts";

type TokenCache = {
  token: string;
  expiresAt: number;
};

let tokenCache: TokenCache | null = null;

function getPayoneerConfig() {
  const clientId = Deno.env.get("PAYONEER_CLIENT_ID");
  const clientSecret = Deno.env.get("PAYONEER_CLIENT_SECRET");
  const programId = Deno.env.get("PAYONEER_PROGRAM_ID");
  const sandbox = Deno.env.get("PAYONEER_SANDBOX") !== "false";
  const authUrl = Deno.env.get("PAYONEER_AUTH_URL") ??
    (sandbox
      ? "https://login.sandbox.payoneer.com/api/v2/oauth2/token"
      : "https://login.payoneer.com/api/v2/oauth2/token");
  const apiBase = Deno.env.get("PAYONEER_API_BASE") ??
    (sandbox
      ? "https://api.sandbox.payoneer.com/checkout/v4"
      : "https://api.payoneer.com/checkout/v4");
  const webhookSecret = Deno.env.get("PAYONEER_WEBHOOK_SECRET");

  if (!clientId || !clientSecret || !programId) {
    throw new Error("Payoneer credentials are not configured");
  }

  return { clientId, clientSecret, programId, authUrl, apiBase, webhookSecret };
}

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 60_000) {
    return tokenCache.token;
  }

  const { clientId, clientSecret, authUrl } = getPayoneerConfig();
  const credentials = btoa(`${clientId}:${clientSecret}`);

  const res = await fetch(authUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "read write",
    }),
  });

  const data = await res.json() as {
    access_token?: string;
    expires_in?: number;
    error_description?: string;
  };

  if (!res.ok || !data.access_token) {
    throw new Error(
      data.error_description ?? `Payoneer auth failed (${res.status})`,
    );
  }

  const expiresIn = Number(data.expires_in ?? 3600);
  tokenCache = {
    token: data.access_token,
    expiresAt: now + expiresIn * 1000,
  };

  return data.access_token;
}

async function createPaymentList(
  input: InitiatePaymentInput,
): Promise<{ listId: string; listUrl: string; checkoutUrl?: string }> {
  const { programId, apiBase } = getPayoneerConfig();
  const token = await getAccessToken();

  const body = buildPayoneerListPayload({
    paymentId: input.paymentId,
    amount: input.amountCents,
    currency: input.currency,
    description: input.description,
    customerEmail: input.customerEmail,
    customerName: input.customerName,
    returnUrl: input.returnUrl,
    webhookUrl: input.webhookUrl,
  });

  const res = await fetch(`${apiBase}/programs/${programId}/paymentlists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json() as Record<string, unknown>;
  if (!res.ok) {
    const message = typeof data.message === "string"
      ? data.message
      : typeof data.error_description === "string"
      ? data.error_description
      : `Payoneer list creation failed (${res.status})`;
    throw new Error(message);
  }

  const listId = String(
    data.list_id ?? data.listId ?? data.id ?? input.paymentId,
  );
  const links = data.links;
  const linkSelf = links && typeof links === "object"
    ? (links as Record<string, unknown>).self
    : undefined;
  const listUrl = String(
    data.list_url ?? data.listUrl ?? linkSelf ?? "",
  );
  const checkoutUrl = typeof data.checkout_url === "string"
    ? data.checkout_url
    : typeof data.checkoutUrl === "string"
    ? data.checkoutUrl
    : undefined;

  if (!listUrl && !checkoutUrl) {
    throw new Error("Payoneer response missing list URL");
  }

  return { listId, listUrl, checkoutUrl };
}

async function verifyWebhookSignature(
  rawBody: string,
  headers: Headers,
): Promise<void> {
  const { webhookSecret } = getPayoneerConfig();
  if (!webhookSecret) return;

  const signature = headers.get("x-payoneer-signature") ??
    headers.get("x-signature") ??
    headers.get("payoneer-signature");

  if (!signature) {
    throw new Error("Payoneer webhook signature missing");
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(webhookSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const digest = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(rawBody),
  );

  const expected = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (signature.toLowerCase() !== expected.toLowerCase()) {
    throw new Error("Invalid Payoneer webhook signature");
  }
}

export function createPayoneerAdapter(): PaymentProviderAdapter {
  return {
    slug: "payoneer",

    supportsOffSessionRenewal() {
      return false;
    },

    async initiatePayment(input: InitiatePaymentInput): Promise<PaymentSession> {
      const list = await createPaymentList(input);

      if (list.checkoutUrl) {
        return {
          type: "redirect",
          externalRef: input.paymentId,
          redirectUrl: list.checkoutUrl,
        };
      }

      return {
        type: "widget",
        externalRef: input.paymentId,
        widgetConfig: {
          elementId: "payoneer-checkout-widget",
          listUrl: list.listUrl,
          listId: list.listId,
          payButtonId: "payoneer-pay-btn",
          payButtonContainerId: "payoneer-pay-btn-container",
        },
      };
    },

    async checkPaymentStatus(externalRef: string): Promise<PaymentStatusResult> {
      const { programId, apiBase } = getPayoneerConfig();
      const token = await getAccessToken();

      const res = await fetch(
        `${apiBase}/programs/${programId}/paymentlists/${externalRef}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = await res.json() as Record<string, unknown>;
      if (!res.ok) {
        throw new Error(`Payoneer status check failed (${res.status})`);
      }

      return {
        status: mapPayoneerWebhookStatus(data),
        providerPayload: data,
      };
    },

    async handleWebhook(rawBody: string, headers: Headers): Promise<WebhookEvent> {
      await verifyWebhookSignature(rawBody, headers);

      const payload = JSON.parse(rawBody) as Record<string, unknown>;
      const externalRef = extractPayoneerWebhookRef(payload);
      if (!externalRef) {
        throw new Error("Payoneer webhook missing payment reference");
      }

      return {
        externalRef,
        status: mapPayoneerWebhookStatus(payload),
        providerPayload: payload,
      };
    },
  };
}
