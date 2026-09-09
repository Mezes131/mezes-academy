import type { Module } from "@/types";
import { opsQuizzes } from "../quizzes";
import { opsExercises } from "../exercises";

export const opsModule02: Module = {
  id: "svc-ops-m02",
  index: "02",
  title: "Surveillance & alertes",
  subtitle: "Disponibilité, 5xx, webhook en panne",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Surveiller la disponibilité et les erreurs 5xx",
    "Alerter sur les pannes qui coûtent (webhook en panne)",
  ],
  content: [
    { kind: "title", text: "Surveiller ce qui compte" },
    {
      kind: "paragraph",
      html: "Les logs racontent ; la <strong>surveillance</strong> te réveille. Un contrôle de <strong>disponibilité</strong> (URL ou santé) dit si le service répond. Le suivi des <strong>5xx</strong> détecte les pannes applicatives même quand le ping de la page d'accueil est vert.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-bell'></i> Pannes qui coûtent",
        body: "Un webhook de paiement en panne, c'est de l'argent et de la confiance. Une alerte dédiée vaut mieux que de découvrir le problème via les tickets clients.",
      },
    },
    {
      kind: "paragraph",
      html: "Des alertes utiles sont <strong>ciblées</strong>, <strong>testables</strong> et <strong>actionnables</strong>. Un déluge de bruit, et les alertes finissent ignorées. Peu importe l'outil (SaaS de disponibilité, APM, métriques plateforme) : le signal et le canal comptent.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-vial'></i> Tester l'alerte",
        body: "Déclenche volontairement (échec simulé, seuil bas) une fois. Documente qui reçoit et quoi faire : c'est un lien naturel avec la fiche d'incident du module 03.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-heart-pulse'></i> <strong>Règle</strong> : disponibilité + 5xx + alertes sur les chemins qui coûtent, et pas seulement « le site charge ».",
    },
  ],
  quiz: opsQuizzes.m02,
  exercises: [opsExercises.m02_1],
};
