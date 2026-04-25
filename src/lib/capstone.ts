import { phases } from "@/data/phases";
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

function isReactPhaseId(id: string) {
  return id.startsWith("react-");
}

export function getCapstoneEligibility(
  progress: LessonProgress,
): CapstoneEligibility {
  const reactPhases = phases.filter(
    (phase) => phase.courseId === "react" || isReactPhaseId(phase.id),
  );

  let moduleCount = 0;
  let readModulesCount = 0;
  let quizTotal = 0;
  let quizPassed = 0;
  let exerciseTotal = 0;
  let exerciseSolved = 0;

  for (const phase of reactPhases) {
    for (const module of phase.modules) {
      moduleCount += 1;
      if (progress.readModules.includes(module.id)) readModulesCount += 1;

      if (module.quiz) {
        quizTotal += 1;
        const score = progress.quizScores[module.quiz.id];
        if (score && score.total > 0 && score.correct / score.total >= 0.7) {
          quizPassed += 1;
        }
      }

      if (module.exercises) {
        for (const exercise of module.exercises) {
          exerciseTotal += 1;
          if (progress.exerciseProgress[exercise.id]?.status === "solved") {
            exerciseSolved += 1;
          }
        }
      }
    }
  }

  const unlocked =
    moduleCount > 0 &&
    readModulesCount === moduleCount &&
    quizPassed === quizTotal &&
    exerciseSolved === exerciseTotal;

  return {
    unlocked,
    phaseCount: reactPhases.length,
    moduleCount,
    readModulesCount,
    quizTotal,
    quizPassed,
    exerciseTotal,
    exerciseSolved,
  };
}
