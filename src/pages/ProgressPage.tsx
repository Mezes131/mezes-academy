import { useMemo, useRef } from "react";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { useCourseArea } from "@/components/layout/courseArea";
import {
  computeCourseStats,
  computePhaseStats,
  courseModuleIds,
} from "@/lib/courseProgress";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { MobileCollapse } from "@/components/ui/MobileCollapse";
import { SyncStatusBadge } from "@/components/auth/SyncStatusBadge";
import { cn, phaseAccent } from "@/lib/utils";
import { Download, Upload, RefreshCw, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useT } from "@/i18n/useT";

export function ProgressPage() {
  const t = useT();
  const { user } = useAuth();
  const { basePath, phases } = useCourseArea();
  const { progress, reset, exportJson, importJson } = useProgress();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stats = useMemo(
    () => computeCourseStats(phases, progress),
    [phases, progress],
  );
  const phaseStats = useMemo(
    () => computePhaseStats(phases, progress),
    [phases, progress],
  );
  const moduleIds = useMemo(() => courseModuleIds(phases), [phases]);

  const exerciseIds = useMemo(() => {
    const ids = new Set<string>();
    for (const phase of phases) {
      for (const mod of phase.modules) {
        for (const ex of mod.exercises ?? []) ids.add(ex.id);
      }
    }
    return ids;
  }, [phases]);

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
    if (
      window.confirm(t("progress.resetConfirm"))
    ) {
      reset();
    }
  }

  const courseQuizIds = useMemo(() => {
    const ids = new Set<string>();
    for (const phase of phases) {
      for (const mod of phase.modules) {
        if (mod.quiz) ids.add(mod.quiz.id);
      }
    }
    return ids;
  }, [phases]);

  const totalQuizzesTaken = Object.keys(progress.quizScores).filter((id) =>
    courseQuizIds.has(id),
  ).length;

  const exercisesSolved = Object.entries(progress.exerciseProgress).filter(
    ([id, e]) => exerciseIds.has(id) && e.status === "solved",
  ).length;
  const exercisesRevealed = Object.entries(progress.exerciseProgress).filter(
    ([id, e]) => exerciseIds.has(id) && e.status === "revealed",
  ).length;
  const challengeValidated = Object.values(progress.challengeScores).filter(
    (s) => s.total > 0 && s.passedIds.length === s.total,
  ).length;

  const readInCourse = progress.readModules.filter((id) =>
    moduleIds.has(id),
  ).length;

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
      <h1 className="mb-4 text-[1.75rem] font-extrabold tracking-tight sm:text-4xl">
        {t("progress.where")}
      </h1>

      <div className="mt-4 rounded-xl border-base bg-bg-2 p-4 sm:mt-6 sm:p-5">
        <div className="mb-3 text-sm font-semibold">{t("progress.global")}</div>
        <ProgressBar value={stats.done} max={stats.total} size="md" />
        <div className="mt-1.5 flex justify-between font-mono text-[12px] text-fg-3">
          <span>
            {t("progress.steps", { done: stats.done, total: stats.total })}
          </span>
          <span className="text-accent-2">{stats.percent}%</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard
          label={t("progress.global")}
          value={`${stats.percent}%`}
          accent="text-accent-2"
          className="hidden lg:block"
        />
        <StatCard
          label={t("progress.modulesRead")}
          value={String(readInCourse)}
          className="hidden lg:block"
        />
        <StatCard
          label={t("progress.quizzesPassed")}
          value={`${stats.quizPassed}/${totalQuizzesTaken || 0}`}
        />
        <StatCard
          label={t("progress.exercisesSolved")}
          value={String(exercisesSolved)}
          accent="text-emerald-400"
        />
        <StatCard
          label={t("progress.exercisesSeen")}
          value={String(exercisesRevealed)}
          accent="text-sky-300"
        />
        <StatCard
          label={t("progress.challenges")}
          value={String(challengeValidated)}
          className="sm:col-span-1"
        />
      </div>

      <h2 className="mb-3 mt-8 text-lg font-bold lg:mt-10 lg:mb-4">{t("progress.byPhase")}</h2>
      <div className="space-y-3">
        {phases.map((phase, i) => {
          const accent = phaseAccent(phase.color);
          const st = phaseStats[i];
          return (
            <Link
              key={phase.id}
              to={`${basePath}/phase/${phase.id}`}
              className="block min-w-0 rounded-xl border-base bg-bg-2 p-4 transition hover:border-accent/30 sm:p-5"
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-lg sm:h-11 sm:w-11",
                    accent.bg,
                    accent.border,
                    accent.text,
                  )}
                >
                  <i className={`fa-solid ${phase.icon}`} aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className={cn("min-w-0 truncate font-bold", accent.text)}>
                      {phase.title}
                    </div>
                    <span className={cn("shrink-0 font-mono text-xs", accent.text)}>
                      {st.percent}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <ProgressBar
                      value={st.done}
                      max={st.total}
                      color={phase.color}
                      size="sm"
                    />
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-fg-3">
                    {st.done} / {st.total}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

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
