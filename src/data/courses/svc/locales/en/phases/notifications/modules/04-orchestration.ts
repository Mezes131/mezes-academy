import type { Module } from "@/types";
import { notificationsQuizzes } from "../quizzes";
import { notificationsExercises } from "../exercises";

export const notificationsModule04: Module = {
  id: "svc-notifications-m04",
  index: "04",
  title: "Orchestration",
  subtitle: "Business triggers → queue → notification",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Chain business events, queue, and sending",
    "Correlate notifications, payments, and auth",
  ],
  content: [
    { kind: "title", text: "From trigger to send" },
    {
      kind: "paragraph",
      html: "The reliable pattern: <strong>business event</strong> (sign-up, signed payment webhook, reset requested) → <strong>queue / job</strong> → provider call. Sending inside the HTTP request blocks, times out, and double-clicks. The job must be <strong>idempotent</strong> (same key / event → no unwanted duplicate) and re-read <strong>preferences</strong> before sending.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-link'></i> Correlation",
        body: "Wire welcome / verification to auth, and receipt to confirmed payment, rather than to the UX redirect alone. Three emails on real triggers = core of project P7.",
      },
    },
    {
      kind: "paragraph",
      html: "Retries, dead-letter, and logs (with secrets kept out) complete the chain. If the worker fails after the webhook, the product stays consistent and the job can replay without creating flood or duplicate business effects.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-bolt'></i> Anti-pattern",
        body: "Sync email in the route + receipt triggered only by <code>/success</code> + provider key in the front end. Audit and decouple.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-clipboard-check'></i> <strong>Project P7</strong>: 3 transactional emails (auth + payment) + respected prefs + decoupled send. Generate, then audit on the capstone.",
    },
  ],
  quiz: notificationsQuizzes.m04,
  exercises: [notificationsExercises.m04_projet],
};
