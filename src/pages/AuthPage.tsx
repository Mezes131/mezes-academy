import { useMemo, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { AuthBenefits } from "@/components/auth/AuthBenefits";
import { AuthFormCard } from "@/components/auth/AuthFormCard";
import type { AuthMode } from "@/components/auth/AuthModeSwitcher";
import { useAuth } from "@/hooks/useAuth";
import { useLocalePath } from "@/i18n/useLocalePath";
import { useT } from "@/i18n/useT";
import { FLAGSHIP_COURSE_PATH } from "@/lib/flagshipContinue";

/**
 * Entry route for authentication. Pure shell:
 * - reads `?next=`, `?mode=` (`login` | `register` | `forgot`), `?reset=ok`,
 * - redirects signed-in users to their destination (except forgot is signed-out),
 * - renders the page background + benefits column + form card.
 */
export function AuthPage() {
  const [searchParams] = useSearchParams();
  const { configured, user, loading } = useAuth();
  const lp = useLocalePath();

  const nextPath = useMemo(
    () => searchParams.get("next") || lp(FLAGSHIP_COURSE_PATH),
    [searchParams, lp],
  );
  const urlMode = searchParams.get("mode");
  const isForgot = urlMode === "forgot";
  const [mode, setMode] = useState<AuthMode>(() =>
    urlMode === "register" ? "register" : "login",
  );
  const resetOk = searchParams.get("reset") === "ok";

  if (!configured) {
    return <ConfigurationRequired />;
  }

  // After password reset we sign out and land with ?reset=ok (no session).
  if (!loading && user && !isForgot) {
    return <Navigate to={nextPath} replace />;
  }

  return (
    <div className="relative overflow-hidden">
      <PageBackground />

      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <AuthBenefits mode={isForgot ? "login" : mode} />
          <AuthFormCard
            nextPath={nextPath}
            mode={mode}
            onModeChange={setMode}
            view={isForgot ? "forgot" : "credentials"}
            resetSuccess={resetOk}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Local building blocks ──────────────────────────────────── */

function PageBackground() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 pointer-events-none bg-bg"
    />
  );
}

function ConfigurationRequired() {
  const t = useT();
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
