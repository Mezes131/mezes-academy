import type { Module } from "@/types";
import { fondationsQuizzes } from "../quizzes";
import { fondationsExercises } from "../exercises";

export const fondationsModule03: Module = {
  id: "svc-fondations-m03",
  index: "03",
  title: "The vibe coder's toolkit",
  subtitle: "Assistants, project rules, and automatic checks",
  duration: "35 min",
  difficulty: "beginner",
  objectives: [
    "Pick the right AI tool for the task",
    "Configure project rules and automatic checks",
    "Know when NOT to use AI",
  ],
  content: [
    { kind: "title", text: "Assistants, agents, assisted review" },
    {
      kind: "paragraph",
      html: "For one line: suggestion while you type. For a scoped feature: in-editor assistant with project rules. For multi-file work: an agent, but under a strict brief and with mandatory review. « Assisted review » (AI comments on your changes) helps; it does not replace your judgment on security and business logic.",
    },

    { kind: "title", text: "Project rules and automatic checks" },
    {
      kind: "paragraph",
      html: "<strong>Project rules</strong> tell the assistant which stack you use, which patterns are forbidden, where secrets live. <strong>Automatic checks</strong> (code quality, secret scanning, dependency review, Lighthouse) produce repeatable evidence. Together they form the Audit phase safety net, even before the business checklists of phases 8 and 9.",
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-robot'></i> AI + automatic check",
        body: "AI proposes fast. The automatic tool decides without opinion. You arbitrate false alarms and business risk.",
      },
    },

    { kind: "title", text: "When not to use AI" },
    {
      kind: "paragraph",
      html: "Avoid (or watch very closely): home-grown crypto / fine-grained security, critical business logic poorly specified, legal clauses, anything that touches money or personal data directly without a written spec. In those zones, solo vibe coding is a bet, not a method.",
    },
    {
      kind: "paragraph",
      html: "Two exercises close this module: day-1 tooling, then <strong>Project P1</strong> (audit report of a generated repo). It is the same move you will repeat in the Security Audit phase.",
    },
  ],
  quiz: fondationsQuizzes.m03,
  exercises: [fondationsExercises.m03_1, fondationsExercises.m03_projet],
};
