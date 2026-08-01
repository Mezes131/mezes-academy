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
      className="relative py-12 md:py-20 bg-bg-2/30 border-y-base"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 max-w-2xl">
          <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-fg-3 mb-3">
            <i className="fa-solid fa-compass mr-1.5" /> Méthode
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Comment on avance, concrètement.
          </h2>
          <p className="mt-3 text-fg-2 leading-relaxed max-w-xl">
            Tu comprends une idée, tu la mets
            en pratique, tu vérifies que ça tient. Puis tu passes à la suite.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:items-start relative">
          {/* Horizontal connector line (desktop) */}
          <div className="hidden md:block absolute top-8 left-16 right-16 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          {STEPS.map((step, i) => (
            <Step key={step.title} step={step} index={i} />
          ))}
        </div>

        {/* Promises */}
        <div className="mt-16 grid md:grid-cols-2 md:items-start gap-4">
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
    title: "Comprends",
    desc: "Des leçons courtes, avec des exemples que tu peux relier à ton quotidien. Que tu codes à la main ou avec l'IA, tu sais pourquoi ça marche.",
    color: "text-brand-intro",
    bg: "bg-brand-intro/10",
    border: "border-brand-intro/30",
  },
  {
    icon: "fa-code",
    title: "Construis",
    desc: "Tu pratiques dans le navigateur : un vrai exercice, un vrai rendu. React comme craft, vibe coding comme façon de livrer sans te perdre.",
    color: "text-brand-core",
    bg: "bg-brand-core/10",
    border: "border-brand-core/30",
  },
  {
    icon: "fa-chart-line",
    title: "Valide",
    desc: "Un quiz pour ancrer, une progression qui se souvient de toi. Tu fermes l'onglet, tu reviens demain, tu reprends pile au bon endroit.",
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
    title: "Du vrai travail",
    desc: "On t'aide à livrer quelque chose d'utile : un front solide, un produit IA que tu peux expliquer, des choix que tu assumes.",
  },
  {
    title: "Relu avant d'arriver jusqu'à toi",
    desc: "Chaque leçon a été passée au peigne fin. On te dit pourquoi, pas seulement quoi cliquer.",
  },
  {
    title: "Agréable à lire, partout",
    desc: "Clair ou sombre, téléphone ou grand écran : tu restes concentré sur le cours, pas sur l'interface.",
  },
  {
    title: "Ta progression, c'est la tienne",
    desc: "Elle reste sur ton appareil, et se synchronise si tu te connectes. Tu peux l'exporter. Pas de pub, pas de pistage.",
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
