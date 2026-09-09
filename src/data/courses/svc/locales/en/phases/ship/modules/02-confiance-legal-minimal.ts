import type { Module } from "@/types";
import { shipQuizzes } from "../quizzes";
import { shipExercises } from "../exercises";

export const shipModule02: Module = {
  id: "svc-ship-m02",
  index: "02",
  title: "Trust & minimal legal",
  subtitle: "Light ToS/privacy, legal notices, support",
  duration: "30 min",
  difficulty: "intermediate",
  objectives: [
    "Cover ToS, privacy, and minimal legal notices",
    "Open a credible support channel",
  ],
  content: [
    { kind: "title", text: "The minimum that builds trust" },
    {
      kind: "paragraph",
      html: "A paid product that lacks reachable <strong>ToS</strong>, <strong>privacy</strong>, or <strong>legal notices</strong> breaks trust. The foundation is <strong>light but real</strong>: reachable pages and reviewed copy. A 404 « coming soon » or unread AI paste does not count.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-scale-balanced'></i> Notices",
        body: "Identify the publisher / a contact. Exact form depends on local law; the traceability principle is universal. Provider-agnostic.",
      },
    },
    {
      kind: "paragraph",
      html: "The <strong>support channel</strong> must be announced and tested (email, form, ticket). A hidden DM is not enough: paying customers must know who to reach.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Checklist not run",
        body: "Run the mini compliance checklist and fill gaps. Ticking boxes with no proof is a fake ship.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-handshake'></i> <strong>Rule</strong>: ToS, privacy, notices, and visible support. That is the P12 trust foundation.",
    },
  ],
  quiz: shipQuizzes.m02,
  exercises: [shipExercises.m02_1],
};
