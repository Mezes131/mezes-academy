/**
 * Idempotent course importer for Strapi (any course exported by
 * scripts/export-course-seed.ts). Upserts by legacyId. All records stay
 * draft until manually published.
 *
 * Usage (inside Strapi container / local strapi app):
 *   npx strapi console
 *   > const { importCourse } = require("./dist/src/seed/import-course");
 *   > await importCourse(strapi, "react")
 *   > await importCourse(strapi, "svc")
 */
import fs from "node:fs";
import path from "node:path";
import type { Core } from "@strapi/strapi";

type AnswerPayload = {
  legacyId: string;
  label: string;
  isCorrect: boolean;
  order: number;
};

type QuestionPayload = {
  legacyId: string;
  prompt: string;
  type: "single" | "multi";
  explanation: string | null;
  order: number;
  answers: AnswerPayload[];
};

type QuizPayload = {
  legacyId: string;
  title: string;
  questions: QuestionPayload[];
};

type ExercisePayload = {
  legacyId: string;
  title: string;
  instructions: string;
  kind: string;
  order: number;
  hints: string[];
  starterFiles: Record<string, string>;
  solutionFiles: Record<string, string>;
  tests: Record<string, string> | null;
  validator: string | null;
  template: string;
  attemptsBeforeSolution: number;
  challengeEligible: boolean;
  validationMode: string;
};

type ModulePayload = {
  legacyId: string;
  moduleId: string;
  index: string;
  title: string;
  subtitle: string;
  duration: string;
  order: number;
  difficulty: string | null;
  objectives: string[];
  prerequisites: string[];
  openByDefault: boolean;
  workflowStatus: string;
  contentBlocks: unknown;
  assessment: unknown;
  lesson: {
    legacyId: string;
    title: string;
    desc: string;
    order: number;
    isRequired: boolean;
    content: Array<Record<string, unknown>>;
  };
  quiz: QuizPayload | null;
  exercises: ExercisePayload[];
};

type PhasePayload = {
  legacyId: string;
  slug: string;
  title: string;
  label: string;
  summary: string;
  order: number;
  color: string;
  icon: string;
  metaTags: string[];
  objectives: string[];
  prerequisites: string[];
  scaffoldOnly: boolean;
  projectTitle: string | null;
  projectDeliverable: string | null;
  projectAssessment: string[] | null;
  modules: ModulePayload[];
};

type CoursePayload = {
  legacyId: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  iconFamily: string;
  level: string;
  duration: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  workflowStatus: string;
  phases: PhasePayload[];
};

/** Strapi db.query relations must be scalar ids, never row objects. */
function relId(row: { id?: string | number } | null | undefined): number | string {
  if (row?.id == null || typeof row.id === "object") {
    throw new Error(`Expected row.id scalar, got ${JSON.stringify(row?.id)}`);
  }
  return row.id;
}

async function upsertByLegacyId(
  strapi: Core.Strapi,
  uid: string,
  legacyId: string,
  data: Record<string, unknown>,
) {
  const existing = await strapi.db.query(uid).findOne({ where: { legacyId } });
  if (existing) {
    return strapi.db.query(uid).update({
      where: { id: existing.id },
      data,
    });
  }
  return strapi.db.query(uid).create({ data });
}

async function importQuiz(
  strapi: Core.Strapi,
  quiz: QuizPayload,
  links: { lessonId?: number | string; moduleId?: number | string },
) {
  const quizData: Record<string, unknown> = {
    legacyId: quiz.legacyId,
    title: quiz.title,
    passingScore: 70,
    attemptsAllowed: 3,
  };
  // Module owns the learner-facing quiz; avoid dual oneToOne attach quirks
  if (links.moduleId != null) quizData.module = links.moduleId;
  else if (links.lessonId != null) quizData.lesson = links.lessonId;

  const quizRow = await upsertByLegacyId(strapi, "api::quiz.quiz", quiz.legacyId, quizData);

  for (const question of quiz.questions) {
    const qRow = await upsertByLegacyId(
      strapi,
      "api::quiz-question.quiz-question",
      question.legacyId,
      {
        legacyId: question.legacyId,
        prompt: question.prompt,
        type: question.type,
        explanation: question.explanation,
        order: question.order,
        quiz: relId(quizRow),
      },
    );

    for (const answer of question.answers) {
      await upsertByLegacyId(strapi, "api::quiz-answer.quiz-answer", answer.legacyId, {
        legacyId: answer.legacyId,
        label: answer.label,
        isCorrect: answer.isCorrect,
        order: answer.order,
        question: relId(qRow),
      });
    }
  }

  return quizRow;
}

export async function importCourse(strapi: Core.Strapi, courseId = "react") {
  const fileName = `${courseId}-course.json`;
  const candidates = [
    path.join(__dirname, "data", fileName),
    path.join(process.cwd(), "src", "seed", "data", fileName),
  ];
  const file = candidates.find((p) => fs.existsSync(p));
  if (!file) {
    throw new Error(
      `Missing ${fileName} (looked in: ${candidates.join(", ")}). ` +
        `Run: npm run export:strapi-seed -- ${courseId}`,
    );
  }

  const { course } = JSON.parse(fs.readFileSync(file, "utf8")) as {
    course: CoursePayload;
  };

  const courseRow = await upsertByLegacyId(strapi, "api::course.course", course.legacyId, {
    legacyId: course.legacyId,
    title: course.title,
    slug: course.slug,
    tagline: course.tagline,
    description: course.description,
    icon: course.icon,
    iconFamily: course.iconFamily,
    level: course.level,
    duration: course.duration,
    accentText: course.accentText,
    accentBg: course.accentBg,
    accentBorder: course.accentBorder,
    workflowStatus: course.workflowStatus,
  });

  for (const phase of course.phases) {
    const phaseRow = await upsertByLegacyId(strapi, "api::phase.phase", phase.legacyId, {
      legacyId: phase.legacyId,
      slug: phase.slug,
      title: phase.title,
      label: phase.label,
      summary: phase.summary,
      order: phase.order,
      color: phase.color,
      icon: phase.icon,
      metaTags: phase.metaTags,
      objectives: phase.objectives,
      prerequisites: phase.prerequisites,
      scaffoldOnly: phase.scaffoldOnly,
      projectTitle: phase.projectTitle,
      projectDeliverable: phase.projectDeliverable,
      projectAssessment: phase.projectAssessment,
      course: relId(courseRow),
    });

    for (const mod of phase.modules) {
      const moduleRow = await upsertByLegacyId(strapi, "api::module.module", mod.legacyId, {
        legacyId: mod.legacyId,
        moduleId: mod.moduleId,
        index: mod.index,
        title: mod.title,
        subtitle: mod.subtitle,
        duration: mod.duration,
        order: mod.order,
        difficulty: mod.difficulty,
        objectives: mod.objectives,
        prerequisites: mod.prerequisites,
        openByDefault: mod.openByDefault,
        workflowStatus: mod.workflowStatus,
        contentBlocks: mod.contentBlocks,
        assessment: mod.assessment,
        phase: relId(phaseRow),
      });

      // ponytail: skip dynamic-zone `content` via db.query (relation attach bugs);
      // body already lives on module.contentBlocks for the frontend mapper.
      const lessonRow = await upsertByLegacyId(
        strapi,
        "api::lesson.lesson",
        mod.lesson.legacyId,
        {
          legacyId: mod.lesson.legacyId,
          title: mod.lesson.title,
          desc: mod.lesson.desc,
          order: mod.lesson.order,
          isRequired: mod.lesson.isRequired,
          module: relId(moduleRow),
        },
      );

      if (mod.quiz) {
        await importQuiz(strapi, mod.quiz, {
          moduleId: relId(moduleRow),
        });
      }

      for (const ex of mod.exercises) {
        await upsertByLegacyId(strapi, "api::exercise.exercise", ex.legacyId, {
          legacyId: ex.legacyId,
          title: ex.title,
          instructions: ex.instructions,
          kind: ex.kind,
          order: ex.order,
          hints: ex.hints,
          starterFiles: ex.starterFiles,
          solutionFiles: ex.solutionFiles,
          tests: ex.tests,
          validator: ex.validator,
          template: ex.template,
          attemptsBeforeSolution: ex.attemptsBeforeSolution,
          challengeEligible: ex.challengeEligible,
          validationMode: ex.validationMode,
          lesson: relId(lessonRow),
          module: relId(moduleRow),
        });
      }
    }
  }

  strapi.log.info(`Imported course draft (legacyId=${course.legacyId})`);
  return courseRow;
}

/** Backwards-compatible alias (previous docs referenced this name). */
export const importReactCourse = (strapi: Core.Strapi) => importCourse(strapi, "react");

export default { importCourse, importReactCourse };

