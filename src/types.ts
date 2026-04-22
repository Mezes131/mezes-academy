/* ═══════════════════════════════════════════════════════════════════
   DOMAIN TYPES
   Open, course-agnostic types. New courses (TypeScript, Next.js, …)
   can be added without changing these definitions.
   ═══════════════════════════════════════════════════════════════════ */

/** Course identifier, e.g. "react", "typescript". Used as URL slug. */
export type CourseId = string;

/** Phase slug inside a course, e.g. "intro", "core", "typescript". */
export type PhaseSlug = string;

/**
 * Legacy phase id kept for backwards-compatible imports. New code should
 * prefer the prefixed form "<courseId>-<phaseSlug>".
 */
export type PhaseId = string;

export type PhaseColor =
  | "intro"
  | "core"
  | "ts"
  | "eco"
  | "expert"
  | (string & {});

export interface Lesson {
  id: string;
  title: string;
  desc: string;
  tags?: string[];
}

export type InfoBoxVariant = "tip" | "warn" | "note" | "concept";

export interface InfoBox {
  variant: InfoBoxVariant;
  title: string;
  body: string;
}

export interface CodeSample {
  label: string;
  /**
   * HTML enriched with existing syntax highlighting classes
   * (kw, fn, str, cm, jsx, prop, num, ty, op), rendered via dangerouslySetInnerHTML
   * in a dedicated component.
   */
  html: string;
}

/**
 * Textual content block for a module. Modeled as a list of blocks
 * to keep presentation order flexible.
 */
export type ContentBlock =
  | { kind: "title"; text: string }
  | { kind: "paragraph"; html: string }
  | { kind: "info"; box: InfoBox }
  | { kind: "highlight"; html: string }
  | { kind: "lessons"; items: Lesson[] }
  | { kind: "code"; sample: CodeSample };

export interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; label: string }[];
  /** ids of correct options (supports single- or multi-select MCQ) */
  correct: string[];
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

/**
 * Interactive code exercise rendered via Sandpack.
 * - `starterFiles` is the initial code provided to the learner
 * - `solutionFiles` is the revealable correction
 * - `hints` is a list of progressive hints
 * - `tests` are optional Sandpack-executable test files (keys like
 *   "/App.test.tsx"). When provided, the exercise can be auto-validated
 *   via the "Run" button: passing the whole suite marks the exo as solved.
 * - `validator` is an optional local (offline) JS snippet executed when
 *   clicking Run. It receives `files` (current sandbox code map) and must
 *   `return { passed, total, failures? }`. This avoids depending on remote
 *   test infra and works even with restricted networks.
 * - `attemptsBeforeSolution` gates the "Reveal solution" button until
 *   the learner has actually tried (default: 5 runs).
 * - `challengeEligible` flags the exercise as reusable in the end-of-phase
 *   challenge (default: true).
 */
export interface CodeExercise {
  id: string;
  title: string;
  instructions: string;
  hints?: string[];
  starterFiles: Record<string, string>;
  solutionFiles: Record<string, string>;
  tests?: Record<string, string>;
  validator?: string;
  template?: "react" | "react-ts" | "vanilla";
  attemptsBeforeSolution?: number;
  challengeEligible?: boolean;
}

export interface Module {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  duration: string;
  openByDefault?: boolean;
  content: ContentBlock[];
  quiz?: Quiz;
  exercises?: CodeExercise[];
}

export interface Phase {
  /** Prefixed id, e.g. "react-core". Guaranteed unique across all courses. */
  id: string;
  /** Short slug, e.g. "core". Unique inside its course only. */
  slug?: PhaseSlug;
  /** Parent course id, e.g. "react". Optional for legacy Phase objects. */
  courseId?: CourseId;
  color: PhaseColor;
  icon: string;
  label: string;
  title: string;
  summary: string;
  metaTags: string[];
  modules: Module[];
  scaffoldOnly?: boolean;
}

/* ─── Course (top-level) ──────────────────────────────────────── */

export interface CourseMeta {
  /** Display title shown in the catalog and inside the course. */
  title: string;
  tagline: string;
  description: string;
  icon: string;
  iconFamily?: "fa-solid" | "fa-brands";
  /** Tailwind accent classes used by the catalog card. */
  accent: { text: string; bg: string; border: string };
  tags: string[];
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Tous niveaux";
  duration: string;
  status: "active" | "soon" | "planned";
  eta?: string;
}

export interface Course {
  id: CourseId;
  /** URL slug (usually equal to `id`). */
  slug: string;
  meta: CourseMeta;
  phases: Phase[];
}

/* ─── User progress ─── */

export type ExerciseStatus =
  /** Never opened or no activity tracked. */
  | "not-started"
  /** At least one Run has happened, not solved yet, solution not revealed. */
  | "attempted"
  /** Test suite passed without revealing the solution. */
  | "solved"
  /** Learner clicked "Reveal solution" before solving. */
  | "revealed";

export interface ExerciseProgress {
  status: ExerciseStatus;
  attempts: number;
  hintsUsed: number;
  revealedSolution: boolean;
  solvedAt?: number;
  updatedAt: number;
}

export interface ChallengeScore {
  phaseId: string;
  exerciseIds: string[];
  passedIds: string[];
  total: number;
  at: number;
}

export interface LessonProgress {
  readModules: string[];
  quizScores: Record<
    string,
    {
      correct: number;
      total: number;
      answers: Record<string, string[]>;
      updatedAt: number;
    }
  >;
  /**
   * Legacy flat list: ids of exercises considered "done". Kept as a derived
   * mirror of `exerciseProgress` (status === "solved" || "revealed") for
   * backwards-compatible code paths.
   */
  completedExercises: string[];
  /** Per-exercise rich tracking (status, attempts, hints, reveal). */
  exerciseProgress: Record<string, ExerciseProgress>;
  /** Per-phase challenge results (exam mode, no "Reveal solution"). */
  challengeScores: Record<string, ChallengeScore>;
  bookmarks: string[];
  theme: "dark" | "light";
}
