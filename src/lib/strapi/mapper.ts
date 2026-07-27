import type {
  CodeExercise,
  ContentBlock,
  Course,
  CourseMeta,
  Module,
  Phase,
  Quiz,
  QuizQuestion,
} from "@/types";
import type {
  StrapiCourseAttrs,
  StrapiExerciseAttrs,
  StrapiModuleAttrs,
  StrapiPhaseAttrs,
  StrapiQuizAttrs,
  StrapiQuizQuestionAttrs,
} from "./types";

function unwrapRelation<T>(value: { data?: T | T[] | null } | T[] | T | null | undefined): T[] {
  if (value == null) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "object" && "data" in value) {
    const data = value.data;
    if (data == null) return [];
    return Array.isArray(data) ? data : [data];
  }
  return [value as T];
}

function unwrapOne<T>(value: { data?: T | null } | T | null | undefined): T | null {
  if (value == null) return null;
  if (typeof value === "object" && "data" in value) {
    return (value.data as T | null) ?? null;
  }
  return value as T;
}

/** Flatten Strapi v4 attributes wrapper or v5 flat document. */
export function flatten<T extends object>(
  entity: (T & { id?: unknown; documentId?: string; attributes?: T }) | null | undefined,
): (T & { id?: unknown; documentId?: string }) | null {
  if (!entity) return null;
  if (entity.attributes && typeof entity.attributes === "object") {
    return { id: entity.id, documentId: entity.documentId, ...entity.attributes };
  }
  return entity;
}

function mapQuestion(raw: StrapiQuizQuestionAttrs): QuizQuestion {
  const q = flatten(raw as StrapiQuizQuestionAttrs & { attributes?: StrapiQuizQuestionAttrs })!;
  const answers = unwrapRelation(q.answers).map((a) => flatten(a)!);
  return {
    id: String(q.legacyId ?? q.prompt),
    question: q.prompt,
    options: answers.map((a) => ({
      id: String(a.legacyId ?? a.label),
      label: a.label,
    })),
    // Public API strips isCorrect : keep empty; scoring stays server-side later
    correct: [],
    explanation: q.explanation,
  };
}

export function mapQuiz(raw: StrapiQuizAttrs | null | undefined): Quiz | undefined {
  const quiz = flatten(raw as StrapiQuizAttrs & { attributes?: StrapiQuizAttrs });
  if (!quiz?.legacyId) return undefined;
  const questions = unwrapRelation(quiz.questions).map(mapQuestion);
  return {
    id: quiz.legacyId,
    title: quiz.title,
    questions,
  };
}

export function mapExercise(raw: StrapiExerciseAttrs): CodeExercise {
  const ex = flatten(raw as StrapiExerciseAttrs & { attributes?: StrapiExerciseAttrs })!;
  return {
    id: ex.legacyId,
    title: ex.title,
    instructions: ex.instructions ?? "",
    hints: ex.hints,
    starterFiles: ex.starterFiles ?? {},
    // Private fields absent from public responses : empty until authenticated fetch
    solutionFiles: ex.solutionFiles ?? {},
    tests: ex.tests,
    validator: ex.validator,
    template: ex.template,
    attemptsBeforeSolution: ex.attemptsBeforeSolution,
    challengeEligible: ex.challengeEligible,
  };
}

function mapContentBlocks(raw: unknown): ContentBlock[] {
  if (Array.isArray(raw) && raw.length > 0 && raw[0] && typeof raw[0] === "object" && "kind" in (raw[0] as object)) {
    return raw as ContentBlock[];
  }
  if (!Array.isArray(raw)) return [];

  const blocks: ContentBlock[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const block = item as Record<string, unknown>;
    const component = String(block.__component ?? "");
    if (component.includes("callout")) {
      blocks.push({
        kind: "info",
        box: {
          variant: (block.variant as "tip" | "warn" | "note" | "concept") ?? "note",
          title: String(block.title ?? ""),
          body: String(block.body ?? ""),
        },
      });
    } else if (component.includes("code")) {
      blocks.push({
        kind: "code",
        sample: {
          label: String(block.label ?? "Exemple"),
          html: String(block.code ?? ""),
        },
      });
    } else if (component.includes("video")) {
      const providerId = String(block.providerId ?? "").trim();
      if (!providerId) continue;
      blocks.push({
        kind: "video",
        video: {
          provider:
            (block.provider as
              | "mux"
              | "vimeo"
              | "bunny"
              | "youtube"
              | "other") ?? "other",
          providerId,
          title: block.title ? String(block.title) : undefined,
          durationSeconds:
            typeof block.durationSeconds === "number"
              ? block.durationSeconds
              : undefined,
        },
      });
    } else if (component.includes("text")) {
      const body = String(block.body ?? "");
      if (body.startsWith("<h2>")) {
        blocks.push({ kind: "title", text: body.replace(/<\/?h2>/g, "") });
      } else {
        blocks.push({ kind: "paragraph", html: body });
      }
    }
  }
  return blocks;
}

export function mapModule(raw: StrapiModuleAttrs): Module {
  const mod = flatten(raw as StrapiModuleAttrs & { attributes?: StrapiModuleAttrs })!;
  const lessons = unwrapRelation(mod.lessons).map((l) => flatten(l)!);
  const primaryLesson = lessons[0];
  const content =
    (mod.contentBlocks as ContentBlock[] | undefined) ??
    mapContentBlocks(primaryLesson?.content);

  const quiz =
    mapQuiz(unwrapOne(mod.quiz) as StrapiQuizAttrs | null) ??
    mapQuiz(unwrapOne(primaryLesson?.quiz) as StrapiQuizAttrs | null);

  const exercises = [
    ...unwrapRelation(mod.exercises),
    ...unwrapRelation(primaryLesson?.exercises),
  ].map((e) => mapExercise(flatten(e)!));

  // Deduplicate by id (module + lesson may both link the same exercises)
  const uniqueExercises = [...new Map(exercises.map((e) => [e.id, e])).values()];

  return {
    id: mod.legacyId,
    index: mod.index ?? "00",
    title: mod.title,
    subtitle: mod.subtitle ?? "",
    duration: mod.duration ?? "",
    openByDefault: mod.openByDefault,
    objectives: mod.objectives,
    prerequisites: mod.prerequisites,
    difficulty: mod.difficulty as Module["difficulty"],
    status: mod.workflowStatus as Module["status"],
    content,
    quiz,
    exercises: uniqueExercises.length ? uniqueExercises : undefined,
    assessment: mod.assessment as Module["assessment"],
  };
}

export function mapPhase(raw: StrapiPhaseAttrs, courseId?: string): Phase {
  const phase = flatten(raw as StrapiPhaseAttrs & { attributes?: StrapiPhaseAttrs })!;
  const modules = unwrapRelation(phase.modules)
    .map((m) => mapModule(flatten(m)!))
    .sort((a, b) => a.index.localeCompare(b.index));

  return {
    id: phase.legacyId,
    slug: phase.slug,
    courseId,
    color: (phase.color as Phase["color"]) ?? "intro",
    icon: phase.icon ?? "fa-book",
    label: phase.label ?? phase.title,
    title: phase.title,
    summary: phase.summary ?? "",
    metaTags: phase.metaTags ?? [],
    objectives: phase.objectives,
    prerequisites: phase.prerequisites,
    modules,
    project:
      phase.projectTitle && phase.projectDeliverable
        ? {
            title: phase.projectTitle,
            deliverable: phase.projectDeliverable,
            assessment: phase.projectAssessment ?? [],
          }
        : undefined,
    scaffoldOnly: phase.scaffoldOnly,
  };
}

export function mapCourse(raw: StrapiCourseAttrs): Course {
  const course = flatten(raw as StrapiCourseAttrs & { attributes?: StrapiCourseAttrs })!;
  const phases = unwrapRelation(course.phases)
    .map((p) => mapPhase(flatten(p)!, course.legacyId))
    .sort((a, b) => (a.slug ?? a.id).localeCompare(b.slug ?? b.id));

  const meta: CourseMeta = {
    title: course.title,
    tagline: course.tagline ?? "",
    description: course.description ?? "",
    icon: course.icon ?? "fa-book",
    iconFamily: course.iconFamily,
    accent: {
      text: course.accentText ?? "text-brand-core",
      bg: course.accentBg ?? "bg-brand-core/10",
      border: course.accentBorder ?? "border-brand-core/30",
    },
    tags: [],
    level: "Tous niveaux",
    duration: course.duration ?? "",
    status: "active",
  };

  return {
    id: course.legacyId,
    slug: course.slug,
    meta,
    phases,
  };
}
