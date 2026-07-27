/**
 * Export reactCourse into a JSON payload for the Strapi seed importer.
 * Run: npx tsx scripts/export-react-course-seed.ts
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { reactCourse } from "../src/data/courses/react";
import type { ContentBlock, Module, Phase, Quiz, CodeExercise } from "../src/types";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
      case "lessons":
        return {
          __component: "lesson.text-block",
          body: `<ul>${block.items.map((l) => `<li><strong>${l.title}</strong> — ${l.desc ?? ""}</li>`).join("")}</ul>`,
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

function mapExercise(ex: CodeExercise, order: number) {
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

const payload = {
  exportedAt: new Date().toISOString(),
  course: {
    legacyId: reactCourse.id,
    title: reactCourse.meta.title,
    slug: reactCourse.slug,
    tagline: reactCourse.meta.tagline,
    description: reactCourse.meta.description,
    icon: reactCourse.meta.icon,
    iconFamily: reactCourse.meta.iconFamily ?? "fa-solid",
    level: "beginner",
    duration: reactCourse.meta.duration,
    accentText: reactCourse.meta.accent.text,
    accentBg: reactCourse.meta.accent.bg,
    accentBorder: reactCourse.meta.accent.border,
    workflowStatus: "draft",
    phases: reactCourse.phases.map(mapPhase),
  },
};

const out = resolve(__dirname, "../strapi/src/seed/data/react-course.json");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(payload, null, 2), "utf8");
console.log(`Wrote ${out}`);
