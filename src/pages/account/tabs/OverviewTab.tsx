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
import { phases } from "@/data/phases";
import { ProgressBar } from "@/components/ui/ProgressBar";

/**
 * Overview of the student's account: learning stats + what's missing to
 * complete the profile + shortcut to the course.
 */
export function OverviewTab() {
  const { profile } = useAuth();
  const { progress, stats, phaseStats } = useProgress();

  if (!profile) return null;

  const totalQuizzesTaken = Object.keys(progress.quizScores).length;
  const checklist = buildChecklist(profile);
  const currentPhase = pickCurrentPhase(phaseStats);
  const nextMilestone = buildMilestone(stats, profile);

  return (
    <div className="space-y-8">
      {/* Stats ─────────────────────────────────────────────── */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-fg-3 mb-3">
          Mes chiffres clés
        </h2>
        <div className="grid sm:grid-cols-4 gap-3">
          <StatCard
            icon={<Target size={14} />}
            label="Progression"
            value={`${stats.percent}%`}
            accent="text-accent-2"
          />
          <StatCard
            icon={<BookOpen size={14} />}
            label="Modules lus"
            value={String(progress.readModules.length)}
          />
          <StatCard
            icon={<Trophy size={14} />}
            label="Quiz validés"
            value={`${stats.quizPassed}/${totalQuizzesTaken || 0}`}
          />
          <StatCard
            icon={<Rocket size={14} />}
            label="Exos résolus"
            value={String(stats.exercisesSolved)}
            accent="text-emerald-400"
          />
        </div>
      </section>

      {/* Next milestone ────────────────────────────────────── */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-fg-3 mb-3">
          Prochain jalon
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
            to="/react"
            className="self-center inline-flex items-center gap-1.5 px-3 h-8 rounded-md bg-accent text-white text-[12px] font-semibold hover:bg-accent/90 transition"
          >
            Continuer
          </Link>
        </div>
      </section>

      {/* Phase breakdown ───────────────────────────────────── */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-fg-3 mb-3">
          Par phase
        </h2>
        <div className="space-y-2">
          {phases.map((phase, i) => {
            const st = phaseStats[i];
            const accent = phaseAccent(phase.color);
            return (
              <Link
                key={phase.id}
                to={`/react/phase/${phase.id}`}
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
          Complète ton profil
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

function buildChecklist(profile: UserProfile): ChecklistItem[] {
  const hasLink = Object.values(profile.links ?? {}).some(
    (v) => typeof v === "string" && v.length > 0,
  );
  return [
    {
      key: "name",
      label: "Renseigner ton nom complet",
      hint: "Utilisé sur ton certificat de fin de parcours.",
      done: Boolean(profile.fullName),
    },
    {
      key: "username",
      label: "Choisir un pseudo public",
      hint: "Il servira plus tard pour la galerie des projets et ton profil partageable.",
      done: Boolean(profile.username),
    },
    {
      key: "bio",
      label: "Ajouter une bio courte",
      hint: "Une phrase qui donne envie de te découvrir.",
      done: Boolean(profile.bio),
    },
    {
      key: "links",
      label: "Ajouter au moins un lien public (GitHub, LinkedIn, site)",
      hint: "Ça enrichit ton portfolio dès la fin du parcours.",
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
): { title: string; description: string } {
  if (!profile.fullName || !profile.username) {
    return {
      title: "Complète ton profil",
      description:
        "Renseigne ton nom et ton pseudo public : ils seront utilisés pour ton certificat et pour valoriser ton profil plus tard.",
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
      title: "Bravo, parcours terminé !",
      description:
        "Tu peux désormais viser la phase projet final pour consolider tes acquis dans un vrai environnement pro.",
    };
  }
  return {
    title: "Continue ta progression",
    description:
      "Garde le rythme : valide quelques modules supplémentaires pour rester proche de tes prochains jalons.",
  };
}
