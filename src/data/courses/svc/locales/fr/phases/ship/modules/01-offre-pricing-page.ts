import type { Module } from "@/types";
import { shipQuizzes } from "../quizzes";
import { shipExercises } from "../exercises";

export const shipModule01: Module = {
  id: "svc-ship-m01",
  index: "01",
  title: "Offre & page des tarifs",
  subtitle: "Proposition de valeur, Free/Pro, appel à l'action clair",
  duration: "35 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Formuler la proposition de valeur",
    "Construire une page des tarifs qui convertit",
  ],
  content: [
    { kind: "title", text: "De la fonctionnalité à l'offre" },
    {
      kind: "paragraph",
      html: "Un déploiement n'est pas une offre. La <strong>proposition de valeur</strong> dit le bénéfice pour un public cible, et non la liste des libs. Les plans <strong>Free / Pro</strong> doivent rendre évidente la raison de passer à Pro.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-list'></i> Piège fonctionnalités",
        body: "Un README technique ou dix appels à l'action concurrents ne convertissent pas. Une page d'offre « pourquoi payer » centre le message et un appel à l'action unique.",
      },
    },
    {
      kind: "paragraph",
      html: "La <strong>page des tarifs</strong> est un artefact commercial : prix ou contraste Free/Pro, bénéfice, <strong>appel à l'action clair</strong> (essai, passage à Pro, achat). L'outil de page est au choix : ce qui compte, c'est le message et l'URL publique.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-bullseye'></i> Appel à l'action unique",
        body: "Une action dominante. « Docs », « GitHub » et « Essayez » au même niveau = dilution. Hiérarchise.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-tag'></i> <strong>Règle</strong> : valeur + plans Free/Pro + appel à l'action ; sinon ce n'est pas une offre, c'est un dépôt en ligne.",
    },
  ],
  quiz: shipQuizzes.m01,
  exercises: [shipExercises.m01_1],
};
