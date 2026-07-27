import type { Module } from "@/types";
import { architectureQuizzes } from "../quizzes";

export const architectureModule01: Module = {
  id: "svc-architecture-m01",
  index: "01",
  title: "Découper le système",
  subtitle: "Interface, API, base, tâches différées, services externes et frontières de confiance",
  duration: "40 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Nommer les briques d'un produit web complet",
    "Repérer les frontières de confiance (où on vérifie)",
    "Décider ce que l'IA ne doit pas inventer seule",
  ],
  content: [
    { kind: "title", text: "Les briques du système" },
    {
      kind: "paragraph",
      html: "Avant de générer, tu dessines la carte. Un produit web typique a : une <strong>interface</strong> (navigateur), une <strong>API</strong> (serveur qui applique les règles), une <strong>base de données</strong>, parfois des <strong>tâches différées</strong> (emails, imports), et des <strong>services externes</strong> (connexion, paiement, envoi d'emails).",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-map'></i> Mini-carte",
        body: "Interface → API → base. Les services externes s'accrochent surtout à l'API. Les tâches différées partent de l'API quand le travail est trop long pour une requête.",
      },
    },

    { kind: "title", text: "Frontières de confiance" },
    {
      kind: "paragraph",
      html: "Une <strong>frontière de confiance</strong>, c'est la ligne entre ton système et le monde extérieur (navigateur, notification automatique d'un prestataire, autre API). Dès qu'une donnée traverse cette ligne, tu <strong>vérifies</strong> les saisies et les droits. Le navigateur n'est jamais de confiance : il peut être modifié.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-shield-halved'></i> <strong>Réflexe</strong> : validation et autorisation côté serveur, aux frontières, pas seulement dans l'interface.",
    },

    { kind: "title", text: "Ce que l'IA n'invente pas seule" },
    {
      kind: "paragraph",
      html: "Tu gardes sous contrôle humain : le découpage des briques, les <strong>contrats d'API</strong> (entrées / sorties / erreurs), le <strong>schéma de données</strong> critique. L'IA peut proposer du code à l'intérieur de ce cadre. Pas réécrire le cadre en silence.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Piège",
        body: "« Génère tout le SaaS » sans carte = frontières floues, secrets mal placés, contrats inventés. Cadre d'abord, génère ensuite, puis audit et Livraison.",
      },
    },
  ],
  quiz: architectureQuizzes.m01,
  exercises: [],
};
