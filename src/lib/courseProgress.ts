import type { Course, LessonProgress, Phase } from "@/types";

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

export type CourseDetailStats = {
  read: number;
  quizzesTaken: number;
  exercisesSolved: number;
  exercisesRevealed: number;
  challenges: number;
};

function quizPassed(progress: LessonProgress, quizId: string): boolean {
  const s = progress.quizScores[quizId];
  return Boolean(s && s.total > 0 && s.correct / s.total >= 0.7);
}

/** Module ids belonging to the given phases. */
export function courseModuleIds(phases: Phase[]): Set<string> {
  return new Set(phases.flatMap((p) => p.modules.map((m) => m.id)));
}

function courseQuizIds(phases: Phase[]): Set<string> {
  return new Set(
    phases.flatMap(
      (p) => p.modules.map((m) => m.quiz?.id).filter(Boolean) as string[],
    ),
  );
}

function courseExerciseIds(phases: Phase[]): Set<string> {
  return new Set(
    phases.flatMap((p) =>
      p.modules.flatMap((m) => (m.exercises ?? []).map((e) => e.id)),
    ),
  );
}

function coursePhaseIds(phases: Phase[]): Set<string> {
  return new Set(phases.map((p) => p.id));
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
      for (const ex of mod.exercises ?? []) {
        total += 1;
        if (progress.completedExercises.includes(ex.id)) done += 1;
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
  const quizIds = courseQuizIds(phases);
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

/** Extra counters scoped to a course's phases (progress page, account). */
export function computeCourseDetailStats(
  phases: Phase[],
  progress: LessonProgress,
): CourseDetailStats {
  const moduleIds = courseModuleIds(phases);
  const quizIds = courseQuizIds(phases);
  const exerciseIds = courseExerciseIds(phases);
  const phaseIds = coursePhaseIds(phases);

  return {
    read: progress.readModules.filter((id) => moduleIds.has(id)).length,
    quizzesTaken: Object.keys(progress.quizScores).filter((id) =>
      quizIds.has(id),
    ).length,
    exercisesSolved: Object.entries(progress.exerciseProgress).filter(
      ([id, e]) => exerciseIds.has(id) && e.status === "solved",
    ).length,
    exercisesRevealed: Object.entries(progress.exerciseProgress).filter(
      ([id, e]) => exerciseIds.has(id) && e.status === "revealed",
    ).length,
    challenges: Object.entries(progress.challengeScores).filter(
      ([id, s]) =>
        phaseIds.has(id) && s.total > 0 && s.passedIds.length === s.total,
    ).length,
  };
}

/** Active courses listed on the progress page. */
export function activeCourses(courses: Course[]): Course[] {
  return courses.filter((c) => c.meta.status === "active");
}

/** Sum course-level stats into one platform total. */
export function aggregateCourseStats(
  stats: CourseProgressStat[],
): CourseProgressStat {
  const total = stats.reduce((sum, s) => sum + s.total, 0);
  const done = stats.reduce((sum, s) => sum + s.done, 0);
  const quizPassed = stats.reduce((sum, s) => sum + s.quizPassed, 0);
  return {
    total,
    done,
    quizPassed,
    percent: total === 0 ? 0 : Math.min(100, Math.round((done / total) * 100)),
  };
}
