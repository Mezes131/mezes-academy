import type { Module } from "@/types";
import { shipQuizzes } from "../quizzes";
import { shipExercises } from "../exercises";

export const shipModule02: Module = {
  id: "svc-ship-m02",
  index: "02",
  title: "Confiance & légal minimal",
  subtitle: "CGU / confidentialité légères, mentions, support client",
  duration: "30 min",
  difficulty: "intermediate",
  objectives: [
    "Couvrir CGU, confidentialité et mentions minimales",
    "Ouvrir un canal support client crédible",
  ],
  content: [
    { kind: "title", text: "Le minimum qui inspire confiance" },
    {
      kind: "paragraph",
      html: "Un produit payant sans <strong>CGU</strong>, <strong>politique de confidentialité</strong> ni <strong>mentions</strong> accessibles casse la confiance. Le socle est <strong>léger mais réel</strong> : pages joignables, texte relu, et surtout ni un 404 « bientôt » ni un collage IA non vérifié.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-scale-balanced'></i> Mentions",
        body: "Identifier l'éditeur / un contact. La forme exacte dépend du droit local ; le principe de traçabilité est universel. Indépendant du fournisseur.",
      },
    },
    {
      kind: "paragraph",
      html: "Le <strong>canal support client</strong> doit être annoncé et testé (email, formulaire, ticket). Un message privé caché ne suffit pas : le client qui paie doit savoir qui joindre.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Checklist non passée",
        body: "Passer la checklist conformité mini et combler les manques. Cocher les cases sans preuve, c'est une fausse livraison commerciale.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-handshake'></i> <strong>Règle</strong> : CGU + confidentialité + mentions + support visible. C'est le socle confiance P12.",
    },
  ],
  quiz: shipQuizzes.m02,
  exercises: [shipExercises.m02_1],
};
