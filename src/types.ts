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
   * HTML enrichi avec les classes de coloration syntaxique existantes
   * (kw, fn, str, cm, jsx, prop, num, ty, op) : rendu via dangerouslySetInnerHTML
   * dans un composant dédié.
   */
  html: string;
}

/**
 * Bloc de contenu textuel d'un module. On modélise une liste de blocs
 * pour garder l'ordre de présentation flexible.
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
  /** ids des options correctes (supporte QCM à choix unique ou multiple) */
  correct: string[];
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

/**
 * Exercice de code interactif, affiché via Sandpack.
 * - `starterFiles` est le code initial fourni à l'apprenant
 * - `solution` est la correction à révéler
 * - `hints` est une liste d'indices progressifs
 * - `checks` décrit ce que l'apprenant doit produire (instructions)
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

/* ─── Progression utilisateur ─── */

export interface LessonProgress {
  readModules: string[];
  quizScores: Record<string, { correct: number; total: number; answers: Record<string, string[]>; updatedAt: number }>;
  completedExercises: string[];
  bookmarks: string[];
  theme: "dark" | "light";
}
