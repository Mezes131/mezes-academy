import type { Module } from "@/types";
import { auditQualiteQuizzes } from "../quizzes";
import { auditQualiteExercises } from "../exercises";

export const auditQualiteModule03: Module = {
  id: "svc-audit-qualite-m03",
  index: "03",
  title: "Accessibility",
  subtitle: "Contrast, keyboard, labels, focus",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Verify contrast and keyboard navigation",
    "Label controls correctly",
    "Manage focus",
  ],
  content: [
    { kind: "title", text: "Basic a11y audit" },
    {
      kind: "paragraph",
      html: "Accessibility is not a cosmetic bonus: it is a product quality bar. Run the <strong>accessibility-baseline</strong> checklist on a real flow: <strong>contrast</strong>, <strong>keyboard navigation</strong>, <strong>labels</strong> (accessible names), <strong>focus management</strong> (especially modals and multi-step flows).",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-keyboard'></i> Score ≠ flow",
        body: "A green Lighthouse a11y score can hide a broken Tab order. Replay the flow with the keyboard and, if possible, a screen reader.",
      },
    },
    {
      kind: "paragraph",
      html: "AI traps: global <code>outline: none</code>, icon buttons with no name, non-focusable clickable <code>div</code>s, focus lost after closing a modal. Fix <strong>blockers</strong> before shipping.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-universal-access'></i> Shippable minimum",
        body: "Contrast OK, Tab to the end, labels present, focus visible and restored. Then document non-blocking gaps.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-person-walking-with-cane'></i> <strong>Rule</strong>: checklist + keyboard (+ screen reader) on a flow. Fix blockers rather than only the score.",
    },
  ],
  quiz: auditQualiteQuizzes.m03,
  exercises: [auditQualiteExercises.m03_1],
};
