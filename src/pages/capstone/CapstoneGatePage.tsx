import { Link } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { getCapstoneEligibility } from "@/lib/capstone";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2, Lock, Rocket, Trophy } from "lucide-react";

const TUTORIAL_PHASE_ID = "react-tooling";

export function CapstoneGatePage() {
  const { progress } = useProgress();
  const eligibility = getCapstoneEligibility(progress);

  const ratioValue =
    eligibility.moduleCount +
    eligibility.quizTotal +
    eligibility.exerciseTotal;
  const ratioDone =
    eligibility.readModulesCount +
    eligibility.quizPassed +
    eligibility.exerciseSolved;

  const checks = [
    {
      label: "Modules lus",
      done: eligibility.readModulesCount,
      total: eligibility.moduleCount,
    },
    {
      label: "Quiz validés (>= 70%)",
      done: eligibility.quizPassed,
      total: eligibility.quizTotal,
    },
    {
      label: "Exercices résolus (sans révélation)",
      done: eligibility.exerciseSolved,
      total: eligibility.exerciseTotal,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 animate-fade-in">
      <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-3">
        <Trophy size={14} />
        Projet final
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight">
        Gate du Capstone React Pro Path
      </h1>
      <p className="mt-3 text-fg-2 max-w-3xl leading-relaxed">
        Le projet final se débloque uniquement après validation complète du
        parcours: modules, quiz et exercices. La phase tutorielle Transition Pro
        fait partie des prérequis.
      </p>

      <section className="mt-8 rounded-2xl border-base bg-bg-2 p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Badge variant={eligibility.unlocked ? "success" : "warn"}>
              {eligibility.unlocked ? "Débloqué" : "Verrouillé"}
            </Badge>
            <span className="text-[12px] font-mono text-fg-3">
              {eligibility.phaseCount} phases à valider
            </span>
          </div>
          <span
            className={cn(
              "text-sm font-semibold",
              eligibility.unlocked ? "text-emerald-400" : "text-amber-400",
            )}
          >
            {ratioDone}/{ratioValue} étapes validées
          </span>
        </div>

        <ProgressBar value={ratioDone} max={Math.max(1, ratioValue)} size="md" />

        <div className="mt-5 grid md:grid-cols-3 gap-3">
          {checks.map((check) => {
            const complete = check.done === check.total;
            return (
              <div key={check.label} className="rounded-xl border-base bg-bg-3 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] text-fg-2">{check.label}</span>
                  {complete ? (
                    <CheckCircle2 size={15} className="text-emerald-400" />
                  ) : (
                    <Lock size={14} className="text-amber-400" />
                  )}
                </div>
                <div className="mt-2 text-lg font-extrabold font-mono">
                  {check.done}/{check.total}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border-base bg-bg-2 p-5 md:p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg border-base bg-bg-3 flex items-center justify-center text-accent-2">
            <Rocket size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold">Phase tutorielle (Sprint 2)</h2>
            <p className="mt-1 text-[13px] text-fg-2 leading-relaxed">
              Prépare ta transition vers les outils réels: VS Code, Git/GitHub,
              et déploiement. Cette phase doit être complétée avant le studio
              capstone.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link to={`/react/phase/${TUTORIAL_PHASE_ID}`}>
                <Button size="sm" variant="subtle">
                  Ouvrir la phase Transition Pro
                  <ArrowRight size={14} />
                </Button>
              </Link>
              {eligibility.unlocked ? (
                <Button size="sm">Entrer dans le Capstone Studio</Button>
              ) : (
                <Button size="sm" disabled>
                  Capstone Studio verrouillé
                </Button>
              )}
            </div>
            {!eligibility.unlocked && (
              <p className="mt-3 text-[12px] text-amber-300">
                Termine les éléments restants dans le parcours React pour
                déverrouiller le projet final.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
