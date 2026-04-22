import { Link, useParams, Navigate } from "react-router-dom";
import { getPhase } from "@/data/phases";
import type { PhaseId } from "@/types";
import { useProgress } from "@/hooks/useProgress";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn, phaseAccent } from "@/lib/utils";
import { Clock, CheckCircle2, ArrowRight, Trophy } from "lucide-react";

export function PhasePage() {
  const { phaseId } = useParams<{ phaseId: string }>();
  const phase = getPhase(phaseId as PhaseId);
  const { progress, phaseStats } = useProgress();

  if (!phase) return <Navigate to="/" replace />;

  const accent = phaseAccent(phase.color);
  const st = phaseStats.find((p) => p.id === phase.id)!;
  const challengeScore = progress.challengeScores[phase.id];

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 animate-fade-in">
      {/* ─── Header ─────────────────────────────── */}
      <div className="flex items-start gap-5 p-4 border-b border-base">
        <div
          className={cn(
            "w-20 h-20 rounded-2xl border flex items-center justify-center text-3xl flex-shrink-0",
            accent.bg,
            accent.border,
            accent.text,
          )}
        >
          <i className={`fa-solid ${phase.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-fg-3 mb-2">
            {phase.id.toUpperCase()}
          </div>
          <h1 className={cn("text-3xl md:text-4xl font-extrabold tracking-tight", accent.text)}>
            {phase.title}
          </h1>
          <p className="mt-2 text-fg-2 font-serif leading-relaxed max-w-2xl">
            {phase.summary}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {phase.metaTags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "text-[11px] font-semibold tracking-[0.08em] px-3 py-1 rounded-full border",
                  accent.bg,
                  accent.text,
                  accent.border,
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border-base bg-bg-2 p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold">Progression de la phase</div>
          <div className={cn("font-mono font-bold", accent.text)}>
            {st.percent}%
          </div>
        </div>
        <ProgressBar
          value={st.done}
          max={st.total}
          color={phase.color}
          size="md"
        />
        <div className="mt-1.5 text-[12px] text-fg-3 font-mono">
          {st.done} / {st.total} étapes
        </div>
      </div>

      {/* ─── Final challenge entry point ─────────────────── */}
      <Link
        to={`/react/phase/${phase.id}/challenge`}
        className="mt-4 block rounded-xl border-base bg-bg-2 p-4 hover:border-accent/30 transition"
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-9 h-9 rounded-lg border flex items-center justify-center",
              accent.bg,
              accent.border,
              accent.text,
            )}
          >
            <Trophy size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold">Challenge final de phase</div>
            <div className="text-[12px] text-fg-3 font-mono">
              3 exercices aléatoires · sans solution · hints autorisés
              {challengeScore && (
                <span className="ml-2 text-emerald-400">
                  (meilleur: {challengeScore.passedIds.length}/{challengeScore.total})
                </span>
              )}
            </div>
          </div>
          <ArrowRight size={16} className="text-fg-3" />
        </div>
      </Link>

      {/* ─── Module list ───────────────────── */}
      <div className="mt-10 space-y-3">
        <h2 className="text-lg font-bold mb-4">Modules</h2>
        {phase.modules.map((mod) => {
          const isRead = progress.readModules.includes(mod.id);
          const quizScore = mod.quiz ? progress.quizScores[mod.quiz.id] : undefined;
          return (
            <Link
              key={mod.id}
              to={`/react/module/${mod.id}`}
              className={cn(
                "group flex items-start gap-4 rounded-xl border-base bg-bg-2 p-5 transition",
                "hover:border-accent/30 hover:-translate-y-0.5 duration-200",
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 border font-mono text-xs font-bold",
                  isRead
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : cn(accent.bg, accent.border, accent.text),
                )}
              >
                {isRead ? <CheckCircle2 size={18} /> : mod.index}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold">{mod.title}</h3>
                  <span className="flex items-center gap-1 text-[11px] text-fg-3 font-mono">
                    <Clock size={11} /> {mod.duration}
                  </span>
                </div>
                <p className="text-[13px] text-fg-2 mt-1 leading-relaxed">
                  {mod.subtitle}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {mod.quiz && (
                    <span
                      className={cn(
                        "text-[11px] px-2 py-0.5 rounded border font-medium",
                        quizScore && quizScore.correct / quizScore.total >= 0.7
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-bg-3 text-fg-2 border-base",
                      )}
                    >
                      <i className="fa-solid fa-bullseye mr-1" /> Quiz
                      {quizScore &&
                        ` · ${quizScore.correct}/${quizScore.total}`}
                    </span>
                  )}
                  {mod.exercises && mod.exercises.length > 0 && (
                    <span className="text-[11px] px-2 py-0.5 rounded border font-medium bg-violet-500/10 text-violet-300 border-violet-500/20">
                      <i className="fa-solid fa-laptop-code mr-1" /> {mod.exercises.length} exercice{mod.exercises.length > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
              <ArrowRight
                size={18}
                className="text-fg-3 group-hover:text-fg group-hover:translate-x-0.5 transition flex-shrink-0 mt-3"
              />
            </Link>
          );
        })}
      </div>

      {phase.scaffoldOnly && (
        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
          <div className="text-sm font-bold text-amber-400 mb-1 flex items-center gap-2">
            <i className="fa-solid fa-person-digging" /> Contenu en construction
          </div>
          <p className="text-[13px] text-fg-2">
            Cette phase est scaffoldée : la structure et les grandes lignes sont
            là, mais les quiz interactifs et les exercices Sandpack seront
            ajoutés dans une prochaine version.
          </p>
        </div>
      )}
    </div>
  );
}
