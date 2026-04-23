import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { AuthMode } from "./AuthModeSwitcher";

export interface EmailPasswordValues {
  email: string;
  password: string;
  /** Only required in `register` mode. */
  fullName?: string;
}

interface EmailPasswordFormProps {
  mode: AuthMode;
  onSubmit: (values: EmailPasswordValues) => Promise<void>;
  onSwitchMode: (mode: AuthMode) => void;
  /** Disable inputs + submit (e.g. while an OAuth redirect is in flight). */
  disabled?: boolean;
  /** Error surfaced at the bottom of the form. */
  error?: string | null;
  /** Non-error status message (e.g. account created). */
  info?: string | null;
}

/**
 * Email + password credentials form. Handles its own local state (fields +
 * submitting + show-password toggle) and delegates the async operation via
 * `onSubmit`. Parent is responsible for translating provider errors into
 * the `error` prop.
 */
export function EmailPasswordForm({
  mode,
  onSubmit,
  onSwitchMode,
  disabled = false,
  error,
  info,
}: EmailPasswordFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Reset the password field whenever the parent switches mode, to avoid
  // accidentally submitting the login password as a new password.
  useEffect(() => {
    setPassword("");
  }, [mode]);

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || disabled) return;

    setSubmitting(true);
    try {
      await onSubmit({
        email: email.trim(),
        password,
        fullName: mode === "register" ? fullName.trim() : undefined,
      });
    } finally {
      setSubmitting(false);
    }
  }

  const allDisabled = disabled || submitting;

  return (
    <form onSubmit={onFormSubmit} className="space-y-3.5">
      {mode === "register" && (
        <Field
          label="Nom complet"
          icon={<UserIcon size={14} />}
          htmlFor="auth-fullname"
        >
          <input
            id="auth-fullname"
            className={inputClass}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            minLength={2}
            autoComplete="name"
            placeholder="Ex: Ada Lovelace"
            disabled={allDisabled}
          />
        </Field>
      )}

      <Field label="Email" icon={<Mail size={14} />} htmlFor="auth-email">
        <input
          id="auth-email"
          type="email"
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete={mode === "login" ? "current-email" : "email"}
          placeholder="toi@email.com"
          disabled={allDisabled}
        />
      </Field>

      <Field
        label="Mot de passe"
        icon={<Lock size={14} />}
        htmlFor="auth-password"
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-[11px] font-mono uppercase tracking-wider text-fg-3 hover:text-fg transition inline-flex items-center gap-1"
            aria-label={
              showPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
            disabled={allDisabled}
          >
            {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
            {showPassword ? "Masquer" : "Afficher"}
          </button>
        }
      >
        <input
          id="auth-password"
          type={showPassword ? "text" : "password"}
          className={inputClass}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete={
            mode === "login" ? "current-password" : "new-password"
          }
          placeholder={mode === "login" ? "••••••••" : "6 caractères min."}
          disabled={allDisabled}
        />
      </Field>

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

      <Button
        type="submit"
        disabled={allDisabled}
        className="w-full !h-11"
      >
        {submitting ? (
          "Traitement..."
        ) : mode === "login" ? (
          <>
            Se connecter
            <ArrowRight size={14} />
          </>
        ) : (
          <>
            Créer mon compte
            <ArrowRight size={14} />
          </>
        )}
      </Button>

      <p className="text-center text-[12px] text-fg-3">
        {mode === "login" ? (
          <>
            Nouveau ici ?{" "}
            <button
              type="button"
              onClick={() => onSwitchMode("register")}
              className="text-accent-2 hover:underline underline-offset-4"
            >
              Créer un compte
            </button>
          </>
        ) : (
          <>
            Déjà inscrit ?{" "}
            <button
              type="button"
              onClick={() => onSwitchMode("login")}
              className="text-accent-2 hover:underline underline-offset-4"
            >
              Se connecter
            </button>
          </>
        )}
      </p>
    </form>
  );
}

/* ─── Internals ───────────────────────────────────────────────── */

function Field({
  label,
  icon,
  htmlFor,
  rightSlot,
  children,
}: {
  label: string;
  icon?: ReactNode;
  htmlFor: string;
  rightSlot?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label
          htmlFor={htmlFor}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-fg-3"
        >
          {icon}
          {label}
        </label>
        {rightSlot}
      </div>
      {children}
    </div>
  );
}

const inputClass = cn(
  "w-full h-10 rounded-lg border-base bg-bg-3 px-3 text-sm",
  "placeholder:text-fg-4",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
  "disabled:opacity-60 disabled:cursor-not-allowed",
);
