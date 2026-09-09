import type { Module } from "@/types";
import { notificationsQuizzes } from "../quizzes";
import { notificationsExercises } from "../exercises";

export const notificationsModule03: Module = {
  id: "svc-notifications-m03",
  index: "03",
  title: "Consentement, préférences, abus",
  subtitle: "Consentement explicite, désinscription, limites de débit",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Respecter le consentement et la désinscription",
    "Protéger l'envoi contre les abus",
  ],
  content: [
    { kind: "title", text: "Consentement et préférences" },
    {
      kind: "paragraph",
      html: "Le marketing exige un <strong>consentement explicite</strong> ; le transactionnel critique (réinitialisation, reçu) reste cadré à part. Un écran de <strong>préférences</strong> (digest, produit, marketing) ne sert à rien s'il n'est pas <strong>vérifié à l'envoi</strong>. La <strong>désinscription</strong> doit être effective : autrement dit, ce n'est pas un lien cosmétique que le processus de fond ignore.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-sliders'></i> Contrôle à l'envoi",
        body: "La tâche lit les préférences / le statut de désinscription avant d'appeler le prestataire. Interface seule = théâtre de conformité.",
      },
    },

    { kind: "title", text: "Anti-abus" },
    {
      kind: "paragraph",
      html: "Sans <strong>limites de débit</strong> et quotas, une route d'envoi ouverte ou un robot inonde les réinitialisations / invitations et brûle ton domaine. Auth sur les routes d'envoi, limites par utilisateur / IP / type d'email, journal des refus. Un déluge d'abus, ce n'est pas « un utilisateur engagé ».",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ban'></i> Piège classique",
        body: "L'IA expose souvent <code>/api/send</code> public et ignore la désinscription « pour la conversion ». Les deux sont des bugs de production.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-user-shield'></i> <strong>Règle</strong> : consentement stocké, préférences appliquées, quotas. Ni déluge, ni promo forcée.",
    },
  ],
  quiz: notificationsQuizzes.m03,
  exercises: [notificationsExercises.m03_1],
};
