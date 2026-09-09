import type { Module } from "@/types";
import { auditQualiteQuizzes } from "../quizzes";
import { auditQualiteExercises } from "../exercises";

export const auditQualiteModule04: Module = {
  id: "svc-audit-qualite-m04",
  index: "04",
  title: "Revenue flow UX",
  subtitle: "Checkout, trust emails, unnecessary friction",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Streamline the payment flow",
    "Build trust at critical moments",
  ],
  content: [
    { kind: "title", text: "The flow that pays" },
    {
      kind: "paragraph",
      html: "Checkout and post-payment emails are the business core. Audit for <strong>conversion + trust</strong>: clear price, justified steps, recoverable errors, <strong>trust emails</strong> (confirmation, access, support). Remove every <strong>unnecessary friction</strong> (redundant fields, forced account too early, ambiguity).",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-cart-shopping'></i> Misleading happy path",
        body: "AI often generates a pay that « works » once. Replay the full flow: card failure, back navigation, missing email.",
      },
    },
    {
      kind: "paragraph",
      html: "<strong>Project P9</strong> closes the phase: Perf / Design / A11y checklists passed on the capstone, with documented <strong>before/after scores</strong> and tracked fixes (commit or diff).",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-chart-line'></i> Before / after",
        body: "Measure → fix (perf, design, a11y, checkout) → re-measure. Improvement demonstrated rather than merely claimed.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-clipboard-check'></i> <strong>Project P9</strong>: before/after scores + perf/design/a11y checklists + paid-flow friction removed.",
    },
  ],
  quiz: auditQualiteQuizzes.m04,
  exercises: [auditQualiteExercises.m04_projet],
};
