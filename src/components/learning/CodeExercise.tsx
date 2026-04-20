import { useState } from "react";
import {
  Sandpack,
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import type { CodeExercise as CodeExerciseType } from "@/types";
import { useProgress } from "@/hooks/useProgress";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckCircle2, Lightbulb, Eye, EyeOff, RotateCcw } from "lucide-react";

interface CodeExerciseProps {
  exercise: CodeExerciseType;
}

export function CodeExercise({ exercise }: CodeExerciseProps) {
  const { progress, markExerciseComplete } = useProgress();
  const isCompleted = progress.completedExercises.includes(exercise.id);

  const [hintsShown, setHintsShown] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const files = showSolution ? exercise.solutionFiles : exercise.starterFiles;

  // Sandpack prend un objet `files` qui accepte soit un string, soit un objet
  // { code, active, hidden }. On laisse faire le défaut.
  const sandpackFiles = Object.fromEntries(
    Object.entries(files).map(([name, code]) => [name, code]),
  );

  return (
    <div className="rounded-xl border-base bg-bg-2 overflow-hidden my-6">
      {/* ─── En-tête ───────────────────────────────────── */}
      <div className="p-5 border-b border-base">
        <div className="flex items-start gap-3 mb-2">
          <div
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold",
              isCompleted
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-accent/15 text-accent-2",
            )}
          >
            {isCompleted ? <CheckCircle2 size={16} /> : "{ }"}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold">{exercise.title}</h3>
              {isCompleted && (
                <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400">
                  fait
                </span>
              )}
            </div>
            <p
              className="text-[13px] text-fg-2 mt-1 leading-relaxed [&_code]:font-mono [&_code]:text-[12px] [&_code]:bg-bg-3 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded"
              dangerouslySetInnerHTML={{ __html: exercise.instructions }}
            />
          </div>
        </div>

        {/* Indices progressifs */}
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
                onClick={() => setHintsShown((h) => h + 1)}
                className="text-[12px] font-semibold text-amber-400 hover:text-amber-300 transition"
              >
                💡 Voir un indice ({hintsShown + 1}/{exercise.hints.length})
              </button>
            )}
          </div>
        )}
      </div>

      {/* ─── Éditeur Sandpack ─────────────────────────── */}
      <div className="bg-[#0d0d14]" key={resetKey}>
        <SandpackProvider
          template={exercise.template ?? "react"}
          files={sandpackFiles}
          theme="dark"
          options={{
            recompileMode: "delayed",
            recompileDelay: 500,
          }}
        >
          <SandpackLayout>
            <SandpackCodeEditor
              showLineNumbers
              showTabs
              closableTabs={false}
              style={{ height: 380 }}
            />
            <SandpackPreview
              showOpenInCodeSandbox={false}
              showRefreshButton
              style={{ height: 380 }}
            />
          </SandpackLayout>
          <ConsoleWrapper />
        </SandpackProvider>
      </div>

      {/* ─── Actions ──────────────────────────────────── */}
      <div className="p-4 border-t border-base flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          variant="ghost"
          leftIcon={<RotateCcw size={13} />}
          onClick={() => {
            setShowSolution(false);
            setResetKey((k) => k + 1);
          }}
        >
          Repartir de zéro
        </Button>
        <Button
          size="sm"
          variant="ghost"
          leftIcon={showSolution ? <EyeOff size={13} /> : <Eye size={13} />}
          onClick={() => {
            setShowSolution((s) => !s);
            setResetKey((k) => k + 1);
          }}
        >
          {showSolution ? "Cacher la solution" : "Voir la solution"}
        </Button>
        <div className="flex-1" />
        {!isCompleted && (
          <Button
            size="sm"
            leftIcon={<CheckCircle2 size={14} />}
            onClick={() => markExerciseComplete(exercise.id)}
          >
            J'ai terminé cet exercice
          </Button>
        )}
        {isCompleted && (
          <span className="text-[12px] text-emerald-400 font-medium">
            ✓ Exercice validé
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * La console Sandpack est cachée par défaut : pour l'instant on la laisse
 * invisible, elle sera utile plus tard pour des exercices basés sur console.log.
 */
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

/**
 * Variante plus compacte : Sandpack "tout-en-un" : utilisé si on veut juste
 * montrer un exemple sans instructions ni tracking.
 */
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
