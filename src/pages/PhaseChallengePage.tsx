import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import type { PhaseId } from "@/types";
import { isCodeExercise } from "@/types";
import { useProgress } from "@/hooks/useProgress";
import { useCourseArea } from "@/components/layout/courseArea";
import { useT } from "@/i18n/useT";
import { CodeExercise as ExerciseCard } from "@/components/learning/CodeExercise";
import { Button } from "@/components/ui/Button";
import { cn, phaseAccent } from "@/lib/utils";
import { ArrowLeft, Trophy, ShieldCheck, Shuffle } from "lucide-react";

const CHALLENGE_SIZE = 3;

export function PhaseChallengePage() {
  const t = useT();
  const { phaseId } = useParams<{ phaseId: string }>();
  const { basePath, phases } = useCourseArea();
  const phase = phases.find((p) => p.id === (phaseId as PhaseId));
  const { progress, saveChallengeScore } = useProgress();
  const [resultMap, setResultMap] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);

  const phaseIdSafe = phase?.id ?? "";

  const pool = useMemo(() => {
    if (!phase) return [];
    return phase.modules
      .flatMap((m) => m.exercises ?? [])
      .filter(isCodeExercise)
      .filter((ex) => ex.challengeEligible !== false);
  }, [phase]);

  const selected = useMemo(
    () => pickRandom(pool, CHALLENGE_SIZE),
    [pool],
  );

  if (!phase) return <Navigate to={basePath} replace />;

  const accent = phaseAccent(phase.color);

  const passedIds = selected
    .filter((ex) => resultMap[ex.id])
    .map((ex) => ex.id);
  const canSubmit = selected.length > 0 && passedIds.length === selected.length;
  const previous = progress.challengeScores[phaseIdSafe];

  function onFinalize() {
    const score = {
      phaseId: phaseIdSafe,
      exerciseIds: selected.map((ex) => ex.id),
      passedIds,
      total: selected.length,
      at: Date.now(),
    };
    saveChallengeScore(score);
    setSaved(true);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 animate-fade-in">
      <div className="flex items-center justify-between gap-3 mb-4">
        <Link
          to={`${basePath}/phase/${phaseIdSafe}`}
          className="text-[12px] font-mono uppercase tracking-wider text-fg-3 hover:text-fg transition inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={14} />
          {t("course.backToPhase")}
        </Link>
        <span className="text-[11px] font-mono uppercase tracking-wider text-fg-3 inline-flex items-center gap-1">
          <Shuffle size={12} />
          {t("course.randomExercises")}
        </span>
      </div>

      <div className="rounded-xl border-base bg-bg-2 p-5">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-lg border flex items-center justify-center",
              accent.bg,
              accent.border,
              accent.text,
            )}
          >
            <Trophy size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className={cn("text-2xl font-extrabold tracking-tight", accent.text)}>
              {t("course.challengeTitle", { label: phase.label })}
            </h1>
            <p className="text-[13px] text-fg-2 mt-1 leading-relaxed">
              {t("course.challengeIntro")}
            </p>
            <div className="mt-3 text-[12px] font-mono text-fg-3">
              {t("course.challengeProgress", {
                done: passedIds.length,
                total: selected.length || 0,
              })}
              {previous && (
                <span className="ml-3 text-emerald-400">
                  {t("course.bestScore", {
                    score: `${previous.passedIds.length}/${previous.total}`,
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {selected.length === 0 && (
        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-[13px] text-fg-2">
          {t("course.challengeNoExercises")}
        </div>
      )}

      <div className="mt-6 space-y-6">
        {selected.map((exercise) => (
          <div key={exercise.id}>
            <ExerciseCard
              exercise={exercise}
              challengeMode
              onChallengeResult={(passed) => {
                setResultMap((prev) => ({
                  ...prev,
                  [exercise.id]: prev[exercise.id] || passed,
                }));
              }}
            />
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="mt-8 rounded-xl border-base bg-bg-2 p-4 flex items-center gap-3">
          <div className="text-[13px] text-fg-2 flex-1">
            {canSubmit ? t("course.challengeReady") : t("course.challengePending")}
          </div>
          <Button
            leftIcon={<ShieldCheck size={14} />}
            onClick={onFinalize}
            disabled={!canSubmit}
          >
            {t("course.challengeSubmit")}
          </Button>
        </div>
      )}

      {saved && (
        <div className="mt-4 text-[13px] text-emerald-400 font-medium inline-flex items-center gap-2">
          <ShieldCheck size={15} />
          {t("course.challengeSaved")}
        </div>
      )}
    </div>
  );
}

function pickRandom<T>(items: T[], count: number): T[] {
  if (items.length <= count) return items;
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}
