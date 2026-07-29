import type { Module } from "@/types";
import { authQuizzes } from "../quizzes";
import { authExercises } from "../exercises";

export const authModule01: Module = {
  id: "svc-auth-m01",
  index: "01",
  title: "Modern authentication models",
  subtitle: "Sessions, JWT, magic link, OAuth: choose with intent",
  duration: "35 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Compare sessions, JWT, magic link, and OAuth",
    "Pick a model that fits the product case",
    "Spot classic mistakes in generated auth code",
  ],
  content: [
    { kind: "title", text: "Model overview" },
    {
      kind: "paragraph",
      html: "<strong>Authentication</strong> (auth) = proving who you are. Four common families: <strong>session</strong> (the server remembers you), <strong>JWT</strong> (JSON Web Token: a signed token, often sent with each request), <strong>magic link</strong> (sign-in by email), <strong>OAuth</strong> (sign-in via an existing account: Google, Microsoft…).",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-scale-balanced'></i> No single winner",
        body: "B2B SaaS → often enterprise OAuth. Consumer app → low friction (magic link / provider). Internal tool → lean on the directory you already have. The product drives the choice.",
      },
    },

    { kind: "title", text: "Generated code mistakes" },
    {
      kind: "paragraph",
      html: "AI often proposes quick <strong>homegrown auth</strong>: poorly hashed passwords, a <strong>JWT</strong> stuck in <strong>browser storage (localStorage)</strong> with no clear expiration, fragile reset flows. In production, prefer a proven <strong>third-party provider</strong>, then audit the integration.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-ban'></i> <strong>Phase rule</strong>: never reinvent auth. Wire a provider, frame it, verify it, Ship.",
    },
  ],
  quiz: authQuizzes.m01,
  exercises: [authExercises.m01_1],
};
