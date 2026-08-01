import { findCourse } from "@/data";
import { computeCourseDetailStats } from "@/lib/courseProgress";
import type { LessonProgress } from "@/types";

export interface CapstoneEligibility {
  unlocked: boolean;
  phaseCount: number;
  moduleCount: number;
  readModulesCount: number;
  quizTotal: number;
  quizPassed: number;
  exerciseTotal: number;
  exerciseSolved: number;
}

function quizPassed(progress: LessonProgress, quizId: string): boolean {
  const s = progress.quizScores[quizId];
  return Boolean(s && s.total > 0 && s.correct / s.total >= 0.7);
}

export function getCapstoneEligibility(
  progress: LessonProgress,
): CapstoneEligibility {
  const phases = findCourse("react")?.phases ?? [];
  const detail = computeCourseDetailStats(phases, progress);

  let moduleCount = 0;
  let quizTotal = 0;
  let exerciseTotal = 0;
  const quizIds: string[] = [];

  for (const phase of phases) {
    for (const mod of phase.modules) {
      moduleCount += 1;
      if (mod.quiz) {
        quizTotal += 1;
        quizIds.push(mod.quiz.id);
      }
      exerciseTotal += mod.exercises?.length ?? 0;
    }
  }

  const quizPassedCount = quizIds.filter((id) => quizPassed(progress, id)).length;
  const unlocked =
    moduleCount > 0 &&
    detail.read === moduleCount &&
    quizPassedCount === quizTotal &&
    detail.exercisesSolved === exerciseTotal;

  return {
    unlocked,
    phaseCount: phases.length,
    moduleCount,
    readModulesCount: detail.read,
    quizTotal,
    quizPassed: quizPassedCount,
    exerciseTotal,
    exerciseSolved: detail.exercisesSolved,
  };
}
