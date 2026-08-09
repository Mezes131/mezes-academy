import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useT } from "@/i18n/useT";

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
  onBack: () => void;
  disabled?: boolean;
  error?: string | null;
  info?: string | null;
}

export function ForgotPasswordForm({
  onSubmit,
  onBack,
  disabled = false,
  error,
  info,
}: ForgotPasswordFormProps) {
  const t = useT();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || disabled) return;
    setSubmitting(true);
    try {
      await onSubmit(email.trim());
    } finally {
      setSubmitting(false);
    }
  }

  const allDisabled = disabled || submitting;

  return (
    <form onSubmit={onFormSubmit} className="space-y-3.5">
      <p className="text-[13px] text-fg-2 leading-relaxed">{t("auth.forgotBody")}</p>

      <label className="block space-y-1.5" htmlFor="forgot-email">
        <span className="text-[12px] font-medium text-fg-2">{t("auth.email")}</span>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-3">
            <Mail size={14} />
          </span>
          <input
            id="forgot-email"
            type="email"
            className="w-full h-11 rounded-xl border-base bg-bg pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-accent/40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder={t("auth.emailPlaceholder")}
            disabled={allDisabled}
          />
        </div>
      </label>

      {error && (
        <p
          role="alert"
          className="text-[13px] rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 px-3 py-2"
        >
          {error}
        </p>
      )}
      {info && (
        <p
          role="status"
          className="text-[13px] rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 px-3 py-2"
        >
          {info}
        </p>
      )}

      <Button type="submit" disabled={allDisabled} className="w-full !h-11">
        {submitting ? (
          t("common.processing")
        ) : (
          <>
            {t("auth.forgotSubmit")}
            <ArrowRight size={14} />
          </>
        )}
      </Button>

      <p className="text-center text-[12px] text-fg-3">
        <button
          type="button"
          onClick={onBack}
          className="text-accent-2 hover:underline underline-offset-4"
          disabled={allDisabled}
        >
          {t("auth.backToSignIn")}
        </button>
      </p>
    </form>
  );
}
