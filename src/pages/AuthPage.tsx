import { useMemo, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { AuthBenefits } from "@/components/auth/AuthBenefits";
import { AuthFormCard } from "@/components/auth/AuthFormCard";
import type { AuthMode } from "@/components/auth/AuthModeSwitcher";
import { useAuth } from "@/hooks/useAuth";

/**
 * Entry route for authentication. Pure shell:
 * - reads `?next=` and `?mode=` from the URL,
 * - redirects signed-in users to their destination,
 * - renders the page background + benefits column + form card.
 *
 * Form fields + async auth live in `<AuthFormCard />`; the login/register tab
 * is lifted here so `<AuthBenefits />` stays in sync with the switcher.
 */
export function AuthPage() {
  const [searchParams] = useSearchParams();
  const { configured, user, loading } = useAuth();

  const nextPath = useMemo(
    () => searchParams.get("next") || "/react",
    [searchParams],
  );
  const [mode, setMode] = useState<AuthMode>(() =>
    searchParams.get("mode") === "register" ? "register" : "login",
  );

  if (!configured) {
    return <ConfigurationRequired />;
  }

  if (!loading && user) {
    return <Navigate to={nextPath} replace />;
  }

  return (
    <div className="relative overflow-hidden">
      <PageBackground />

      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <AuthBenefits mode={mode} />
          <AuthFormCard nextPath={nextPath} mode={mode} onModeChange={setMode} />
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
      className="absolute inset-0 -z-10 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(1200px 600px at 15% 10%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(900px 500px at 90% 20%, rgba(236,72,153,0.14), transparent 60%), radial-gradient(800px 500px at 50% 100%, rgba(16,185,129,0.12), transparent 60%)",
      }}
    />
  );
}

function ConfigurationRequired() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="rounded-2xl border-base bg-bg-2 p-6">
        <h1 className="text-2xl font-bold">Configuration requise</h1>
        <p className="mt-2 text-sm text-fg-2 leading-relaxed">
          L'authentification n'est pas encore disponible : l'administrateur
          doit terminer la configuration du backend. Réessaie plus tard ou
          contacte l'équipe.
        </p>
      </div>
    </div>
  );
}
