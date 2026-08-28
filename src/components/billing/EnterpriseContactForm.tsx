import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { submitEnterpriseQuote } from "@/hooks/useOrganization";
import { useT } from "@/i18n/useT";
import { cn } from "@/lib/utils";

const fieldClass = cn(
  "w-full min-h-10 rounded-lg border border-white/10 bg-bg-3 px-3 text-sm text-fg",
  "placeholder:text-fg-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
);

interface EnterpriseContactFormProps {
  defaultSeats?: number;
}

export function EnterpriseContactForm({
  defaultSeats = 10,
}: EnterpriseContactFormProps) {
  const t = useT();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [seatCount, setSeatCount] = useState(defaultSeats);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await submitEnterpriseQuote({
      companyName: companyName.trim(),
      email: email.trim(),
      seatCount,
      message: message.trim(),
    });

    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
        {t("billing.enterprise.quoteSent")}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-3">
      <p className="text-[13px] text-fg-2">{t("billing.enterprise.quoteHint")}</p>
      <input
        className={fieldClass}
        placeholder={t("billing.enterprise.companyName")}
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        required
      />
      <input
        type="email"
        className={fieldClass}
        placeholder={t("billing.enterprise.email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="number"
        min={10}
        className={fieldClass}
        value={seatCount}
        onChange={(e) => setSeatCount(Number(e.target.value))}
        required
      />
      <textarea
        className={cn(fieldClass, "min-h-24 py-2")}
        placeholder={t("billing.enterprise.message")}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {t("billing.enterprise.quoteSubmit")}
      </Button>
    </form>
  );
}
