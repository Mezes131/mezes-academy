import type { Module } from "@/types";
import { promptQuizzes } from "../quizzes";
import { promptExercises } from "../exercises";

export const promptModule01: Module = {
  id: "svc-prompt-m01",
  index: "01",
  title: "Du besoin au MVP shippable",
  subtitle: "User stories, critères d'acceptation, non-goals",
  duration: "40 min",
  difficulty: "beginner",
  openByDefault: true,
  objectives: [
    "Formuler user stories et critères d'acceptation",
    "Expliciter les contraintes non fonctionnelles",
    "Découper en tâches auditables",
  ],
  content: [
    { kind: "title", text: "User story et critères d'acceptation" },
    {
      kind: "paragraph",
      html: "Avant tout prompt, tu transformes une envie floue en <strong>besoin testable</strong>. Une user story dit : qui, quoi, pourquoi. Un critère d'acceptation dit : comment on sait que c'est bon (oui / non, pas « cool »).",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-list-check'></i> Mini-modèle",
        body: "En tant que… je veux… afin de… Critères : donné X, quand Y, alors Z. Si tu ne peux pas écrire Z, tu n'es pas prêt à générer.",
      },
    },
    {
      kind: "paragraph",
      html: "Les <strong>non-goals</strong> (hors scope) sont aussi importants que les goals. « Pas de partage public au MVP » empêche l'IA d'inventer un réseau social autour de tes notes.",
    },

    { kind: "title", text: "Contraintes non fonctionnelles" },
    {
      kind: "paragraph",
      html: "Sécurité, performance, accessibilité : si tu ne les écris pas, l'IA les oublie souvent. Exemples concrets : pas de secret côté navigateur, temps de chargement acceptable, formulaires utilisables au clavier.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Piège",
        body: "« On ajoutera la sécu après » produit presque toujours un prototype jetable. Cadre tôt, même en une ligne par contrainte.",
      },
    },

    { kind: "title", text: "Découper en tâches auditables" },
    {
      kind: "paragraph",
      html: "Une tâche auditable a une taille humaine : tu peux lire l'aperçu des changements et cocher un critère de done. « Construire l'app entière » n'est pas une tâche. « Formulaire créer une note + validation titre » l'est.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-scissors'></i> <strong>Règle</strong> : si tu ne peux pas auditer la tâche seule, re-découpe avant de prompt.",
    },
  ],
  quiz: promptQuizzes.m01,
  exercises: [promptExercises.m01_1],
};
