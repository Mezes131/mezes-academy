import type { Module } from "@/types";
import { promptQuizzes } from "../quizzes";
import { promptExercises } from "../exercises";

export const promptModule01: Module = {
  id: "svc-prompt-m01",
  index: "01",
  title: "Du besoin au premier livrable",
  subtitle: "Histoires utilisateur, règles de réussite, hors périmètre",
  duration: "40 min",
  difficulty: "beginner",
  openByDefault: true,
  objectives: [
    "Écrire des histoires utilisateur et des règles de réussite",
    "Écrire les contraintes de qualité (sécurité, rapidité, accessibilité)",
    "Découper en petites tâches vérifiables",
  ],
  content: [
    { kind: "title", text: "Histoire utilisateur et règles de réussite" },
    {
      kind: "paragraph",
      html: "Avant toute demande à l'IA, tu transformes une envie floue en <strong>besoin vérifiable</strong>. Une histoire utilisateur dit : qui, quoi, pourquoi. Une règle de réussite (parfois appelée critère d'acceptation) dit : comment on sait que c'est bon (oui / non, pas « cool »).",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-list-check'></i> Mini-modèle",
        body: "En tant que… je veux… afin de… Règles : donné X, quand Y, alors Z. Si tu ne peux pas écrire Z, tu n'es pas prêt à générer.",
      },
    },
    {
      kind: "paragraph",
      html: "Le <strong>hors périmètre</strong> (ce qu'on ne fait pas maintenant) est aussi important que ce qu'on fait. « Pas de partage public au premier livrable » empêche l'IA d'inventer un réseau social autour de tes notes.",
    },

    { kind: "title", text: "Contraintes de qualité" },
    {
      kind: "paragraph",
      html: "Sécurité, rapidité, accessibilité : si tu ne les écris pas, l'IA les oublie souvent. Exemples concrets : pas de secret côté navigateur, temps de chargement acceptable, formulaires utilisables au clavier.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Piège",
        body: "« On ajoutera la sécurité après » produit presque toujours un prototype jetable. Cadre tôt, même en une ligne par contrainte.",
      },
    },

    { kind: "title", text: "Découper en tâches vérifiables" },
    {
      kind: "paragraph",
      html: "Une tâche vérifiable a une taille humaine : tu peux lire l'aperçu des changements et cocher une règle de fin. « Construire l'app entière » n'est pas une tâche. « Formulaire créer une note + vérification du titre » l'est.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-scissors'></i> <strong>Règle</strong> : si tu ne peux pas vérifier la tâche seule, re-découpe avant de demander à l'IA.",
    },
  ],
  quiz: promptQuizzes.m01,
  exercises: [promptExercises.m01_1],
};
