import type { Module, Phase } from "@/types";

const module33: Module = {
  id: "react-tooling-m33",
  index: "M33",
  title: "VS Code setup pro",
  subtitle: "Configurer ton environnement pour coder vite et proprement",
  duration: "30 min",
  content: [
    {
      kind: "paragraph",
      html: "Avant le capstone, on quitte la sandbox et on passe dans un vrai setup local. L'objectif n'est pas de tout memoriser, mais de poser une base stable : extension React, formatage, linting, terminal integre et scripts npm utiles.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "33.1",
          title: "Extensions minimales",
          desc: "ESLint, Prettier, GitLens et React snippets suffisent pour commencer sans surcharge.",
          tags: ["vscode", "eslint", "prettier"],
        },
        {
          id: "33.2",
          title: "Routine dev",
          desc: "`npm run dev`, checks rapides avant commit, et lecture proactive des warnings dans l'editeur.",
          tags: ["workflow", "quality", "feedback loop"],
        },
      ],
    },
  ],
};

const module34: Module = {
  id: "react-tooling-m34",
  index: "M34",
  title: "Git & GitHub workflow",
  subtitle: "Commit messages clairs, branches propres et PR lisibles",
  duration: "40 min",
  content: [
    {
      kind: "paragraph",
      html: "Le projet final est evalue aussi sur ta rigueur de delivery. Un bon repository raconte ton raisonnement : historique lisible, branches courtes, pull requests focalisees et changelog coherent.",
    },
    {
      kind: "highlight",
      html: "<strong>Check avant push :</strong> lint, type-check, test manuel des parcours critiques.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-code-branch'></i> Convention simple",
        body: "Une branche par sujet, des commits petits et explicites, puis une PR avec resume + plan de test.",
      },
    },
  ],
};

const module35: Module = {
  id: "react-tooling-m35",
  index: "M35",
  title: "Deploy & handoff",
  subtitle: "Publier une demo et preparer une soumission propre",
  duration: "35 min",
  content: [
    {
      kind: "paragraph",
      html: "Pour le capstone, tu dois livrer une URL live, un repository propre et un README comprensible. Cette etape couvre le deploiement (Vercel ou equivalent), les variables d'environnement et la checklist de soumission.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "35.1",
          title: "Deploy continu",
          desc: "Connecter GitHub au provider de deploiement pour avoir des previews automatiques.",
          tags: ["vercel", "preview", "ci/cd"],
        },
        {
          id: "35.2",
          title: "Checklist finale",
          desc: "README, captures, URL live, URL repo, et instructions de lancement locales.",
          tags: ["handoff", "documentation", "submission"],
        },
      ],
    },
  ],
};

export const toolingPhase: Phase = {
  id: "react-tooling",
  slug: "tooling",
  courseId: "react",
  color: "core",
  icon: "fa-screwdriver-wrench",
  label: "Transition Pro",
  title: "Phase tutorielle: passer aux vrais outils",
  summary:
    "Transition guidee avant le projet final : VS Code, Git/GitHub, deploiement et standards de soumission.",
  metaTags: ["3 modules", "onboarding pro", "git", "deploy", "capstone-ready"],
  modules: [module33, module34, module35],
};
