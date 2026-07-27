/**
 * Export a course from the registry into a JSON payload for the Strapi
 * seed importer.
 * Run: npx tsx scripts/export-course-seed.ts [courseId] [--locale fr|en]
 * Output: strapi/src/seed/data/<courseId>-course.<locale>.json
 *         and <courseId>-course.json for fr (compat).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getCourses } from "../src/data/courses";
import type { Locale } from "../src/i18n/types";
import { isLocale } from "../src/i18n/types";
import type {
  ContentBlock,
  Course,
  CourseMeta,
  Module,
  ModuleExercise,
  Phase,
  Quiz,
  AuditExercise,
  CodeExercise,
} from "../src/types";
import { isAuditExercise } from "../src/types";

const __dirname = dirname(fileURLToPath(import.meta.url));

const LEVEL_MAP: Record<CourseMeta["level"], string> = {
  Débutant: "beginner",
  Intermédiaire: "intermediate",
  Avancé: "advanced",
  "Tous niveaux": "beginner",
};

function mapContentBlocks(blocks: ContentBlock[]) {
  return blocks.map((block) => {
    switch (block.kind) {
      case "title":
        return { __component: "lesson.text-block", body: `<h2>${block.text}</h2>` };
      case "paragraph":
        return { __component: "lesson.text-block", body: block.html };
      case "highlight":
        return { __component: "lesson.text-block", body: `<p><em>${block.html}</em></p>` };
      case "info":
        return {
          __component: "lesson.callout-block",
          variant: block.box.variant,
          title: block.box.title,
          body: block.box.body,
        };
      case "code":
        return {
          __component: "lesson.code-block",
          label: block.sample.label,
          language: "tsx",
          code: block.sample.html,
        };
      case "video":
        if (!block.video.providerId?.trim()) {
          return { __component: "lesson.text-block", body: "" };
        }
        return {
          __component: "lesson.video-block",
          provider: block.video.provider,
          providerId: block.video.providerId,
          title: block.video.title ?? null,
          durationSeconds: block.video.durationSeconds ?? null,
        };
      case "lessons":
        return {
          __component: "lesson.text-block",
          body: `<ul>${block.items.map((l) => `<li><strong>${l.title}</strong> : ${l.desc ?? ""}</li>`).join("")}</ul>`,
        };
      default:
        return { __component: "lesson.text-block", body: "" };
    }
  });
}

function mapQuiz(quiz: Quiz) {
  return {
    legacyId: quiz.id,
    title: quiz.title,
    questions: quiz.questions.map((q, qi) => ({
      legacyId: `${quiz.id}-${q.id}`,
      prompt: q.question,
      type: q.correct.length > 1 ? "multi" : "single",
      explanation: q.explanation ?? null,
      order: qi,
      answers: q.options.map((opt, ai) => ({
        legacyId: `${quiz.id}-${q.id}-${opt.id}`,
        label: opt.label,
        isCorrect: q.correct.includes(opt.id),
        order: ai,
      })),
    })),
  };
}

function mapCodeExercise(ex: CodeExercise, order: number) {
  return {
    legacyId: ex.id,
    title: ex.title,
    instructions: ex.instructions,
    kind: "code",
    order,
    hints: ex.hints ?? [],
    starterFiles: ex.starterFiles,
    solutionFiles: ex.solutionFiles,
    tests: ex.tests ?? null,
    validator: ex.validator ?? null,
    template: ex.template ?? "react",
    attemptsBeforeSolution: ex.attemptsBeforeSolution ?? 5,
    challengeEligible: ex.challengeEligible ?? true,
    validationMode: "local",
  };
}

/** Audit payload rides in starterFiles/solutionFiles JSON (no new Strapi attrs). */
function mapAuditExercise(ex: AuditExercise, order: number) {
  return {
    legacyId: ex.id,
    title: ex.title,
    instructions: ex.instructions,
    kind: "audit",
    order,
    hints: ex.hints ?? [],
    starterFiles: {
      __format: "audit",
      scenario: ex.scenario,
      findings: ex.findings,
      requireEvidence: ex.requireEvidence ?? false,
      passingScore: ex.passingScore ?? 0.7,
    },
    solutionFiles: ex.solution ? { __solution: ex.solution } : {},
    tests: null,
    validator: null,
    template: "vanilla",
    attemptsBeforeSolution: ex.attemptsBeforeSolution ?? 3,
    challengeEligible: ex.challengeEligible ?? false,
    validationMode: "local",
  };
}

function mapExercise(ex: ModuleExercise, order: number) {
  return isAuditExercise(ex)
    ? mapAuditExercise(ex, order)
    : mapCodeExercise(ex, order);
}

function mapModule(mod: Module, order: number) {
  const lessonBlocks = mapContentBlocks(mod.content);
  return {
    legacyId: mod.id,
    moduleId: mod.id,
    index: mod.index,
    title: mod.title,
    subtitle: mod.subtitle,
    duration: mod.duration,
    order,
    difficulty: mod.difficulty ?? null,
    objectives: mod.objectives ?? [],
    prerequisites: mod.prerequisites ?? [],
    openByDefault: mod.openByDefault ?? false,
    workflowStatus: "draft",
    contentBlocks: mod.content,
    assessment: mod.assessment ?? null,
    lesson: {
      legacyId: `${mod.id}-lesson`,
      title: mod.title,
      desc: mod.subtitle,
      order: 0,
      isRequired: true,
      content: lessonBlocks,
    },
    quiz: mod.quiz ? mapQuiz(mod.quiz) : null,
    exercises: (mod.exercises ?? []).map(mapExercise),
  };
}

function mapPhase(phase: Phase, order: number) {
  return {
    legacyId: phase.id,
    slug: phase.slug ?? phase.id,
    title: phase.title,
    label: phase.label,
    summary: phase.summary,
    order,
    color: phase.color,
    icon: phase.icon,
    metaTags: phase.metaTags,
    objectives: phase.objectives ?? [],
    prerequisites: phase.prerequisites ?? [],
    scaffoldOnly: phase.scaffoldOnly ?? false,
    projectTitle: phase.project?.title ?? null,
    projectDeliverable: phase.project?.deliverable ?? null,
    projectAssessment: phase.project?.assessment ?? null,
    modules: phase.modules.map(mapModule),
  };
}

function buildPayload(course: Course, locale: Locale) {
  return {
    exportedAt: new Date().toISOString(),
    locale,
    course: {
      legacyId: course.id,
      title: course.meta.title,
      slug: course.slug,
      tagline: course.meta.tagline,
      description: course.meta.description,
      icon: course.meta.icon,
      iconFamily: course.meta.iconFamily ?? "fa-solid",
      level: LEVEL_MAP[course.meta.level],
      duration: course.meta.duration,
      accentText: course.meta.accent.text,
      accentBg: course.meta.accent.bg,
      accentBorder: course.meta.accent.border,
      workflowStatus: "draft",
      phases: course.phases.map(mapPhase),
    },
  };
}

const args = process.argv.slice(2).filter((a) => a !== "--");
const localeArgIdx = args.findIndex((a) => a === "--locale");
const localeRaw = localeArgIdx >= 0 ? args[localeArgIdx + 1] : "fr";
const locale: Locale = isLocale(localeRaw) ? localeRaw : "fr";
const courseId =
  args.find((a, i) => i !== localeArgIdx && i !== localeArgIdx + 1) ?? "react";

const course = getCourses(locale).find((c) => c.id === courseId);
if (!course) {
  console.error(
    `Unknown course "${courseId}". Available: ${getCourses(locale)
      .map((c) => c.id)
      .join(", ")}`,
  );
  process.exit(1);
}

const payload = buildPayload(course, locale);
const dataDir = resolve(__dirname, "../strapi/src/seed/data");
mkdirSync(dataDir, { recursive: true });
const localizedOut = resolve(dataDir, `${courseId}-course.${locale}.json`);
writeFileSync(localizedOut, JSON.stringify(payload, null, 2), "utf8");
console.log(`Wrote ${localizedOut}`);
if (locale === "fr") {
  const compatOut = resolve(dataDir, `${courseId}-course.json`);
  writeFileSync(compatOut, JSON.stringify(payload, null, 2), "utf8");
  console.log(`Wrote ${compatOut} (compat)`);
}
