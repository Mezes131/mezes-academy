import { useEffect, useMemo, useRef, useState } from "react";
import {
  Sandpack,
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  useSandpack,
} from "@codesandbox/sandpack-react";
import type { CodeExercise as CodeExerciseType, ExerciseStatus } from "@/types";
import { useProgress } from "@/hooks/useProgress";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Lightbulb,
  Eye,
  EyeOff,
  RotateCcw,
  Play,
  Lock,
  AlertCircle,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";

/**
 * Number of attempts required before the "Reveal solution" button
 * becomes available, unless explicitly overridden per-exercise.
 */
const DEFAULT_ATTEMPTS_BEFORE_SOLUTION = 5;

interface CodeExerciseProps {
  exercise: CodeExerciseType;
  /**
   * Challenge mode: removes the "Reveal solution" button entirely and
   * prevents the Run button from auto-marking as `solved` in the global
   * progress (the challenge page tracks its own score). Hints remain.
   */
  challengeMode?: boolean;
  /** Called with true/false each time the test suite finishes in challenge mode. */
  onChallengeResult?: (passed: boolean) => void;
}

export function CodeExercise({
  exercise,
  challengeMode = false,
  onChallengeResult,
}: CodeExerciseProps) {
  const {
    trackExerciseAttempt,
    markExerciseSolved,
    revealExerciseSolution,
    useExerciseHint,
    getExerciseStatus,
    resetExercise,
  } = useProgress();

  const status = getExerciseStatus(exercise.id);
  const attemptsBeforeSolution =
    exercise.attemptsBeforeSolution ?? DEFAULT_ATTEMPTS_BEFORE_SOLUTION;

  const [showSolution, setShowSolution] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [hintsShown, setHintsShown] = useState(status.hintsUsed);
  const sandboxRootRef = useRef<HTMLDivElement | null>(null);

  // Hint count can only grow (persist across remounts of the card).
  useEffect(() => {
    setHintsShown((h) => Math.max(h, status.hintsUsed));
  }, [status.hintsUsed]);

  /* ─── File composition for Sandpack ─────────────────────────── */
  const files = useMemo<Record<string, string>>(() => {
    const base = showSolution ? exercise.solutionFiles : exercise.starterFiles;
    return { ...base };
  }, [showSolution, exercise]);

  /* ─── Reveal solution gating ────────────────────────────────── */
  const canRevealSolution =
    !challengeMode &&
    (status.attempts >= attemptsBeforeSolution ||
      status.status === "solved" ||
      status.revealedSolution);

  const attemptsLeftBeforeReveal = Math.max(
    0,
    attemptsBeforeSolution - status.attempts,
  );

  /* ─── Visual status badge ───────────────────────────────────── */
  const badge = getStatusBadge(status.status);

  /* ─── Hint unveiling ────────────────────────────────────────── */
  function onRevealNextHint() {
    const next = hintsShown + 1;
    setHintsShown(next);
    useExerciseHint(exercise.id, next - 1);
  }

  /* ─── Solution reveal ───────────────────────────────────────── */
  function onRevealSolution() {
    if (!canRevealSolution) return;
    revealExerciseSolution(exercise.id);
    setShowSolution(true);
    setResetKey((k) => k + 1);
  }

  function onHideSolution() {
    setShowSolution(false);
    setResetKey((k) => k + 1);
  }

  function onReset() {
    setShowSolution(false);
    setResetKey((k) => k + 1);
  }

  /* ─── Called each time the local validator finishes ─────────── */
  function onValidationCompleted({
    passed,
    total,
  }: {
    passed: number;
    total: number;
  }) {
    trackExerciseAttempt(exercise.id);
    const allGreen = total > 0 && passed === total;
    if (challengeMode) {
      onChallengeResult?.(allGreen);
      return;
    }
    if (allGreen) {
      markExerciseSolved(exercise.id);
    }
  }

  return (
    <div className="rounded-xl border-base bg-bg-2 overflow-hidden my-6">
      {/* ─── Header ───────────────────────────────────────── */}
      <div className="p-5 border-b border-base">
        <div className="flex items-start gap-3 mb-2">
          <div
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold",
              badge.iconBg,
              badge.iconFg,
            )}
          >
            {badge.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold">{exercise.title}</h3>
              {badge.label && (
                <span
                  className={cn(
                    "text-[10px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded",
                    badge.labelClasses,
                  )}
                >
                  {badge.label}
                </span>
              )}
              {status.attempts > 0 && (
                <span className="text-[10px] font-mono text-fg-3">
                  {status.attempts} tentative{status.attempts > 1 ? "s" : ""}
                </span>
              )}
            </div>
            <p
              className="text-[13px] text-fg-2 mt-1 leading-relaxed [&_code]:font-mono [&_code]:text-[12px] [&_code]:bg-bg-3 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded"
              dangerouslySetInnerHTML={{ __html: exercise.instructions }}
            />
          </div>
        </div>

        {/* Progressive hints */}
        {exercise.hints && exercise.hints.length > 0 && (
          <div className="mt-4 space-y-2">
            {exercise.hints.slice(0, hintsShown).map((hint, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-[13px] rounded-md bg-amber-500/5 border-l-2 border-amber-500/60 px-3 py-2 animate-fade-in"
              >
                <Lightbulb
                  size={14}
                  className="text-amber-400 mt-0.5 flex-shrink-0"
                />
                <span>{hint}</span>
              </div>
            ))}
            {hintsShown < exercise.hints.length && (
              <button
                onClick={onRevealNextHint}
                className="text-[12px] font-semibold text-amber-400 hover:text-amber-300 transition inline-flex items-center gap-1"
              >
                <Lightbulb size={12} />
                {hintsShown === 0
                  ? "Voir un indice"
                  : "Encore bloqué ? Indice suivant"}{" "}
                ({hintsShown + 1}/{exercise.hints.length})
              </button>
            )}
          </div>
        )}

        {showSolution && !challengeMode && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-sky-500/10 border border-sky-500/30 px-3 py-2 text-[12px] text-sky-200">
            <Eye size={14} />
            Solution affichée — l'exercice sera marqué comme « Vu » plutôt que « Résolu ».
            Tu peux masquer la solution et retenter à tout moment.
          </div>
        )}
      </div>

      {/* ─── Sandpack editor ───────────────────────────────── */}
      <div className="bg-[#0d0d14] relative" key={resetKey} ref={sandboxRootRef}>
        <SandpackProvider
          template={exercise.template ?? "react"}
          files={files}
          theme="dark"
          options={{
            // Explicitly disable auto-updates; learner clicks Run.
            autorun: false,
            autoReload: false,
            recompileMode: "delayed",
            recompileDelay: 800,
            visibleFiles: getVisibleFiles(files, exercise, showSolution),
            activeFile: getActiveFile(files, showSolution),
          }}
        >
          <SandpackLayout>
            <SandpackCodeEditor
              showLineNumbers
              showTabs
              closableTabs={false}
              style={{ height: 380 }}
              readOnly={showSolution}
            />
            <SandpackPreview
              showOpenInCodeSandbox={false}
              showRefreshButton
              style={{ height: 380 }}
            />
          </SandpackLayout>

          {/* Disable paste on the starter editor to raise the bar
              for blind copy-paste of the solution. */}
          {!showSolution && <EditorPasteBlocker rootRef={sandboxRootRef} />}

          {!showSolution && (
            <RunPanel
              validator={exercise.validator}
              onValidationCompleted={onValidationCompleted}
              onAttemptOnly={() => trackExerciseAttempt(exercise.id)}
              locked={status.status === "solved" && !challengeMode}
            />
          )}

          {/* Solution viewer anti-copy guard (applies when solution is shown). */}
          {showSolution && <SolutionCopyGuard rootRef={sandboxRootRef} />}

          <ConsoleWrapper />
        </SandpackProvider>
      </div>

      {/* ─── Actions ──────────────────────────────────────── */}
      <div className="p-4 border-t border-base flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          variant="ghost"
          leftIcon={<RotateCcw size={13} />}
          onClick={onReset}
        >
          Repartir du starter
        </Button>

        {!challengeMode && !showSolution && (
          <Button
            size="sm"
            variant="ghost"
            leftIcon={canRevealSolution ? <Eye size={13} /> : <Lock size={13} />}
            disabled={!canRevealSolution}
            onClick={onRevealSolution}
            title={
              canRevealSolution
                ? "Révéler la solution (marque l'exercice comme « Vu »)"
                : `Fais au moins ${attemptsBeforeSolution} tentatives pour débloquer la solution`
            }
          >
            {canRevealSolution
              ? "Voir la solution"
              : `Solution verrouillée (${attemptsLeftBeforeReveal} tentative${attemptsLeftBeforeReveal > 1 ? "s" : ""})`}
          </Button>
        )}

        {!challengeMode && showSolution && (
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<EyeOff size={13} />}
            onClick={onHideSolution}
          >
            Masquer la solution
          </Button>
        )}

        <div className="flex-1" />

        {/* Explicit reset of progress (useful if the learner wants to
            replay an exercise from scratch after revealing it). */}
        {(status.status === "solved" || status.status === "revealed") &&
          !challengeMode && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                resetExercise(exercise.id);
                onReset();
              }}
              title="Remettre à zéro l'état de cet exercice"
            >
              Recommencer à zéro
            </Button>
          )}

        {/* Fallback "I finished" action when no local validator is defined. */}
        {!exercise.validator &&
          !challengeMode &&
          status.status !== "solved" &&
          status.status !== "revealed" && (
            <Button
              size="sm"
              leftIcon={<CheckCircle2 size={14} />}
              onClick={() => revealExerciseSolution(exercise.id)}
            >
              J'ai terminé cet exercice
            </Button>
          )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   RunPanel — manual run + local validator (offline).
   No dependency on Sandpack remote test infra.
   ══════════════════════════════════════════════════════════════════ */

interface RunPanelProps {
  validator?: string;
  onValidationCompleted: (result: { passed: number; total: number }) => void;
  onAttemptOnly: () => void;
  locked: boolean;
}

function RunPanel({
  validator,
  onValidationCompleted,
  onAttemptOnly,
  locked,
}: RunPanelProps) {
  const { sandpack } = useSandpack();
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<
    | null
    | { passed: number; failed: number; total: number; failures: string[] }
  >(null);

  useEffect(() => {
    setResult(null);
  }, [sandpack.files]);

  async function run() {
    setResult(null);
    setRunning(true);
    try {
      await sandpack.runSandpack();
    } catch {
      // Ignore and still process local validation / attempt count.
    }

    if (!validator) {
      onAttemptOnly();
      setRunning(false);
      return;
    }

    try {
      const files = extractCodeMap(sandpack.files);
      const validation = executeLocalValidator(validator, files);
      const failed = Math.max(0, validation.total - validation.passed);
      setResult({
        passed: validation.passed,
        failed,
        total: validation.total,
        failures: validation.failures ?? [],
      });
      onValidationCompleted({
        passed: validation.passed,
        total: validation.total,
      });
    } catch (error) {
      setResult({
        passed: 0,
        failed: 1,
        total: 1,
        failures: [`Validator error: ${(error as Error).message}`],
      });
      onValidationCompleted({ passed: 0, total: 1 });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="border-t border-base bg-[#0a0a0f]">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-base">
        <Button
          size="sm"
          leftIcon={<Play size={13} />}
          onClick={run}
          disabled={running}
        >
          {running
            ? "Exécution..."
            : validator
              ? "Run + Vérifier"
              : "Exécuter (Run)"}
        </Button>
        {result && <TestResultSummary result={result} locked={locked} />}
        <div className="flex-1" />
        <span className="text-[11px] font-mono uppercase tracking-wider text-fg-3">
          <TerminalSquare size={12} className="inline mr-1" />
          {validator ? "Validation locale" : "Run manuel"}
        </span>
      </div>
      {!validator && (
        <div className="px-3 py-2 text-[12px] text-fg-3">
          Aucun validateur configuré sur cet exercice. Le bouton Run compte comme
          tentative pour déverrouiller la solution.
        </div>
      )}
    </div>
  );
}

function TestResultSummary({
  result,
  locked,
}: {
  result: { passed: number; failed: number; total: number; failures: string[] };
  locked: boolean;
}) {
  const allPass = result.total > 0 && result.failed === 0;
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-[12px] font-semibold",
        allPass ? "text-emerald-400" : "text-amber-400",
      )}
    >
      {allPass ? (
        <>
          <ShieldCheck size={14} />
          {result.passed}/{result.total} test{result.total > 1 ? "s" : ""} OK
          {locked && " (déjà validé)"}
        </>
      ) : (
        <>
          <AlertCircle size={14} />
          {result.passed}/{result.total} — {result.failed} échec
          {result.failed > 1 ? "s" : ""}
        </>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   EditorPasteBlocker — intercepts the paste event on the sandbox
   code editor only. This does NOT block paste elsewhere on the page.
   ══════════════════════════════════════════════════════════════════ */

function EditorPasteBlocker({
  rootRef,
}: {
  rootRef: React.RefObject<HTMLElement | null>;
}) {
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    function insideTargetEditor(target: EventTarget | null): boolean {
      if (!(target instanceof HTMLElement)) return false;
      const root = rootRef.current;
      if (!root || !root.contains(target)) return false;
      return Boolean(target.closest(".sp-code-editor"));
    }

    function toast() {
      setToastVisible(true);
      window.setTimeout(() => setToastVisible(false), 1800);
    }

    function onPaste(e: ClipboardEvent) {
      if (!insideTargetEditor(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      toast();
    }

    function onKeyDown(e: KeyboardEvent) {
      if (!insideTargetEditor(e.target)) return;
      const isPasteCombo =
        (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v";
      if (!isPasteCombo) return;
      e.preventDefault();
      e.stopPropagation();
      toast();
    }

    document.addEventListener("paste", onPaste, true);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("paste", onPaste, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [rootRef]);

  if (!toastVisible) return null;
  return (
    <div
      className="absolute z-50 bottom-4 right-4 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-200 text-[12px] font-medium px-3 py-2 shadow-xl backdrop-blur pointer-events-none animate-fade-in"
    >
      <i className="fa-solid fa-keyboard mr-1.5" />
      Le collage est désactivé ici : tape ton code pour mieux l'intégrer.
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SolutionCopyGuard — disables text selection + copy on the visible
   solution editor. Applies only while `showSolution === true`.
   ══════════════════════════════════════════════════════════════════ */

function SolutionCopyGuard({
  rootRef,
}: {
  rootRef: React.RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const editors = Array.from(root.querySelectorAll<HTMLElement>(".sp-code-editor"));

    function onCopy(e: ClipboardEvent) {
      e.preventDefault();
      e.stopPropagation();
    }

    const prevStyles: Array<[HTMLElement, string]> = [];
    for (const el of editors) {
      prevStyles.push([el, el.style.userSelect]);
      el.style.userSelect = "none";
      (el.style as CSSStyleDeclaration & { webkitUserSelect?: string }).webkitUserSelect =
        "none";
      el.addEventListener("copy", onCopy, { capture: true });
    }
    return () => {
      for (const [el, prev] of prevStyles) {
        el.style.userSelect = prev;
        (el.style as CSSStyleDeclaration & { webkitUserSelect?: string }).webkitUserSelect =
          prev;
        el.removeEventListener("copy", onCopy, { capture: true });
      }
    };
  }, [rootRef]);

  return null;
}

/* ══════════════════════════════════════════════════════════════════
   Helpers
   ══════════════════════════════════════════════════════════════════ */

function getVisibleFiles(
  files: Record<string, string>,
  exercise: CodeExerciseType,
  showSolution: boolean,
): string[] {
  // Hide test files from the tab bar unless user wants to see them.
  const testKeys = exercise.tests ? Object.keys(exercise.tests) : [];
  return Object.keys(files).filter((k) => showSolution || !testKeys.includes(k));
}

function getActiveFile(
  files: Record<string, string>,
  showSolution: boolean,
): string | undefined {
  if (showSolution) return Object.keys(files)[0];
  // Prefer the first non-test file for the initial cursor.
  const nonTest = Object.keys(files).find((k) => !k.includes(".test."));
  return nonTest ?? Object.keys(files)[0];
}

function getStatusBadge(status: ExerciseStatus): {
  icon: JSX.Element | string;
  iconBg: string;
  iconFg: string;
  label: string;
  labelClasses: string;
} {
  switch (status) {
    case "solved":
      return {
        icon: <CheckCircle2 size={16} />,
        iconBg: "bg-emerald-500/15",
        iconFg: "text-emerald-400",
        label: "Résolu",
        labelClasses: "bg-emerald-500/10 text-emerald-400",
      };
    case "revealed":
      return {
        icon: <Eye size={16} />,
        iconBg: "bg-sky-500/15",
        iconFg: "text-sky-300",
        label: "Vu la solution",
        labelClasses: "bg-sky-500/10 text-sky-300",
      };
    case "attempted":
      return {
        icon: <Play size={14} />,
        iconBg: "bg-amber-500/15",
        iconFg: "text-amber-400",
        label: "En cours",
        labelClasses: "bg-amber-500/10 text-amber-400",
      };
    default:
      return {
        icon: "{ }",
        iconBg: "bg-accent/15",
        iconFg: "text-accent-2",
        label: "",
        labelClasses: "",
      };
  }
}

interface LocalValidationResult {
  passed: number;
  total: number;
  failures?: string[];
}

function executeLocalValidator(
  validator: string,
  files: Record<string, string>,
): LocalValidationResult {
  // Internal content only (maintainer-authored), not user-provided.
  const fn = new Function(
    "files",
    `"use strict";\n${validator}\n`,
  ) as (files: Record<string, string>) => LocalValidationResult;
  const res = fn(files);
  if (
    typeof res !== "object" ||
    res === null ||
    typeof res.passed !== "number" ||
    typeof res.total !== "number"
  ) {
    throw new Error("Le validator doit retourner { passed, total, failures? }.");
  }
  return res;
}

function extractCodeMap(
  sandpackFiles: Record<string, unknown>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [path, file] of Object.entries(sandpackFiles)) {
    if (typeof file === "string") {
      out[path] = file;
      continue;
    }
    if (
      typeof file === "object" &&
      file !== null &&
      "code" in file &&
      typeof (file as { code?: unknown }).code === "string"
    ) {
      out[path] = (file as { code: string }).code;
      continue;
    }
    out[path] = "";
  }
  return out;
}

/* ══════════════════════════════════════════════════════════════════
   Miscellaneous legacy bits (console toggle, compact live sandpack)
   ══════════════════════════════════════════════════════════════════ */

function ConsoleWrapper() {
  const [show, setShow] = useState(false);
  if (!show) {
    return (
      <button
        onClick={() => setShow(true)}
        className="w-full text-left px-4 py-2 text-[11px] font-mono uppercase tracking-wider text-fg-3 hover:text-fg-2 border-t border-base bg-[#0a0a0f]"
      >
        ▸ Afficher la console
      </button>
    );
  }
  return (
    <div className="border-t border-base">
      <SandpackConsole style={{ height: 120 }} />
    </div>
  );
}

export function LiveSandpack({
  files,
  template = "react",
}: {
  files: Record<string, string>;
  template?: "react" | "react-ts" | "vanilla";
}) {
  return (
    <Sandpack
      template={template}
      files={files}
      theme="dark"
      options={{
        showLineNumbers: true,
        editorHeight: 340,
      }}
    />
  );
}
