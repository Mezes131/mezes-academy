import type { Module } from "@/types";
import { dataQuizzes } from "../quizzes";
import { dataExercises } from "../exercises";

export const dataModule01: Module = {
  id: "svc-data-m01",
  index: "01",
  title: "Modèle de données utile",
  subtitle: "Entités, relations, migrations : éviter le schéma inventé",
  duration: "40 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Modéliser entités et relations depuis le besoin",
    "Gérer les migrations proprement",
    "Repérer un schéma inventé par l'IA",
  ],
  content: [
    { kind: "title", text: "Entités et relations" },
    {
      kind: "paragraph",
      html: "Un <strong>modèle de données</strong> traduit le produit en faits durables : <strong>entités</strong> (utilisateur, organisation, ressource…), <strong>relations</strong> (appartient à, possède, membre de), et en général des <strong>clés étrangères</strong> pour que la base fasse respecter ces liens. Pars du brief produit, plutôt que d'un tas de tables inventées par l'IA.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-diagram-project'></i> Minimal d'abord",
        body: "Pour un logiciel en ligne (SaaS) simple : utilisateurs, organisations, lien membre–organisation (appartenance), et ressources appartenant à une organisation couvrent la plupart des besoins en début de produit. Ajoute des tables quand une vraie fonctionnalité les exige.",
      },
    },

    { kind: "title", text: "Migrations et schéma inventé" },
    {
      kind: "paragraph",
      html: "Les <strong>migrations</strong> versionnent les changements de schéma pour que chaque environnement évolue de la même façon. L'IA livre souvent un <strong>schéma inventé</strong> : tables inutilisées, colonnes redondantes, clés de propriété manquantes. Traite chaque champ proposé comme une affirmation à auditer. Postgres (ou tout stockage relationnel solide) illustre le marché : tu peux en choisir un autre équivalent.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Revue de schéma",
        body: "Tables générées inutiles et champs dupliqués te ralentissent et masquent des bugs d'isolation entre organisations (multi-clients). Rejette ce dont le produit n'a pas besoin.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-database'></i> <strong>Règle de phase</strong> : modèle depuis le besoin, migre volontairement, refuse les tables inventées.",
    },
  ],
  quiz: dataQuizzes.m01,
  exercises: [dataExercises.m01_1],
};
