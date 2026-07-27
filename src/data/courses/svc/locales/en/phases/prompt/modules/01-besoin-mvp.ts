import type { Module } from "@/types";
import { promptQuizzes } from "../quizzes";
import { promptExercises } from "../exercises";

export const promptModule01: Module = {
  id: "svc-prompt-m01",
  index: "01",
  title: "From need to first deliverable",
  subtitle: "User stories, success rules, out of scope",
  duration: "40 min",
  difficulty: "beginner",
  openByDefault: true,
  objectives: [
    "Write user stories and success rules",
    "Write quality constraints (security, speed, accessibility)",
    "Slice work into small verifiable tasks",
  ],
  content: [
    { kind: "title", text: "User story and success rules" },
    {
      kind: "paragraph",
      html: "Before any AI request, turn a vague wish into a <strong>verifiable need</strong>. A user story states who, what, why. A success rule (sometimes called an acceptance criterion) states how you know it is done (yes / no, not « cool »).",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-list-check'></i> Mini template",
        body: "As a… I want… so that… Rules: given X, when Y, then Z. If you cannot write Z, you are not ready to generate.",
      },
    },
    {
      kind: "paragraph",
      html: "<strong>Out of scope</strong> (what you will not do now) matters as much as what you will do. « No public sharing in the first deliverable » stops the AI from inventing a social network around your notes.",
    },

    { kind: "title", text: "Quality constraints" },
    {
      kind: "paragraph",
      html: "Security, speed, accessibility: if you do not write them, the AI often skips them. Concrete examples: no secrets in the browser, acceptable load time, keyboard-usable forms.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Trap",
        body: "« We will add security later » almost always yields a throwaway prototype. Frame early, even one line per constraint.",
      },
    },

    { kind: "title", text: "Slice into verifiable tasks" },
    {
      kind: "paragraph",
      html: "A verifiable task has human size: you can read the change preview and tick a done rule. « Build the whole app » is not a task. « Create-note form + title check » is.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-scissors'></i> <strong>Rule</strong>: if you cannot verify the task alone, re-slice before asking the AI.",
    },
  ],
  quiz: promptQuizzes.m01,
  exercises: [promptExercises.m01_1],
};
