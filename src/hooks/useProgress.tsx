import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LessonProgress } from "@/types";
import { phases, totalProgressItems } from "@/data/phases";

const STORAGE_KEY_V1 = "react-learn:progress:v1";
const STORAGE_KEY = "react-learn:progress:v2";

const DEFAULT_PROGRESS: LessonProgress = {
  readModules: [],
  quizScores: {},
  completedExercises: [],
  bookmarks: [],
  theme: "dark",
};

/**
 * ID renaming applied when migrating v1 → v2:
 * flat ids ("m11", "quiz-m11", "ex-m11-1", "intro-01"…) are rewritten
 * into their prefixed form ("react-core-m11", "react-core-quiz-m11", …).
 */
function migrateId(oldId: string): string {
  // Already prefixed (e.g. "react-core-m11") — nothing to do
  if (oldId.startsWith("react-")) return oldId;

  // Intro phase: "intro-01" → "react-intro-m01", "quiz-intro-01" → "react-intro-quiz-m01",
  //              "ex-intro-03" → "react-intro-ex-m03"
  const introQuiz = /^quiz-intro-(\d+)$/.exec(oldId);
  if (introQuiz) return `react-intro-quiz-m${introQuiz[1]}`;
  const introEx = /^ex-intro-(\d+)$/.exec(oldId);
  if (introEx) return `react-intro-ex-m${introEx[1]}`;
  const introMod = /^intro-(\d+)$/.exec(oldId);
  if (introMod) return `react-intro-m${introMod[1]}`;

  // Core phase: "m11" → "react-core-m11", "quiz-m11" → "react-core-quiz-m11",
  //             "ex-m11-1" → "react-core-ex-m11-1"
  const coreQuiz = /^quiz-(m\d+)$/.exec(oldId);
  if (coreQuiz) return `react-core-quiz-${coreQuiz[1]}`;
  const coreEx = /^ex-(m\d+)-(\d+)$/.exec(oldId);
  if (coreEx) return `react-core-ex-${coreEx[1]}-${coreEx[2]}`;
  const coreMod = /^m\d+$/.exec(oldId);
  if (coreMod) return `react-core-${oldId}`;

  // Unknown shape — leave untouched so no data is lost
  return oldId;
}

function migrateProgress(raw: Partial<LessonProgress>): LessonProgress {
  const quizScores: LessonProgress["quizScores"] = {};
  for (const [id, score] of Object.entries(raw.quizScores ?? {})) {
    quizScores[migrateId(id)] = score;
  }
  return {
    ...DEFAULT_PROGRESS,
    ...raw,
    readModules: (raw.readModules ?? []).map(migrateId),
    completedExercises: (raw.completedExercises ?? []).map(migrateId),
    bookmarks: (raw.bookmarks ?? []).map(migrateId),
    quizScores,
  };
}

function load(): LessonProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const rawV2 = window.localStorage.getItem(STORAGE_KEY);
    if (rawV2) {
      const parsed = JSON.parse(rawV2) as Partial<LessonProgress>;
      return { ...DEFAULT_PROGRESS, ...parsed };
    }

    // One-shot migration from v1 — transparent to the user, happens once.
    const rawV1 = window.localStorage.getItem(STORAGE_KEY_V1);
    if (rawV1) {
      const migrated = migrateProgress(
        JSON.parse(rawV1) as Partial<LessonProgress>,
      );
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      window.localStorage.removeItem(STORAGE_KEY_V1);
      return migrated;
    }

    return DEFAULT_PROGRESS;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function save(progress: LessonProgress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    /* ignore */
  }
}

interface ProgressContextValue {
  progress: LessonProgress;
  stats: {
    total: number;
    done: number;
    percent: number;
    quizPassed: number;
  };
  phaseStats: Array<{
    id: string;
    label: string;
    color: string;
    total: number;
    done: number;
    percent: number;
  }>;
  markModuleRead: (moduleId: string) => void;
  canMarkModuleRead: (moduleId: string) => boolean;
  saveQuizScore: (
    quizId: string,
    correct: number,
    total: number,
    answers: Record<string, string[]>,
  ) => void;
  clearQuizScore: (quizId: string) => void;
  markExerciseComplete: (exerciseId: string) => void;
  toggleBookmark: (lessonId: string) => void;
  setTheme: (theme: "dark" | "light") => void;
  reset: () => void;
  exportJson: () => string;
  importJson: (raw: string) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<LessonProgress>(load);

  useEffect(() => {
    save(progress);
  }, [progress]);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setProgress(JSON.parse(e.newValue));
        } catch {
          /* noop */
        }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const canMarkModuleRead = useCallback(
    (moduleId: string) => {
      const found = phases
        .flatMap((phase) => phase.modules)
        .find((module) => module.id === moduleId);
      if (!found?.quiz) return true;
      const score = progress.quizScores[found.quiz.id];
      return Boolean(score && score.total > 0 && score.correct / score.total >= 0.7);
    },
    [progress.quizScores],
  );

  const markModuleRead = useCallback((moduleId: string) => {
    if (!canMarkModuleRead(moduleId)) return;
    setProgress((p) =>
      p.readModules.includes(moduleId)
        ? p
        : { ...p, readModules: [...p.readModules, moduleId] },
    );
  }, [canMarkModuleRead]);

  const saveQuizScore = useCallback(
    (
      quizId: string,
      correct: number,
      total: number,
      answers: Record<string, string[]>,
    ) => {
      setProgress((p) => ({
        ...p,
        quizScores: {
          ...p.quizScores,
          [quizId]: { correct, total, answers, updatedAt: Date.now() },
        },
      }));
    },
    [],
  );

  const clearQuizScore = useCallback((quizId: string) => {
    setProgress((p) => {
      if (!(quizId in p.quizScores)) return p;
      const nextScores = { ...p.quizScores };
      delete nextScores[quizId];
      // A quiz that is no longer validated must no longer gate its module
      // as "read": we also remove the module from readModules if its quiz
      // was the one being reset, so progress stays coherent.
      const owningModule = phases
        .flatMap((phase) => phase.modules)
        .find((mod) => mod.quiz?.id === quizId);
      const nextReadModules =
        owningModule && p.readModules.includes(owningModule.id)
          ? p.readModules.filter((id) => id !== owningModule.id)
          : p.readModules;
      return { ...p, quizScores: nextScores, readModules: nextReadModules };
    });
  }, []);

  const markExerciseComplete = useCallback((exerciseId: string) => {
    setProgress((p) =>
      p.completedExercises.includes(exerciseId)
        ? p
        : { ...p, completedExercises: [...p.completedExercises, exerciseId] },
    );
  }, []);

  const toggleBookmark = useCallback((lessonId: string) => {
    setProgress((p) => {
      const has = p.bookmarks.includes(lessonId);
      return {
        ...p,
        bookmarks: has
          ? p.bookmarks.filter((id) => id !== lessonId)
          : [...p.bookmarks, lessonId],
      };
    });
  }, []);

  const setTheme = useCallback((theme: "dark" | "light") => {
    setProgress((p) => ({ ...p, theme }));
  }, []);

  const reset = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
  }, []);

  const exportJson = useCallback(
    () => JSON.stringify(progress, null, 2),
    [progress],
  );

  const importJson = useCallback((raw: string) => {
    const parsed = JSON.parse(raw) as Partial<LessonProgress>;
    setProgress({ ...DEFAULT_PROGRESS, ...parsed });
  }, []);

  const stats = useMemo(() => {
    const total = totalProgressItems();
    const quizPassed = Object.values(progress.quizScores).filter(
      (s) => s.total > 0 && s.correct / s.total >= 0.7,
    ).length;
    const done =
      progress.readModules.length +
      quizPassed +
      progress.completedExercises.length;
    return {
      total,
      done,
      percent: total === 0 ? 0 : Math.min(100, Math.round((done / total) * 100)),
      quizPassed,
    };
  }, [progress]);

  const phaseStats = useMemo(
    () =>
      phases.map((phase) => {
        let phaseTotal = 0;
        let phaseDone = 0;
        for (const mod of phase.modules) {
          phaseTotal += 1;
          if (progress.readModules.includes(mod.id)) phaseDone += 1;
          if (mod.quiz) {
            phaseTotal += 1;
            const s = progress.quizScores[mod.quiz.id];
            if (s && s.total > 0 && s.correct / s.total >= 0.7) phaseDone += 1;
          }
          if (mod.exercises) {
            for (const ex of mod.exercises) {
              phaseTotal += 1;
              if (progress.completedExercises.includes(ex.id)) phaseDone += 1;
            }
          }
        }
        return {
          id: phase.id,
          label: phase.label,
          color: phase.color,
          total: phaseTotal,
          done: phaseDone,
          percent:
            phaseTotal === 0 ? 0 : Math.round((phaseDone / phaseTotal) * 100),
        };
      }),
    [progress],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      stats,
      phaseStats,
      markModuleRead,
      canMarkModuleRead,
      saveQuizScore,
      clearQuizScore,
      markExerciseComplete,
      toggleBookmark,
      setTheme,
      reset,
      exportJson,
      importJson,
    }),
    [
      progress,
      stats,
      phaseStats,
      markModuleRead,
      canMarkModuleRead,
      saveQuizScore,
      clearQuizScore,
      markExerciseComplete,
      toggleBookmark,
      setTheme,
      reset,
      exportJson,
      importJson,
    ],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error(
      "useProgress doit être appelé à l'intérieur d'un <ProgressProvider>",
    );
  }
  return ctx;
}
