import { Link } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Lightbulb,
  Rocket,
  Target,
  Trophy,
} from "lucide-react";
import { cn, phaseAccent } from "@/lib/utils";
import { useProgress } from "@/hooks/useProgress";
import { useAuth, type UserProfile } from "@/hooks/useAuth";
import { findCourse } from "@/data";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useLocalePath } from "@/i18n/useLocalePath";
import { useT } from "@/i18n/useT";
import type { MessageKey } from "@/i18n/useT";

/**
 * Overview of the student's account: learning stats + what's missing to
 * complete the profile + shortcut to the course.
 */
export function OverviewTab() {
  const { profile } = useAuth();
  const { progress, stats, phaseStats } = useProgress();
  const lp = useLocalePath();
  const t = useT();
  const phases = findCourse("react")?.phases ?? [];

  if (!profile) return null;

  const totalQuizzesTaken = Object.keys(progress.quizScores).length;
  const checklist = buildChecklist(profile, t);
  const currentPhase = pickCurrentPhase(phaseStats);
  const nextMilestone = buildMilestone(stats, profile, t);

  return (
    <div className="space-y-8">
      {/* Stats ─────────────────────────────────────────────── */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-fg-3 mb-3">
          {t("account.keyStats")}
        </h2>
        <div className="grid sm:grid-cols-4 gap-3">
          <StatCard
            icon={<Target size={14} />}
            label={t("account.progress")}
            value={`${stats.percent}%`}
            accent="text-accent-2"
          />
          <StatCard
            icon={<BookOpen size={14} />}
            label={t("account.modulesRead")}
            value={String(progress.readModules.length)}
          />
          <StatCard
            icon={<Trophy size={14} />}
            label={t("account.quizzesPassed")}
            value={`${stats.quizPassed}/${totalQuizzesTaken || 0}`}
          />
          <StatCard
            icon={<Rocket size={14} />}
            label={t("account.exercisesSolved")}
            value={String(stats.exercisesSolved)}
            accent="text-emerald-400"
          />
        </div>
      </section>

      {/* Next milestone ────────────────────────────────────── */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-fg-3 mb-3">
          {t("account.nextMilestone")}
        </h2>
        <div className="rounded-xl border-base bg-bg-2 p-5 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent-2 inline-flex items-center justify-center flex-shrink-0">
            <Lightbulb size={16} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">{nextMilestone.title}</div>
            <p className="text-[13px] text-fg-2 leading-relaxed mt-0.5">
              {nextMilestone.description}
            </p>
            {currentPhase && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-fg-3 mb-1">
                  <span>{currentPhase.label}</span>
                  <span>
                    {currentPhase.done} / {currentPhase.total}
                  </span>
                </div>
                <ProgressBar
                  value={currentPhase.done}
                  max={currentPhase.total}
                  color={currentPhase.color}
                  size="sm"
                />
              </div>
            )}
          </div>
          <Link
            to={lp("/react")}
            className="self-center inline-flex items-center gap-1.5 px-3 h-8 rounded-md bg-accent text-white text-[12px] font-semibold hover:bg-accent/90 transition"
          >
            {t("nav.continue")}
          </Link>
        </div>
      </section>

      {/* Phase breakdown ───────────────────────────────────── */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-fg-3 mb-3">
          {t("account.byPhase")}
        </h2>
        <div className="space-y-2">
          {phases.map((phase) => {
            const st = phaseStats.find((s) => s.id === phase.id) ?? {
              done: 0,
              total: 0,
              percent: 0,
            };
            const accent = phaseAccent(phase.color);
            return (
              <Link
                key={phase.id}
                to={lp(`/react/phase/${phase.id}`)}
                className="flex items-center gap-4 rounded-xl border-base bg-bg-2 p-4 hover:border-accent/30 transition"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg border inline-flex items-center justify-center flex-shrink-0",
                    accent.bg,
                    accent.border,
                    accent.text,
                  )}
                >
                  <i className={`fa-solid ${phase.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className={cn("text-sm font-semibold", accent.text)}>
                      {phase.title}
                    </div>
                    <span className="text-[11px] font-mono text-fg-3">
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
              </Link>
            );
          })}
        </div>
      </section>

      {/* Profile checklist ─────────────────────────────────── */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-fg-3 mb-3">
          {t("account.completeProfile")}
        </h2>
        <div className="rounded-xl border-base bg-bg-2 p-5">
          <ul className="space-y-2.5">
            {checklist.map((item) => (
              <li key={item.key} className="flex items-start gap-3">
                {item.done ? (
                  <CheckCircle2
                    size={16}
                    className="text-emerald-400 mt-0.5 flex-shrink-0"
                  />
                ) : (
                  <Circle
                    size={16}
                    className="text-fg-3 mt-0.5 flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <div
                    className={cn(
                      "text-[13px] font-semibold",
                      item.done ? "text-fg-2 line-through" : "text-fg",
                    )}
                  >
                    {item.label}
                  </div>
                  {!item.done && (
                    <p className="text-[12px] text-fg-3 leading-relaxed">
                      {item.hint}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ─── Sub-components ────────────────────────────────────────── */

function StatCard({
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
    <div className="rounded-xl border-base bg-bg-2 p-4">
      <div className="text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-1 inline-flex items-center gap-1.5">
        {icon}
        {label}
      </div>
      <div className={cn("text-2xl font-extrabold font-mono", accent)}>
        {value}
      </div>
    </div>
  );
}

/* ─── Helpers ───────────────────────────────────────────────── */

interface ChecklistItem {
  key: string;
  label: string;
  hint: string;
  done: boolean;
}

type Translate = (key: MessageKey, vars?: Record<string, string | number>) => string;

function buildChecklist(profile: UserProfile, t: Translate): ChecklistItem[] {
  const hasLink = Object.values(profile.links ?? {}).some(
    (v) => typeof v === "string" && v.length > 0,
  );
  return [
    {
      key: "name",
      label: t("account.checklistName"),
      hint: t("account.checklistNameHint"),
      done: Boolean(profile.fullName),
    },
    {
      key: "username",
      label: t("account.checklistUsername"),
      hint: t("account.checklistUsernameHint"),
      done: Boolean(profile.username),
    },
    {
      key: "bio",
      label: t("account.checklistBio"),
      hint: t("account.checklistBioHint"),
      done: Boolean(profile.bio),
    },
    {
      key: "links",
      label: t("account.checklistLinks"),
      hint: t("account.checklistLinksHint"),
      done: hasLink,
    },
  ];
}

function pickCurrentPhase(
  phaseStats: Array<{
    id: string;
    label: string;
    color: string;
    total: number;
    done: number;
    percent: number;
  }>,
) {
  const inProgress = phaseStats.find((p) => p.done > 0 && p.percent < 100);
  if (inProgress) return inProgress;
  const firstIncomplete = phaseStats.find((p) => p.percent < 100);
  return firstIncomplete ?? null;
}

function buildMilestone(
  stats: { percent: number; quizPassed: number; exercisesSolved: number },
  profile: UserProfile,
  t: Translate,
): { title: string; description: string } {
  if (!profile.fullName || !profile.username) {
    return {
      title: t("account.milestoneProfileTitle"),
      description: t("account.milestoneProfileBody"),
    };
  }
  if (stats.percent === 0) {
    return {
      title: "Lance-toi dans ton premier module",
      description:
        "Commence par la phase Introduction. Quelques minutes suffisent pour amorcer la machine.",
    };
  }
  if (stats.percent === 100) {
    return {
      title: t("account.milestoneDoneTitle"),
      description: t("account.milestoneDoneBody"),
    };
  }
  return {
    title: t("account.nextMilestone"),
    description: t("account.milestoneKeepGoing"),
  };
}
