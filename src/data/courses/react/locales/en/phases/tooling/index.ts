import type { Module, Phase } from "@/types";

const module33: Module = {
  id: "react-tooling-m33",
  index: "33",
  title: "Pro VS Code setup",
  subtitle: "Configure your environment to code fast and clean",
  duration: "30 min",
  content: [
    {
      kind: "paragraph",
      html: "Before the capstone, we leave the sandbox and move to a real local setup. The goal is not to memorize everything, but to lay a stable base: React extension, formatting, linting, integrated terminal, and useful npm scripts.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "33.1",
          title: "Minimal extensions",
          desc: "ESLint, Prettier, GitLens, and React snippets are enough to start without overload.",
          tags: ["vscode", "eslint", "prettier"],
        },
        {
          id: "33.2",
          title: "Dev routine",
          desc: "`npm run dev`, quick checks before commit, and proactive reading of editor warnings.",
          tags: ["workflow", "quality", "feedback loop"],
        },
      ],
    },
  ],
};

const module34: Module = {
  id: "react-tooling-m34",
  index: "34",
  title: "Git & GitHub workflow",
  subtitle: "Clear commit messages, clean branches, readable PRs",
  duration: "40 min",
  content: [
    {
      kind: "paragraph",
      html: "The final project is also graded on delivery rigor. A good repository tells your reasoning: readable history, short branches, focused pull requests, and a coherent changelog.",
    },
    {
      kind: "highlight",
      html: "<strong>Check before push:</strong> lint, type-check, manual test of critical flows.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-code-branch'></i> Simple convention",
        body: "One branch per topic, small explicit commits, then a PR with summary + test plan.",
      },
    },
  ],
};

const module35: Module = {
  id: "react-tooling-m35",
  index: "35",
  title: "Deploy & handoff",
  subtitle: "Ship a demo and prepare a clean submission",
  duration: "35 min",
  content: [
    {
      kind: "paragraph",
      html: "For the capstone, you must deliver a live URL, a clean repository, and a readable README. This step covers deployment (Vercel or equivalent), environment variables, and the submission checklist.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "35.1",
          title: "Continuous deploy",
          desc: "Connect GitHub to the deploy provider for automatic previews.",
          tags: ["vercel", "preview", "ci/cd"],
        },
        {
          id: "35.2",
          title: "Final checklist",
          desc: "README, screenshots, live URL, repo URL, and local run instructions.",
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
  label: "Pro transition",
  title: "Tutorial phase: move to real tools",
  summary:
    "Guided transition before the final project: VS Code, Git/GitHub, deployment, and submission standards.",
  metaTags: ["3 modules", "pro onboarding", "git", "deploy", "capstone-ready"],
  modules: [module33, module34, module35],
};
