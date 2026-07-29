import { Link } from "react-router-dom";
import { useMemo } from "react";
import {
  ArrowRight,
  BookOpen,
  TrendingUp,
  Bookmark,
  PlayCircle,
  Clock,
  CheckCircle2,
  Code2,
  Target,
} from "lucide-react";
import { buildSvcCourse } from "@/data/courses/svc";
import { useProgress } from "@/hooks/useProgress";
import { useLocale } from "@/i18n/LocaleProvider";
import { useCourseArea } from "@/components/layout/courseArea";
import {
  computeCourseStats,
  computePhaseStats,
  courseModuleIds,
} from "@/lib/courseProgress";
import { cn, phaseAccent } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { CourseSyllabus } from "@/components/course/CourseSyllabus";
import type { Module, Phase } from "@/types";

/**
 * Secure Vibe Coding course home: resume, stats, last activity,
 * phase track, then full syllabus (aligned with React course page).
 */
export function SvcCoursePage() {
  const { locale } = useLocale();
  const { basePath } = useCourseArea();
  const { progress } = useProgress();
  const { meta, program, phases } = buildSvcCourse(locale);

  const phaseCount = phases.length;
  const moduleCount = phases.reduce((sum, phase) => sum + phase.modules.length, 0);
  const stats = useMemo(
    () => computeCourseStats(phases, progress),
    [phases, progress],
  );
  const phaseStats = useMemo(
    () => computePhaseStats(phases, progress),
    [phases, progress],
  );
  const moduleIds = useMemo(() => courseModuleIds(phases), [phases]);

  const nextModule = (() => {
    for (const phase of phases) {
      for (const mod of phase.modules) {
        if (phase.scaffoldOnly) continue;
        const read = progress.readModules.includes(mod.id);
        const quizScore = mod.quiz ? progress.quizScores[mod.quiz.id] : null;
        const quizDone =
          !mod.quiz ||
          (quizScore &&
            quizScore.total > 0 &&
            quizScore.correct / quizScore.total >= 0.7);
        const exercisesDone =
          !mod.exercises ||
          mod.exercises.every((e) =>
            progress.completedExercises.includes(e.id),
          );
        if (!read || !quizDone || !exercisesDone) {
          return { phase, module: mod };
        }
      }
    }
    return null;
  })();

  const lastActivity = (() => {
    const allScores = Object.entries(progress.quizScores)
      .map(([quizId, score]) => ({ quizId, ...score }))
      .sort((a, b) => b.updatedAt - a.updatedAt);
    for (const latest of allScores) {
      for (const phase of phases) {
        for (const mod of phase.modules) {
          if (mod.quiz?.id === latest.quizId) {
            return { phase, module: mod, score: latest };
          }
        }
      }
    }
    return null;
  })();

  const readInCourse = progress.readModules.filter((id) =>
    moduleIds.has(id),
  ).length;
  const exercisesInCourse = progress.completedExercises.filter((id) => {
    for (const phase of phases) {
      for (const mod of phase.modules) {
        if (mod.exercises?.some((e) => e.id === id)) return true;
      }
    }
    return false;
  }).length;

  const hasStarted = stats.done > 0;
  const bookmarksInCourse = progress.bookmarks.filter((id) =>
    moduleIds.has(id),
  ).length;

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 animate-fade-in">
      <section className="relative mb-10">
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.15em] text-violet-400 mb-3">
            <i className={`fa-solid ${meta.icon}`} />
            Parcours Secure Vibe Coding
            <span className="text-fg-2"> Mezes Academy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.98]">
            Du prompt au{" "}
            <em className="not-italic text-violet-400">produit en production</em>
            ,
            <br />
            sans la dette ni les failles.
          </h1>
          <p className="mt-5 text-[17px] text-fg-2 leading-relaxed max-w-2xl prose-lesson">
            {phaseCount} phases, {moduleCount} modules. Chaque notion est
            expliquée, vérifiée, puis validée. Ta progression est sauvegardée :
            tu reprends à tout moment là où tu t&apos;es arrêté.
          </p>
          <div className="mt-7">
            <Link
              to={
                nextModule
                  ? `${basePath}/module/${nextModule.module.id}`
                  : `${basePath}/phase/svc-bases`
              }
            >
              <Button size="md">
                {hasStarted ? "Continuer le cours" : "Commencer le cours"}
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-4 mb-10">
        <ContinueCard
          basePath={basePath}
          nextModule={nextModule}
          hasStarted={hasStarted}
        />
        <div className="grid gap-3">
          <MiniStat
            icon={<TrendingUp size={16} />}
            label="Progression globale"
            value={`${stats.percent}%`}
            accent="text-violet-400"
          />
          <MiniStat
            icon={<BookOpen size={16} />}
            label="Modules lus"
            value={String(readInCourse)}
          />
          <MiniStat
            icon={<Code2 size={16} />}
            label="Exercices faits"
            value={String(exercisesInCourse)}
          />
        </div>
      </section>

      {lastActivity && (
        <section className="mb-10">
          <SectionTitle icon="fa-clock-rotate-left" text="Dernière activité" />
          <LastActivityCard basePath={basePath} activity={lastActivity} />
        </section>
      )}

      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <SectionTitle
            icon="fa-layer-group"
            text={`Le parcours en ${phaseCount} phases`}
            noMargin
          />
          <Link
            to={`${basePath}/progress`}
            className="text-[13px] text-accent-2 hover:underline inline-flex items-center gap-1"
          >
            Voir tous les détails
            <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 md:items-start gap-4">
          {phases.map((phase, i) => {
            const accent = phaseAccent(phase.color);
            const st = phaseStats[i];
            return (
              <Link
                key={phase.id}
                to={`${basePath}/phase/${phase.id}`}
                className={cn(
                  "group relative rounded-xl border-base bg-bg-2 p-5 transition",
                  "hover:border-accent/30 hover:-translate-y-0.5 duration-200",
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0 border",
                      accent.bg,
                      accent.border,
                      accent.text,
                    )}
                  >
                    <i className={`fa-solid ${phase.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className={cn("font-bold truncate", accent.text)}>
                        {phase.title}
                      </h3>
                      {phase.scaffoldOnly && (
                        <span className="text-[9px] font-mono uppercase tracking-wider bg-bg-4 text-fg-3 px-1.5 py-0.5 rounded">
                          wip
                        </span>
                      )}
                    </div>
                    <p className="text-[12.5px] text-fg-2 leading-snug line-clamp-2">
                      {phase.summary}
                    </p>
                    <div className="mt-3">
                      <ProgressBar
                        value={st.done}
                        max={st.total}
                        color={phase.color}
                        size="sm"
                      />
                      <div className="mt-1.5 flex justify-between text-[11px] font-mono text-fg-3">
                        <span>{phase.modules.length} modules</span>
                        <span className={accent.text}>{st.percent}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {program && (
        <CourseSyllabus
          program={program}
          livePhases={phases}
          moduleHref={(moduleId) => `${basePath}/module/${moduleId}`}
          description="Cycle Prompt → Audit → Ship appliqué de bout en bout : dès la phase 4, les projets alimentent le même produit qui devient le capstone certifiant."
        />
      )}

      <section className="mt-10">
        <SectionTitle icon="fa-bolt" text="Raccourcis" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ShortcutCard
            to={`${basePath}/progress`}
            icon={<TrendingUp size={16} />}
            title="Progression"
            desc="Stats détaillées, export / import JSON"
          />
          <ShortcutCard
            to={`${basePath}/bookmarks`}
            icon={<Bookmark size={16} />}
            title="Favoris"
            desc={`${bookmarksInCourse} module${bookmarksInCourse > 1 ? "s" : ""} en favori`}
          />
          <ShortcutCard
            to={`${basePath}/search`}
            icon={<i className="fa-solid fa-magnifying-glass text-[14px]" />}
            title="Recherche"
            desc="Trouve un concept précis"
          />
        </div>
      </section>
    </div>
  );
}

function SectionTitle({
  icon,
  text,
  noMargin,
}: {
  icon: string;
  text: string;
  noMargin?: boolean;
}) {
  return (
    <h2
      className={cn(
        "text-[11px] font-mono uppercase tracking-[0.15em] text-fg-3 flex items-center gap-2",
        !noMargin && "mb-4",
      )}
    >
      <i className={`fa-solid ${icon}`} />
      {text}
    </h2>
  );
}

function MiniStat({
  icon,
  label,
  value,
  accent = "text-fg",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border-base bg-bg-2 p-4 flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-bg-3 text-fg-2 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-mono uppercase tracking-wider text-fg-3">
          {label}
        </div>
        <div className={cn("text-xl font-extrabold font-mono", accent)}>
          {value}
        </div>
      </div>
    </div>
  );
}

function ContinueCard({
  basePath,
  nextModule,
  hasStarted,
}: {
  basePath: string;
  nextModule: { phase: Phase; module: Module } | null;
  hasStarted: boolean;
}) {
  if (!nextModule) {
    return (
      <div className="lg:col-span-2 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-bg-2 p-6 md:p-8 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-2xl">
          <i className="fa-solid fa-trophy" />
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-emerald-400 mb-1">
            Modules jouables terminés
          </div>
          <div className="text-xl font-extrabold">
            Bravo, tu as complété les modules déjà rédigés !
          </div>
          <p className="text-[13px] text-fg-2 mt-1">
            Les prochaines phases arrivent au fil de la rédaction. Tu peux
            revoir le syllabus ou approfondir les audits déjà faits.
          </p>
        </div>
      </div>
    );
  }

  const accent = phaseAccent(nextModule.phase.color);
  return (
    <Link
      to={`${basePath}/module/${nextModule.module.id}`}
      className="lg:col-span-2 group relative rounded-2xl border-base bg-bg-2 p-6 md:p-7 transition hover:border-accent/40 duration-200"
    >
      <div className="relative flex items-start gap-5">
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0",
            "bg-violet-500/15 text-violet-400 border border-violet-500/30",
          )}
        >
          <PlayCircle size={26} />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={cn(
              "text-[11px] font-mono uppercase tracking-[0.15em] mb-1",
              accent.text,
            )}
          >
            {hasStarted
              ? "Continuer là où tu t'es arrêté"
              : "Commencer le parcours"}
          </div>
          <div className="flex items-center gap-2 mb-1">
            <i className={`fa-solid ${nextModule.phase.icon} ${accent.text}`} />
            <span className={cn("text-[12px] font-semibold", accent.text)}>
              {nextModule.phase.label}
            </span>
            <span className="text-fg-3 text-[12px] font-mono">·</span>
            <span className="text-[12px] font-mono text-fg-3">
              {nextModule.module.index}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight leading-tight">
            {nextModule.module.title}
          </h3>
          <p className="text-[13.5px] text-fg-2 mt-1.5 leading-relaxed">
            {nextModule.module.subtitle}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Button size="sm" className="pointer-events-none">
              {hasStarted ? "Reprendre ce module" : "Ouvrir le module"}
              <ArrowRight size={14} />
            </Button>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-fg-3 ml-1">
              <Clock size={11} /> {nextModule.module.duration}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function LastActivityCard({
  basePath,
  activity,
}: {
  basePath: string;
  activity: {
    phase: Phase;
    module: Module;
    score: { correct: number; total: number; updatedAt: number };
  };
}) {
  const accent = phaseAccent(activity.phase.color);
  const passed =
    activity.score.total > 0 &&
    activity.score.correct / activity.score.total >= 0.7;
  const when = formatRelativeTime(activity.score.updatedAt);

  return (
    <Link
      to={`${basePath}/module/${activity.module.id}`}
      className="flex items-start gap-4 rounded-xl border-base bg-bg-2 p-5 hover:border-accent/30 transition group"
    >
      <div
        className={cn(
          "w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0",
          passed
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
            : cn(accent.bg, accent.text, "border", accent.border),
        )}
      >
        {passed ? <CheckCircle2 size={18} /> : <Target size={18} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-0.5">
          <span className={accent.text}>{activity.phase.label}</span>
          <span>·</span>
          <span>{when}</span>
        </div>
        <div className="font-bold group-hover:text-accent-2 transition">
          {activity.module.title}
        </div>
        <div className="text-[13px] text-fg-2 mt-1">
          Quiz :{" "}
          <strong className={passed ? "text-emerald-400" : "text-amber-400"}>
            {activity.score.correct}/{activity.score.total}
          </strong>{" "}
          {passed ? " · validé" : " · à refaire pour valider"}
        </div>
      </div>
      <ArrowRight
        size={16}
        className="text-fg-3 mt-2 group-hover:text-fg group-hover:translate-x-0.5 transition flex-shrink-0"
      />
    </Link>
  );
}

function ShortcutCard({
  to,
  icon,
  title,
  desc,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-xl border-base bg-bg-2 p-5 hover:border-accent/30 transition flex items-start gap-3"
    >
      <div className="w-9 h-9 rounded-lg bg-bg-3 text-accent-2 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-bold">{title}</div>
        <div className="text-[12px] text-fg-2 mt-0.5">{desc}</div>
      </div>
      <ArrowRight
        size={14}
        className="text-fg-3 mt-2 group-hover:text-fg group-hover:translate-x-0.5 transition"
      />
    </Link>
  );
}

function formatRelativeTime(ts: number) {
  const diff = Date.now() - ts;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `il y a ${days} j`;
  return new Date(ts).toLocaleDateString("fr-FR");
}
