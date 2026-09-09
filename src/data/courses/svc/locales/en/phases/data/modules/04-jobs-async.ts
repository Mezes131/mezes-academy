import type { Module } from "@/types";
import { dataQuizzes } from "../quizzes";
import { dataExercises } from "../exercises";

export const dataModule04: Module = {
  id: "svc-data-m04",
  index: "04",
  title: "Jobs & async processing",
  subtitle: "Lightweight queues, retries, idempotence",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Decouple slow processing from the HTTP request",
    "Design idempotent jobs",
    "Handle retries and failures",
  ],
  content: [
    { kind: "title", text: "Lightweight queues" },
    {
      kind: "paragraph",
      html: "Emails, PDFs, webhooks to a <strong>third-party provider</strong> (Resend, Stripe… as market examples): slow work should not block the HTTP request. A <strong>lightweight queue</strong> plus a <strong>worker</strong> fits early-stage products: enqueue a job, respond fast, process asynchronously. You do not need heavy infra on day one, but you do need durable job status.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-bolt'></i> Decouple",
        body: "API = accept and record intent. Worker = talk to external services with server-side secrets. Same provider-agnostic discipline as auth and storage.",
      },
    },

    { kind: "title", text: "Idempotence and retries" },
    {
      kind: "paragraph",
      html: "<strong>Idempotence</strong> means replaying a job does not double-send email or double-charge. Use idempotency keys or unique constraints. <strong>Retries</strong> recover from transient failures (timeouts, provider blips) with backoff and a max attempt count; permanent failures should land somewhere visible (dead letter / failed state) rather than vanishing into an infinite silent loop.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-rotate'></i> Double submit",
        body: "Without idempotence, a refresh or retry becomes two side effects. AI often « just calls send » inside the request handler with no key.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-clipboard-check'></i> <strong>P5 project</strong>: CRUD + upload + one idempotent async job. Generate, then audit before Ship on the capstone.",
    },
  ],
  quiz: dataQuizzes.m04,
  exercises: [dataExercises.m04_projet],
};
