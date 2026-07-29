/** Minimal Strapi REST shapes used by the frontend mapper. */

export type StrapiId = number | string;

export interface StrapiEntity<T> {
  id: StrapiId;
  documentId?: string;
  attributes?: T;
  // Strapi v5 flat documents also expose fields at the root
  [key: string]: unknown;
}

export interface StrapiListResponse<T> {
  data: Array<StrapiEntity<T> | (T & { id: StrapiId; documentId?: string })>;
  meta?: unknown;
}

export interface StrapiSingleResponse<T> {
  data: (StrapiEntity<T> | (T & { id: StrapiId; documentId?: string })) | null;
  meta?: unknown;
}

export interface StrapiQuizAnswerAttrs {
  legacyId?: string;
  label: string;
  feedback?: string;
  order?: number;
}

export interface StrapiQuizQuestionAttrs {
  legacyId?: string;
  prompt: string;
  type?: "single" | "multi";
  explanation?: string;
  order?: number;
  answers?: { data?: StrapiQuizAnswerAttrs[] } | StrapiQuizAnswerAttrs[];
}

export interface StrapiQuizAttrs {
  legacyId: string;
  title: string;
  questions?: { data?: StrapiQuizQuestionAttrs[] } | StrapiQuizQuestionAttrs[];
}

export interface StrapiExerciseAttrs {
  legacyId: string;
  title: string;
  instructions?: string;
  kind?: string;
  order?: number;
  hints?: string[];
  starterFiles?: Record<string, unknown>;
  template?: "react" | "react-ts" | "vanilla";
  attemptsBeforeSolution?: number;
  challengeEligible?: boolean;
  // private fields : absent from public API
  solutionFiles?: Record<string, unknown>;
  tests?: Record<string, unknown>;
  validator?: string;
}

export interface StrapiLessonAttrs {
  legacyId: string;
  title: string;
  desc?: string;
  duration?: string;
  order?: number;
  tags?: string[];
  outline?: unknown;
  content?: unknown[];
  quiz?: { data?: StrapiQuizAttrs | null } | StrapiQuizAttrs | null;
  exercises?: { data?: StrapiExerciseAttrs[] } | StrapiExerciseAttrs[];
}

export interface StrapiModuleAttrs {
  legacyId: string;
  moduleId?: string;
  index?: string;
  title: string;
  subtitle?: string;
  duration?: string;
  order?: number;
  difficulty?: string;
  objectives?: string[];
  prerequisites?: string[];
  openByDefault?: boolean;
  workflowStatus?: string;
  contentBlocks?: unknown[];
  assessment?: unknown;
  lessons?: { data?: StrapiLessonAttrs[] } | StrapiLessonAttrs[];
  quiz?: { data?: StrapiQuizAttrs | null } | StrapiQuizAttrs | null;
  exercises?: { data?: StrapiExerciseAttrs[] } | StrapiExerciseAttrs[];
}

export interface StrapiPhaseAttrs {
  legacyId: string;
  slug?: string;
  title: string;
  label?: string;
  summary?: string;
  order?: number;
  color?: string;
  icon?: string;
  metaTags?: string[];
  objectives?: string[];
  prerequisites?: string[];
  scaffoldOnly?: boolean;
  projectTitle?: string;
  projectDeliverable?: string;
  projectAssessment?: string[];
  modules?: { data?: StrapiModuleAttrs[] } | StrapiModuleAttrs[];
}

export interface StrapiCourseAttrs {
  legacyId: string;
  title: string;
  slug: string;
  tagline?: string;
  description?: string;
  icon?: string;
  iconFamily?: "fa-solid" | "fa-brands";
  level?: string;
  duration?: string;
  accentText?: string;
  accentBg?: string;
  accentBorder?: string;
  workflowStatus?: string;
  phases?: { data?: StrapiPhaseAttrs[] } | StrapiPhaseAttrs[];
}
