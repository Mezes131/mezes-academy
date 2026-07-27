import type { Module } from "@/types";
import { fondationsQuizzes } from "../quizzes";
import { fondationsExercises } from "../exercises";

export const fondationsModule03: Module = {
  id: "svc-fondations-m03",
  index: "03",
  title: "La boîte à outils du vibe coder",
  subtitle: "Assistants, règles projet et scanners déterministes",
  duration: "35 min",
  difficulty: "beginner",
  objectives: [
    "Choisir le bon outil IA selon la tâche",
    "Configurer des règles projet et des scanners",
    "Savoir quand NE PAS utiliser l'IA",
  ],
  content: [
    { kind: "title", text: "Assistants, agents, revue assistée" },
    {
      kind: "paragraph",
      html: "Pour une ligne : autocomplete. Pour une feature cadrée : assistant IDE avec règles projet. Pour un chantier multi-fichiers : agent, mais sous brief strict et avec revue obligatoire. La « revue assistée » (l'IA commente ton diff) aide ; elle ne remplace pas ton jugement sur la sécu et le métier.",
    },

    { kind: "title", text: "Règles projet et scanners" },
    {
      kind: "paragraph",
      html: "Les <strong>règles projet</strong> disent à l'assistant quelle stack tu utilises, quels patterns sont interdits, où vivent les secrets. Les <strong>scanners déterministes</strong> (lint, scan de secrets, audit de dépendances, Lighthouse) produisent des preuves reproductibles. Ensemble, ils forment le filet de la phase Audit, avant même les checklists métier des phases 8 et 9.",
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-robot'></i> IA + déterministe",
        body: "L'IA propose vite. Le scanner tranche sans opinion. Toi tu arbitres les faux positifs et le risque métier.",
      },
    },

    { kind: "title", text: "Quand ne pas utiliser l'IA" },
    {
      kind: "paragraph",
      html: "Évite (ou surveille très fort) : crypto / sécurité fine maison, logique métier critique mal spécifiée, clauses légales, tout ce qui touche directement à l'argent ou aux données personnelles sans spec écrite. Dans ces zones, un vibe solo est un pari, pas une méthode.",
    },
    {
      kind: "paragraph",
      html: "Deux exercices clôturent ce module : l'outillage jour 1, puis le <strong>projet P1</strong> (rapport d'audit d'un dépôt généré). C'est le même geste que tu répéteras en phase Audit Sécurité.",
    },
  ],
  quiz: fondationsQuizzes.m03,
  exercises: [fondationsExercises.m03_1, fondationsExercises.m03_projet],
};
