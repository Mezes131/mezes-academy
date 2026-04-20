import { Link } from "react-router-dom";
import { phases } from "@/data/phases";
import { useProgress } from "@/hooks/useProgress";
import { cn, phaseAccent } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowRight, BookOpen, Code2, TrendingUp } from "lucide-react";

export function HomePage() {
  const { stats, phaseStats } = useProgress();

  // Trouver la prochaine phase/module à travailler
  const nextStart = phases[0];
  const nextModule = nextStart.modules[0];

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 animate-fade-in">
      {/* ─── Hero ───────────────────────────────── */}
      <div className="mb-14">
        <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-accent-2 mb-4">
          <Sparkles size={12} className="inline mr-1" /> Parcours interactif
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[0.95] mb-5">
          Maîtriser <em className="text-accent-2 font-extrabold not-italic">React</em>
          <br />
          de zéro à expert.
        </h1>
        <p className="max-w-2xl text-[17px] text-fg-2 font-serif leading-relaxed">
          Cours complet construit autour de 5 phases progressives, avec des quiz
          pour valider chaque concept, des exercices live où tu codes dans le
          navigateur, et un suivi de ta progression sauvegardé automatiquement.
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-7">
          <Link to={`/module/${nextModule.id}`}>
            <Button leftIcon={<BookOpen size={16} />}>
              {stats.done === 0 ? "Commencer l'introduction" : "Reprendre"}
              <ArrowRight size={14} />
            </Button>
          </Link>
          <Link to="/progress">
            <Button variant="ghost" leftIcon={<TrendingUp size={16} />}>
              Voir ma progression
            </Button>
          </Link>
        </div>

        {/* Barre de progression globale */}
        <div className="mt-10 rounded-xl border-base bg-bg-2 p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm font-bold">Progression globale</div>
              <div className="text-[12px] text-fg-3 mt-0.5">
                {stats.done} / {stats.total} étapes validées
              </div>
            </div>
            <div className="text-3xl font-extrabold text-accent-2 font-mono">
              {stats.percent}%
            </div>
          </div>
          <ProgressBar value={stats.done} max={stats.total} size="md" />
        </div>
      </div>

      {/* ─── Phases grid ─────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          Le parcours en 5 phases
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {phases.map((phase, i) => {
            const accent = phaseAccent(phase.color);
            const st = phaseStats[i];
            return (
              <Link
                key={phase.id}
                to={`/phase/${phase.id}`}
                className={cn(
                  "group relative rounded-xl border-base bg-bg-2 p-6 transition",
                  "hover:border-accent/30 hover:-translate-y-0.5 duration-200",
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-xl border flex items-center justify-center text-xl flex-shrink-0",
                      accent.bg,
                      accent.border,
                      accent.text,
                    )}
                  >
                    <i className={`fa-solid ${phase.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={cn("text-lg font-bold", accent.text)}>
                        {phase.title}
                      </h3>
                      {phase.scaffoldOnly && (
                        <span className="text-[10px] font-mono uppercase tracking-wider bg-bg-4 text-fg-3 px-1.5 py-0.5 rounded">
                          wip
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-fg-2 leading-relaxed line-clamp-2">
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
                        <span>
                          {phase.modules.length} modules
                        </span>
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

      {/* ─── Pitch pédagogique ──────────────────── */}
      <section className="mt-14 grid md:grid-cols-3 gap-4">
        <Feature
          icon={<BookOpen size={18} className="text-sky-400" />}
          title="Contenu pédagogique"
          desc="Concepts expliqués avec analogies concrètes, exemples et bonnes pratiques."
        />
        <Feature
          icon={<Code2 size={18} className="text-violet-400" />}
          title="Exercices live"
          desc="Code directement dans le navigateur grâce à un éditeur Sandpack intégré, avec indices progressifs."
        />
        <Feature
          icon={<TrendingUp size={18} className="text-emerald-400" />}
          title="Progression sauvegardée"
          desc="Chaque module lu, chaque quiz validé, chaque exercice terminé est stocké localement. Exportable en JSON."
        />
      </section>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border-base bg-bg-2 p-5">
      <div className="w-9 h-9 rounded-lg bg-bg-3 flex items-center justify-center mb-3">
        {icon}
      </div>
      <div className="text-sm font-bold mb-1">{title}</div>
      <p className="text-[13px] text-fg-2 leading-relaxed">{desc}</p>
    </div>
  );
}
