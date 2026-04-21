export type PhaseId = "intro" | "phase3" | "phase4" | "phase5" | "phase6";

export type PhaseColor = "intro" | "core" | "ts" | "eco" | "expert";

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
 * - `solution` is the revealable correction
 * - `hints` is a list of progressive hints
 * - `checks` describes what the learner should produce (instructions)
 */
export interface CodeExercise {
  id: string;
  title: string;
  instructions: string;
  hints?: string[];
  starterFiles: Record<string, string>;
  solutionFiles: Record<string, string>;
  template?: "react" | "react-ts" | "vanilla";
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
  id: PhaseId;
  color: PhaseColor;
  icon: string;
  label: string;
  title: string;
  summary: string;
  metaTags: string[];
  modules: Module[];
  scaffoldOnly?: boolean;
}

/* ─── User progress ─── */

export interface LessonProgress {
  readModules: string[];
  quizScores: Record<string, { correct: number; total: number; answers: Record<string, string[]>; updatedAt: number }>;
  completedExercises: string[];
  bookmarks: string[];
  theme: "dark" | "light";
}
