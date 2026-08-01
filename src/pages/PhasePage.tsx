import { Link, useParams, Navigate } from "react-router-dom";
import { useCourseArea } from "@/components/layout/courseArea";
import { useProgress } from "@/hooks/useProgress";
import { useT } from "@/i18n/useT";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn, phaseAccent } from "@/lib/utils";
import { Clock, CheckCircle2, ArrowRight, Trophy, BookOpen } from "lucide-react";

export function PhasePage() {
  const t = useT();
  const { phaseId } = useParams<{ phaseId: string }>();
  const { basePath, phases, learnerTools } = useCourseArea();
  const phase = phases.find((p) => p.id === phaseId);
  const { progress } = useProgress();

  if (!phase) return <Navigate to={basePath} replace />;

  const accent = phaseAccent(phase.color);
  // Phase stats computed locally so any course's phases work (the
  // provider-level phaseStats only covers the React track).
  const st = (() => {
    let total = 0;
    let done = 0;
    for (const mod of phase.modules) {
      total += 1;
      if (progress.readModules.includes(mod.id)) done += 1;
      if (mod.quiz) {
        total += 1;
        const s = progress.quizScores[mod.quiz.id];
        if (s && s.total > 0 && s.correct / s.total >= 0.7) done += 1;
      }
      for (const ex of mod.exercises ?? []) {
        total += 1;
        if (progress.completedExercises.includes(ex.id)) done += 1;
      }
    }
    return { total, done, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
  })();
  const hasChallenge =
    learnerTools && phase.modules.some((mod) => (mod.exercises?.length ?? 0) > 0);
  const challengeScore = progress.challengeScores[phase.id];

  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl animate-fade-in px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      {/* ─── Header: icon + id + title on one row; rest below ─── */}
      <header className="min-w-0 pb-5">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-xl sm:h-14 sm:w-14 sm:text-2xl",
              accent.bg,
              accent.border,
              accent.text,
            )}
          >
            <i className={`fa-solid ${phase.icon}`} aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3 sm:text-[11px] sm:tracking-[0.15em]">
              {phase.id.toUpperCase()}
            </div>
            <h1
              className={cn(
                "mt-0.5 text-xl font-extrabold leading-tight tracking-tight sm:text-2xl md:text-3xl",
                accent.text,
              )}
            >
              {phase.title}
            </h1>
          </div>
        </div>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-2 sm:text-base">
          {phase.summary}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {phase.metaTags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.08em]",
                accent.bg,
                accent.text,
                accent.border,
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-8 rounded-xl border-base bg-bg-2 p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold">{t("course.phaseProgress")}</div>
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
          {t("course.phaseSteps", { done: st.done, total: st.total })}
        </div>
      </div>

      {/* ─── Final challenge entry point ─────────────────── */}
      {hasChallenge && (
      <Link
        to={`${basePath}/phase/${phase.id}/challenge`}
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
            <div className="text-sm font-semibold">{t("course.phaseChallenge")}</div>
            <div className="text-[12px] text-fg-3 font-mono">
              {t("course.phaseChallengeHint")}
              {challengeScore && (
                <span className="ml-2 text-emerald-400">
                  {t("course.bestScore", {
                    score: `${challengeScore.passedIds.length}/${challengeScore.total}`,
                  })}
                </span>
              )}
            </div>
          </div>
          <ArrowRight size={16} className="text-fg-3" />
        </div>
      </Link>
      )}

      {/* ─── Module list ───────────────────── */}
      <div className="mt-10 space-y-3">
        <h2 className="mb-4 text-lg font-bold capitalize">{t("common.modules")}</h2>
        {phase.modules.map((mod) => {
          const isRead = progress.readModules.includes(mod.id);
          const quizScore = mod.quiz ? progress.quizScores[mod.quiz.id] : undefined;
          return (
            <Link
              key={mod.id}
              to={`${basePath}/module/${mod.id}`}
              className={cn(
                "group block min-w-0 rounded-xl border-base bg-bg-2 p-4 transition sm:p-5",
                "hover:border-accent/30 hover:-translate-y-0.5 duration-200",
              )}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border sm:h-12 sm:w-12",
                    isRead
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : cn(accent.bg, accent.border, accent.text),
                  )}
                >
                  {isRead ? (
                    <CheckCircle2 size={18} aria-hidden="true" />
                  ) : (
                    <BookOpen size={18} aria-hidden="true" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3 sm:text-[11px]">
                    {mod.index}
                  </div>
                  <h3 className="mt-0.5 font-bold leading-tight">{mod.title}</h3>
                </div>
                <ArrowRight
                  size={18}
                  className="mt-0.5 shrink-0 text-fg-3 transition group-hover:translate-x-0.5 group-hover:text-fg"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-fg-2">
                {mod.subtitle}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 font-mono text-[11px] text-fg-3">
                  <Clock size={11} aria-hidden="true" /> {mod.duration}
                </span>
                {mod.quiz && (
                  <span
                    className={cn(
                      "rounded border px-2 py-0.5 text-[11px] font-medium",
                      quizScore && quizScore.correct / quizScore.total >= 0.7
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border-base bg-bg-3 text-fg-2",
                    )}
                  >
                    <i className="fa-solid fa-bullseye mr-1" aria-hidden="true" /> Quiz
                    {quizScore && ` · ${quizScore.correct}/${quizScore.total}`}
                  </span>
                )}
                {mod.exercises && mod.exercises.length > 0 && (
                  <span className="rounded border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-[11px] font-medium text-violet-300">
                    <i className="fa-solid fa-laptop-code mr-1" aria-hidden="true" />{" "}
                    {mod.exercises.length} exercice
                    {mod.exercises.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {phase.scaffoldOnly && (
        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
          <div className="text-sm font-bold text-amber-400 mb-1 flex items-center gap-2">
            <i className="fa-solid fa-person-digging" /> {t("course.scaffoldTitle")}
          </div>
          <p className="text-[13px] text-fg-2">{t("course.scaffoldBody")}</p>
        </div>
      )}
    </div>
  );
}
