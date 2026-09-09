import type { Module } from "@/types";
import { opsQuizzes } from "../quizzes";
import { opsExercises } from "../exercises";

export const opsModule03: Module = {
  id: "svc-ops-m03",
  index: "03",
  title: "Sauvegardes & incident minimal",
  subtitle: "Sauvegarde BDD, fiche d'incident 1 page, communication",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Mettre en place une sauvegarde BDD restaurable",
    "Écrire une fiche d'incident d'une page",
  ],
  content: [
    { kind: "title", text: "Sauvegardes et fiche d'incident" },
    {
      kind: "paragraph",
      html: "Se préparer à l'incident : une <strong>sauvegarde BDD</strong> ne vaut que si tu as <strong>testé la restauration</strong>. Un export jamais essayé est une illusion. Stockage et outil au choix (instantanés plateforme, exports planifiés) : c'est la preuve de restauration qui compte.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-book'></i> Fiche d'incident 1 page",
        body: "Détection (quels signaux), actions (quoi faire dans l'ordre), contacts, communication minimale (qui dit quoi). Sous stress, une page claire bat un wiki de 40 pages. C'est ta procédure d'urgence.",
      },
    },
    {
      kind: "paragraph",
      html: "La <strong>communication d'incident</strong> minimale informe sans panique : statut, impact, prochaine mise à jour. Puis une <strong>simulation</strong> courte : détection → action → com → bilan d'une demi-page. Ça valide fiche d'incident + alerte active.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> « On verra »",
        body: "Des notes dans un chat ne font pas une fiche d'incident. Une alerte jamais testée n'en est pas vraiment une. Une sauvegarde jamais restaurée non plus.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-shield-halved'></i> <strong>Règle</strong> : sauvegarde restaurable + fiche d'incident actionnable + alerte testée. Voilà le trio P11.",
    },
  ],
  quiz: opsQuizzes.m03,
  exercises: [opsExercises.m03_projet],
};
