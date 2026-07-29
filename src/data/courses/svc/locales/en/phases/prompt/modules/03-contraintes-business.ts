import type { Module } from "@/types";
import { promptQuizzes } from "../quizzes";
import { promptExercises } from "../exercises";

export const promptModule03: Module = {
  id: "svc-prompt-m03",
  index: "03",
  title: "Business constraints from the request",
  subtitle: "Plan sign-in, payments, notifications, and hosting in the brief",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Fold external services into framing early",
    "Use a product-ready list",
    "Avoid throwaway prototypes",
  ],
  content: [
    { kind: "title", text: "Plan external services" },
    {
      kind: "paragraph",
      html: "Sign-in, payments, notifications, hosting: this is not decoration. It changes where you check rights, where secrets live, and often the data shape. A CRUD (create / list / update / delete) generated without these lines becomes a throwaway prototype.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-puzzle-piece'></i> In the brief",
        body: "Even a written « later » helps: « Payments out of the first deliverable, but user accounts from v1 ». The AI stops inventing a phantom cart.",
      },
    },

    { kind: "title", text: "Product-ready list" },
    {
      kind: "paragraph",
      html: "Before a big CRUD request, check: who is signed in? which roles? which environments (local, online preview, production)? where do secrets live? server-side checks? notifications needed for the journey?",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-store'></i> <strong>Product-ready</strong>: the brief covers what makes the product sellable and operable, not only a demo on your laptop.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-trash'></i> Throwaway prototype",
        body: "Demo with no path to production (no sign-in, hard-coded secrets, single environment): you will rebuild. Better to enrich the request now.",
      },
    },
  ],
  quiz: promptQuizzes.m03,
  exercises: [promptExercises.m03_projet],
};
