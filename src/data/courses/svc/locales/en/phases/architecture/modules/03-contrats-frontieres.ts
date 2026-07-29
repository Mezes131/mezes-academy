import type { Module } from "@/types";
import { architectureQuizzes } from "../quizzes";
import { architectureExercises } from "../exercises";

export const architectureModule03: Module = {
  id: "svc-architecture-m03",
  index: "03",
  title: "Contracts and boundaries",
  subtitle: "Webhooks, process-once, timeouts and retries",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Write stable API contracts",
    "Design a webhook that does not double-apply effects",
    "Bound timeouts and retries",
  ],
  content: [
    { kind: "title", text: "Stable API contracts" },
    {
      kind: "paragraph",
      html: "A <strong>contract</strong> is the agreement: which inputs, which outputs, which errors, which version. Both sides (UI and server, or you and a provider) can evolve without breaking each other if the contract is clear.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-file-signature'></i> Stable ≠ frozen forever",
        body: "You can version (v1, v2). You avoid silently changing a field's meaning. The AI must honor the contract you wrote, not invent another.",
      },
    },

    { kind: "title", text: "Webhooks and « once only »" },
    {
      kind: "paragraph",
      html: "A <strong>webhook</strong> is an HTTP notification from an external service (e.g. payment succeeded). You verify the <strong>signature</strong> (proof of origin). You process each event <strong>at most once</strong> (idempotency): a duplicate must not double-credit.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-rotate'></i> <strong>Timeouts and retries</strong>: bound waits and retries, or an incident becomes a flood of calls.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ban'></i> Anti-pattern",
        body: "Accept JSON as-is with no signature, or credit on every receipt of the same event. The webhook exercise below attacks both mistakes.",
      },
    },
  ],
  quiz: architectureQuizzes.m03,
  exercises: [architectureExercises.m03_1],
};
