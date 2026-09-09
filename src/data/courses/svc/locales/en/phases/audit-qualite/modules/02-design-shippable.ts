import type { Module } from "@/types";
import { auditQualiteQuizzes } from "../quizzes";
import { auditQualiteExercises } from "../exercises";

export const auditQualiteModule02: Module = {
  id: "svc-audit-qualite-m02",
  index: "02",
  title: "Shippable design",
  subtitle: "Hierarchy, single CTA, empty/error/loading states",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Verify visual hierarchy",
    "Ensure empty, error, and loading states",
  ],
  content: [
    { kind: "title", text: "Structured design review" },
    {
      kind: "paragraph",
      html: "A « pretty » but unreadable screen is not shippable. Audit with the <strong>design-baseline</strong> checklist: <strong>hierarchy</strong> (title → message → action), a single primary <strong>CTA</strong>, and the three states AI forgets: <strong>empty</strong>, <strong>error</strong>, and <strong>loading</strong>.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Common traps",
        body: "Screen with no empty state. Three equal-weight CTAs. Happy path only. Fix before declaring design OK.",
      },
    },
    {
      kind: "paragraph",
      html: "The review is not a subjective opinion: you check, fix, re-run. The product's most critical screen (often dashboard or checkout) goes first.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-eye'></i> One clear action",
        body: "If the user does not know what to do in 3 seconds, hierarchy or CTA is broken.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-pen-ruler'></i> <strong>Rule</strong>: clear hierarchy, one primary CTA, designed empty/error/loading rather than the happy path alone.",
    },
  ],
  quiz: auditQualiteQuizzes.m02,
  exercises: [auditQualiteExercises.m02_1],
};
