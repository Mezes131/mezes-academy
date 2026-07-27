import type { Module } from "@/types";
import { promptQuizzes } from "../quizzes";
import { promptExercises } from "../exercises";

export const promptModule02: Module = {
  id: "svc-prompt-m02",
  index: "02",
  title: "Prompt techniques for product code",
  subtitle: "Minimal sufficient context, constrained output, iteration",
  duration: "45 min",
  difficulty: "beginner",
  objectives: [
    "Provide minimal sufficient context",
    "Constrain the output (stack, style, tests)",
    "Iterate without drifting and have the AI critique the code",
  ],
  content: [
    { kind: "title", text: "Minimal sufficient context" },
    {
      kind: "paragraph",
      html: "Give the AI what it needs to anchor the answer: target file, data contracts, stack. Not the whole repo. Not zero. Noise (off-topic files, marketing fluff) causes drift.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-filter'></i> Filter",
        body: "Before sending: « Does this sentence change the expected code? » If not, cut it.",
      },
    },

    { kind: "title", text: "Constrain the output" },
    {
      kind: "paragraph",
      html: "Impose stack, conventions, tests, and file bounds. Example: « React + TypeScript, one file only, add a test for the Add button ». Without that, you get a whole « beautiful » uncontrollable app.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-lock'></i> <strong>Constrained output</strong> = aligned + verifiable proposal, not a creative surprise.",
    },

    { kind: "title", text: "Iterate and request critique" },
    {
      kind: "paragraph",
      html: "After a mistake: fix the faulty area, do not relaunch « redo the whole project ». Ask the AI for a targeted critique (security, edge cases), then <strong>you</strong> audit. Accepting the first answer is a classic trap.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ban'></i> Anti-patterns",
        body: "Full reprompt on every error · accept without reading · prompts that ask to skip validation or paste secrets.",
      },
    },
  ],
  quiz: promptQuizzes.m02,
  exercises: [promptExercises.m02_1, promptExercises.m02_2],
};
