import type { Module } from "@/types";
import { paiementsQuizzes } from "../quizzes";
import { paiementsExercises } from "../exercises";

export const paiementsModule03: Module = {
  id: "svc-paiements-m03",
  index: "03",
  title: "Webhooks & idempotence",
  subtitle: "Jamais activer l'accès seulement sur la redirection",
  duration: "50 min",
  difficulty: "advanced",
  objectives: [
    "Vérifier la signature des webhooks",
    "Traiter les rejeux sans double effet",
    "Modéliser les états de commande",
  ],
  content: [
    { kind: "title", text: "Signature et rejeu" },
    {
      kind: "paragraph",
      html: "La page <code>/success</code> après la page de paiement, c'est de l'<strong>expérience utilisateur</strong>. Ce n'est <strong>jamais</strong> la preuve que l'argent est passé. Active l'accès seulement après un <strong>webhook signé</strong> (notification HTTP du prestataire). Vérifie la <strong>signature</strong> : sans elle, n'importe qui POST « payment succeeded ». Les prestataires <strong>rejouent</strong> : ton traitement doit donc être <strong>idempotent</strong> (même <code>event_id</code> → un seul effet).",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ban'></i> Piège classique",
        body: "L'IA active Pro sur la redirection et parse le JSON du webhook sans signature. Les deux sont des bugs de production, pas des raccourcis.",
      },
    },

    { kind: "title", text: "États de commande" },
    {
      kind: "paragraph",
      html: "Modélise une <strong>machine à états</strong> côté produit : en attente → payé / échoué / annulé… Réconcilie avec les objets du prestataire. Un utilisateur « déjà Pro » alors que le paiement est encore en attente, c'est une correspondance d'états cassée. Ce n'est pas un détail cosmétique.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-fingerprint'></i> Idempotence",
        body: "Stocke les identifiants d'événements traités, ou une contrainte d'unicité sur l'activation. Un rejeu ne doit ni double-créditer ni double-activer.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-shield-halved'></i> <strong>Règle d'or</strong> : signature, puis état, puis effet métier idempotent. Redirection seule = jamais d'activation.",
    },
  ],
  quiz: paiementsQuizzes.m03,
  exercises: [paiementsExercises.m03_1],
};
