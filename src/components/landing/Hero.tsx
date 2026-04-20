import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  hasProgress: boolean;
}

/**
 * Section hero de la landing Mezes Academy.
 * Affiche le slogan principal, les deux CTAs, et une liste de points rapides.
 * L'arrière-plan (gradient radial + grille) est délégué à <HeroBackdrop />.
 */
export function Hero({ hasProgress }: HeroProps) {
  return (
    <section className="relative">
      <HeroBackdrop />

      <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-accent-2 mb-5 flex items-center gap-2">
          <span className="inline-block w-6 h-px bg-accent-2/60" />
          <i className="fa-solid fa-graduation-cap" />
          Mezes Academy
        </div>

        <h1 className="text-[2.6rem] md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-4xl">
          Apprends à coder,
          <br />
          <span className="bg-gradient-to-r from-accent-2 via-brand-intro to-brand-eco bg-clip-text text-transparent">
            sérieusement.
          </span>
        </h1>

        <p className="mt-7 text-[17px] md:text-lg text-fg-2 font-serif leading-relaxed max-w-2xl">
          Mezes Academy propose des parcours en ligne pour développeurs et
          développeuses qui veulent progresser en autonomie. Des leçons
          structurées, des exercices qui s'exécutent dans ton navigateur, et un
          suivi de progression sauvegardé — sans abonnement, sans distraction.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link to="/react">
            <Button size="md">
              {hasProgress ? "Continuer React" : "Commencer par React"}
              <ArrowRight size={16} />
            </Button>
          </Link>
          <a href="#catalog">
            <Button variant="ghost">Voir le catalogue</Button>
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
          <QuickPoint icon="fa-check-double" text="100% gratuit" />
          <QuickPoint icon="fa-infinity" text="Accès illimité" />
          <QuickPoint icon="fa-laptop-code" text="Exercices live" />
          <QuickPoint icon="fa-chart-line" text="Progression suivie" />
        </div>
      </div>
    </section>
  );
}

/* ─── Sous-composants privés ─────────────────────────────────── */

function QuickPoint({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 text-[13px] text-fg-2">
      <span className="w-7 h-7 rounded-lg border-base bg-bg-2 flex items-center justify-center">
        <i className={`fa-solid ${icon} text-accent-2 text-[12px]`} />
      </span>
      {text}
    </div>
  );
}

function HeroBackdrop() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      aria-hidden
    >
      {/* Gradient radial accent */}
      <div
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgb(108 99 255 / 0.45) 0%, rgb(77 163 255 / 0.20) 35%, transparent 65%)",
        }}
      />
      {/* Grille de code en pointillés */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)",
        }}
      />
      {/* Chevron accent bas */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </div>
  );
}
