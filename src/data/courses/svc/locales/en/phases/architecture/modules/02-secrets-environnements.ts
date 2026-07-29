import type { Module } from "@/types";
import { architectureQuizzes } from "../quizzes";
import { architectureExercises } from "../exercises";

export const architectureModule02: Module = {
  id: "svc-architecture-m02",
  index: "02",
  title: "Secrets and config per environment",
  subtitle: "Local, online preview, production: who sees what",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Distinguish build-time vs runtime variables",
    "Organize local / online preview / production",
    "Avoid leaks via Docker images and CI logs",
  ],
  content: [
    { kind: "title", text: "Build-time vs runtime" },
    {
      kind: "paragraph",
      html: "Some values are <strong>baked into the package at build time</strong> (often visible later, especially in the browser). Others are <strong>read when the server starts</strong> from the environment. Secrets belong to the second family.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-eye'></i> Vite / front trap",
        body: "A key stuck in a front build variable often ends up in the browser package. Anyone who opens developer tools can read it.",
      },
    },

    { kind: "title", text: "Environments and leaks" },
    {
      kind: "paragraph",
      html: "Three sets minimum: <strong>local</strong> (your machine), <strong>online preview</strong> (temporary demo), <strong>production</strong>. Each has its variables. You do not recycle the live prod key onto every laptop.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-key'></i> <strong>Rule</strong>: secrets injected at runtime, never baked into a Docker image or printed in CI logs.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-table'></i> Matrix",
        body: "For each secret: which environment? server-side or public? Who may read it? The exercise below trains that reflex.",
      },
    },
  ],
  quiz: architectureQuizzes.m02,
  exercises: [architectureExercises.m02_1],
};
