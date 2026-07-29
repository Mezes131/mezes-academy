import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  hasProgress: boolean;
}

/**
 * Mezes Academy landing hero.
 * LCP is the headline; video loads after idle on desktop only (8MB source).
 */
export function Hero({ hasProgress }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <HeroBackdrop />

      <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-brand-core dark:text-accent-2 mb-5 flex items-center gap-2">
          <span className="inline-block w-6 h-px bg-brand-core/60 dark:bg-accent-2/60" />
          <GraduationCap size={14} aria-hidden="true" />
          Mezes Academy
        </div>

        <h1 className="text-[2.6rem] md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-4xl text-slate-950 dark:text-fg">
          Apprends à coder,
          <br />
          <span className="text-accent-2">sérieusement.</span>
        </h1>

        <p className="mt-7 text-[17px] md:text-lg text-slate-800 dark:text-fg-2 leading-relaxed max-w-2xl">
          Mezes Academy propose des parcours en ligne pour développeurs et
          développeuses qui veulent progresser en autonomie. Chaque concept est
          expliqué, pratiqué dans le navigateur, puis validé par un quiz avant
          de passer à la suite. Ta progression est sauvegardée : tu reprends
          exactement où tu t&apos;étais arrêté.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link to="/react">
            <Button size="md">
              {hasProgress ? "Continuer React" : "Commencer par React"}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </Link>
          <Link to="/secure-vibe-coding">
            <Button
              variant="ghost"
              size="md"
              className="border border-violet-500/40 text-slate-900 dark:text-fg hover:bg-bg-3"
            >
              <Shield size={16} className="text-violet-600 dark:text-violet-400" aria-hidden="true" />
              Découvrir Secure Vibe Coding
            </Button>
          </Link>
          <a href="#catalog">
            <Button
              variant="ghost"
              className="border border-slate-400/50 dark:border-base text-slate-900 dark:text-fg hover:bg-bg-3"
            >
              Voir le catalogue
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Atmosphere first (CSS), optional deferred video.
 * Skips video when reduced-motion, Save-Data, or narrow viewports.
 */
function HeroBackdrop() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    const saveData =
      "connection" in navigator &&
      Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData,
      );
    if (reduceMotion || narrow || saveData) return;

    let cancelled = false;
    let timeoutId: number | undefined;
    let idleId: number | undefined;

    const load = () => {
      if (cancelled) return;
      setVideoSrc(`${import.meta.env.BASE_URL}videos/video_hero.mp4`);
    };

    const w = window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(load, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(load, 1200);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !videoSrc) return;
    void el.play().catch(() => {
      /* autoplay policy: overlay still readable */
    });
  }, [videoSrc]);

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden bg-bg-2"
      aria-hidden
    >
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/60 to-white/88 dark:from-bg/75 dark:via-bg/60 dark:to-bg/95" />

      <div
        className="absolute inset-0 opacity-[0.06] dark:hidden"
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

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </div>
  );
}
