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
import { useT } from "@/i18n/useT";
import { useCourseArea } from "@/components/layout/courseArea";
import {
  computeCourseStats,
  computePhaseStats,
  courseModuleIds,
} from "@/lib/courseProgress";
import { cn, phaseAccent } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { MobileCollapse } from "@/components/ui/MobileCollapse";
import { CourseSyllabus } from "@/components/course/CourseSyllabus";
import type { Module, Phase } from "@/types";

/**
 * Secure Vibe Coding course home: resume, stats, last activity,
 * phase track, then full syllabus (aligned with React course page).
 */
export function SvcCoursePage() {
  const t = useT();
  const { locale } = useLocale();
  const { basePath } = useCourseArea();
  const { progress } = useProgress();
  const { meta, program, phases } = buildSvcCourse(locale);

  const phaseCount = phases.length;
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
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10 animate-fade-in">
      <section className="relative mb-8 min-w-0 lg:mb-10">
        <div className="relative min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-violet-400 sm:mb-3">
            <i className={`fa-solid ${meta.icon}`} aria-hidden="true" />
            {t("course.svcEyebrow")}
            <span className="text-fg-2"> Mezes Academy</span>
          </div>
          <h1 className="text-[1.75rem] font-extrabold leading-[1.05] tracking-tight text-balance sm:text-4xl md:text-5xl">
            {t("course.svcHeroBefore")}{" "}
            <em className="not-italic text-violet-400">
              {t("course.svcHeroAccent")}
            </em>
            ,
            <br />
            {t("course.svcHeroAfter")}
          </h1>
          <p className="prose-lesson mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-2 sm:mt-5 sm:text-[17px]">
            {t("course.svcHeroBody")}
          </p>
          <div className="mt-5 sm:mt-7">
            <Link
              to={
                nextModule
                  ? `${basePath}/module/${nextModule.module.id}`
                  : `${basePath}/phase/svc-bases`
              }
            >
              <Button size="md">
                {hasStarted ? t("course.continueCourse") : t("course.startCourse")}
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-8 grid gap-3 lg:mb-10 lg:grid-cols-3 lg:gap-4">
        <ContinueCard
          basePath={basePath}
          nextModule={nextModule}
          hasStarted={hasStarted}
          t={t}
        />

        <div className="flex items-center justify-between gap-3 rounded-xl border-base bg-bg-2 px-4 py-3 lg:hidden">
          <span className="font-mono text-[11px] uppercase tracking-wider text-fg-3">
            {t("courseBar.progress")}
          </span>
          <span className="font-mono text-lg font-extrabold text-violet-400">
            {stats.percent}%
          </span>
        </div>

        <div className="hidden gap-3 lg:grid">
          <MiniStat
            icon={<TrendingUp size={16} />}
            label={t("course.globalProgress")}
            value={`${stats.percent}%`}
            accent="text-violet-400"
          />
          <MiniStat
            icon={<BookOpen size={16} />}
            label={t("course.modulesRead")}
            value={String(readInCourse)}
          />
          <MiniStat
            icon={<Code2 size={16} />}
            label={t("course.exercisesDone")}
            value={String(exercisesInCourse)}
          />
        </div>
      </section>

      {lastActivity && (
        <section className="mb-8 lg:mb-10">
          <SectionTitle icon="fa-clock-rotate-left" text={t("course.lastActivity")} />
          <LastActivityCard basePath={basePath} activity={lastActivity} t={t} />
        </section>
      )}

      <section className="mb-8 min-w-0 lg:mb-10">
        <div className="mb-4 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <SectionTitle
            icon="fa-layer-group"
            text={t("course.pathInPhases", { n: phaseCount })}
            noMargin
          />
          <Link
            to={`${basePath}/progress`}
            className="inline-flex min-h-11 shrink-0 items-center gap-1 self-start text-[13px] text-accent-2 hover:underline sm:min-h-0 sm:self-auto"
          >
            <span className="sm:hidden">{t("common.details")}</span>
            <span className="hidden sm:inline">{t("common.seeAllDetails")}</span>
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 md:items-start md:gap-4">
          {phases.map((phase, i) => {
            const accent = phaseAccent(phase.color);
            const st = phaseStats[i];
            return (
              <Link
                key={phase.id}
                to={`${basePath}/phase/${phase.id}`}
                className={cn(
                  "group relative block min-w-0 overflow-hidden rounded-xl border-base bg-bg-2 p-4 sm:p-5 transition",
                  "hover:border-accent/30 hover:-translate-y-0.5 duration-200",
                )}
              >
                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-base sm:h-12 sm:w-12 sm:text-lg",
                      accent.bg,
                      accent.border,
                      accent.text,
                    )}
                  >
                    <i className={`fa-solid ${phase.icon}`} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex min-w-0 items-center gap-2">
                      <h3 className={cn("min-w-0 truncate font-bold", accent.text)}>
                        {phase.title}
                      </h3>
                      {phase.scaffoldOnly && (
                        <span className="shrink-0 rounded bg-bg-4 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-fg-3">
                          wip
                        </span>
                      )}
                    </div>
                    <p className="break-words text-[12.5px] leading-snug text-fg-2 line-clamp-2">
                      {phase.summary}
                    </p>
                    <div className="mt-3 min-w-0">
                      <ProgressBar
                        value={st.done}
                        max={st.total}
                        color={phase.color}
                        size="sm"
                      />
                      <div className="mt-1.5 flex justify-between gap-2 font-mono text-[11px] text-fg-3">
                        <span className="truncate">
                          {phase.modules.length} {t("common.modules")}
                        </span>
                        <span className={cn("shrink-0", accent.text)}>{st.percent}%</span>
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
        <div className="hidden lg:block">
          <CourseSyllabus
            program={program}
            livePhases={phases}
            moduleHref={(moduleId) => `${basePath}/module/${moduleId}`}
            description={t("course.svcSyllabusDesc")}
          />
        </div>
      )}

      <section className="mt-8 lg:mt-10">
        <div className="hidden lg:block">
          <SectionTitle icon="fa-bolt" text={t("course.shortcuts")} />
        </div>
        <MobileCollapse
          title={t("course.shortcuts")}
          icon={<i className="fa-solid fa-bolt text-fg-3" aria-hidden="true" />}
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ShortcutCard
              to={`${basePath}/progress`}
              icon={<TrendingUp size={16} />}
              title={t("course.shortcutProgress")}
              desc={t("course.shortcutProgressDesc")}
            />
            <ShortcutCard
              to={`${basePath}/bookmarks`}
              icon={<Bookmark size={16} />}
              title={t("course.shortcutBookmarks")}
              desc={t("course.shortcutBookmarksDesc", {
                n: bookmarksInCourse,
                s: bookmarksInCourse > 1 ? "s" : "",
              })}
            />
            <ShortcutCard
              to={`${basePath}/search`}
              icon={<i className="fa-solid fa-magnifying-glass text-[14px]" />}
              title={t("course.shortcutSearch")}
              desc={t("course.shortcutSearchDesc")}
            />
          </div>
        </MobileCollapse>
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
        "flex min-w-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3 sm:tracking-[0.15em]",
        !noMargin && "mb-4",
      )}
    >
      <i className={`fa-solid ${icon} shrink-0`} aria-hidden="true" />
      <span className="min-w-0 leading-snug">{text}</span>
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
  t,
}: {
  basePath: string;
  nextModule: { phase: Phase; module: Module } | null;
  hasStarted: boolean;
  t: ReturnType<typeof useT>;
}) {
  if (!nextModule) {
    return (
      <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-bg-2 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6 md:p-8 lg:col-span-2">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl text-emerald-400">
          <i className="fa-solid fa-trophy" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.15em] text-emerald-400">
            {t("course.svcModulesDoneEyebrow")}
          </div>
          <div className="text-lg font-extrabold sm:text-xl">
            {t("course.svcModulesDoneTitle")}
          </div>
          <p className="mt-1 text-[13px] text-fg-2">
            {t("course.svcModulesDoneBody")}
          </p>
        </div>
      </div>
    );
  }

  const accent = phaseAccent(nextModule.phase.color);
  return (
    <Link
      to={`${basePath}/module/${nextModule.module.id}`}
      className="group relative min-w-0 overflow-hidden rounded-2xl border-base bg-bg-2 p-5 transition duration-200 hover:border-accent/40 sm:p-6 md:p-7 lg:col-span-2"
    >
      <div className="relative flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14",
            "border border-violet-500/30 bg-violet-500/15 text-violet-400",
          )}
        >
          <PlayCircle size={26} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div
            className={cn(
              "text-[11px] font-mono uppercase tracking-[0.15em] mb-1",
              accent.text,
            )}
          >
            {hasStarted ? t("course.continueWhere") : t("course.startPath")}
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
          <h3 className="break-words text-xl font-extrabold leading-tight tracking-tight md:text-2xl">
            {nextModule.module.title}
          </h3>
          <p className="mt-1.5 break-words text-[13.5px] leading-relaxed text-fg-2">
            {nextModule.module.subtitle}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button size="sm" className="pointer-events-none">
              {hasStarted ? t("course.resume") : t("course.open")}
              <ArrowRight size={14} />
            </Button>
            <span className="ml-1 flex items-center gap-1.5 font-mono text-[11px] text-fg-3">
              <Clock size={11} aria-hidden="true" /> {nextModule.module.duration}
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
  t,
}: {
  basePath: string;
  activity: {
    phase: Phase;
    module: Module;
    score: { correct: number; total: number; updatedAt: number };
  };
  t: ReturnType<typeof useT>;
}) {
  const accent = phaseAccent(activity.phase.color);
  const passed =
    activity.score.total > 0 &&
    activity.score.correct / activity.score.total >= 0.7;
  const when = formatRelativeTime(activity.score.updatedAt, t);

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
          {t("learn.quizScore", {
            score: `${activity.score.correct}/${activity.score.total}`,
          })}
          {passed ? t("course.validated") : t("course.redo")}
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

function formatRelativeTime(ts: number, t: ReturnType<typeof useT>) {
  const diff = Date.now() - ts;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return t("course.justNow");
  if (minutes < 60) return t("course.minutesAgo", { n: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return t("course.hoursAgo", { n: hours });
  const days = Math.floor(hours / 24);
  if (days < 7) return t("course.daysAgo", { n: days });
  return new Date(ts).toLocaleDateString("fr-FR");
}
