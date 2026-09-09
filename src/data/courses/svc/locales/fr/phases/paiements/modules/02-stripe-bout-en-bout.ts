import type { Module } from "@/types";
import { paiementsQuizzes } from "../quizzes";
import { paiementsExercises } from "../exercises";

export const paiementsModule02: Module = {
  id: "svc-paiements-m02",
  index: "02",
  title: "Stripe bout-en-bout",
  subtitle: "Page de paiement, portail client, mode test",
  duration: "55 min",
  difficulty: "intermediate",
  objectives: [
    "Mettre en place une page de paiement et un portail client (ex. Stripe)",
    "Manipuler le client (Customer) et l'abonnement (Subscription) ou équivalents",
    "Travailler en mode test",
  ],
  content: [
    { kind: "title", text: "Page de paiement et portail" },
    {
      kind: "paragraph",
      html: "<strong>Stripe</strong> est un <strong>exemple du marché</strong> parmi les prestataires de paiement. Les mêmes idées existent ailleurs : <strong>page de paiement hébergée</strong> (Checkout), <strong>portail client</strong>, <strong>mode test</strong>. Tu crées une session côté serveur (clé secrète jamais dans le navigateur), tu rediriges l'utilisateur, tu reviens sur une page de succès <em>pour l'expérience</em>. Ce n'est pas encore le moment d'activer Pro.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-flask'></i> Mode test",
        body: "Cartes et événements de test : parcours Free → Pro sans vrai argent. Valide le flux avant la production. Reste indépendant : un autre prestataire aura un environnement bac à sable équivalent.",
      },
    },

    { kind: "title", text: "Client et abonnement" },
    {
      kind: "paragraph",
      html: "Relie chaque compte produit à un <strong>client</strong> (objet Customer chez Stripe, ou équivalent) durable en base. L'<strong>abonnement</strong> / le plan porte le cycle de vie. Sans lien <strong>utilisateur ↔ client</strong>, tu ne sais pas qui a payé. Le <strong>portail client</strong> (Customer Portal, ou équivalent) laisse le client changer de carte, annuler, voir les factures : du coup, moins de surface PCI maison.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-key'></i> Secrets",
        body: "Créer la session avec la clé secrète côté serveur. Publier cette clé dans React = compromettre tout le compte prestataire.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-shuffle'></i> <strong>Réflexe</strong> : serveur + lien vers le client + mode test. Créer une session, ce n'est pas encore un accès payant (webhook au module suivant).",
    },
  ],
  quiz: paiementsQuizzes.m02,
  exercises: [paiementsExercises.m02_1],
};
