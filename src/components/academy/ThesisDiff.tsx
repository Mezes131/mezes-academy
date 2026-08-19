import React, {
  Component,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { transform } from "sucrase";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useT } from "@/i18n/useT";
import { cn } from "@/lib/utils";

const AFTER_SRC = `import { useState } from "react";

export default function App() {
  const [n, setN] = useState(0);
  return (
    <button
      onClick={() => setN(n + 1)}
      className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-md bg-accent px-3 text-[13px] font-semibold text-white"
    >
      {n}
    </button>
  );
}
`;

const LESSON_MS = 2600;
const AFTER_MS = 5000;
const IDLE_MS = 20_000;

/**
 * Before / after carousel. After compiles the editor locally so the preview
 * is the actual component (no CodeSandbox bundler).
 */
export function ThesisDiff({ className }: { className?: string }) {
  const t = useT();
  const [slide, setSlide] = useState(0);
  const [lesson, setLesson] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [source, setSource] = useState(AFTER_SRC);
  const [debounced, setDebounced] = useState(AFTER_SRC);
  const resumeRef = useRef(0);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(source), 220);
    return () => window.clearTimeout(id);
  }, [source]);

  useEffect(() => () => window.clearTimeout(resumeRef.current), []);

  useEffect(() => {
    if (!autoplay) return;
    if (slide === 0) {
      const id = window.setTimeout(() => {
        if (lesson < 2) {
          setLesson((current) => current + 1);
          return;
        }
        setLesson(0);
        setSlide(1);
      }, LESSON_MS);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => {
      setLesson(0);
      setSlide(0);
    }, AFTER_MS);
    return () => window.clearTimeout(id);
  }, [autoplay, slide, lesson]);

  function pauseAutoplay() {
    setAutoplay(false);
    window.clearTimeout(resumeRef.current);
    resumeRef.current = window.setTimeout(() => setAutoplay(true), IDLE_MS);
  }

  return (
    <figure
      data-slide={slide}
      onPointerDownCapture={pauseAutoplay}
      className={cn(
        "thesis-diff flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border-base bg-bg-2",
        className,
      )}
      aria-label={t("academy.about.thesisDiffAria")}
    >
      <div className="flex shrink-0 items-center gap-1.5 border-b-base px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-2 truncate font-mono text-[11px] text-fg-3">
          {slide === 0
            ? t("academy.about.thesisTour")
            : t("academy.about.thesisFile")}
        </span>
        <span className="ml-auto mr-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-2">
          {slide === 0
            ? t("academy.about.thesisBefore")
            : t("academy.about.thesisAfter")}
        </span>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-fg-2 transition-colors duration-150 ease-out hover:bg-bg-3 disabled:opacity-30"
          disabled={slide === 0}
          onClick={() => setSlide(0)}
          aria-label={t("common.previous")}
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-fg-2 transition-colors duration-150 ease-out hover:bg-bg-3 disabled:opacity-30"
          disabled={slide === 1}
          onClick={() => setSlide(1)}
          aria-label={t("common.next")}
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="thesis-track flex h-full w-[200%]">
          <div className="h-full w-1/2 min-w-0 bg-[#0e1018]">
            <BeforeTour
              active={slide === 0}
              lesson={lesson}
              onLesson={setLesson}
            />
          </div>

          <div className="grid h-full w-1/2 min-w-0 grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-0 bg-[#12141f]">
            <label className="sr-only" htmlFor="thesis-editor">
              {t("academy.about.thesisFile")}
            </label>
            <textarea
              id="thesis-editor"
              spellCheck={false}
              value={source}
              onChange={(event) => {
                pauseAutoplay();
                setSource(event.target.value);
              }}
              className="h-full min-h-0 resize-none border-0 bg-transparent p-3 font-mono text-[11px] leading-[1.55] text-[#e8eaf4] outline-none md:text-[12px]"
            />
            <div className="flex min-h-0 flex-col border-l-base bg-bg px-2.5 py-2.5">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-fg-3">
                {t("academy.about.thesisPreview")}
              </p>
              <div className="mt-2 flex min-h-0 flex-1 items-center justify-center overflow-auto">
                <LivePreview source={debounced} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

function BeforeTour({
  active,
  lesson,
  onLesson,
}: {
  active: boolean;
  lesson: number;
  onLesson: (index: number) => void;
}) {
  const t = useT();
  const [pick, setPick] = useState<number | null>(null);
  const lessons = [
    t("academy.about.thesisLesson1"),
    t("academy.about.thesisLesson2"),
    t("academy.about.thesisLesson3"),
  ];

  useEffect(() => {
    if (!active || lesson !== 2) {
      setPick(null);
      return;
    }
    const id = window.setTimeout(() => setPick(1), 700);
    return () => window.clearTimeout(id);
  }, [active, lesson]);

  return (
    <div className="flex h-full min-h-0">
      <nav
        className="flex w-[36%] min-w-0 shrink-0 flex-col gap-0.5 border-r-base py-2 pl-2 pr-1"
        aria-label={t("academy.about.thesisTour")}
      >
        {lessons.map((label, index) => {
          const current = index === lesson;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onLesson(index)}
              aria-current={current ? "true" : undefined}
              className={cn(
                "rounded-md px-2 py-2 text-left font-mono text-[11px] leading-tight transition-colors duration-150 ease-out",
                current
                  ? "bg-accent/15 text-accent-2"
                  : "text-fg-3 hover:bg-bg-3 hover:text-fg-2",
              )}
            >
              <span className="mr-1.5 tabular-nums text-fg-3">0{index + 1}</span>
              {label}
            </button>
          );
        })}
      </nav>

      <div className="min-h-0 min-w-0 flex-1 overflow-hidden p-3">
        <div
          key={lesson}
          className="flex h-full min-h-0 flex-col overflow-hidden"
          style={{ animation: "about-rise 280ms var(--ease-out) both" }}
        >
          {lesson === 0 ? (
            <>
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-2">
                {t("academy.about.thesisLessonKicker1")}
              </p>
              <p className="mt-1.5 text-[13px] font-semibold leading-snug text-[#e8eaf4]">
                {t("academy.about.thesisLesson1Title")}
              </p>
              <p className="mt-1.5 text-[12px] leading-[1.55] text-[#94a3b8]">
                {t("academy.about.thesisLesson1Body")}
              </p>
              <pre className="mt-2 min-h-0 overflow-hidden rounded-md bg-[#12141f] px-2.5 py-2 font-mono text-[10px] leading-[1.55] text-[#c4b5fd]">
                {t("academy.about.thesisLesson1Code")}
              </pre>
            </>
          ) : null}

          {lesson === 1 ? (
            <>
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-2">
                {t("academy.about.thesisLessonKicker2")}
              </p>
              <p className="mt-1.5 mb-2 text-[13px] font-semibold leading-snug text-[#e8eaf4]">
                {t("academy.about.thesisLesson2Title")}
              </p>
              <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-md bg-[#12141f]">
                <div className="flex shrink-0 items-center gap-1 border-b border-white/5 px-2 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
                  <span className="ml-1 truncate font-mono text-[9px] text-fg-3">
                    {t("academy.about.thesisLesson2Overlay")}
                  </span>
                </div>
                <div className="relative min-h-0 flex-1">
                  <pre className="absolute inset-2 overflow-hidden font-mono text-[10px] leading-[1.55] text-[#7c819c]">
                    {t("academy.about.thesisLesson2Code")}
                  </pre>
                  <span
                    className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_0_6px_rgb(124_112_245/0.25)]"
                    aria-hidden="true"
                  >
                    <Play size={13} fill="currentColor" />
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2 px-2 pb-2 pt-1">
                  <span className="h-0.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/15">
                    <span className="block h-full w-[42%] rounded-full bg-accent" />
                  </span>
                  <span className="font-mono text-[9px] tabular-nums text-fg-3">
                    {t("academy.about.thesisLesson2Meta")}
                  </span>
                </div>
              </div>
            </>
          ) : null}

          {lesson === 2 ? (
            <>
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-2">
                {t("academy.about.thesisQuizKicker")}
              </p>
              <p className="mt-1.5 text-[13px] font-semibold leading-snug text-[#e8eaf4]">
                {t("academy.about.thesisQuizQ")}
              </p>
              <div className="mt-2 flex min-h-0 flex-col gap-1">
                {[
                  t("academy.about.thesisQuizA"),
                  t("academy.about.thesisQuizB"),
                  t("academy.about.thesisQuizC"),
                ].map((choice, index) => {
                  const selected = pick === index;
                  return (
                    <span
                      key={choice}
                      className={cn(
                        "flex items-center gap-2 rounded-md border-base px-2 py-1.5 text-[12px] leading-snug text-[#c6c8de] transition-colors duration-150 ease-out",
                        selected &&
                          "border-emerald-500/35 bg-emerald-500/10 text-emerald-300",
                      )}
                    >
                      <span className="font-mono text-[10px] text-fg-3">
                        {["A", "B", "C"][index]}
                      </span>
                      <span className="min-w-0 flex-1">{choice}</span>
                      {selected ? (
                        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.08em] text-emerald-300">
                          {t("academy.about.thesisQuizOk")}
                        </span>
                      ) : null}
                    </span>
                  );
                })}
              </div>
              {pick !== null ? (
                <p className="mt-2 text-[11px] leading-snug text-[#94a3b8]">
                  {t("academy.about.thesisQuizWhy")}
                </p>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function LivePreview({ source }: { source: string }) {
  const result = useMemo(() => compileApp(source), [source]);

  if ("error" in result) {
    return (
      <p className="font-mono text-[11px] leading-snug text-red-400">
        {result.error}
      </p>
    );
  }

  const App = result.App;
  return (
    <PreviewBoundary resetKey={source}>
      <App />
    </PreviewBoundary>
  );
}

function compileApp(
  source: string,
): { App: ComponentType } | { error: string } {
  try {
    const { code } = transform(source, {
      transforms: ["typescript", "jsx", "imports"],
      jsxRuntime: "automatic",
      production: true,
    });
    const mod: { default?: ComponentType } = {};
    const require = (id: string) => {
      if (id === "react") return React;
      if (id === "react/jsx-runtime" || id === "react/jsx-dev-runtime") {
        return { jsx, jsxs, Fragment };
      }
      throw new Error(`Import non disponible: ${id}`);
    };
    // ponytail: local eval, no CodeSandbox bundler. Same-origin about-page playground only.
    new Function("exports", "require", code)(mod, require);
    if (typeof mod.default !== "function") {
      return { error: "Il faut un export default" };
    }
    return { App: mod.default };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

class PreviewBoundary extends Component<
  { children: ReactNode; resetKey: string },
  { message: string | null }
> {
  state = { message: null as string | null };

  static getDerivedStateFromError(err: Error) {
    return { message: err.message };
  }

  componentDidUpdate(prev: { resetKey: string }) {
    if (prev.resetKey !== this.props.resetKey && this.state.message) {
      this.setState({ message: null });
    }
  }

  render() {
    if (this.state.message) {
      return (
        <p className="font-mono text-[11px] leading-snug text-red-400">
          {this.state.message}
        </p>
      );
    }
    return this.props.children;
  }
}
