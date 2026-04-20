import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Section "Comment \u00e7a marche" de la landing.
 * Pr\u00e9sente la m\u00e9thode de l'acad\u00e9mie en 3 \u00e9tapes num\u00e9rot\u00e9es,
 * suivies de 4 "promesses" structurantes.
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
            Comment ça marche.
          </h2>
          <p className="mt-3 text-fg-2">
            Une boucle simple, conçue pour que tu apprennes vraiment et que tu
            le sentes dans ton code — pas juste dans ta tête.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 relative">
          {/* Ligne de liaison horizontale (desktop) */}
          <div className="hidden md:block absolute top-8 left-16 right-16 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          {STEPS.map((step, i) => (
            <Step key={step.title} step={step} index={i} />
          ))}
        </div>

        {/* Promesses */}
        <div className="mt-16 grid md:grid-cols-2 gap-4">
          {PROMISES.map((promise) => (
            <Promise key={promise.title} promise={promise} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Données internes ───────────────────────────────────────── */

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
    desc: "Des leçons claires et structurées avec exemples de code, analogies et bonnes pratiques. Ton rythme, sans deadline.",
    color: "text-brand-intro",
    bg: "bg-brand-intro/10",
    border: "border-brand-intro/30",
  },
  {
    icon: "fa-code",
    title: "Pratique",
    desc: "Chaque module a son quiz et ses exercices qui s'exécutent dans ton navigateur. Tu écris du vrai code, tu vois le résultat immédiatement.",
    color: "text-brand-core",
    bg: "bg-brand-core/10",
    border: "border-brand-core/30",
  },
  {
    icon: "fa-chart-line",
    title: "Progresse",
    desc: "Ta progression est sauvegardée automatiquement. Reviens quand tu veux, reprends là où tu t'es arrêté, exporte tout en JSON.",
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
    title: "Pas de bullshit",
    desc: "On t'apprend ce que tu dois vraiment savoir pour être autonome, pas la mode du moment.",
  },
  {
    title: "Construit avec soin",
    desc: "Chaque leçon est relue. Chaque exercice est testé. Chaque explication a un pourquoi.",
  },
  {
    title: "Accessible à tous",
    desc: "Interface claire, thème clair/sombre, responsive, raccourcis clavier, barre de progression.",
  },
  {
    title: "Ta progression t'appartient",
    desc: "Tout est stocké dans ton navigateur. Exportable en JSON. Aucun tracker, aucune pub.",
  },
];

/* ─── Sous-composants privés ─────────────────────────────────── */

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
