import type { Module } from "@/types";
import { paiementsQuizzes } from "../quizzes";
import { paiementsExercises } from "../exercises";

export const paiementsModule01: Module = {
  id: "svc-paiements-m01",
  index: "01",
  title: "Modèles économiques",
  subtitle: "Paiement unique, abonnement, usage : relier l'offre à la technique",
  duration: "30 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Comparer paiement unique, abonnement et usage",
    "Traduire une offre en objets techniques",
  ],
  content: [
    { kind: "title", text: "Modèles et implications" },
    {
      kind: "paragraph",
      html: "Avant de brancher un <strong>prestataire de paiement</strong>, choisis le <strong>modèle économique</strong> : <strong>paiement unique</strong> (achat ponctuel → droit ou livraison), <strong>abonnement</strong> (renouvellement, états actif / en retard / annulé), ou <strong>facturation à l'usage</strong> (métriques mesurées puis facturées). Le mauvais modèle force des contorsions techniques pendant des mois.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-scale-balanced'></i> Trois cas types",
        body: "Pack / licence = souvent paiement unique. Logiciel en ligne (SaaS) Free/Pro = abonnement. API au volume = usage. Pars du produit, plutôt que du tutoriel du prestataire.",
      },
    },
    {
      kind: "paragraph",
      html: "La <strong>correspondance offre ↔ technique</strong> relie chaque plan à des objets concrets : prix, client (Customer), abonnement ou compteurs, et les <strong>droits d'accès</strong> dans ta base. Documente cette correspondance avant que l'IA invente huit plans « Enterprise » sans brief.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Hallucinations de tarification",
        body: "L'IA sur-génère des paliers et des coupons. Garde le minimal que le brief exige, puis ajoute seulement quand une vraie offre le demande.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-credit-card'></i> <strong>Règle</strong> : modèle depuis le produit, objets techniques nommés, zéro plan fantôme.",
    },
  ],
  quiz: paiementsQuizzes.m01,
  exercises: [paiementsExercises.m01_1],
};
