import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import heroVideoUrl from "@/assets/videos/video_hero.mp4";

interface HeroProps {
  hasProgress: boolean;
}

/**
 * Section hero de la landing Mezes Academy.
 * Fond : vid\u00e9o en autoplay / muet / boucle + overlays pour contraste.
 */
export function Hero({ hasProgress }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <HeroBackdrop />

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-28 md:pt-32 md:pb-40">
        <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-accent-2 mb-5 flex items-center gap-2">
          <span className="inline-block w-6 h-px bg-accent-2/60" />
          <i className="fa-solid fa-graduation-cap" />
          Mezes Academy
        </div>

        <h1 className="text-[2.6rem] md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-4xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)]">
          Apprends à coder,
          <br />
          <span className="bg-gradient-to-r from-accent-2 via-brand-intro to-brand-eco bg-clip-text text-transparent">
            sérieusement.
          </span>
        </h1>

        <p className="mt-7 text-[17px] md:text-lg text-fg-2 font-serif leading-relaxed max-w-2xl drop-shadow-[0_1px_10px_rgba(0,0,0,0.35)]">
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
      <span className="w-7 h-7 rounded-lg border-base bg-bg-2/70 backdrop-blur flex items-center justify-center">
        <i className={`fa-solid ${icon} text-accent-2 text-[12px]`} />
      </span>
      {text}
    </div>
  );
}

/**
 * Fond animé du hero.
 * - Vidéo autoplay muet en `cover`, désactivée pour les utilisateurs qui
 *   ont activé la réduction des animations (respect de prefers-reduced-motion).
 * - Dégradé sombre pour assurer le contraste du texte.
 * - Gradient d'accent + grille de code pour ne pas perdre l'identité visuelle.
 */
function HeroBackdrop() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      aria-hidden
    >
      {/* Vidéo de fond */}
      <video
        src={heroVideoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
      />

      {/* Voile sombre pour lisibilité du texte (plus dense en bas) */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/55 to-bg/95" />

      {/* Gradient radial accent violet */}
      <div
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-50 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgb(108 99 255 / 0.45) 0%, rgb(77 163 255 / 0.25) 35%, transparent 65%)",
        }}
      />

      {/* Grille de code en pointillés (discrète) */}
      <div
        className="absolute inset-0 opacity-[0.06]"
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

      {/* Fine ligne d'accent en bas de section */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </div>
  );
}
