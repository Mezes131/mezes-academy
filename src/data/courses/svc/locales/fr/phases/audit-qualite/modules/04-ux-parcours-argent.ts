import type { Module } from "@/types";
import { auditQualiteQuizzes } from "../quizzes";
import { auditQualiteExercises } from "../exercises";

export const auditQualiteModule04: Module = {
  id: "svc-audit-qualite-m04",
  index: "04",
  title: "UX des parcours argent",
  subtitle: "Page de paiement, emails de confiance, friction inutile",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Fluidifier le parcours de paiement",
    "Inspirer confiance aux moments critiques",
  ],
  content: [
    { kind: "title", text: "Le parcours qui rapporte" },
    {
      kind: "paragraph",
      html: "La page de paiement et les emails post-paiement sont le cœur business. Audite sous l'angle <strong>conversion + confiance</strong> : prix clair, étapes justifiées, erreurs récupérables, <strong>emails de confiance</strong> (confirmation, accès, assistance). Élimine chaque <strong>friction inutile</strong> (champs redondants, compte forcé trop tôt, ambiguïté).",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-cart-shopping'></i> Parcours nominal trompeur",
        body: "L'IA génère souvent un paiement qui « marche » une fois. Rejoue le parcours complet : échec carte, retour arrière, email manquant.",
      },
    },
    {
      kind: "paragraph",
      html: "Le <strong>projet P9</strong> clôture la phase : listes de contrôle Perf / Design / A11y passées sur le capstone, avec <strong>scores avant/après</strong> documentés et correctifs tracés (commit ou diff).",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-chart-line'></i> Avant / après",
        body: "Mesure → corrige (perf, design, a11y, paiement) → re-mesure. L'amélioration doit être démontrée, sinon ce n'est qu'une affirmation.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-clipboard-check'></i> <strong>Projet P9</strong> : scores avant/après + listes de contrôle perf/design/a11y + frictions payantes éliminées.",
    },
  ],
  quiz: auditQualiteQuizzes.m04,
  exercises: [auditQualiteExercises.m04_projet],
};
