import type { Module } from "@/types";
import { hebergementQuizzes } from "../quizzes";
import { hebergementExercises } from "../exercises";

export const hebergementModule02: Module = {
  id: "svc-hebergement-m02",
  index: "02",
  title: "Environments",
  subtitle: "Local, preview, prod, and runtime secrets",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Separate local / preview / prod",
    "Manage runtime secrets and build config",
  ],
  content: [
    { kind: "title", text: "Three environments" },
    {
      kind: "paragraph",
      html: "<strong>Local</strong>, <strong>preview</strong> (PR / staging), and <strong>prod</strong> do not share secrets or databases « to move faster ». Each env has its own config. <strong>Runtime secrets</strong> are injected by the platform or a vault. Never commit them, and never ship them in the client bundle.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-key'></i> Vite: build vs runtime",
        body: "<code>VITE_*</code> variables are embedded at <strong>build</strong> time for the browser. Public URLs OK. Secret keys (Stripe, service role…) = server / runtime only.",
      },
    },
    {
      kind: "paragraph",
      html: "Practical deliverable: a <strong>matrix</strong> of variables × environment (name, secret yes/no, value or location). That prevents preview hitting the prod DB or live payment webhooks.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-table'></i> Matrix",
        body: "List every product variable: local / preview / prod. If you do not know where it lives, you already have a potential leak.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-shield-halved'></i> <strong>Rule</strong>: three silos. Keep runtime secrets out of the repo and client; preview is not prod.",
    },
  ],
  quiz: hebergementQuizzes.m02,
  exercises: [hebergementExercises.m02_1],
};
