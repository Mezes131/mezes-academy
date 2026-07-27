import type { Module } from "@/types";
import { promptQuizzes } from "../quizzes";
import { promptExercises } from "../exercises";

export const promptModule02: Module = {
  id: "svc-prompt-m02",
  index: "02",
  title: "Techniques de prompt pour le code produit",
  subtitle: "Contexte minimal suffisant, sortie contrainte, itération",
  duration: "45 min",
  difficulty: "beginner",
  objectives: [
    "Fournir le contexte minimal suffisant",
    "Contraindre la sortie (stack, style, tests)",
    "Itérer sans dériver et faire critiquer le code par l'IA",
  ],
  content: [
    { kind: "title", text: "Contexte minimal suffisant" },
    {
      kind: "paragraph",
      html: "Donne à l'IA ce qu'il faut pour ancrer la réponse : fichier cible, contrats de données, stack. Pas tout le dépôt. Pas zéro. Le bruit (fichiers hors sujet, blabla marketing) fait dériver.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-filter'></i> Filtre",
        body: "Avant d'envoyer : « Est-ce que cette phrase change le code attendu ? » Sinon, coupe.",
      },
    },

    { kind: "title", text: "Contraindre la sortie" },
    {
      kind: "paragraph",
      html: "Impose stack, conventions, tests, et bornes de fichiers. Exemple : « React + TypeScript, un seul fichier, ajoute un test du bouton Ajouter ». Sans ça, tu reçois une app entière « belle » et incontrôlable.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-lock'></i> <strong>Sortie contrainte</strong> = proposition alignée + vérifiable, pas « surprise créative ».",
    },

    { kind: "title", text: "Itérer et faire critiquer" },
    {
      kind: "paragraph",
      html: "Après une erreur : corrige la zone fautive, ne relance pas « refais tout le projet ». Demande à l'IA une critique ciblée (sécurité, edge cases), puis <strong>tu</strong> audites. Accepter la première réponse est un piège classique.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ban'></i> Anti-patterns",
        body: "Reprompt complet à chaque erreur · accepter sans lire · prompt qui demande d'ignorer la validation ou de coller des secrets.",
      },
    },
  ],
  quiz: promptQuizzes.m02,
  exercises: [promptExercises.m02_1, promptExercises.m02_2],
};
