import type { Module } from "@/types";
import { promptQuizzes } from "../quizzes";
import { promptExercises } from "../exercises";

export const promptModule03: Module = {
  id: "svc-prompt-m03",
  index: "03",
  title: "Business constraints in the prompt",
  subtitle: "Anticipate auth, payments, notifications, and hosting in the brief",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Fold third-party services into framing early",
    "Use a product-ready checklist",
    "Avoid throwaway prototypes",
  ],
  content: [
    { kind: "title", text: "Anticipate third-party services" },
    {
      kind: "paragraph",
      html: "Auth, payments, notifications, hosting: this is not polish. It changes trust boundaries, secrets, and often the data model. A CRUD generated without these lines becomes a throwaway prototype.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-puzzle-piece'></i> In the brief",
        body: "Even an explicit « later » helps: « Payments out of MVP, but user accounts from v1 ». The AI stops inventing a phantom cart.",
      },
    },

    { kind: "title", text: "Product-ready checklist" },
    {
      kind: "paragraph",
      html: "Before a big CRUD prompt, check: who is signed in? which roles? which envs (local, preview, prod)? where do secrets live? server-side validation? notifications needed for the journey?",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-store'></i> <strong>Product-ready</strong>: the brief covers what makes the product sellable and operable, not only a local demo.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-trash'></i> Throwaway prototype",
        body: "Demo with no path to prod (no auth, hard-coded secrets, single env): you will rebuild. Better to enrich the prompt now.",
      },
    },
  ],
  quiz: promptQuizzes.m03,
  exercises: [promptExercises.m03_projet],
};
