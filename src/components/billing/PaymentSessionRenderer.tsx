import { useEffect } from "react";
import { Smartphone, ExternalLink } from "lucide-react";
import type { PaymentSession } from "@/types/billing";
import { useT } from "@/i18n/useT";

interface PaymentSessionRendererProps {
  session: PaymentSession;
}

export function PaymentSessionRenderer({ session }: PaymentSessionRendererProps) {
  const t = useT();

  useEffect(() => {
    if (session.type === "redirect" && session.redirectUrl) {
      window.location.href = session.redirectUrl;
    }
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

  return (
    <div className="rounded-xl border border-white/10 bg-bg-2 p-6 text-center text-sm text-fg-2">
      {t("billing.checkout.widgetPending")}
    </div>
  );
}
