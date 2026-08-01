import type {
  DifficultyLevel,
  ExerciseBlueprint,
  ProgramLesson,
  ProgramModule,
  ProgramPhase,
  ProjectBrief,
} from "@/types";

/**
 * SVC blueprint helpers. Conventions (see syllabus):
 *   phase  svc-<slug>          module  svc-<slug>-mNN
 *   lesson svc-<slug>-mNN-lK   quiz    5 questions per module
 * Exercises are declared at module level (assessment), lessons carry a
 * short 3-question quick-check blueprint.
 */

export interface SvcLessonSpec {
  id: string;
  title: string;
  objective: string;
  concepts: string[];
  pitfalls?: string[];
  duration?: string;
}

export function lesson(spec: SvcLessonSpec): ProgramLesson {
  return {
    id: spec.id,
    title: spec.title,
    objective: spec.objective,
    duration: spec.duration,
    courseOutline: {
      context: spec.objective,
      concepts: spec.concepts,
      pitfalls: spec.pitfalls,
      guidedExample: `Guided example around: ${spec.title}.`,
      recap:
        "Summary of decisions, common mistakes, and success criteria.",
    },
    quiz: { questionCount: 3, focus: spec.concepts },
    exercises: [],
  };
}

export interface SvcModuleSpec {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: DifficultyLevel;
  objectives: string[];
  lessons: ProgramLesson[];
  exercises: ExerciseBlueprint[];
}

export function module(spec: SvcModuleSpec): ProgramModule {
  return {
    id: spec.id,
    moduleId: spec.id,
    index: spec.index,
    title: spec.title,
    subtitle: spec.subtitle,
    duration: spec.duration,
    difficulty: spec.difficulty,
    objectives: spec.objectives,
    lessons: spec.lessons,
    assessment: {
      quiz: {
        questionCount: 5,
        focus: spec.lessons.flatMap((l) => l.quiz.focus).slice(0, 8),
      },
      exercises: spec.exercises,
    },
  };
}

export interface SvcPhaseSpec {
  slug: string;
  title: string;
  objective: string;
  modules: ProgramModule[];
  project?: ProjectBrief;
}

export function phase(spec: SvcPhaseSpec): ProgramPhase {
  return {
    id: `svc-program-${spec.slug}`,
    phaseId: `svc-${spec.slug}`,
    slug: spec.slug,
    title: spec.title,
    objective: spec.objective,
    modules: spec.modules,
    project: spec.project,
  };
}
