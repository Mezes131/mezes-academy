import type { Module } from "@/types";
import { promptQuizzes } from "../quizzes";
import { promptExercises } from "../exercises";

export const promptModule02: Module = {
  id: "svc-prompt-m02",
  index: "02",
  title: "Request techniques for product code",
  subtitle: "Just enough context, framed output, targeted fixes",
  duration: "45 min",
  difficulty: "beginner",
  objectives: [
    "Give just enough context",
    "Frame the output (tools, style, tests)",
    "Fix without starting over and have the AI critique the code",
  ],
  content: [
    { kind: "title", text: "Just enough context" },
    {
      kind: "paragraph",
      html: "Give the AI what it needs to anchor the answer: target file, data shape, project tools. Not the whole repo. Not zero. Noise (off-topic files, marketing fluff) causes drift.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-filter'></i> Filter",
        body: "Before sending: « Does this sentence change the expected code? » If not, cut it.",
      },
    },

    { kind: "title", text: "Frame the output" },
    {
      kind: "paragraph",
      html: "Impose tools, conventions, tests, and file bounds. Example: « React + TypeScript, one file only, add a test for the Add button ». Without that, you get a whole « beautiful » uncontrollable app.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-lock'></i> <strong>Framed output</strong> = aligned + verifiable proposal, not a creative surprise.",
    },

    { kind: "title", text: "Fix and request critique" },
    {
      kind: "paragraph",
      html: "After a mistake: fix the faulty area, do not relaunch « redo the whole project ». Ask the AI for a targeted critique (security, edge cases), then <strong>you</strong> audit. Accepting the first answer is a classic trap.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ban'></i> Avoid",
        body: "Starting over on every error · accept without reading · requests that skip checks or paste secrets.",
      },
    },
  ],
  quiz: promptQuizzes.m02,
  exercises: [promptExercises.m02_1, promptExercises.m02_2],
};
