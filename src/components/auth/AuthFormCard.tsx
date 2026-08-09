import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MezesLogo } from "@/components/ui/MezesLogo";
import { Divider } from "@/components/ui/Divider";
import { useAuth, type OAuthProvider } from "@/hooks/useAuth";
import { useLocale } from "@/i18n/LocaleProvider";
import { useLocalePath } from "@/i18n/useLocalePath";
import { useT } from "@/i18n/useT";
import { humanizeAuthError } from "@/lib/authErrors";
import { AuthModeSwitcher, type AuthMode } from "./AuthModeSwitcher";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { OAuthProviders } from "./OAuthProviders";
import {
  EmailPasswordForm,
  type EmailPasswordValues,
} from "./EmailPasswordForm";

export interface AuthFormCardProps {
  /** URL to redirect to once the user is authenticated. */
  nextPath: string;
  /** Active tab : owned by the parent so siblings (e.g. benefits copy) stay in sync. */
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  /** `forgot` = email-only recovery request. Default: credentials. */
  view?: "credentials" | "forgot";
  /** Banner after successful password reset. */
  resetSuccess?: boolean;
  /** Toggle OAuth providers section. Default: `true`. */
  showOAuthProviders?: boolean;
}

/**
 * Self-contained authentication card: OAuth providers, mode switcher, and
 * email/password form (or forgot-password panel).
 */
export function AuthFormCard({
  nextPath,
  mode,
  onModeChange,
  view = "credentials",
  resetSuccess = false,
  showOAuthProviders = true,
}: AuthFormCardProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lp = useLocalePath();
  const t = useT();
  const { messages } = useLocale();
  const { signIn, signUp, signInWithProvider, requestPasswordReset } =
    useAuth();

  const [oauthBusy, setOauthBusy] = useState<OAuthProvider | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(
    resetSuccess ? t("auth.resetSuccess") : null,
  );

  function switchMode(next: AuthMode) {
    onModeChange(next);
    setError(null);
    const params = new URLSearchParams(searchParams);
    params.delete("reset");
    if (next === "register") params.set("mode", "register");
    else params.delete("mode");
    const q = params.toString();
    navigate(`${lp("/auth")}${q ? `?${q}` : ""}`, { replace: true });
  }

  function goForgot() {
    setError(null);
    setInfo(null);
    const params = new URLSearchParams();
    params.set("mode", "forgot");
    if (nextPath && nextPath !== lp("/react")) {
      params.set("next", nextPath);
    }
    navigate(`${lp("/auth")}?${params.toString()}`);
  }

  function goLogin() {
    setError(null);
    setInfo(null);
    onModeChange("login");
    const params = new URLSearchParams();
    if (nextPath && nextPath !== lp("/react")) {
      params.set("next", nextPath);
    }
    const q = params.toString();
    navigate(`${lp("/auth")}${q ? `?${q}` : ""}`);
  }

  async function onSubmit(values: EmailPasswordValues) {
    setError(null);
    setInfo(null);
    try {
      if (mode === "login") {
        await signIn(values.email, values.password);
        navigate(nextPath, { replace: true });
      } else {
        await signUp({
          email: values.email,
          password: values.password,
          fullName: values.fullName ?? "",
        });
        setInfo(t("auth.accountCreated"));
        onModeChange("login");
      }
    } catch (err) {
      setError(humanizeAuthError((err as Error).message, messages));
    }
  }

  async function onForgotSubmit(email: string) {
    setError(null);
    setInfo(null);
    const redirectTo = `${window.location.origin}${lp("/reset-password")}`;
    try {
      await requestPasswordReset(email, redirectTo);
      setInfo(t("auth.forgotSent"));
    } catch (err) {
      const raw = (err as Error).message;
      const lower = raw.toLowerCase();
      // ponytail: avoid email enumeration — only surface rate-limit / config
      if (lower.includes("rate limit") || lower.includes("supabase n'est pas")) {
        setError(humanizeAuthError(raw, messages));
      } else {
        setInfo(t("auth.forgotSent"));
      }
    }
  }

  async function onOAuthClick(provider: OAuthProvider) {
    setError(null);
    setInfo(null);
    setOauthBusy(provider);
    try {
      const defaultNext = lp("/react");
      const suffix =
        nextPath && nextPath !== defaultNext && nextPath !== "/react"
          ? `?next=${encodeURIComponent(nextPath)}`
          : "";
      const redirectTo = `${window.location.origin}${lp("/auth")}${suffix}`;
      await signInWithProvider(provider, { redirectTo });
    } catch (err) {
      setError(humanizeAuthError((err as Error).message, messages));
      setOauthBusy(null);
    }
  }

  const headerLabel =
    view === "forgot"
      ? t("auth.forgotTitle")
      : mode === "login"
        ? t("nav.signIn")
        : t("nav.register");

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-md rounded-2xl border-base bg-bg-2 p-6 sm:p-7 shadow-soft">
        <div className="flex items-center justify-between">
          <MezesLogo size={26} showText />
          <span className="text-[11px] font-mono uppercase tracking-wider text-fg-3">
            {headerLabel}
          </span>
        </div>

        {view === "forgot" ? (
          <div className="mt-5">
            <ForgotPasswordForm
              onSubmit={onForgotSubmit}
              onBack={goLogin}
              error={error}
              info={info}
            />
          </div>
        ) : (
          <>
            {showOAuthProviders && (
              <>
                <div className="mt-5">
                  <OAuthProviders
                    busyProvider={oauthBusy}
                    disabled={false}
                    onSelect={onOAuthClick}
                  />
                </div>

                <Divider label={t("auth.orWithEmail")} className="my-5" />
              </>
            )}

            {!showOAuthProviders && <div className="mt-5" />}

            <AuthModeSwitcher
              mode={mode}
              onChange={switchMode}
              className="mb-5"
            />

            <EmailPasswordForm
              mode={mode}
              onSubmit={onSubmit}
              onSwitchMode={switchMode}
              onForgot={mode === "login" ? goForgot : undefined}
              disabled={oauthBusy !== null}
              error={error}
              info={info}
            />
          </>
        )}
      </div>

      <p className="mt-4 text-center text-[11px] text-fg-3 max-w-md mx-auto">
        {t("auth.legal")}
      </p>
    </section>
  );
}
