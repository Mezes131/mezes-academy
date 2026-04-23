import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  ChallengeScore,
  ExerciseProgress,
  ExerciseStatus,
  LessonProgress,
} from "@/types";
import { phases, totalProgressItems } from "@/data/phases";
import { useAuth } from "@/hooks/useAuth";
import { loadRemoteProgress, saveRemoteProgress } from "@/lib/progressRemote";

const STORAGE_KEY_V1 = "react-learn:progress:v1";
const STORAGE_KEY_V2 = "react-learn:progress:v2";
const STORAGE_KEY = "react-learn:progress:v3";
const REMOTE_SYNC_DEBOUNCE_MS = 700;

const DEFAULT_PROGRESS: LessonProgress = {
  readModules: [],
  quizScores: {},
  completedExercises: [],
  exerciseProgress: {},
  challengeScores: {},
  bookmarks: [],
  theme: "dark",
};

/* ──────────────────────────────────────────────────────────────────
   ID migration (v1 → v2): flat ids ("m11", "quiz-m11"…) become
   their prefixed form ("react-core-m11", "react-core-quiz-m11"…).
   ────────────────────────────────────────────────────────────────── */
function migrateIdToV2(oldId: string): string {
  if (oldId.startsWith("react-")) return oldId;

  const introQuiz = /^quiz-intro-(\d+)$/.exec(oldId);
  if (introQuiz) return `react-intro-quiz-m${introQuiz[1]}`;
  const introEx = /^ex-intro-(\d+)$/.exec(oldId);
  if (introEx) return `react-intro-ex-m${introEx[1]}`;
  const introMod = /^intro-(\d+)$/.exec(oldId);
  if (introMod) return `react-intro-m${introMod[1]}`;

  const coreQuiz = /^quiz-(m\d+)$/.exec(oldId);
  if (coreQuiz) return `react-core-quiz-${coreQuiz[1]}`;
  const coreEx = /^ex-(m\d+)-(\d+)$/.exec(oldId);
  if (coreEx) return `react-core-ex-${coreEx[1]}-${coreEx[2]}`;
  const coreMod = /^m\d+$/.exec(oldId);
  if (coreMod) return `react-core-${oldId}`;

  return oldId;
}

function migrateV1ToV2(raw: Partial<LessonProgress>): Partial<LessonProgress> {
  const quizScores: LessonProgress["quizScores"] = {};
  for (const [id, score] of Object.entries(raw.quizScores ?? {})) {
    quizScores[migrateIdToV2(id)] = score;
  }
  return {
    ...raw,
    readModules: (raw.readModules ?? []).map(migrateIdToV2),
    completedExercises: (raw.completedExercises ?? []).map(migrateIdToV2),
    bookmarks: (raw.bookmarks ?? []).map(migrateIdToV2),
    quizScores,
  };
}

/* ──────────────────────────────────────────────────────────────────
   v2 → v3: introduce exerciseProgress + challengeScores. We backfill
   `exerciseProgress` from the legacy `completedExercises` array so no
   progress is lost — each legacy completion is recorded as "revealed"
   (conservative) since we cannot retroactively know if tests passed.
   ────────────────────────────────────────────────────────────────── */
function migrateV2ToV3(raw: Partial<LessonProgress>): LessonProgress {
  const exerciseProgress: Record<string, ExerciseProgress> = {
    ...(raw.exerciseProgress ?? {}),
  };
  for (const exId of raw.completedExercises ?? []) {
    if (!exerciseProgress[exId]) {
      exerciseProgress[exId] = {
        status: "revealed",
        attempts: 0,
        hintsUsed: 0,
        revealedSolution: true,
        updatedAt: Date.now(),
      };
    }
  }
  return {
    ...DEFAULT_PROGRESS,
    ...raw,
    exerciseProgress,
    challengeScores: raw.challengeScores ?? {},
    completedExercises: Object.entries(exerciseProgress)
      .filter(([, ep]) => ep.status === "solved" || ep.status === "revealed")
      .map(([id]) => id),
  };
}

function deriveCompletedExercises(
  exerciseProgress: Record<string, ExerciseProgress> | undefined,
): string[] {
  if (!exerciseProgress) return [];
  return Object.entries(exerciseProgress)
    .filter(([, ep]) => ep.status === "solved" || ep.status === "revealed")
    .map(([id]) => id);
}

function normalizeProgress(raw: Partial<LessonProgress>): LessonProgress {
  const exerciseProgress = raw.exerciseProgress ?? {};
  const completedExercises = Array.from(
    new Set([
      ...(raw.completedExercises ?? []),
      ...deriveCompletedExercises(exerciseProgress),
    ]),
  );
  return {
    ...DEFAULT_PROGRESS,
    ...raw,
    exerciseProgress,
    completedExercises,
    challengeScores: raw.challengeScores ?? {},
  };
}

/**
 * Counts meaningful progress entries to decide whether a one-shot migration
 * from localStorage to backend is needed the first time a user signs in.
 */
function countProgressItems(p: LessonProgress): number {
  return (
    p.readModules.length +
    Object.keys(p.quizScores).length +
    p.completedExercises.length +
    Object.keys(p.exerciseProgress).length +
    Object.keys(p.challengeScores).length +
    p.bookmarks.length
  );
}

function hasLocalProgress(p: LessonProgress): boolean {
  return countProgressItems(p) > 0;
}

function load(): LessonProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const rawV3 = window.localStorage.getItem(STORAGE_KEY);
    if (rawV3) {
      const parsed = JSON.parse(rawV3) as Partial<LessonProgress>;
      return normalizeProgress(parsed);
    }

    // v2 → v3: preserve user data transparently.
    const rawV2 = window.localStorage.getItem(STORAGE_KEY_V2);
    if (rawV2) {
      const migrated = normalizeProgress(
        migrateV2ToV3(
        JSON.parse(rawV2) as Partial<LessonProgress>,
        ),
      );
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      window.localStorage.removeItem(STORAGE_KEY_V2);
      return migrated;
    }

    // v1 → v3 (user that never saw v2): chain both migrations.
    const rawV1 = window.localStorage.getItem(STORAGE_KEY_V1);
    if (rawV1) {
      const v2 = migrateV1ToV2(JSON.parse(rawV1) as Partial<LessonProgress>);
      const v3 = normalizeProgress(migrateV2ToV3(v2));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(v3));
      window.localStorage.removeItem(STORAGE_KEY_V1);
      return v3;
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

/* ──────────────────────────────────────────────────────────────────
   Helpers to keep `completedExercises` and `exerciseProgress` in sync.
   Any mutation of a single exercise flows through here.
   ────────────────────────────────────────────────────────────────── */
function syncCompletedExercises(
  progress: LessonProgress,
  exerciseId: string,
  next: ExerciseProgress,
): LessonProgress {
  const done = next.status === "solved" || next.status === "revealed";
  const already = progress.completedExercises.includes(exerciseId);
  const completedExercises = done
    ? already
      ? progress.completedExercises
      : [...progress.completedExercises, exerciseId]
    : progress.completedExercises.filter((id) => id !== exerciseId);
  return {
    ...progress,
    exerciseProgress: {
      ...progress.exerciseProgress,
      [exerciseId]: next,
    },
    completedExercises,
  };
}

function touch(prev: ExerciseProgress | undefined): ExerciseProgress {
  return (
    prev ?? {
      status: "not-started",
      attempts: 0,
      hintsUsed: 0,
      revealedSolution: false,
      updatedAt: Date.now(),
    }
  );
}

/* ══════════════════════════════════════════════════════════════════
   Sync status (local ↔ backend)
   ══════════════════════════════════════════════════════════════════ */

export type SyncStatus =
  /** No authenticated user → progression stored locally only. */
  | "local-only"
  /** Loading existing progression from backend on sign-in. */
  | "hydrating"
  /** Pushing local progression to backend for the first time. */
  | "migrating"
  /** Saving latest changes to backend. */
  | "syncing"
  /** Local and backend are in sync. */
  | "synced"
  /** Sync disabled because backend is unreachable or table missing. */
  | "offline"
  /** Last sync attempt failed. */
  | "error";

export interface SyncState {
  status: SyncStatus;
  lastSyncedAt: number | null;
  /** If a one-shot migration happened on sign-in, number of items uploaded. */
  migratedItems: number;
  /** Error message from the latest failure, if any. */
  errorMessage: string | null;
}

const INITIAL_SYNC_STATE: SyncState = {
  status: "local-only",
  lastSyncedAt: null,
  migratedItems: 0,
  errorMessage: null,
};

/* ══════════════════════════════════════════════════════════════════
   Context shape
   ══════════════════════════════════════════════════════════════════ */

interface ProgressContextValue {
  progress: LessonProgress;
  stats: {
    total: number;
    done: number;
    percent: number;
    quizPassed: number;
    exercisesSolved: number;
    exercisesRevealed: number;
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

  /** Legacy entry point: marks as "revealed" (conservative). */
  markExerciseComplete: (exerciseId: string) => void;
  /** Called each time the learner hits "Run" on the sandbox. */
  trackExerciseAttempt: (exerciseId: string) => void;
  /** Called when the test suite passes. Idempotent. */
  markExerciseSolved: (exerciseId: string) => void;
  /** Called when the learner clicks "Reveal solution". */
  revealExerciseSolution: (exerciseId: string) => void;
  /** Called each time an additional hint is unveiled. */
  recordExerciseHint: (exerciseId: string, hintIndex: number) => void;
  /** Resets a single exercise's progress (debug / restart). */
  resetExercise: (exerciseId: string) => void;
  /** Query helper: returns current status and attempts. */
  getExerciseStatus: (exerciseId: string) => ExerciseProgress;

  saveChallengeScore: (score: ChallengeScore) => void;

  toggleBookmark: (lessonId: string) => void;
  setTheme: (theme: "dark" | "light") => void;
  reset: () => void;
  exportJson: () => string;
  importJson: (raw: string) => void;

  /** Current sync state between local and backend. */
  sync: SyncState;
  /** Force an immediate save to backend. No-op if backend is unreachable. */
  forceSync: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<LessonProgress>(load);
  const [sync, setSync] = useState<SyncState>(INITIAL_SYNC_STATE);
  const progressRef = useRef(progress);
  const remoteHydratedRef = useRef(false);
  const remoteSyncEnabledRef = useRef(false);
  const lastRemotePayloadRef = useRef("");

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    save(progress);
  }, [progress]);

  /* ─── Backend hydration + one-shot migration ──────────────── */
  useEffect(() => {
    if (!user) {
      remoteHydratedRef.current = false;
      remoteSyncEnabledRef.current = false;
      lastRemotePayloadRef.current = "";
      setSync(INITIAL_SYNC_STATE);
      return;
    }
    const userId = user.id;

    let cancelled = false;
    remoteHydratedRef.current = false;
    remoteSyncEnabledRef.current = true;

    setSync({
      status: "hydrating",
      lastSyncedAt: null,
      migratedItems: 0,
      errorMessage: null,
    });

    async function hydrateFromRemote() {
      try {
        const remote = await loadRemoteProgress(userId);
        if (cancelled) return;

        if (remote) {
          const normalized = normalizeProgress(remote);
          lastRemotePayloadRef.current = JSON.stringify(normalized);
          remoteHydratedRef.current = true;
          setProgress(normalized);
          save(normalized);
          setSync({
            status: "synced",
            lastSyncedAt: Date.now(),
            migratedItems: 0,
            errorMessage: null,
          });
          return;
        }

        // Backend is empty: migrate local progress (if any) once.
        const local = progressRef.current;
        const localItems = countProgressItems(local);
        const willMigrate = hasLocalProgress(local);

        if (willMigrate) {
          setSync((prev) => ({
            ...prev,
            status: "migrating",
            migratedItems: localItems,
          }));
        }

        await saveRemoteProgress(userId, local);
        if (cancelled) return;

        lastRemotePayloadRef.current = JSON.stringify(local);
        remoteHydratedRef.current = true;
        setSync({
          status: "synced",
          lastSyncedAt: Date.now(),
          migratedItems: willMigrate ? localItems : 0,
          errorMessage: null,
        });
      } catch (error) {
        if (cancelled) return;
        remoteSyncEnabledRef.current = false;
        remoteHydratedRef.current = true;
        const message = (error as Error).message;
        console.warn("[progress] Sync backend désactivée:", message);
        setSync({
          status: "offline",
          lastSyncedAt: null,
          migratedItems: 0,
          errorMessage: message,
        });
      }
    }

    void hydrateFromRemote();

    return () => {
      cancelled = true;
    };
  }, [user]);

  /* ─── Debounced autosave to backend ───────────────────────── */
  useEffect(() => {
    if (!user) return;
    const userId = user.id;
    if (!remoteHydratedRef.current || !remoteSyncEnabledRef.current) return;

    const payload = JSON.stringify(progress);
    if (payload === lastRemotePayloadRef.current) return;

    setSync((prev) =>
      prev.status === "syncing" ? prev : { ...prev, status: "syncing" },
    );

    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          await saveRemoteProgress(userId, progressRef.current);
          lastRemotePayloadRef.current = JSON.stringify(progressRef.current);
          setSync({
            status: "synced",
            lastSyncedAt: Date.now(),
            migratedItems: 0,
            errorMessage: null,
          });
        } catch (error) {
          remoteSyncEnabledRef.current = false;
          const message = (error as Error).message;
          console.warn("[progress] Erreur de sauvegarde backend:", message);
          setSync({
            status: "error",
            lastSyncedAt: null,
            migratedItems: 0,
            errorMessage: message,
          });
        }
      })();
    }, REMOTE_SYNC_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [progress, user]);

  const forceSync = useCallback(async () => {
    if (!user) return;
    if (!remoteSyncEnabledRef.current) {
      setSync({
        status: "offline",
        lastSyncedAt: null,
        migratedItems: 0,
        errorMessage:
          "La synchronisation backend est désactivée pour cette session.",
      });
      return;
    }
    setSync((prev) => ({ ...prev, status: "syncing", errorMessage: null }));
    try {
      await saveRemoteProgress(user.id, progressRef.current);
      lastRemotePayloadRef.current = JSON.stringify(progressRef.current);
      setSync({
        status: "synced",
        lastSyncedAt: Date.now(),
        migratedItems: 0,
        errorMessage: null,
      });
    } catch (error) {
      const message = (error as Error).message;
      setSync({
        status: "error",
        lastSyncedAt: null,
        migratedItems: 0,
        errorMessage: message,
      });
    }
  }, [user]);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setProgress(normalizeProgress(JSON.parse(e.newValue)));
        } catch {
          /* noop */
        }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /* ─── Reading gating ────────────────────────────────────────── */

  const canMarkModuleRead = useCallback(
    (moduleId: string) => {
      const found = phases
        .flatMap((phase) => phase.modules)
        .find((module) => module.id === moduleId);
      if (!found) return true;

      const quizValidated = !found.quiz
        ? true
        : (() => {
            const score = progress.quizScores[found.quiz.id];
            return Boolean(
              score && score.total > 0 && score.correct / score.total >= 0.7,
            );
          })();

      const exercisesValidated =
        !found.exercises || found.exercises.length === 0
          ? true
          : found.exercises.every(
              (exercise) => progress.exerciseProgress[exercise.id]?.status === "solved",
            );

      return quizValidated && exercisesValidated;
    },
    [progress.quizScores, progress.exerciseProgress],
  );

  const markModuleRead = useCallback(
    (moduleId: string) => {
      if (!canMarkModuleRead(moduleId)) return;
      setProgress((p) =>
        p.readModules.includes(moduleId)
          ? p
          : { ...p, readModules: [...p.readModules, moduleId] },
      );
    },
    [canMarkModuleRead],
  );

  /* ─── Quizzes ──────────────────────────────────────────────── */

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

  /* ─── Exercises ────────────────────────────────────────────── */

  const markExerciseComplete = useCallback((exerciseId: string) => {
    setProgress((p) => {
      const prev = touch(p.exerciseProgress[exerciseId]);
      // Conservative mapping: a bare "I'm done" is recorded as revealed
      // (= progress counts, but not as a pure solve).
      const next: ExerciseProgress = {
        ...prev,
        status: prev.status === "solved" ? "solved" : "revealed",
        revealedSolution: true,
        updatedAt: Date.now(),
      };
      return syncCompletedExercises(p, exerciseId, next);
    });
  }, []);

  const trackExerciseAttempt = useCallback((exerciseId: string) => {
    setProgress((p) => {
      const prev = touch(p.exerciseProgress[exerciseId]);
      const nextStatus: ExerciseStatus =
        prev.status === "solved" || prev.status === "revealed"
          ? prev.status
          : "attempted";
      const next: ExerciseProgress = {
        ...prev,
        attempts: prev.attempts + 1,
        status: nextStatus,
        updatedAt: Date.now(),
      };
      return syncCompletedExercises(p, exerciseId, next);
    });
  }, []);

  const markExerciseSolved = useCallback((exerciseId: string) => {
    setProgress((p) => {
      const prev = touch(p.exerciseProgress[exerciseId]);
      // Keep "revealed" if the user had already revealed the solution:
      // we don't upgrade a revealed run to "solved".
      if (prev.status === "solved") return p;
      if (prev.revealedSolution) {
        const next: ExerciseProgress = {
          ...prev,
          status: "revealed",
          updatedAt: Date.now(),
        };
        return syncCompletedExercises(p, exerciseId, next);
      }
      const next: ExerciseProgress = {
        ...prev,
        status: "solved",
        solvedAt: Date.now(),
        updatedAt: Date.now(),
      };
      return syncCompletedExercises(p, exerciseId, next);
    });
  }, []);

  const revealExerciseSolution = useCallback((exerciseId: string) => {
    setProgress((p) => {
      const prev = touch(p.exerciseProgress[exerciseId]);
      const nextStatus: ExerciseStatus =
        prev.status === "solved" ? "solved" : "revealed";
      const next: ExerciseProgress = {
        ...prev,
        status: nextStatus,
        revealedSolution: true,
        updatedAt: Date.now(),
      };
      return syncCompletedExercises(p, exerciseId, next);
    });
  }, []);

  const recordExerciseHint = useCallback(
    (exerciseId: string, hintIndex: number) => {
      setProgress((p) => {
        const prev = touch(p.exerciseProgress[exerciseId]);
        const hintsUsed = Math.max(prev.hintsUsed, hintIndex + 1);
        if (hintsUsed === prev.hintsUsed) return p;
        const next: ExerciseProgress = {
          ...prev,
          hintsUsed,
          updatedAt: Date.now(),
        };
        return syncCompletedExercises(p, exerciseId, next);
      });
    },
    [],
  );

  const resetExercise = useCallback((exerciseId: string) => {
    setProgress((p) => {
      if (!p.exerciseProgress[exerciseId]) return p;
      const nextEP = { ...p.exerciseProgress };
      delete nextEP[exerciseId];
      return {
        ...p,
        exerciseProgress: nextEP,
        completedExercises: p.completedExercises.filter((id) => id !== exerciseId),
      };
    });
  }, []);

  const getExerciseStatus = useCallback(
    (exerciseId: string): ExerciseProgress =>
      progress.exerciseProgress[exerciseId] ?? {
        status: "not-started",
        attempts: 0,
        hintsUsed: 0,
        revealedSolution: false,
        updatedAt: 0,
      },
    [progress.exerciseProgress],
  );

  /* ─── Challenge mode ───────────────────────────────────────── */

  const saveChallengeScore = useCallback((score: ChallengeScore) => {
    setProgress((p) => {
      const existing = p.challengeScores[score.phaseId];
      // Keep the best attempt (more passed, then most recent).
      const keepExisting =
        existing &&
        (existing.passedIds.length > score.passedIds.length ||
          (existing.passedIds.length === score.passedIds.length &&
            existing.at > score.at));
      return {
        ...p,
        challengeScores: {
          ...p.challengeScores,
          [score.phaseId]: keepExisting ? existing : score,
        },
      };
    });
  }, []);

  /* ─── Misc ────────────────────────────────────────────────── */

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
    setProgress(normalizeProgress(parsed));
  }, []);

  /* ─── Stats ──────────────────────────────────────────────── */

  const stats = useMemo(() => {
    const total = totalProgressItems();
    const quizPassed = Object.values(progress.quizScores).filter(
      (s) => s.total > 0 && s.correct / s.total >= 0.7,
    ).length;
    const eps = Object.values(progress.exerciseProgress);
    const exercisesSolved = eps.filter((e) => e.status === "solved").length;
    const exercisesRevealed = eps.filter((e) => e.status === "revealed").length;
    const done =
      progress.readModules.length +
      quizPassed +
      progress.completedExercises.length;
    return {
      total,
      done,
      percent: total === 0 ? 0 : Math.min(100, Math.round((done / total) * 100)),
      quizPassed,
      exercisesSolved,
      exercisesRevealed,
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
      trackExerciseAttempt,
      markExerciseSolved,
      revealExerciseSolution,
      recordExerciseHint,
      resetExercise,
      getExerciseStatus,
      saveChallengeScore,
      toggleBookmark,
      setTheme,
      reset,
      exportJson,
      importJson,
      sync,
      forceSync,
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
      trackExerciseAttempt,
      markExerciseSolved,
      revealExerciseSolution,
      recordExerciseHint,
      resetExercise,
      getExerciseStatus,
      saveChallengeScore,
      toggleBookmark,
      setTheme,
      reset,
      exportJson,
      importJson,
      sync,
      forceSync,
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
