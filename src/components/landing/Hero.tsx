import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Atom, Check, GraduationCap, Shield } from "lucide-react";
import {
  FLAGSHIP_COURSE_PATH,
  REACT_COURSE_PATH,
} from "@/lib/flagshipContinue";
import { Button } from "@/components/ui/Button";
import { useThemeEffect } from "@/hooks/useThemeEffect";
import { useLocale } from "@/i18n/LocaleProvider";
import { useT } from "@/i18n/useT";
import { useLocalePath } from "@/i18n/useLocalePath";
import { cn } from "@/lib/utils";

interface HeroProps {
  hasSvcProgress: boolean;
  hasReactProgress: boolean;
}

/**
 * Mezes Academy landing hero.
 * Dark: idle video. Light: Aurora Lesson Beam (vivid mesh + live lesson preview).
 */
export function Hero({ hasSvcProgress, hasReactProgress }: HeroProps) {
  const t = useT();
  const lp = useLocalePath();
  const { theme } = useThemeEffect();
  const isLight = theme === "light";

  return (
    <section
      className={cn("relative overflow-hidden", isLight && "hero-light")}
    >
      <HeroBackdrop />

      <div
        className={cn(
          "relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:py-20",
          "lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.55fr)] lg:gap-8",
          "dark:block",
        )}
      >
        <div>
          <div className="mb-5 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-brand-core dark:text-accent-2">
            <span className="inline-block h-px w-6 bg-brand-core/60 dark:bg-accent-2/60" />
            <GraduationCap size={14} aria-hidden="true" />
            {t("landing.heroEyebrow")}
          </div>

          <h1 className="max-w-4xl text-[2.6rem] font-extrabold leading-[0.95] tracking-tight text-slate-950 dark:max-w-4xl dark:text-fg md:text-7xl lg:max-w-none">
            {t("landing.heroTitleLine1")}
            <br />
            <span className="hero-title-accent text-brand-core dark:text-accent-2">
              {t("landing.heroTitleLine2")}
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-slate-800 dark:text-fg-2 md:text-lg">
            {t("landing.heroBody")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to={lp(FLAGSHIP_COURSE_PATH)}>
              <Button size="md">
                <Shield size={16} aria-hidden="true" />
                {hasSvcProgress
                  ? t("landing.ctaSvcContinue")
                  : t("landing.ctaSvc")}
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </Link>
            <Link to={lp(REACT_COURSE_PATH)}>
              <Button
                variant="ghost"
                size="md"
                className="border border-brand-core/35 text-slate-900 hover:bg-bg-3 dark:border-violet-500/40 dark:text-fg"
              >
                <Atom
                  size={16}
                  className="text-brand-core dark:text-violet-400"
                  aria-hidden="true"
                />
                {hasReactProgress
                  ? t("landing.ctaReactContinue")
                  : t("landing.ctaReact")}
              </Button>
            </Link>
          </div>
        </div>

        <StudioChrome />
      </div>
    </section>
  );
}

function HeroBackdrop() {
  const { theme } = useThemeEffect();
  const isDark = theme === "dark";
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!isDark) {
      setVideoSrc(null);
      return;
    }

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
  }, [isDark]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !videoSrc) return;
    void el.play().catch(() => {
      /* autoplay policy */
    });
  }, [videoSrc]);

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden bg-bg-2"
      aria-hidden
    >
      {isDark && videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 hidden bg-gradient-to-b from-bg/75 via-bg/60 to-bg/95 dark:block" />

      {/* Light: Aurora Lesson Beam */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-[#f3f4fb]" />
        <div className="hero-aurora hero-aurora-core" />
        <div className="hero-aurora hero-aurora-expert" />
        <div className="hero-aurora hero-aurora-ts" />
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(40,45,100,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(40,45,100,0.22) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at 42% 30%, black 28%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 42% 30%, black 28%, transparent 72%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f3f4fb]/80" />
      </div>

      <div
        className="absolute inset-0 hidden opacity-[0.06] dark:block"
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

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-core/40 to-transparent dark:via-accent/30" />
    </div>
  );
}

type Tab = "lesson" | "exercise";

const LESSON_SRC = `function App() {
  const [n, setN] = useState(0)
  return <button onClick={() => setN(n + 1)}>{n}</button>
}`;

/**
 * Aurora Lesson Beam preview — light / lg+ only.
 * Loop: type lesson → tab to exercise → validate → reset.
 */
function StudioChrome() {
  const { locale } = useLocale();
  const labels =
    locale === "fr"
      ? { lesson: "Leçon", exercise: "Exercice", ok: "Validé", file: "App.tsx" }
      : { lesson: "Lesson", exercise: "Exercise", ok: "Passed", file: "App.tsx" };

  const [tab, setTab] = useState<Tab>("lesson");
  const [typed, setTyped] = useState("");
  const [passed, setPassed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setTyped(LESSON_SRC);
      setTab("exercise");
      setPassed(true);
      return;
    }

    let cancelled = false;
    let timeoutId = 0;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timeoutId = window.setTimeout(resolve, ms);
      });

    async function runLoop() {
      while (!cancelled) {
        setTab("lesson");
        setPassed(false);
        setTyped("");

        for (let i = 1; i <= LESSON_SRC.length; i++) {
          if (cancelled) return;
          setTyped(LESSON_SRC.slice(0, i));
          await wait(18);
        }

        await wait(450);
        if (cancelled) return;
        setTab("exercise");
        await wait(280);
        if (cancelled) return;
        setPassed(true);
        await wait(2600);
      }
    }

    void runLoop();
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [reduceMotion]);

  return (
    <div
      className="studio-chrome hidden min-w-0 w-full max-w-[19rem] justify-self-end dark:hidden lg:block"
      aria-hidden
    >
      <div className="flex min-h-[23rem] w-full flex-col overflow-hidden rounded-2xl border border-brand-core/20 bg-bg shadow-[0_24px_60px_-24px_rgba(74,62,210,0.35)]">
        <div className="flex items-center gap-1.5 border-b border-[rgb(40_45_90_/_0.1)] px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 truncate font-mono text-[10px] text-fg-3">
            {labels.file}
          </span>
        </div>

        <div className="relative flex border-b border-[rgb(40_45_90_/_0.08)] px-2 pt-2">
          <TabPill active={tab === "lesson"}>{labels.lesson}</TabPill>
          <TabPill active={tab === "exercise"}>{labels.exercise}</TabPill>
          <div
            className={cn(
              "studio-tab-ink absolute bottom-0 h-0.5 w-[calc(50%-0.5rem)] rounded-full bg-brand-core transition-transform duration-200 ease-out",
              tab === "exercise" ? "translate-x-[calc(100%+0.25rem)]" : "translate-x-1",
            )}
          />
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col p-3">
          <pre
            className={cn(
              "studio-code flex-1 overflow-hidden rounded-lg bg-[#12141f] p-3 font-mono text-[10px] leading-[1.55] text-[#e8eaf4]",
              tab === "exercise" && "studio-code-swap",
            )}
          >
            {tab === "lesson" ? (
              <>
                <CodeView source={typed} />
                {!reduceMotion && typed.length < LESSON_SRC.length && (
                  <span className="studio-caret inline-block h-3 w-0.5 translate-y-0.5 bg-brand-core align-middle" />
                )}
              </>
            ) : (
              <CodeView
                source={`// assert\nexpect(screen.getByRole('button'))\n  .toHaveTextContent('1')`}
              />
            )}
          </pre>

          <div className="mt-3 flex h-8 items-center justify-end">
            {passed && (
              <span className="studio-pass inline-flex items-center gap-1.5 rounded-md bg-brand-expert/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                <Check size={12} strokeWidth={2.5} />
                {labels.ok}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabPill({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex-1 px-2 pb-2 text-center font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors duration-150",
        active ? "text-brand-core" : "text-fg-3",
      )}
    >
      {children}
    </div>
  );
}

function CodeView({ source }: { source: string }) {
  return (
    <code className="whitespace-pre-wrap break-words">
      {tokenizeJsx(source).map((tok, i) => (
        <span key={i} className={tok.cls}>
          {tok.text}
        </span>
      ))}
    </code>
  );
}

/** Tiny JSX highlighter for the hero demo (not a real parser). */
function tokenizeJsx(source: string): { text: string; cls?: string }[] {
  const out: { text: string; cls?: string }[] = [];
  const re =
    /(\bfunction\b|\bconst\b|\breturn\b|\buseState\b|\bexpect\b|\bscreen\b|\bgetByRole\b|\btoHaveTextContent\b)|([A-Z][A-Za-z0-9]*)|(\/\/.*$)|('[^'\\]*(?:\\.[^'\\]*)*'|`(?:\\.|[^\\`])*`)|([<>/=]+)|(\d+)/gm;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source))) {
    if (m.index > last) out.push({ text: source.slice(last, m.index) });
    if (m[1]) out.push({ text: m[1], cls: "text-[#c4b5fd]" });
    else if (m[2]) out.push({ text: m[2], cls: "text-[#93c5fd]" });
    else if (m[3]) out.push({ text: m[3], cls: "text-[#94a3b8] italic" });
    else if (m[4]) out.push({ text: m[4], cls: "text-[#86efac]" });
    else if (m[5]) out.push({ text: m[5], cls: "text-[#f9a8d4]" });
    else if (m[6]) out.push({ text: m[6], cls: "text-[#fdba74]" });
    last = m.index + m[0].length;
  }
  if (last < source.length) out.push({ text: source.slice(last) });
  return out;
}
