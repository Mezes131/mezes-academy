import type { Module } from "@/types";
import { fondationsQuizzes } from "../quizzes";
import { fondationsExercises } from "../exercises";

export const fondationsModule03: Module = {
  id: "svc-fondations-m03",
  index: "03",
  title: "La boîte à outils du vibe coder",
  subtitle: "Assistants, règles projet et contrôles automatiques",
  duration: "35 min",
  difficulty: "beginner",
  objectives: [
    "Choisir le bon outil IA selon la tâche",
    "Configurer des règles projet et des contrôles automatiques",
    "Savoir quand NE PAS utiliser l'IA",
  ],
  content: [
    { kind: "title", text: "Assistants, agents, revue assistée" },
    {
      kind: "paragraph",
      html: "Pour une ligne : suggestion pendant que tu tapes. Pour une fonctionnalité cadrée : assistant dans l'éditeur avec règles projet. Pour un chantier multi-fichiers : agent, mais sous brief strict et avec revue obligatoire. La « revue assistée » (l'IA commente tes changements) aide ; elle ne remplace pas ton jugement sur la sécurité et le métier.",
    },

    { kind: "title", text: "Règles projet et contrôles automatiques" },
    {
      kind: "paragraph",
      html: "Les <strong>règles projet</strong> disent à l'assistant quelle stack tu utilises, quels motifs sont interdits, où vivent les secrets. Les <strong>contrôles automatiques</strong> (qualité du code, scan de secrets, revue des dépendances, Lighthouse) produisent des preuves reproductibles. Ensemble, ils forment le filet de la phase Audit, avant même les listes métier des phases 8 et 9.",
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-robot'></i> IA + contrôle automatique",
        body: "L'IA propose vite. L'outil automatique tranche sans opinion. Toi tu arbitres les fausses alertes et le risque métier.",
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
