import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Download, Upload, RefreshCw, TrendingUp, ArrowRight } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/i18n/LocaleProvider";
import { useLocalePath } from "@/i18n/useLocalePath";
import { useT } from "@/i18n/useT";
import { getCourses } from "@/data/courses";
import {
  reactCourseArea,
  svcCourseArea,
  resolveCourseArea,
  type CourseAreaBase,
} from "@/components/layout/courseArea";
import {
  aggregateCourseStats,
  computeCourseStats,
  computePhaseStats,
  courseModuleIds,
  selectLearnerCourses,
} from "@/lib/courseProgress";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { MobileCollapse } from "@/components/ui/MobileCollapse";
import { SyncStatusBadge } from "@/components/auth/SyncStatusBadge";
import { cn, phaseAccent } from "@/lib/utils";
import type { Course, LessonProgress, Phase } from "@/types";

const AREA_BY_COURSE: Record<string, CourseAreaBase> = {
  react: reactCourseArea,
  svc: svcCourseArea,
};

export function ProgressPage() {
  const t = useT();
  const { locale } = useLocale();
  const lp = useLocalePath();
  const { user } = useAuth();
  const { progress, reset, exportJson, importJson } = useProgress();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const learnerCourses = useMemo(
    () => selectLearnerCourses(getCourses(locale), progress),
    [locale, progress],
  );

  const courseRows = useMemo(
    () =>
      learnerCourses.map((course) => {
        const areaBase = AREA_BY_COURSE[course.id] ?? reactCourseArea;
        const area = resolveCourseArea(areaBase, locale);
        return {
          course,
          basePath: area.basePath,
          navTitle: area.navTitle,
          navIcon: area.navIcon,
          navAccent: area.navAccent,
          stats: computeCourseStats(course.phases, progress),
          phaseStats: computePhaseStats(course.phases, progress),
          detail: courseDetailStats(course.phases, progress),
        };
      }),
    [learnerCourses, locale, progress],
  );

  const platform = useMemo(
    () => aggregateCourseStats(courseRows.map((row) => row.stats)),
    [courseRows],
  );

  const platformDetail = useMemo(() => {
    return courseRows.reduce(
      (acc, row) => ({
        read: acc.read + row.detail.read,
        quizzesTaken: acc.quizzesTaken + row.detail.quizzesTaken,
        exercisesSolved: acc.exercisesSolved + row.detail.exercisesSolved,
        exercisesRevealed: acc.exercisesRevealed + row.detail.exercisesRevealed,
        challenges: acc.challenges + row.detail.challenges,
      }),
      {
        read: 0,
        quizzesTaken: 0,
        exercisesSolved: 0,
        exercisesRevealed: 0,
        challenges: 0,
      },
    );
  }, [courseRows]);

  function handleExport() {
    const json = exportJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mezes-progression-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        importJson(String(ev.target?.result ?? ""));
        alert(t("progress.importOk"));
      } catch (err) {
        alert(t("progress.importBad", { error: (err as Error).message }));
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleReset() {
    if (window.confirm(t("progress.resetConfirm"))) {
      reset();
    }
  }

  const backupBody = (
    <>
      {user && <SyncStatusBadge variant="card" className="mb-3" />}
      <p className="mb-4 text-[13px] leading-relaxed text-fg-2">
        {user ? t("progress.backupSignedIn") : t("progress.backupGuest")}
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          leftIcon={<Download size={14} />}
          onClick={handleExport}
        >
          {t("progress.exportJson")}
        </Button>
        <Button
          variant="ghost"
          leftIcon={<Upload size={14} />}
          onClick={() => fileInputRef.current?.click()}
        >
          {t("progress.import")}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          onChange={handleImport}
          hidden
        />
        <div className="flex-1" />
        <Button
          variant="danger"
          leftIcon={<RefreshCw size={14} />}
          onClick={handleReset}
        >
          {t("progress.resetAll")}
        </Button>
      </div>
    </>
  );

  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl animate-fade-in px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mb-2 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-accent-2 sm:mb-3">
        <TrendingUp size={14} aria-hidden="true" /> {t("progress.title")}
      </div>
      <h1 className="mb-2 text-[1.75rem] font-extrabold tracking-tight sm:text-4xl">
        {t("progress.where")}
      </h1>
      <p className="max-w-2xl text-[14px] leading-relaxed text-fg-2 sm:text-[15px]">
        {t("progress.acrossTracks", { n: courseRows.length })}
      </p>

      <div className="mt-5 rounded-xl border-base bg-bg-2 p-4 sm:mt-6 sm:p-5">
        <div className="mb-3 text-sm font-semibold">{t("progress.global")}</div>
        <ProgressBar value={platform.done} max={platform.total} size="md" />
        <div className="mt-1.5 flex justify-between font-mono text-[12px] text-fg-3">
          <span>
            {t("progress.steps", { done: platform.done, total: platform.total })}
          </span>
          <span className="text-accent-2">{platform.percent}%</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard
          label={t("progress.global")}
          value={`${platform.percent}%`}
          accent="text-accent-2"
          className="hidden lg:block"
        />
        <StatCard
          label={t("progress.modulesRead")}
          value={String(platformDetail.read)}
          className="hidden lg:block"
        />
        <StatCard
          label={t("progress.quizzesPassed")}
          value={`${platform.quizPassed}/${platformDetail.quizzesTaken || 0}`}
        />
        <StatCard
          label={t("progress.exercisesSolved")}
          value={String(platformDetail.exercisesSolved)}
          accent="text-emerald-400"
        />
        <StatCard
          label={t("progress.exercisesSeen")}
          value={String(platformDetail.exercisesRevealed)}
          accent="text-sky-300"
        />
        <StatCard
          label={t("progress.challenges")}
          value={String(platformDetail.challenges)}
        />
      </div>

      <h2 className="mb-4 mt-8 text-lg font-bold lg:mt-10">{t("progress.byTrack")}</h2>
      <div className="space-y-8">
        {courseRows.map((row) => (
          <CourseProgressSection
            key={row.course.id}
            title={row.navTitle}
            icon={row.navIcon}
            accent={row.navAccent}
            href={row.basePath}
            openLabel={t("progress.openTrack")}
            stats={row.stats}
            phases={row.course.phases}
            phaseStats={row.phaseStats}
            basePath={row.basePath}
            notStartedLabel={t("progress.notStarted")}
          />
        ))}
      </div>

      <p className="mt-6 text-[13px] text-fg-3">
        <Link to={lp("/#catalog")} className="text-accent-2 hover:underline">
          {t("progress.browseCatalog")}
        </Link>
      </p>

      <section className="mt-8 lg:mt-10">
        <h2 className="mb-3 hidden text-lg font-bold lg:block">{t("progress.backup")}</h2>
        <MobileCollapse
          title={t("progress.backup")}
          icon={<Download size={14} className="text-fg-3" aria-hidden="true" />}
        >
          <div className="lg:rounded-xl lg:border-base lg:bg-bg-2 lg:p-5">
            {backupBody}
          </div>
        </MobileCollapse>
      </section>
    </div>
  );
}

function courseDetailStats(phases: Phase[], progress: LessonProgress) {
  const moduleIds = courseModuleIds(phases);
  const quizIds = new Set(
    phases.flatMap(
      (p) => p.modules.map((m) => m.quiz?.id).filter(Boolean) as string[],
    ),
  );
  const exerciseIds = new Set(
    phases.flatMap((p) =>
      p.modules.flatMap((m) => (m.exercises ?? []).map((e) => e.id)),
    ),
  );
  const phaseIds = new Set(phases.map((p) => p.id));

  return {
    read: progress.readModules.filter((id) => moduleIds.has(id)).length,
    quizzesTaken: Object.keys(progress.quizScores).filter((id) =>
      quizIds.has(id),
    ).length,
    exercisesSolved: Object.entries(progress.exerciseProgress).filter(
      ([id, e]) => exerciseIds.has(id) && e.status === "solved",
    ).length,
    exercisesRevealed: Object.entries(progress.exerciseProgress).filter(
      ([id, e]) => exerciseIds.has(id) && e.status === "revealed",
    ).length,
    challenges: Object.entries(progress.challengeScores).filter(
      ([id, s]) =>
        phaseIds.has(id) && s.total > 0 && s.passedIds.length === s.total,
    ).length,
  };
}

function CourseProgressSection({
  title,
  icon,
  accent,
  href,
  openLabel,
  stats,
  phases,
  phaseStats,
  basePath,
  notStartedLabel,
}: {
  title: string;
  icon: string;
  accent: { text: string; chip: string };
  href: string;
  openLabel: string;
  stats: { done: number; total: number; percent: number };
  phases: Course["phases"];
  phaseStats: ReturnType<typeof computePhaseStats>;
  basePath: string;
  notStartedLabel: string;
}) {
  return (
    <section className="min-w-0">
      <div className="mb-3 flex min-w-0 flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <i
            className={cn("fa-solid shrink-0 text-[15px]", icon, accent.text)}
            aria-hidden="true"
          />
          <h3 className="min-w-0 truncate text-base font-bold sm:text-lg">
            {title}
          </h3>
          <span
            className={cn(
              "shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
              accent.chip,
            )}
          >
            {stats.percent}%
          </span>
        </div>
        <Link
          to={href}
          className="inline-flex min-h-11 items-center gap-1 text-[13px] font-semibold text-accent-2 hover:underline sm:min-h-0"
        >
          {openLabel}
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>

      <ProgressBar value={stats.done} max={stats.total} size="sm" />
      <div className="mt-1.5 font-mono text-[11px] text-fg-3">
        {stats.done} / {stats.total}
        {stats.done === 0 ? ` · ${notStartedLabel}` : ""}
      </div>

      <div className="mt-3 space-y-2">
        {phases.map((phase, i) => {
          const phaseAccentCls = phaseAccent(phase.color);
          const st = phaseStats[i];
          return (
            <Link
              key={phase.id}
              to={`${basePath}/phase/${phase.id}`}
              className="block min-w-0 rounded-xl border-base bg-bg-2 p-3.5 transition hover:border-accent/30 sm:p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-base sm:h-10 sm:w-10",
                    phaseAccentCls.bg,
                    phaseAccentCls.border,
                    phaseAccentCls.text,
                  )}
                >
                  <i className={`fa-solid ${phase.icon}`} aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center gap-2">
                    <div
                      className={cn(
                        "min-w-0 truncate text-sm font-bold",
                        phaseAccentCls.text,
                      )}
                    >
                      {phase.title}
                    </div>
                    <span
                      className={cn(
                        "shrink-0 font-mono text-[11px]",
                        phaseAccentCls.text,
                      )}
                    >
                      {st.percent}%
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <ProgressBar
                      value={st.done}
                      max={st.total}
                      color={phase.color}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  accent = "text-fg",
  className,
}: {
  label: string;
  value: string;
  accent?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border-base bg-bg-2 p-3 sm:p-4", className)}>
      <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-fg-3 sm:text-[11px]">
        {label}
      </div>
      <div className={cn("font-mono text-xl font-extrabold sm:text-2xl", accent)}>
        {value}
      </div>
    </div>
  );
}
