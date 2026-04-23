import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MezesLogo } from "@/components/ui/MezesLogo";
import { Divider } from "@/components/ui/Divider";
import { useAuth, type OAuthProvider } from "@/hooks/useAuth";
import { humanizeAuthError } from "@/lib/authErrors";
import { AuthModeSwitcher, type AuthMode } from "./AuthModeSwitcher";
import { OAuthProviders } from "./OAuthProviders";
import {
  EmailPasswordForm,
  type EmailPasswordValues,
} from "./EmailPasswordForm";

export interface AuthFormCardProps {
  /** URL to redirect to once the user is authenticated. */
  nextPath: string;
  /** Active tab — owned by the parent so siblings (e.g. benefits copy) stay in sync. */
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  /** Toggle OAuth providers section. Default: `true`. */
  showOAuthProviders?: boolean;
}

/**
 * Self-contained authentication card: OAuth providers, mode switcher, and
 * email/password form. Manages its own async state and translates backend
 * errors into user-friendly messages.
 *
 * The parent (e.g. `AuthPage`) is responsible for routing/guards only.
 */
export function AuthFormCard({
  nextPath,
  mode,
  onModeChange,
  showOAuthProviders = true,
}: AuthFormCardProps) {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithProvider } = useAuth();

  const [oauthBusy, setOauthBusy] = useState<OAuthProvider | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  function switchMode(next: AuthMode) {
    onModeChange(next);
    setError(null);
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
        setInfo(
          "Compte créé. Si la validation par email est activée, ouvre le lien reçu puis connecte-toi.",
        );
        onModeChange("login");
      }
    } catch (err) {
      setError(humanizeAuthError((err as Error).message));
    }
  }

  async function onOAuthClick(provider: OAuthProvider) {
    setError(null);
    setInfo(null);
    setOauthBusy(provider);
    try {
      const suffix =
        nextPath && nextPath !== "/react"
          ? `?next=${encodeURIComponent(nextPath)}`
          : "";
      const redirectTo = `${window.location.origin}/auth${suffix}`;
      await signInWithProvider(provider, { redirectTo });
      // Browser redirect happens on success; if we're still here, something
      // unusual happened — reset UI state for safety.
    } catch (err) {
      setError(humanizeAuthError((err as Error).message));
      setOauthBusy(null);
    }
  }

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-md rounded-2xl border-base bg-bg-2/90 p-6 sm:p-7 shadow-soft backdrop-blur-md">
        <div className="flex items-center justify-between">
          <MezesLogo size={26} showText />
          <span className="text-[11px] font-mono uppercase tracking-wider text-fg-3">
            {mode === "login" ? "Connexion" : "Inscription"}
          </span>
        </div>

        {showOAuthProviders && (
          <>
            <div className="mt-5">
              <OAuthProviders
                busyProvider={oauthBusy}
                disabled={false}
                onSelect={onOAuthClick}
              />
            </div>

            <Divider label="ou avec ton email" className="my-5" />
          </>
        )}

        {!showOAuthProviders && <div className="mt-5" />}

        <AuthModeSwitcher mode={mode} onChange={switchMode} className="mb-5" />

        <EmailPasswordForm
          mode={mode}
          onSubmit={onSubmit}
          onSwitchMode={switchMode}
          disabled={oauthBusy !== null}
          error={error}
          info={info}
        />
      </div>

      <p className="mt-4 text-center text-[11px] text-fg-3 max-w-md mx-auto">
        En continuant, tu acceptes un usage responsable de la plateforme. Tes
        données ne sont jamais partagées avec des tiers.
      </p>
    </section>
  );
}
