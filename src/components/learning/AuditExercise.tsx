import { useId, useMemo, useState } from "react";
import type { AuditExercise as AuditExerciseType, AuditSeverity } from "@/types";
import { scoreAuditReport } from "@/lib/auditScore";
import { useProgress } from "@/hooks/useProgress";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckCircle2, ClipboardList, Lightbulb } from "lucide-react";

const DEFAULT_ATTEMPTS_BEFORE_SOLUTION = 3;
const SEVERITIES: AuditSeverity[] = ["low", "medium", "high", "critical"];

const SEVERITY_LABEL: Record<AuditSeverity, string> = {
  low: "Faible",
  medium: "Moyenne",
  high: "Haute",
  critical: "Critique",
};

interface AuditExerciseProps {
  exercise: AuditExerciseType;
}

/**
 * Checklist / audit-report exercise: pick findings, assign severity,
 * optionally add evidence, submit for scoring.
 */
export function AuditExercise({ exercise }: AuditExerciseProps) {
  const formId = useId();
  const {
    getExerciseStatus,
    trackExerciseAttempt,
    markExerciseSolved,
    revealExerciseSolution,
    recordExerciseHint,
  } = useProgress();

  const status = getExerciseStatus(exercise.id);
  const attemptsGate =
    exercise.attemptsBeforeSolution ?? DEFAULT_ATTEMPTS_BEFORE_SOLUTION;
  const requireEvidence = exercise.requireEvidence ?? false;
  const passingScore = exercise.passingScore ?? 0.7;

  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [severities, setSeverities] = useState<
    Record<string, AuditSeverity | undefined>
  >({});
  const [evidence, setEvidence] = useState<Record<string, string>>({});
  const [hintsShown, setHintsShown] = useState(0);
  const [lastResult, setLastResult] = useState<ReturnType<
    typeof scoreAuditReport
  > | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const solved = status.status === "solved" || status.status === "revealed";
  const canReveal = !solved && status.attempts >= attemptsGate;

  const selectedIds = useMemo(
    () => Object.entries(selected).filter(([, v]) => v).map(([id]) => id),
    [selected],
  );

  function toggleFinding(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
    setLastResult(null);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
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
    if (result.passed) {
      markExerciseSolved(exercise.id);
    }
  }

  function onReveal() {
    revealExerciseSolution(exercise.id);
    setShowSolution(true);
  }

  function onHint() {
    if (!exercise.hints?.length) return;
    const next = Math.min(hintsShown + 1, exercise.hints.length);
    setHintsShown(next);
    recordExerciseHint(exercise.id, next - 1);
  }

  return (
    <section className="mb-6 rounded-xl border-base bg-bg-2 overflow-hidden">
      <div className="flex items-start gap-3 border-b border-base px-5 py-4">
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
        {solved && (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-emerald-400">
            <CheckCircle2 size={12} /> validé
          </span>
        )}
      </div>

      <div
        className="px-5 py-4 border-b border-base prose-lesson text-[14px] max-w-none"
        dangerouslySetInnerHTML={{ __html: exercise.scenario }}
      />

      <form onSubmit={onSubmit} className="px-5 py-4 space-y-3">
        <div className="text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-1">
          Constats
        </div>
        {exercise.findings.map((finding) => {
          const checked = Boolean(selected[finding.id]);
          const inputId = `${formId}-${finding.id}`;
          return (
            <div
              key={finding.id}
              className={cn(
                "rounded-lg border-base bg-bg p-3 transition",
                checked && "border-accent/30 bg-accent/5",
              )}
            >
              <label
                htmlFor={inputId}
                className="flex items-start gap-3 cursor-pointer min-h-11"
              >
                <input
                  id={inputId}
                  type="checkbox"
                  className="mt-1.5 h-4 w-4 accent-[rgb(var(--accent))]"
                  checked={checked}
                  onChange={() => toggleFinding(finding.id)}
                  disabled={solved && status.status === "solved"}
                />
                <span className="text-[14px] leading-relaxed text-fg">
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
                      Gravité
                    </label>
                    <select
                      id={`${inputId}-sev`}
                      className="w-full min-h-11 rounded-lg border-base bg-bg-2 px-3 text-sm"
                      value={severities[finding.id] ?? ""}
                      onChange={(ev) =>
                        setSeverities((prev) => ({
                          ...prev,
                          [finding.id]: (ev.target.value || undefined) as
                            | AuditSeverity
                            | undefined,
                        }))
                      }
                    >
                      <option value="">Choisir…</option>
                      {SEVERITIES.map((s) => (
                        <option key={s} value={s}>
                          {SEVERITY_LABEL[s]}
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
                        Preuve (fichier, ligne, note)
                      </label>
                      <textarea
                        id={`${inputId}-ev`}
                        rows={2}
                        className="w-full rounded-lg border-base bg-bg-2 px-3 py-2 text-sm"
                        value={evidence[finding.id] ?? ""}
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
            {hintsShown < exercise.hints.length && !solved && (
              <Button type="button" variant="ghost" size="sm" onClick={onHint}>
                Afficher un indice ({hintsShown + 1}/{exercise.hints.length})
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
              {lastResult.passed
                ? "Rapport validé"
                : "Rapport incomplet ou incorrect"}
            </div>
            <div className="mt-1 font-mono text-[12px] opacity-90">
              Score {Math.round(lastResult.score * 100)}% · TP {lastResult.tp} ·
              FP {lastResult.fp} · FN {lastResult.fn}
            </div>
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
              Correction
            </div>
            <div dangerouslySetInnerHTML={{ __html: exercise.solution }} />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-2">
          {!solved && (
            <Button type="submit">Soumettre le rapport</Button>
          )}
          {canReveal && exercise.solution && (
            <Button type="button" variant="ghost" onClick={onReveal}>
              Voir la correction
            </Button>
          )}
          <span className="text-[11px] font-mono text-fg-3">
            {status.attempts} tentative{status.attempts === 1 ? "" : "s"}
          </span>
        </div>
      </form>
    </section>
  );
}
