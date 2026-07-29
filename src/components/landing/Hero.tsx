import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import heroVideoUrl from "@/assets/videos/video_hero.mp4";

interface HeroProps {
  hasProgress: boolean;
}

/**
 * Mezes Academy landing hero section.
 * Background: autoplay / muted / loop video with contrast overlays.
 */
export function Hero({ hasProgress }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <HeroBackdrop />

      <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-brand-core dark:text-accent-2 mb-5 flex items-center gap-2">
          <span className="inline-block w-6 h-px bg-brand-core/60 dark:bg-accent-2/60" />
          <i className="fa-solid fa-graduation-cap" />
          Mezes Academy
        </div>

        <h1 className="text-[2.6rem] md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-4xl text-slate-950 dark:text-fg">
          Apprends à coder,
          <br />
          <span className="text-accent-2">sérieusement.</span>
        </h1>

        <p className="mt-7 text-[17px] md:text-lg text-slate-50 dark:text-fg-2 leading-relaxed max-w-2xl">
          Mezes Academy propose des parcours en ligne pour développeurs et
          développeuses qui veulent progresser en autonomie. Chaque concept est
          expliqué, pratiqué dans le navigateur, puis validé par un quiz avant
          de passer à la suite. Ta progression est sauvegardée : tu reprends
          exactement où tu t&apos;étais arrêté.
        </p>

        <div className="mt-10 flex flex-wrap items-center text-slate-50 gap-3">
          <Link to="/react">
            <Button size="md">
              {hasProgress ? "Continuer React" : "Commencer par React"}
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/secure-vibe-coding">
            <Button
              variant="ghost"
              size="md"
              className="border border-violet-500/40 text-slate-50 dark:text-fg hover:text-slate-950 dark:hover:text-fg3"
            >
              <i className="fa-solid fa-shield-halved text-violet-400" />
              Découvrir Secure Vibe Coding
            </Button>
          </Link>
          <a href="#catalog">
            <Button variant="ghost" className="border border-slate dark:border-base text-slate-50 dark:text-fg hover:text-slate-950 dark:hover:text-fg3">Voir le catalogue</Button>
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Hero background: muted video + contrast overlay + subtle grid.
 * Respects prefers-reduced-motion (video hidden).
 */
function HeroBackdrop() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      aria-hidden
    >
      {/* Background video */}
      <video
        src={heroVideoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
      />

      {/* Adaptive overlay: light in light mode, dark in dark mode for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-white/50 to-white/82 dark:from-bg/70 dark:via-bg/55 dark:to-bg/95" />

      {/* Dotted code grid (subtle) */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,30,55,0.26) 1px, transparent 1px), linear-gradient(90deg, rgba(20,30,55,0.26) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block opacity-[0.06]"
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
