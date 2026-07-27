import type { Module } from "@/types";
import { promptQuizzes } from "../quizzes";
import { promptExercises } from "../exercises";

export const promptModule01: Module = {
  id: "svc-prompt-m01",
  index: "01",
  title: "From need to shippable MVP",
  subtitle: "User stories, acceptance criteria, non-goals",
  duration: "40 min",
  difficulty: "beginner",
  openByDefault: true,
  objectives: [
    "Write user stories and acceptance criteria",
    "Spell out non-functional constraints",
    "Slice work into auditable tasks",
  ],
  content: [
    { kind: "title", text: "User story and acceptance criteria" },
    {
      kind: "paragraph",
      html: "Before any prompt, turn a vague wish into a <strong>testable need</strong>. A user story states who, what, why. An acceptance criterion states how you know it is done (yes / no, not « cool »).",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-list-check'></i> Mini template",
        body: "As a… I want… so that… Criteria: given X, when Y, then Z. If you cannot write Z, you are not ready to generate.",
      },
    },
    {
      kind: "paragraph",
      html: "<strong>Non-goals</strong> (out of scope) matter as much as goals. « No public sharing in the MVP » stops the AI from inventing a social network around your notes.",
    },

    { kind: "title", text: "Non-functional constraints" },
    {
      kind: "paragraph",
      html: "Security, performance, accessibility: if you do not write them, the AI often skips them. Concrete examples: no secrets in the browser, acceptable load time, keyboard-usable forms.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Trap",
        body: "« We will add security later » almost always yields a throwaway prototype. Frame early, even one line per constraint.",
      },
    },

    { kind: "title", text: "Slice into auditable tasks" },
    {
      kind: "paragraph",
      html: "An auditable task has human size: you can read the change preview and tick a done criterion. « Build the whole app » is not a task. « Create-note form + title validation » is.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-scissors'></i> <strong>Rule</strong>: if you cannot audit the task alone, re-slice before prompting.",
    },
  ],
  quiz: promptQuizzes.m01,
  exercises: [promptExercises.m01_1],
};
