import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Rocket,
  Target,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/useProgress";
import { useLocalePath } from "@/i18n/useLocalePath";
import { useT } from "@/i18n/useT";

export interface SidePanelProps {
  completeness: number;
  className?: string;
}

/**
 * Right-hand panel on the profile header: profile completeness ring +
 * a compact learning-progress snapshot + a CTA to the progress page.
 */
export function SidePanel({ completeness, className }: SidePanelProps) {
  const { progress, stats } = useProgress();
  const lp = useLocalePath();
  const t = useT();
  const totalQuizzes = Object.keys(progress.quizScores).length;

  return (
    <div
      className={cn(
        "rounded-xl border-base bg-bg-3/40 p-5 space-y-5",
        className,
      )}
    >
      <CompletenessRing value={completeness} t={t} />

      <div className="h-px bg-base" />

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-fg-3">
            {t("footer.myProgress")}
          </span>
          <span
            className={cn(
              "text-[12px] font-mono font-bold tabular-nums",
              stats.percent >= 100 ? "text-emerald-400" : "text-accent-2",
            )}
          >
            {stats.percent}%
          </span>
        </div>

        <div className="space-y-1.5">
          <StatRow
            icon={<Target size={12} />}
            label={t("account.progress")}
            value={`${stats.percent}%`}
          />
          <StatRow
            icon={<BookOpen size={12} />}
            label={t("account.modulesRead")}
            value={String(progress.readModules.length)}
          />
          <StatRow
            icon={<Trophy size={12} />}
            label={t("account.quizzesPassed")}
            value={`${stats.quizPassed}/${totalQuizzes || 0}`}
          />
          <StatRow
            icon={<Rocket size={12} />}
            label={t("account.exercisesSolved")}
            value={String(stats.exercisesSolved)}
            accent="text-emerald-400"
          />
        </div>
      </div>

      <Link
        to={lp("/react/progress")}
        className="inline-flex items-center justify-center gap-1.5 w-full h-9 rounded-md bg-accent text-white text-[12px] font-semibold hover:bg-accent/90 transition"
      >
        {t("common.seeAllDetails")}
        <ArrowRight size={13} />
      </Link>
    </div>
  );
}

/* ─── Subcomponents ───────────────────────────────────────────── */

function CompletenessRing({
  value,
  t,
}: {
  value: number;
  t: ReturnType<typeof useT>;
}) {
  const clamp = Math.max(0, Math.min(100, Math.round(value)));
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const dash = (clamp / 100) * circumference;

  const helper =
    clamp === 100
      ? "Profil complet. Joli travail !"
      : clamp >= 75
        ? "Presque fini, plus qu'un petit effort."
        : clamp >= 50
          ? t("account.completenessGood")
          : clamp >= 25
            ? "Commence par renseigner ton nom et ton pseudo."
            : t("account.completenessLow");

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-16 h-16 flex-shrink-0">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-bg-3"
          />
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeLinecap="round"
            className={cn(
              "transition-[stroke-dasharray,color] duration-300 ease-out",
              clamp >= 100 ? "text-emerald-400" : "text-accent-2",
            )}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span
            className={cn(
              "text-[13px] font-mono font-bold tabular-nums",
              clamp >= 100 ? "text-emerald-400" : "text-fg",
            )}
          >
            {clamp}%
          </span>
        </div>
      </div>

      <div className="min-w-0">
        <div className="text-[11px] font-mono uppercase tracking-wider text-fg-3">
          {t("account.completeness")}
        </div>
        <p className="text-[12px] text-fg-2 leading-snug mt-0.5">{helper}</p>
      </div>
    </div>
  );
}

function StatRow({
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
    <div className="flex items-center justify-between gap-2 text-[12px]">
      <span className="inline-flex items-center gap-1.5 text-fg-3 min-w-0 truncate">
        <span className="text-fg-3 flex-shrink-0">{icon}</span>
        {label}
      </span>
      <span className={cn("font-mono font-semibold tabular-nums", accent)}>
        {value}
      </span>
    </div>
  );
}
