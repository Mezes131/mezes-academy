import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import { MezesLogo } from "@/components/ui/MezesLogo";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading, configured } = useAuth();
  const location = useLocation();

  if (!configured) {
    return <NotConfigured />;
  }

  if (loading) {
    return <SessionLoading />;
  }

  if (!user) {
    const next = `${location.pathname}${location.search}`;
    return <Navigate to={`/auth?next=${encodeURIComponent(next)}`} replace />;
  }

  return <>{children}</>;
}

/* ─── Loading screen ─────────────────────────────────────────── */

function SessionLoading() {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(() => {
      setElapsedMs(Date.now() - start);
    }, 500);
    return () => window.clearInterval(id);
  }, []);

  const slow = elapsedMs > 3500;

  return (
    <div className="relative min-h-[80vh] grid place-items-center px-6 overflow-hidden">
      {/* Soft decorative gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(800px 400px at 50% 20%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(600px 400px at 50% 80%, rgba(236,72,153,0.12), transparent 60%)",
        }}
      />

      <div className="w-full max-w-md rounded-2xl border-base bg-bg-2/80 backdrop-blur-md p-8 shadow-soft flex flex-col items-center text-center animate-fade-in">
        <MezesLogo size={36} showText />

        <div className="mt-6 relative w-14 h-14 grid place-items-center">
          <div className="absolute inset-0 rounded-full border border-base/60" />
          <Loader2
            size={28}
            className="text-accent-2 animate-spin"
            strokeWidth={2.4}
          />
        </div>

        <h2 className="mt-5 text-base font-semibold tracking-tight">
          Préparation de ton espace…
        </h2>
        <p className="mt-1.5 text-[13px] text-fg-2 leading-relaxed max-w-sm">
          On vérifie ta session et on synchronise ta progression.
        </p>

        {slow && <SlowHint />}
      </div>
    </div>
  );
}

function SlowHint() {
  return (
    <div className="mt-6 w-full rounded-xl border border-amber-500/30 bg-amber-500/5 text-left p-3 animate-fade-in">
      <div className="flex items-start gap-2.5">
        <AlertTriangle
          size={14}
          className="text-amber-400 mt-0.5 flex-shrink-0"
        />
        <div className="flex-1">
          <div className="text-[13px] font-semibold text-amber-200">
            Ça prend un peu plus de temps que d&apos;habitude
          </div>
          <p className="mt-1 text-[12px] text-fg-2 leading-relaxed">
            Vérifie ta connexion, puis recharge la page. Si le problème persiste,
            réessaie dans quelques instants.
          </p>
          <Button
            size="sm"
            variant="ghost"
            className="mt-3"
            leftIcon={<RefreshCw size={13} />}
            onClick={() => window.location.reload()}
          >
            Recharger la page
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Not configured screen ──────────────────────────────────── */

function NotConfigured() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-6">
      <div className="max-w-xl rounded-2xl border-base bg-bg-2 p-6">
        <h1 className="text-xl font-bold mb-2">Service temporairement indisponible</h1>
        <p className="text-sm text-fg-2 leading-relaxed">
          L&apos;authentification n&apos;est pas encore disponible. L&apos;administrateur doit
          terminer la configuration du backend. Réessaie dans quelques minutes.
        </p>
      </div>
    </div>
  );
}
