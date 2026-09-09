import type { Module } from "@/types";
import { opsQuizzes } from "../quizzes";
import { opsExercises } from "../exercises";

export const opsModule01: Module = {
  id: "svc-ops-m01",
  index: "01",
  title: "Useful logs",
  subtitle: "Request/user correlation, never secrets",
  duration: "30 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Structure correlated logs",
    "Ensure zero secrets in logs",
  ],
  content: [
    { kind: "title", text: "Logs that help" },
    {
      kind: "paragraph",
      html: "When things break, you need <strong>actionable traces</strong>. A wall of <code>console.log</code> will not get you there. <strong>Structured logs</strong> (fields: level, event, message, ids) filter in any aggregator. <strong>Request / user correlation</strong> ties steps of the same journey together.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-key'></i> Zero secrets",
        body: "Token, password, API key, raw payment body: keep them out of logs. Log platforms are an attack surface. Redact before emit.",
      },
    },
    {
      kind: "paragraph",
      html: "On an <strong>auth</strong> or <strong>payment</strong> flow, name events (<code>checkout.started</code>, <code>webhook.received</code>, <code>auth.failed</code>) with outcome and ids. A bare « error » label is not enough. Provider-agnostic: format matters more than the tool.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-link'></i> Correlation",
        body: "Propagate a <code>requestId</code> (and a <code>userId</code> when relevant) from front to back and webhooks. Without it, debugging is a blind hunt.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-clipboard-list'></i> <strong>Rule</strong>: structured logs, correlation, and zero secrets. Skip any of those and you do not have observability.",
    },
  ],
  quiz: opsQuizzes.m01,
  exercises: [opsExercises.m01_1],
};
