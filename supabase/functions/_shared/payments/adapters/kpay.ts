import type {
  InitiatePaymentInput,
  PaymentProviderAdapter,
  PaymentSession,
  PaymentStatusResult,
  WebhookEvent,
} from "../types.ts";
import {
  buildKPayPayPayload,
  extractKPayWebhookRef,
  mapKPayWebhookStatus,
} from "../kpay-mapping.ts";

function getKPayConfig() {
  const apiKey = Deno.env.get("KPAY_API_KEY");
  const username = Deno.env.get("KPAY_USERNAME");
  const password = Deno.env.get("KPAY_PASSWORD");
  const retailerId = Deno.env.get("KPAY_RETAILER_ID");
  const apiUrl = Deno.env.get("KPAY_API_URL") ?? "https://pay.esicia.com/";

  if (!apiKey || !username || !password || !retailerId) {
    throw new Error("KPay credentials are not configured");
  }

  return { apiKey, username, password, retailerId, apiUrl };
}

async function kpayRequest(
  body: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const { apiKey, username, password, apiUrl } = getKPayConfig();
  const auth = btoa(`${username}:${password}`);

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Kpay-Key": apiKey,
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let data: Record<string, unknown> = {};
  try {
    data = text ? (JSON.parse(text) as Record<string, unknown>) : {};
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    throw new Error(
      typeof data.message === "string"
        ? data.message
        : `KPay request failed (${res.status})`,
    );
  }

  return data;
}

export function createKPayAdapter(methodSlug = "kpay_momo"): PaymentProviderAdapter {
  return {
    slug: "kpay",

    supportsOffSessionRenewal() {
      return false;
    },

    async initiatePayment(input: InitiatePaymentInput): Promise<PaymentSession> {
      const { retailerId } = getKPayConfig();
      const slug =
        typeof input.methodConfig.methodSlug === "string"
          ? input.methodConfig.methodSlug
          : methodSlug;
      const msisdn =
        typeof input.methodConfig.msisdn === "string"
          ? input.methodConfig.msisdn
          : "";
      const phonePrefix =
        typeof input.methodConfig.phonePrefix === "string"
          ? input.methodConfig.phonePrefix
          : undefined;

      if (slug === "kpay_momo" && !msisdn) {
        throw new Error("Mobile number is required for Mobile Money");
      }

      const payload = buildKPayPayPayload({
        paymentId: input.paymentId,
        amount: input.amountCents,
        currency: input.currency,
        email: input.customerEmail,
        customerName: input.customerName,
        description: input.description,
        methodSlug: slug,
        msisdn: msisdn || input.customerEmail,
        phonePrefix,
        retailerId,
        returl: input.webhookUrl,
        redirecturl: input.returnUrl,
      });

      await kpayRequest(payload as unknown as Record<string, unknown>);

      return {
        type: "push",
        externalRef: input.paymentId,
        userMessage:
          "Confirmez le paiement sur votre téléphone. Nous activerons votre accès dès confirmation.",
      };
    },

    async checkPaymentStatus(externalRef: string): Promise<PaymentStatusResult> {
      const { retailerId } = getKPayConfig();
      const data = await kpayRequest({
        action: "check",
        refid: externalRef,
        retailerid: retailerId,
      });

      return {
        status: mapKPayWebhookStatus(data),
        providerPayload: data,
      };
    },

    async handleWebhook(rawBody: string, _headers: Headers): Promise<WebhookEvent> {
      const payload = JSON.parse(rawBody) as Record<string, unknown>;
      const externalRef = extractKPayWebhookRef(payload);
      if (!externalRef) {
        throw new Error("KPay webhook missing payment reference");
      }

      return {
        externalRef,
        status: mapKPayWebhookStatus(payload),
        providerPayload: payload,
      };
    },
  };
}
