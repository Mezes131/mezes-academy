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
      (p.modules ?? []).flatMap((m) => (m.exercises ?? []).map((e) => e.id)),
    ),
  );
}

function coursePhaseIds(phases: Phase[]): Set<string> {
  return new Set(phases.map((p) => p.id));
}

/** True if the learner has any saved activity in this course. */
export function courseHasActivity(
  phases: Phase[],
  progress: LessonProgress,
): boolean {
  const modules = courseModuleIds(phases);
  if (progress.readModules.some((id) => modules.has(id))) return true;
  if (progress.bookmarks.some((id) => modules.has(id))) return true;

  const quizzes = courseQuizIds(phases);
  if (Object.keys(progress.quizScores).some((id) => quizzes.has(id))) {
    return true;
  }

  const exercises = courseExerciseIds(phases);
  if (
    progress.completedExercises.some((id) => exercises.has(id)) ||
    Object.keys(progress.exerciseProgress).some((id) => exercises.has(id))
  ) {
    return true;
  }

  const phaseIds = coursePhaseIds(phases);
  return Object.keys(progress.challengeScores).some((id) => phaseIds.has(id));
}

/**
 * Every active track on the platform. Progress is scoped per course, but the
 * progress page lists them all (not only the course area you opened).
 */
export function selectLearnerCourses(
  courses: Course[],
  _progress: LessonProgress,
): Course[] {
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
