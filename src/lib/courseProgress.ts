import type { LessonProgress, Phase } from "@/types";

export type PhaseProgressStat = {
  id: string;
  label: string;
  color: string;
  total: number;
  done: number;
  percent: number;
};

export type CourseProgressStat = {
  total: number;
  done: number;
  percent: number;
  quizPassed: number;
};

function quizPassed(
  progress: LessonProgress,
  quizId: string,
): boolean {
  const s = progress.quizScores[quizId];
  return Boolean(s && s.total > 0 && s.correct / s.total >= 0.7);
}

/** Per-phase progress for any course phase list. */
export function computePhaseStats(
  phases: Phase[],
  progress: LessonProgress,
): PhaseProgressStat[] {
  return phases.map((phase) => {
    let total = 0;
    let done = 0;
    for (const mod of phase.modules) {
      total += 1;
      if (progress.readModules.includes(mod.id)) done += 1;
      if (mod.quiz) {
        total += 1;
        if (quizPassed(progress, mod.quiz.id)) done += 1;
      }
      if (mod.exercises) {
        for (const ex of mod.exercises) {
          total += 1;
          if (progress.completedExercises.includes(ex.id)) done += 1;
        }
      }
    }
    return {
      id: phase.id,
      label: phase.label,
      color: phase.color,
      total,
      done,
      percent: total === 0 ? 0 : Math.round((done / total) * 100),
    };
  });
}

/** Aggregate progress for a course's phases. */
export function computeCourseStats(
  phases: Phase[],
  progress: LessonProgress,
): CourseProgressStat {
  const phaseStats = computePhaseStats(phases, progress);
  const total = phaseStats.reduce((sum, s) => sum + s.total, 0);
  const done = phaseStats.reduce((sum, s) => sum + s.done, 0);
  const quizIds = new Set(
    phases.flatMap((p) =>
      p.modules.map((m) => m.quiz?.id).filter(Boolean) as string[],
    ),
  );
  const quizPassedCount = [...quizIds].filter((id) =>
    quizPassed(progress, id),
  ).length;
  return {
    total,
    done,
    percent: total === 0 ? 0 : Math.min(100, Math.round((done / total) * 100)),
    quizPassed: quizPassedCount,
  };
}

/** Module ids belonging to the given phases. */
export function courseModuleIds(phases: Phase[]): Set<string> {
  return new Set(phases.flatMap((p) => p.modules.map((m) => m.id)));
}
