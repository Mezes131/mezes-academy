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

const STORAGE_KEY = "react-learn:progress:v1";

const DEFAULT_PROGRESS: LessonProgress = {
  readModules: [],
  quizScores: {},
  completedExercises: [],
  bookmarks: [],
  theme: "dark",
};

function load(): LessonProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<LessonProgress>;
    return { ...DEFAULT_PROGRESS, ...parsed };
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
  saveQuizScore: (
    quizId: string,
    correct: number,
    total: number,
    answers: Record<string, string[]>,
  ) => void;
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

  const markModuleRead = useCallback((moduleId: string) => {
    setProgress((p) =>
      p.readModules.includes(moduleId)
        ? p
        : { ...p, readModules: [...p.readModules, moduleId] },
    );
  }, []);

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
      saveQuizScore,
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
      saveQuizScore,
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
