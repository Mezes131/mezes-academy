import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Landing "How it works" section.
 * Presents the academy method in 3 numbered steps,
 * followed by 4 core promises.
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-12 md:py-20 bg-bg-2/30 border-y border-base"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 max-w-2xl">
          <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-fg-3 mb-3">
            <i className="fa-solid fa-compass mr-1.5" /> Méthode
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Une méthode en trois temps.
          </h2>
          <p className="mt-3 text-fg-2 leading-relaxed max-w-xl">
            Lis, pratique, valide. La boucle est courte pour que chaque notion
            se fixe dans ton code, pas seulement dans ta mémoire.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 relative">
          {/* Horizontal connector line (desktop) */}
          <div className="hidden md:block absolute top-8 left-16 right-16 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          {STEPS.map((step, i) => (
            <Step key={step.title} step={step} index={i} />
          ))}
        </div>

        {/* Promises */}
        <div className="mt-16 grid md:grid-cols-2 gap-4">
          {PROMISES.map((promise) => (
            <Promise key={promise.title} promise={promise} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Internal data ───────────────────────────────────────── */

interface StepData {
  icon: string;
  title: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}

const STEPS: StepData[] = [
  {
    icon: "fa-book-open",
    title: "Apprends",
    desc: "Des leçons claires, avec exemples de code et analogies concrètes. Tu avances à ton rythme, sans deadline artificielle.",
    color: "text-brand-intro",
    bg: "bg-brand-intro/10",
    border: "border-brand-intro/30",
  },
  {
    icon: "fa-code",
    title: "Pratique",
    desc: "Chaque module a son quiz et ses exercices live. Tu écris du vrai code dans le navigateur et tu vois le résultat tout de suite.",
    color: "text-brand-core",
    bg: "bg-brand-core/10",
    border: "border-brand-core/30",
  },
  {
    icon: "fa-chart-line",
    title: "Progresse",
    desc: "Ta progression est sauvegardée automatiquement. Reviens quand tu veux, reprends le module en cours, exporte tout en JSON.",
    color: "text-brand-expert",
    bg: "bg-brand-expert/10",
    border: "border-brand-expert/30",
  },
];

interface PromiseData {
  title: string;
  desc: string;
}

const PROMISES: PromiseData[] = [
  {
    title: "Du concret, pas de bruit",
    desc: "On te montre ce qu'il faut maîtriser pour être autonome. Pas la mode du mois, pas le jargon pour faire joli.",
  },
  {
    title: "Relu et testé",
    desc: "Chaque leçon est relue. Chaque exercice est vérifié. Chaque explication dit pourquoi, pas seulement comment.",
  },
  {
    title: "Confort de lecture",
    desc: "Interface claire, thèmes clair et sombre, responsive, barre de progression toujours à portée de main.",
  },
  {
    title: "Ta progression t'appartient",
    desc: "Stockée localement et synchronisée quand tu es connecté. Exportable en JSON. Aucun tracker, aucune pub.",
  },
];

/* ─── Private subcomponents ─────────────────────────────────── */

function Step({ step, index }: { step: StepData; index: number }) {
  return (
    <div className="relative">
      <div
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl border relative bg-bg",
          step.bg,
          step.color,
          step.border,
        )}
      >
        <i className={`fa-solid ${step.icon}`} />
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-white text-[11px] font-bold font-mono flex items-center justify-center border-2 border-bg">
          {index + 1}
        </span>
      </div>
      <h3 className="text-xl font-bold mt-5">{step.title}</h3>
      <p className="text-[14px] text-fg-2 mt-2 leading-relaxed">{step.desc}</p>
    </div>
  );
}

function Promise({ promise }: { promise: PromiseData }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border-base bg-bg p-5">
      <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent-2 flex items-center justify-center flex-shrink-0">
        <Check size={16} />
      </div>
      <div>
        <div className="text-sm font-bold">{promise.title}</div>
        <p className="text-[13px] text-fg-2 mt-1 leading-relaxed">
          {promise.desc}
        </p>
      </div>
    </div>
  );
}
