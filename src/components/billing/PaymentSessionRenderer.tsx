import { useEffect, useRef } from "react";
import { Smartphone, ExternalLink, CreditCard } from "lucide-react";
import type { PaymentSession } from "@/types/billing";
import { useT } from "@/i18n/useT";

const WIDGET_ELEMENT_ID = "payoneer-checkout-widget";
const PAY_BUTTON_ID = "payoneer-pay-btn";
const PAY_BUTTON_CONTAINER_ID = "payoneer-pay-btn-container";

interface PaymentSessionRendererProps {
  session: PaymentSession;
}

export function PaymentSessionRenderer({ session }: PaymentSessionRendererProps) {
  const t = useT();
  const widgetMounted = useRef(false);

  useEffect(() => {
    if (session.type === "redirect" && session.redirectUrl) {
      window.location.href = session.redirectUrl;
    }
  }, [session]);

  useEffect(() => {
    if (session.type !== "widget" || !session.widgetConfig || widgetMounted.current) {
      return;
    }

    widgetMounted.current = true;

    async function mountWidget() {
      const { checkoutList } = await import("@payoneer/op-payment-widget-v3");
      const config = session.widgetConfig ?? {};

      checkoutList(String(config.elementId ?? WIDGET_ELEMENT_ID), {
        listUrl: String(config.listUrl ?? ""),
        listId: String(config.listId ?? ""),
        payButton: String(config.payButtonId ?? PAY_BUTTON_ID),
        payButtonContainer: String(config.payButtonContainerId ?? PAY_BUTTON_CONTAINER_ID),
        onBeforeCharge: async () => true,
        onBeforeServerError: () => undefined,
      });
    }

    void mountWidget();
  }, [session]);

  if (session.type === "redirect") {
    return (
      <div className="rounded-xl border border-white/10 bg-bg-2 p-6 text-center">
        <ExternalLink className="mx-auto mb-3 text-accent-2" size={24} />
        <p className="text-sm text-fg-2">{t("billing.checkout.redirecting")}</p>
      </div>
    );
  }

  if (session.type === "push") {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
        <Smartphone className="mx-auto mb-3 text-accent-2" size={28} />
        <p className="text-sm font-medium text-fg">
          {session.userMessage ?? t("billing.checkout.pushDefault")}
        </p>
        <p className="mt-2 text-[13px] text-fg-2">
          {t("billing.checkout.pushHint")}
        </p>
      </div>
    );
  }

  if (session.type === "widget") {
    const elementId = String(session.widgetConfig?.elementId ?? WIDGET_ELEMENT_ID);
    const payButtonId = String(session.widgetConfig?.payButtonId ?? PAY_BUTTON_ID);
    const payButtonContainerId = String(
      session.widgetConfig?.payButtonContainerId ?? PAY_BUTTON_CONTAINER_ID,
    );

    return (
      <div className="rounded-xl border border-white/10 bg-bg-2 p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-fg">
          <CreditCard size={18} className="text-accent-2" />
          <span>{t("billing.checkout.widgetTitle")}</span>
        </div>
        <div id={elementId} />
        <div id={payButtonContainerId} className="mt-4">
          <button
            id={payButtonId}
            type="button"
            className="w-full rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg"
          >
            {t("billing.checkout.payNow")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-bg-2 p-6 text-center text-sm text-fg-2">
      {t("billing.checkout.widgetPending")}
    </div>
  );
}
