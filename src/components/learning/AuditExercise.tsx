import { useId, useMemo, useState } from "react";
import type { AuditExercise as AuditExerciseType, AuditSeverity } from "@/types";
import {
  scoreAuditReport,
  type AuditScoreResult,
} from "@/lib/auditScore";
import { useProgress } from "@/hooks/useProgress";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/useT";
import { CheckCircle2, ClipboardList, Lightbulb } from "lucide-react";

function formatAuditSummary(
  result: AuditScoreResult,
  t: ReturnType<typeof useT>,
): string {
  const { tp, fp, fn, passed } = result;
  if (passed && fp === 0 && fn === 0) {
    return tp === 1
      ? t("audit.summaryOne")
      : t("audit.summaryMany", { n: tp });
  }
  const parts: string[] = [];
  if (tp > 0) {
    parts.push(tp === 1 ? t("audit.tpOne") : t("audit.tpMany", { n: tp }));
  } else {
    parts.push(t("audit.tpNone"));
  }
  if (fp > 0) {
    parts.push(fp === 1 ? t("audit.fpOne") : t("audit.fpMany", { n: fp }));
  }
  if (fn > 0) {
    parts.push(fn === 1 ? t("audit.fnOne") : t("audit.fnMany", { n: fn }));
  }
  return t("audit.bilan", { parts: parts.join(", ") });
}

const DEFAULT_ATTEMPTS_BEFORE_SOLUTION = 3;
const SEVERITIES: AuditSeverity[] = ["low", "medium", "high", "critical"];

interface AuditExerciseProps {
  exercise: AuditExerciseType;
}

/**
 * Checklist / audit-report exercise: pick findings, assign severity,
 * optionally add evidence, submit for scoring.
 */
export function AuditExercise({ exercise }: AuditExerciseProps) {
  const t = useT();
  const severityLabel = useMemo(
    (): Record<AuditSeverity, string> => ({
      low: t("audit.sevLow"),
      medium: t("audit.sevMedium"),
      high: t("audit.sevHigh"),
      critical: t("audit.sevCritical"),
    }),
    [t],
  );
  const formId = useId();
  const {
    getExerciseStatus,
    trackExerciseAttempt,
    markExerciseSolved,
    revealExerciseSolution,
    saveAuditSubmission,
    recordExerciseHint,
    resetExercise,
  } = useProgress();

  const status = getExerciseStatus(exercise.id);
  const saved = status.auditSubmission;
  const attemptsGate =
    exercise.attemptsBeforeSolution ?? DEFAULT_ATTEMPTS_BEFORE_SOLUTION;
  const requireEvidence = exercise.requireEvidence ?? false;
  const passingScore = exercise.passingScore ?? 0.7;

  const [selected, setSelected] = useState<Record<string, boolean>>(() => {
    if (!saved?.selectedIds?.length) return {};
    return Object.fromEntries(saved.selectedIds.map((id) => [id, true]));
  });
  const [severities, setSeverities] = useState<
    Record<string, AuditSeverity | undefined>
  >(() => ({ ...(saved?.severities ?? {}) }));
  const [evidence, setEvidence] = useState<Record<string, string>>(() => {
    const out: Record<string, string> = {};
    for (const [id, note] of Object.entries(saved?.evidence ?? {})) {
      if (note) out[id] = note;
    }
    return out;
  });
  const [hintsShown, setHintsShown] = useState(0);
  const [lastResult, setLastResult] = useState<AuditScoreResult | null>(() =>
    saved
      ? {
          score: saved.score,
          passed: saved.passed,
          tp: saved.tp,
          fp: saved.fp,
          fn: saved.fn,
          failures: saved.failures ?? [],
        }
      : null,
  );
  const [showSolution, setShowSolution] = useState(
    () => status.status === "revealed" || status.revealedSolution,
  );

  const done = status.status === "solved" || status.status === "revealed";
  const canReveal = !done && status.attempts >= attemptsGate;

  const selectedIds = useMemo(
    () => Object.entries(selected).filter(([, v]) => v).map(([id]) => id),
    [selected],
  );

  function persistSubmission(
    ids: string[],
    sev: Record<string, AuditSeverity | undefined>,
    ev: Record<string, string>,
    result: AuditScoreResult,
  ) {
    saveAuditSubmission(exercise.id, {
      selectedIds: ids,
      severities: sev,
      evidence: ev,
      score: result.score,
      passed: result.passed,
      tp: result.tp,
      fp: result.fp,
      fn: result.fn,
      failures: result.failures,
    });
  }

  function toggleFinding(id: string) {
    if (done) return;
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
    setLastResult(null);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (done) return;
    trackExerciseAttempt(exercise.id);
    const result = scoreAuditReport(
      exercise.findings,
      {
        selectedIds,
        severities,
        evidence,
      },
      passingScore,
      requireEvidence,
    );
    setLastResult(result);
    persistSubmission(selectedIds, severities, evidence, result);
    if (result.passed) {
      markExerciseSolved(exercise.id);
    }
  }

  function onReveal() {
    const result =
      lastResult ??
      scoreAuditReport(
        exercise.findings,
        { selectedIds, severities, evidence },
        passingScore,
        requireEvidence,
      );
    persistSubmission(selectedIds, severities, evidence, result);
    setLastResult(result);
    revealExerciseSolution(exercise.id);
    setShowSolution(true);
  }

  function onReset() {
    resetExercise(exercise.id);
    setSelected({});
    setSeverities({});
    setEvidence({});
    setHintsShown(0);
    setLastResult(null);
    setShowSolution(false);
  }

  function onHint() {
    if (!exercise.hints?.length) return;
    const next = Math.min(hintsShown + 1, exercise.hints.length);
    setHintsShown(next);
    recordExerciseHint(exercise.id, next - 1);
  }

  return (
    <section className="mb-6 rounded-xl border-base bg-bg-2 overflow-hidden">
      <div className="flex items-start gap-3 border-b-base px-5 py-4">
        <div className="mt-0.5 w-9 h-9 rounded-lg bg-accent/10 text-accent-2 flex items-center justify-center flex-shrink-0">
          <ClipboardList size={16} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold">{exercise.title}</h3>
          <p
            className="mt-1 text-[13px] text-fg-2 leading-relaxed [&_code]:font-mono [&_code]:text-[12px] [&_code]:bg-bg-3 [&_code]:px-1.5 [&_code]:rounded"
            dangerouslySetInnerHTML={{ __html: exercise.instructions }}
          />
        </div>
        {done && (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-emerald-400">
            <CheckCircle2 size={12} />{" "}
            {status.status === "revealed" ? t("audit.seen") : t("audit.validated")}
          </span>
        )}
      </div>

      <div
        className="px-5 py-4 border-b-base prose-lesson text-[14px] max-w-none"
        dangerouslySetInnerHTML={{ __html: exercise.scenario }}
      />

      <form onSubmit={onSubmit} className="px-5 py-4 space-y-3">
        <div className="text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-1">
          {t("audit.findings")}
        </div>
        {exercise.findings.map((finding) => {
          const checked = Boolean(selected[finding.id]);
          const inputId = `${formId}-${finding.id}`;
          const passedLock =
            done &&
            (status.status === "solved" || Boolean(lastResult?.passed));
          const revealedLock = done && !passedLock;
          return (
            <div
              key={finding.id}
              className={cn(
                "rounded-lg border p-3 transition duration-200",
                !checked && "border-base bg-bg",
                checked &&
                  !done &&
                  "border-accent/50 bg-accent/10 ring-1 ring-accent/20",
                checked &&
                  passedLock &&
                  "border-emerald-500/50 bg-emerald-500/10 ring-1 ring-emerald-500/20",
                checked &&
                  revealedLock &&
                  "border-amber-500/45 bg-amber-500/10 ring-1 ring-amber-500/15",
              )}
            >
              <label
                htmlFor={inputId}
                className={cn(
                  "flex items-start gap-3 min-h-11",
                  done ? "cursor-default" : "cursor-pointer",
                )}
              >
                <input
                  id={inputId}
                  type="checkbox"
                  className={cn(
                    "mt-1.5 h-4 w-4 shrink-0 rounded",
                    !done && "accent-[rgb(var(--accent))]",
                    passedLock && "accent-emerald-500",
                    revealedLock && "accent-amber-500",
                  )}
                  checked={checked}
                  onChange={() => toggleFinding(finding.id)}
                  disabled={done}
                />
                <span
                  className={cn(
                    "text-[14px] leading-relaxed",
                    checked ? "text-fg font-medium" : "text-fg-2",
                  )}
                >
                  {finding.label}
                </span>
              </label>

              {checked && (
                <div className="mt-3 ml-7 grid gap-2 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`${inputId}-sev`}
                      className="block text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-1"
                    >
                      {t("audit.severity")}
                    </label>
                    <select
                      id={`${inputId}-sev`}
                      className={cn(
                        "w-full min-h-11 rounded-lg border px-3 text-sm transition",
                        !done && "border-base bg-bg-2",
                        passedLock &&
                          "border-emerald-500/40 bg-emerald-500/5 text-fg",
                        revealedLock &&
                          "border-amber-500/40 bg-amber-500/5 text-fg",
                      )}
                      value={severities[finding.id] ?? ""}
                      disabled={done}
                      onChange={(ev) =>
                        setSeverities((prev) => ({
                          ...prev,
                          [finding.id]: (ev.target.value || undefined) as
                            | AuditSeverity
                            | undefined,
                        }))
                      }
                    >
                      <option value="">{t("audit.choose")}</option>
                      {SEVERITIES.map((s) => (
                        <option key={s} value={s}>
                          {severityLabel[s]}
                        </option>
                      ))}
                    </select>
                  </div>
                  {requireEvidence && (
                    <div className="sm:col-span-2">
                      <label
                        htmlFor={`${inputId}-ev`}
                        className="block text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-1"
                      >
                        {t("audit.evidence")}
                      </label>
                      <textarea
                        id={`${inputId}-ev`}
                        rows={2}
                        className={cn(
                          "w-full min-h-11 rounded-lg border px-3 py-2 text-sm transition",
                          !done && "border-base bg-bg-2",
                          passedLock &&
                            "border-emerald-500/40 bg-emerald-500/5 text-fg",
                          revealedLock &&
                            "border-amber-500/40 bg-amber-500/5 text-fg",
                        )}
                        value={evidence[finding.id] ?? ""}
                        disabled={done}
                        onChange={(ev) =>
                          setEvidence((prev) => ({
                            ...prev,
                            [finding.id]: ev.target.value,
                          }))
                        }
                        placeholder="ex. src/config.js:14"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {exercise.hints && exercise.hints.length > 0 && (
          <div className="pt-2 space-y-2">
            {exercise.hints.slice(0, hintsShown).map((hint, i) => (
              <div
                key={i}
                className="flex gap-2 rounded-lg bg-bg-3 px-3 py-2 text-[13px] text-fg-2"
              >
                <Lightbulb size={14} className="mt-0.5 text-amber-400 flex-shrink-0" />
                {hint}
              </div>
            ))}
            {hintsShown < exercise.hints.length && !done && (
              <Button
                type="button"
                variant="ghost"
                className="min-h-11"
                onClick={onHint}
              >
                {t("audit.showHint", {
                  n: hintsShown + 1,
                  total: exercise.hints.length,
                })}
              </Button>
            )}
          </div>
        )}

        {lastResult && (
          <div
            role="status"
            aria-live="polite"
            className={cn(
              "rounded-lg border px-4 py-3 text-[13px]",
              lastResult.passed
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-amber-500/30 bg-amber-500/10 text-amber-200",
            )}
          >
            <div className="font-semibold">
              {lastResult.passed ? t("audit.reportOk") : t("audit.reportBad")}
            </div>
            <p className="mt-1.5 leading-relaxed opacity-95">
              {t("audit.score")}{" "}
              <strong className="font-mono">
                {Math.round(lastResult.score * 100)}%
              </strong>
              . {formatAuditSummary(lastResult, t)}
            </p>
            <ul className="mt-2 space-y-1 text-[12px] opacity-90">
              <li>
                <span className="font-medium">{t("audit.tpLegend")}</span> :{" "}
                {lastResult.tp} {t("audit.tpLegendHint")}
              </li>
              <li>
                <span className="font-medium">{t("audit.fpLegend")}</span> :{" "}
                {lastResult.fp} {t("audit.fpLegendHint")}
              </li>
              <li>
                <span className="font-medium">{t("audit.fnLegend")}</span> :{" "}
                {lastResult.fn} {t("audit.fnLegendHint")}
              </li>
            </ul>
            {lastResult.failures.length > 0 && (
              <ul className="mt-2 list-disc pl-4 space-y-0.5">
                {lastResult.failures.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {(showSolution || status.status === "revealed") && exercise.solution && (
          <div className="rounded-lg border-base bg-bg-3 px-4 py-3 text-[13px] text-fg-2 leading-relaxed">
            <div className="text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-1">
              {t("audit.correction")}
            </div>
            <div dangerouslySetInnerHTML={{ __html: exercise.solution }} />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-2">
          {!done && (
            <Button type="submit" className="min-h-11">
              {t("audit.submit")}
            </Button>
          )}
          {canReveal && exercise.solution && (
            <Button
              type="button"
              variant="ghost"
              className="min-h-11"
              onClick={onReveal}
            >
              {t("audit.seeCorrection")}
            </Button>
          )}
          {done && (
            <Button
              type="button"
              variant="ghost"
              className="min-h-11"
              onClick={onReset}
            >
              {t("audit.restart")}
            </Button>
          )}
          <span className="text-[11px] font-mono text-fg-3">
            {t("audit.attempts", {
              n: status.attempts,
              s: status.attempts === 1 ? "" : "s",
            })}
          </span>
        </div>
      </form>
    </section>
  );
}
