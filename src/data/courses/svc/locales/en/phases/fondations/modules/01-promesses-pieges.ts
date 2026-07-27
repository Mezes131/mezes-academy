import type { Module } from "@/types";
import { fondationsQuizzes } from "../quizzes";
import { fondationsExercises } from "../exercises";

export const fondationsModule01: Module = {
  id: "svc-fondations-m01",
  index: "01",
  title: "Vibe coding: promises and traps",
  subtitle: "What AI does well, what it misses, and who is responsible",
  duration: "25 min",
  difficulty: "intro",
  openByDefault: true,
  objectives: [
    "Place tools on a spectrum from line suggestion to autonomous agent",
    "Spot typical failures in generated code",
    "Own final responsibility: you sign what ships",
  ],
  content: [
    { kind: "title", text: "From most guided to most autonomous" },
    {
      kind: "paragraph",
      html: "« Vibe coding », here, is not « let AI code for you ». It is <strong>generate fast, then verify like a professional</strong>. Tools range from simplest to most autonomous: a line suggestion while you type, chat for a question, an in-editor assistant (several files), up to <em>agents</em> that read, write, and run commands with little supervision.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-gauge-high'></i> The more the tool acts alone, the more you must verify",
        body: "A bad suggestion costs one line. A poorly scoped agent can rewrite your sign-in flow, save a secret to Git history, and propose thousands of lines at once. Hence the Prompt (specify and generate) → Audit (verify with proof) → Ship (deliver with evidence) cycle.",
      },
    },

    { kind: "title", text: "Strengths and blind spots" },
    {
      kind: "paragraph",
      html: "AI is strong at <strong>repetitive starter code</strong>, common APIs, mechanical rewrites, explanations. It often misses: unwritten business rules, subtle flaws (sign-in, CORS, secrets), unnecessary over-engineering, and code that is <strong>plausible but wrong</strong> and survives a quick glance.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-eye'></i> <strong>Habit</strong>: if you have not read the change preview, you have not shipped. You hoped.",
    },

    { kind: "title", text: "The developer signs" },
    {
      kind: "paragraph",
      html: "In production, the model provider does not carry your Stripe incident. <strong>You (or your team) sign the integration, the deployment, the promise to the customer.</strong> Vibe coding failures without a safety net look alike: blind trust, vague request, skipped review. This course exists to break that pattern.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Traps to name right away",
        body: "Blind trust · unread code · vague request. You will see them again in the autopsy exercise below.",
      },
    },
  ],
  quiz: fondationsQuizzes.m01,
  exercises: [fondationsExercises.m01_1],
};
