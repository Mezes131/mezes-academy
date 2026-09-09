import type { Module } from "@/types";
import { paiementsQuizzes } from "../quizzes";
import { paiementsExercises } from "../exercises";

export const paiementsModule04: Module = {
  id: "svc-paiements-m04",
  index: "04",
  title: "Échecs & conformité minimale",
  subtitle: "Cartes refusées, mentions, logs sans fuite",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Gérer les échecs de paiement côté produit",
    "Couvrir les mentions minimales",
    "Logger sans exposer de données sensibles",
  ],
  content: [
    { kind: "title", text: "Échecs de carte" },
    {
      kind: "paragraph",
      html: "Carte refusée, expirée, fonds insuffisants : le produit doit garder un <strong>état d'échec visible</strong> et un <strong>message actionnable</strong> (réessayer, ouvrir le portail). Une <strong>relance de paiement basique</strong> informe sur l'état « en retard » (past_due) avant de couper l'accès. Activer Pro « pour la conversion » malgré le refus, c'est de la dette et de la fraude interne.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-table'></i> Matrice d'erreurs",
        body: "Pour chaque erreur courante : réaction produit + message utilisateur. Sans matrice, l'IA invente des textes flous et des états incohérents.",
      },
    },

    { kind: "title", text: "Conformité et logs" },
    {
      kind: "paragraph",
      html: "Conformité <strong>minimale</strong> : prix clair, renouvellement, annulation, qui traite le paiement. Dans les <strong>logs</strong> : ids d'événements et statuts, <strong>jamais</strong> numéro de carte (PAN), CVV, ni secrets. Coller une carte dans Sentry, c'est un incident, pas un debug.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-eye-slash'></i> Fuite",
        body: "Les traitements générés loggent souvent le corps complet du webhook. Audite et masque avant la production.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-clipboard-check'></i> <strong>Projet P6</strong> : Free/Pro + page de paiement + webhook signé idempotent + échecs visibles. Génère, puis audite sur le projet final.",
    },
  ],
  quiz: paiementsQuizzes.m04,
  exercises: [paiementsExercises.m04_projet],
};
