import type { Module } from "@/types";
import { hebergementQuizzes } from "../quizzes";
import { hebergementExercises } from "../exercises";

export const hebergementModule03: Module = {
  id: "svc-hebergement-m03",
  index: "03",
  title: "Minimal CI/CD",
  subtitle: "Build, test, deploy, rollback: and block on audit",
  duration: "45 min",
  difficulty: "intermediate",
  objectives: [
    "Set up a build/test/deploy pipeline",
    "Block deployment on failed lint or audit",
    "Know how to roll back",
  ],
  content: [
    { kind: "title", text: "Minimal pipeline" },
    {
      kind: "paragraph",
      html: "Automate the critical path: <strong>build</strong> → <strong>tests</strong> → <strong>deploy</strong>. Before prod, add <strong>gates</strong>: lint, dependency audit, secret scan. Red means <strong>refuse</strong> to deploy. Green is only the minimal net; it does not give you permission to ignore the rest.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ban'></i> Pitfalls",
        body: "Shipping with no gates. No rollback strategy. « We'll see if it breaks ». These are classics of rushed shipping.",
      },
    },
    {
      kind: "paragraph",
      html: "<strong>Rollback</strong> is part of the design: previous release, versioned artifact, or controlled revert. Document it and make it testable. A pipeline that refuses a secret or red lint beats a « yellow » prod deploy.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-rotate-left'></i> Rollback",
        body: "Write one page: how to go back in &lt; 15 min. If you cannot, you are not ready to deploy.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-gears'></i> <strong>Rule</strong>: build/test/deploy plus blocking gates and a known rollback. Never push blind to prod.",
    },
  ],
  quiz: hebergementQuizzes.m03,
  exercises: [hebergementExercises.m03_1],
};
