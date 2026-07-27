import type { Module } from "@/types";
import { promptQuizzes } from "../quizzes";
import { promptExercises } from "../exercises";

export const promptModule02: Module = {
  id: "svc-prompt-m02",
  index: "02",
  title: "Techniques de demande pour du code produit",
  subtitle: "Juste assez de contexte, sortie cadrée, corrections ciblées",
  duration: "45 min",
  difficulty: "beginner",
  objectives: [
    "Donner juste assez de contexte",
    "Cadrer la sortie (outils, style, tests)",
    "Corriger sans tout recommencer et faire critiquer le code par l'IA",
  ],
  content: [
    { kind: "title", text: "Juste assez de contexte" },
    {
      kind: "paragraph",
      html: "Donne à l'IA ce qu'il faut pour ancrer la réponse : fichier cible, forme des données, outils du projet. Pas tout le dépôt. Pas zéro. Le bruit (fichiers hors sujet, blabla marketing) fait dériver.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-filter'></i> Filtre",
        body: "Avant d'envoyer : « Est-ce que cette phrase change le code attendu ? » Sinon, coupe.",
      },
    },

    { kind: "title", text: "Cadrer la sortie" },
    {
      kind: "paragraph",
      html: "Impose les outils, les conventions, les tests, et les bornes de fichiers. Exemple : « React + TypeScript, un seul fichier, ajoute un test du bouton Ajouter ». Sans ça, tu reçois une app entière « belle » et incontrôlable.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-lock'></i> <strong>Sortie cadrée</strong> = proposition alignée + vérifiable, pas « surprise créative ».",
    },

    { kind: "title", text: "Corriger et faire critiquer" },
    {
      kind: "paragraph",
      html: "Après une erreur : corrige la zone fautive, ne relance pas « refais tout le projet ». Demande à l'IA une critique ciblée (sécurité, cas limites), puis <strong>tu</strong> audites. Accepter la première réponse est un piège classique.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ban'></i> À éviter",
        body: "Tout recommencer à chaque erreur · accepter sans lire · demande qui ignore la vérification ou colle des secrets.",
      },
    },
  ],
  quiz: promptQuizzes.m02,
  exercises: [promptExercises.m02_1, promptExercises.m02_2],
};
