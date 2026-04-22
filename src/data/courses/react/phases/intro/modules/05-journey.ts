import type { Module } from "@/types";

export const module05: Module = {
  id: "react-intro-m05",
  index: "05",
  title: "Comment ce parcours va vous emmener jusqu'à l'expertise",
  subtitle: "La méthode pédagogique et ce à quoi vous attendre",
  duration: "2 min",
  content: [
    {
      kind: "paragraph",
      html: "Ce parcours est organisé en <strong>quatre phases progressives</strong>, conçues pour que chaque notion s'appuie sur la précédente.",
    },
    { kind: "highlight", html: "<strong>Phase 3 : React Core</strong> : Les fondations : JSX, composants, props, state, hooks, routing, styling" },
    { kind: "highlight", html: "<strong>Phase 4 : TypeScript</strong> : Ajouter le typage pour écrire du code robuste" },
    { kind: "highlight", html: "<strong>Phase 5 : Écosystème</strong> : Next.js, authentification, bases de données, tests, performance" },
    { kind: "highlight", html: "<strong>Phase 6 : Expert</strong> : Architecture, DevOps, internals de React, open source, IA" },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-lightbulb'></i> La bonne posture d'apprentissage",
        body: "React se comprend <strong>en faisant</strong>. Après chaque module, fais les exercices, casse-les, modifie-les. Le passage de « je comprends le code » à « j'écris le code » est le plus grand saut de cette formation.",
      },
    },
  ],
};
