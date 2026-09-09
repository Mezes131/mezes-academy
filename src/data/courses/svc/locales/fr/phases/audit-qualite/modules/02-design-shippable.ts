import type { Module } from "@/types";
import { auditQualiteQuizzes } from "../quizzes";
import { auditQualiteExercises } from "../exercises";

export const auditQualiteModule02: Module = {
  id: "svc-audit-qualite-m02",
  index: "02",
  title: "Design livrable",
  subtitle: "Hiérarchie, appel à l'action (CTA) unique, états vides/erreur/chargement",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Vérifier la hiérarchie visuelle",
    "Garantir les états vides, erreur et chargement",
  ],
  content: [
    { kind: "title", text: "Revue design structurée" },
    {
      kind: "paragraph",
      html: "Un écran « joli » mais illisible n'est pas livrable. Audite avec la liste de contrôle <strong>design-baseline</strong> : <strong>hiérarchie</strong> (titre → message → action), <strong>appel à l'action (CTA) unique</strong> primaire, et les trois états que l'IA oublie : <strong>vide</strong>, <strong>erreur</strong>, <strong>chargement</strong>.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Pièges fréquents",
        body: "Un écran sans état vide, trois appels à l'action (CTA) du même poids, ou seulement le parcours nominal : corrige avant de déclarer le design OK.",
      },
    },
    {
      kind: "paragraph",
      html: "La revue n'est pas un avis subjectif : tu coches, tu corriges, tu re-passes. L'écran le plus critique du produit (souvent tableau de bord ou page de paiement) passe en premier.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-eye'></i> Une action claire",
        body: "Si l'utilisateur ne sait pas quoi faire en 3 secondes, la hiérarchie ou l'appel à l'action (CTA) est cassé.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-pen-ruler'></i> <strong>Règle</strong> : hiérarchie claire, un appel à l'action (CTA) primaire, états vide/erreur/chargement conçus. Autrement dit, ne te limite pas au parcours nominal.",
    },
  ],
  quiz: auditQualiteQuizzes.m02,
  exercises: [auditQualiteExercises.m02_1],
};
