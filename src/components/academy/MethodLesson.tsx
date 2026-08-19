import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { useT } from "@/i18n/useT";
import { cn } from "@/lib/utils";

const STEP_MS = 2600;
const IDLE_MS = 20_000;
const STEP_IDS = ["read", "practice", "validate"] as const;

/**
 * One lesson window, three states: read, practice, validate.
 */
export function MethodLesson({ className }: { className?: string }) {
  const t = useT();
  const [step, setStep] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const resumeRef = useRef(0);
  const labels = [
    t("academy.about.step1Title"),
    t("academy.about.step2Title"),
    t("academy.about.step3Title"),
  ];

  useEffect(() => () => window.clearTimeout(resumeRef.current), []);

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => {
      setStep((current) => (current + 1) % 3);
    }, STEP_MS);
    return () => window.clearTimeout(id);
  }, [autoplay, step]);

  function pauseAutoplay() {
    setAutoplay(false);
    window.clearTimeout(resumeRef.current);
    resumeRef.current = window.setTimeout(() => setAutoplay(true), IDLE_MS);
  }

  return (
    <figure
      className={cn(
        "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border-base bg-bg-2",
        className,
      )}
      onPointerDownCapture={pauseAutoplay}
      aria-label={t("academy.about.methodWindowAria")}
    >
      <div
        role="tablist"
        aria-label={t("academy.about.methodTitle")}
        className="flex shrink-0 border-b-base"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            setStep((current) => (current + 1) % 3);
          }
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            setStep((current) => (current - 1 + 3) % 3);
          }
        }}
      >
        {labels.map((label, index) => {
          const selected = index === step;
          return (
            <button
              key={STEP_IDS[index]}
              type="button"
              role="tab"
              id={`about-method-tab-${STEP_IDS[index]}`}
              aria-selected={selected}
              aria-controls="about-method-panel"
              onClick={() => setStep(index)}
              className={cn(
                "min-h-11 flex-1 px-2 font-mono text-[11px] uppercase tracking-[0.12em]",
                "transition-colors duration-200 ease-out",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/60",
                selected ? "bg-accent/15 text-accent-2" : "text-fg-3 hover:bg-bg-3 hover:text-fg-2",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div
        id="about-method-panel"
        role="tabpanel"
        aria-labelledby={`about-method-tab-${STEP_IDS[step]}`}
        className="relative min-h-0 flex-1 overflow-hidden"
      >
        <div
          data-on={step === 0 ? "true" : "false"}
          className="method-pane absolute inset-0 flex flex-col overflow-hidden p-4"
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-2">
            {t("academy.about.methodReadKicker")}
          </p>
          <p className="mt-1.5 text-[15px] font-semibold leading-snug text-fg">
            {t("academy.about.methodReadTitle")}
          </p>
          <p className="mt-2 text-[13px] leading-[1.55] text-fg-2">
            {t("academy.about.methodReadBody")}
          </p>
          <p className="mt-2 rounded-md bg-bg px-2.5 py-2 text-[12px] leading-snug text-fg-2">
            {t("academy.about.methodReadTip")}
          </p>
          <pre className="mt-2 min-h-0 flex-1 overflow-auto rounded-md bg-bg px-3 py-3 font-mono text-[11px] leading-[1.55] text-accent-2 md:text-[12px]">
            {t("academy.about.methodReadCode")}
          </pre>
        </div>

        <div
          data-on={step === 1 ? "true" : "false"}
          className="method-pane absolute inset-0 flex flex-col overflow-hidden"
        >
          <p className="shrink-0 border-b-base px-3 py-2 font-mono text-[10px] text-fg-3">
            {t("academy.about.methodPracticeKicker")}
          </p>
          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <pre className="min-h-0 overflow-auto p-3 font-mono text-[10px] leading-[1.5] text-fg md:text-[11px]">
              {t("academy.about.methodPracticeCode")}
            </pre>
            <div className="flex min-h-0 flex-col border-l-base bg-bg px-2.5 py-2.5">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-fg-3">
                {t("academy.about.thesisPreview")}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-fg-3">
                {t("academy.about.methodPracticeHint")}
              </p>
              <ul className="mt-2 list-disc pl-4 text-[13px] leading-relaxed text-fg">
                <li>{t("academy.about.methodPracticeFruit1")}</li>
                <li>{t("academy.about.methodPracticeFruit2")}</li>
                <li>{t("academy.about.methodPracticeFruit3")}</li>
              </ul>
              <div className="mt-auto flex flex-col gap-0.5 pt-2 font-mono text-[10px] text-emerald-700 dark:text-emerald-300">
                <span>✓ {t("academy.about.methodPracticeCheck1")}</span>
                <span>✓ {t("academy.about.methodPracticeCheck2")}</span>
                <span>✓ {t("academy.about.methodPracticeCheck3")}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          data-on={step === 2 ? "true" : "false"}
          className="method-pane absolute inset-0 flex flex-col overflow-hidden p-4"
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-2">
            {t("academy.about.methodQuizKicker")}
          </p>
          <p className="mt-1.5 text-[15px] font-semibold leading-snug text-fg">
            {t("academy.about.methodQuizQ")}
          </p>
          <div className="mt-3 flex flex-col gap-1.5">
            {[
              t("academy.about.methodQuizA"),
              t("academy.about.methodQuizB"),
              t("academy.about.methodQuizC"),
            ].map((choice, index) => {
              const selected = index === 1;
              return (
                <span
                  key={choice}
                  className={cn(
                    "flex items-center gap-2 rounded-md border-base px-2.5 py-1.5 text-[13px] leading-snug text-fg-2",
                    selected &&
                      "border-emerald-500/35 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                  )}
                >
                  <span className="font-mono text-[10px] text-fg-3">
                    {["A", "B", "C"][index]}
                  </span>
                  <span className="min-w-0 flex-1">{choice}</span>
                  {selected ? (
                    <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                  ) : null}
                </span>
              );
            })}
          </div>
          <p className="mt-3 text-[12px] leading-snug text-fg-3">
            {t("academy.about.methodQuizWhy")}
          </p>
          <span className="mt-auto inline-flex w-fit items-center gap-1 rounded-md bg-brand-expert/15 px-2 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
            <Check size={12} strokeWidth={2.5} aria-hidden="true" />
            {t("academy.about.methodQuizBadge")}
          </span>
        </div>
      </div>
    </figure>
  );
}
