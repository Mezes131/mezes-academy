import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { MezesLogo } from "@/components/ui/MezesLogo";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/i18n/LocaleProvider";
import { useLocalePath } from "@/i18n/useLocalePath";
import { useT } from "@/i18n/useT";
import { humanizeAuthError } from "@/lib/authErrors";

/**
 * Landing from Supabase recovery email. Session is established via URL tokens
 * (`detectSessionInUrl`); then `updateUser({ password })`.
 */
export function ResetPasswordPage() {
  const t = useT();
  const lp = useLocalePath();
  const navigate = useNavigate();
  const { messages } = useLocale();
  const { configured, user, loading, updatePassword, signOut } = useAuth();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!configured) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="rounded-2xl border-base bg-bg-2 p-6">
          <h1 className="text-2xl font-bold">{t("auth.unavailableTitle")}</h1>
          <p className="mt-2 text-sm text-fg-2 leading-relaxed">
            {t("auth.unavailableBody")}
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center text-sm text-fg-2">
        {t("auth.checkingSession")}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative overflow-hidden">
        <div className="max-w-md mx-auto px-6 py-16">
          <div className="rounded-2xl border-base bg-bg-2 p-6 sm:p-7 shadow-soft">
            <MezesLogo size={26} showText />
            <h1 className="mt-5 text-xl font-bold">{t("auth.resetTitle")}</h1>
            <p className="mt-2 text-sm text-fg-2">{t("auth.resetInvalid")}</p>
            <Link
              to={lp("/auth?mode=forgot")}
              className="mt-5 inline-flex text-sm text-accent-2 hover:underline underline-offset-4"
            >
              {t("auth.resetRequestAgain")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError(t("auth.errPasswordShort"));
      return;
    }
    if (password !== confirm) {
      setError(t("account.passwordMismatch"));
      return;
    }
    setSubmitting(true);
    try {
      await updatePassword(password);
      await signOut();
      navigate(`${lp("/auth")}?reset=ok`, { replace: true });
    } catch (err) {
      setError(humanizeAuthError((err as Error).message, messages));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none bg-bg"
      />
      <div className="max-w-md mx-auto px-6 py-12 lg:py-20">
        <div className="rounded-2xl border-base bg-bg-2 p-6 sm:p-7 shadow-soft">
          <div className="flex items-center justify-between">
            <MezesLogo size={26} showText />
            <span className="text-[11px] font-mono uppercase tracking-wider text-fg-3">
              {t("auth.resetTitle")}
            </span>
          </div>

          <p className="mt-5 text-[13px] text-fg-2 leading-relaxed">
            {t("auth.resetBody")}
          </p>

          <form onSubmit={onSubmit} className="mt-5 space-y-3.5">
            <PasswordField
              id="reset-password"
              label={t("account.newPassword")}
              value={password}
              onChange={setPassword}
              show={showPassword}
              onToggleShow={() => setShowPassword((v) => !v)}
              disabled={submitting}
              autoComplete="new-password"
            />
            <PasswordField
              id="reset-confirm"
              label={t("account.confirmPassword")}
              value={confirm}
              onChange={setConfirm}
              show={showPassword}
              onToggleShow={() => setShowPassword((v) => !v)}
              disabled={submitting}
              autoComplete="new-password"
            />

            {error && (
              <p
                role="alert"
                className="text-[13px] rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 px-3 py-2"
              >
                {error}
              </p>
            )}

            <Button type="submit" disabled={submitting} className="w-full !h-11">
              {submitting ? (
                t("common.processing")
              ) : (
                <>
                  {t("auth.resetSubmit")}
                  <ArrowRight size={14} />
                </>
              )}
            </Button>
          </form>

          <p className="mt-4 text-center text-[12px] text-fg-3">
            <Link
              to={lp("/auth")}
              className="text-accent-2 hover:underline underline-offset-4"
            >
              {t("auth.backToSignIn")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  show,
  onToggleShow,
  disabled,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggleShow: () => void;
  disabled: boolean;
  autoComplete: string;
}) {
  const t = useT();
  return (
    <label className="block space-y-1.5" htmlFor={id}>
      <span className="flex items-center justify-between text-[12px] font-medium text-fg-2">
        {label}
        <button
          type="button"
          onClick={onToggleShow}
          className="text-[11px] font-mono uppercase tracking-wider text-fg-3 hover:text-fg"
          disabled={disabled}
        >
          {show ? t("auth.hidePassword") : t("auth.showPassword")}
        </button>
      </span>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-3">
          <Lock size={14} />
        </span>
        <input
          id={id}
          type={show ? "text" : "password"}
          className="w-full h-11 rounded-xl border-base bg-bg pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-accent/40"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          minLength={6}
          autoComplete={autoComplete}
          placeholder={t("auth.passwordPlaceholderMin")}
          disabled={disabled}
        />
      </div>
    </label>
  );
}
