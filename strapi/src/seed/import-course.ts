/**
 * Idempotent course importer for Strapi (any course exported by
 * scripts/export-course-seed.ts). Upserts by legacyId through the
 * Documents API, so dynamic zones (lesson content) are populated.
 * All records stay draft until manually published.
 *
 * Usage:
 *   node dist/src/seed/run-import.js react svc
 * or inside `strapi console`:
 *   > const { importCourse } = require("./dist/src/seed/import-course");
 *   > await importCourse(strapi, "svc")
 */
import fs from "node:fs";
import path from "node:path";
import type { Core, UID } from "@strapi/strapi";

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

type Doc = { documentId: string };

/** Documents API relations are set with documentIds, never row objects. */
function docId(doc: Doc | null | undefined): string {
  if (!doc?.documentId) {
    throw new Error(`Expected a document with documentId, got ${JSON.stringify(doc)}`);
  }
  return doc.documentId;
}

async function upsertByLegacyId(
  strapi: Core.Strapi,
  uid: UID.ContentType,
  legacyId: string,
  data: Record<string, unknown>,
  locale = "fr",
): Promise<Doc> {
  const docs = strapi.documents(uid);
  const existing =
    (await docs.findFirst({ filters: { legacyId }, locale })) ??
    (await docs.findFirst({
      filters: { legacyId },
      locale,
      status: "published",
    }));
  if (existing) {
    const updated = await docs.update({
      documentId: existing.documentId,
      locale,
      // Strapi Documents API input is UID-dependent; payload is built as Record.
      data: data as never,
    });
    if (!updated) throw new Error(`Update failed for ${uid} legacyId=${legacyId}`);
    return updated;
  }
  return docs.create({ data: data as never, locale });
}

async function importQuiz(
  strapi: Core.Strapi,
  quiz: QuizPayload,
  links: { moduleDocumentId?: string; lessonDocumentId?: string },
  locale: string,
) {
  const quizData: Record<string, unknown> = {
    legacyId: quiz.legacyId,
    title: quiz.title,
    passingScore: 70,
    attemptsAllowed: 3,
  };
  // Module owns the learner-facing quiz; avoid dual oneToOne attach quirks
  if (links.moduleDocumentId) quizData.module = links.moduleDocumentId;
  else if (links.lessonDocumentId) quizData.lesson = links.lessonDocumentId;

  const quizDoc = await upsertByLegacyId(
    strapi,
    "api::quiz.quiz",
    quiz.legacyId,
    quizData,
    locale,
  );

  for (const question of quiz.questions) {
    const questionDoc = await upsertByLegacyId(
      strapi,
      "api::quiz-question.quiz-question",
      question.legacyId,
      {
        legacyId: question.legacyId,
        prompt: question.prompt,
        type: question.type,
        explanation: question.explanation,
        order: question.order,
        quiz: docId(quizDoc),
      },
      locale,
    );

    for (const answer of question.answers) {
      await upsertByLegacyId(
        strapi,
        "api::quiz-answer.quiz-answer",
        answer.legacyId,
        {
          legacyId: answer.legacyId,
          label: answer.label,
          isCorrect: answer.isCorrect,
          order: answer.order,
          question: docId(questionDoc),
        },
        locale,
      );
    }
  }

  return quizDoc;
}

export async function importCourse(
  strapi: Core.Strapi,
  courseId = "react",
  locale = "fr",
) {
  const fileName =
    locale === "fr"
      ? `${courseId}-course.json`
      : `${courseId}-course.${locale}.json`;
  const altName = `${courseId}-course.${locale}.json`;
  const candidates = [
    path.join(__dirname, "data", altName),
    path.join(__dirname, "data", fileName),
    path.join(process.cwd(), "src", "seed", "data", altName),
    path.join(process.cwd(), "src", "seed", "data", fileName),
  ];
  const file = candidates.find((p) => fs.existsSync(p));
  if (!file) {
    throw new Error(
      `Missing seed for ${courseId} locale=${locale} (looked in: ${candidates.join(", ")}). ` +
        `Run: npm run export:strapi-seed -- ${courseId} --locale ${locale}`,
    );
  }

  const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as {
    locale?: string;
    course: CoursePayload;
  };
  const course = parsed.course;
  const effectiveLocale = parsed.locale ?? locale;

  const courseDoc = await upsertByLegacyId(
    strapi,
    "api::course.course",
    course.legacyId,
    {
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
    },
    effectiveLocale,
  );

  for (const phase of course.phases) {
    const phaseDoc = await upsertByLegacyId(
      strapi,
      "api::phase.phase",
      phase.legacyId,
      {
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
        course: docId(courseDoc),
      },
      effectiveLocale,
    );

    for (const mod of phase.modules) {
      const moduleDoc = await upsertByLegacyId(
        strapi,
        "api::module.module",
        mod.legacyId,
        {
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
          phase: docId(phaseDoc),
        },
        effectiveLocale,
      );

      const lessonDoc = await upsertByLegacyId(
        strapi,
        "api::lesson.lesson",
        mod.lesson.legacyId,
        {
          legacyId: mod.lesson.legacyId,
          title: mod.lesson.title,
          desc: mod.lesson.desc,
          order: mod.lesson.order,
          isRequired: mod.lesson.isRequired,
          content: mod.lesson.content,
          module: docId(moduleDoc),
        },
        effectiveLocale,
      );

      if (mod.quiz) {
        await importQuiz(
          strapi,
          mod.quiz,
          { moduleDocumentId: docId(moduleDoc) },
          effectiveLocale,
        );
      }

      for (const ex of mod.exercises) {
        await upsertByLegacyId(
          strapi,
          "api::exercise.exercise",
          ex.legacyId,
          {
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
            lesson: docId(lessonDoc),
            module: docId(moduleDoc),
          },
          effectiveLocale,
        );
      }
    }
  }

  strapi.log.info(
    `Imported course draft (legacyId=${course.legacyId}, locale=${effectiveLocale})`,
  );
  return courseDoc;
}

/** Backwards-compatible alias (previous docs referenced this name). */
export const importReactCourse = (strapi: Core.Strapi) => importCourse(strapi, "react");

export default { importCourse, importReactCourse };
