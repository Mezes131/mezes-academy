import type { Module } from "@/types";
import { notificationsQuizzes } from "../quizzes";
import { notificationsExercises } from "../exercises";

export const notificationsModule02: Module = {
  id: "svc-notifications-m02",
  index: "02",
  title: "Email provider",
  subtitle: "Resend / Postmark: templates, domains, deliverability",
  duration: "45 min",
  difficulty: "intermediate",
  objectives: [
    "Wire up an email provider",
    "Create clean templates",
    "Understand basic deliverability",
  ],
  content: [
    { kind: "title", text: "Wire up a provider" },
    {
      kind: "paragraph",
      html: "<strong>Resend</strong> and <strong>Postmark</strong> are <strong>market examples</strong>: one email provider among others. The same ideas exist elsewhere: <strong>send API</strong>, <strong>templates</strong>, domain, delivery webhooks. You send from a <strong>server or worker</strong> with a secret key that must <strong>never</strong> live in the browser. Welcome and payment receipt = the product's first transactional templates.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-code'></i> Templates",
        body: "Version templates, control variables, escape user HTML. Predictable content > unreviewed on-the-fly paste.",
      },
    },

    { kind: "title", text: "Domains and deliverability" },
    {
      kind: "paragraph",
      html: "Configuring the <strong>sending domain</strong> (basic SPF / DKIM) authenticates your mail to inboxes. If you skip it, even a good provider ends in spam. <strong>Deliverability</strong> also follows volume, bounces, complaints, and sending <em>expected</em> content.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-key'></i> Secrets",
        body: "API key in React or the repo = spam from your account / burned quota. Server only. Stay agnostic: another provider follows the same pattern.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-inbox'></i> <strong>Reflex</strong>: provider = market example; server secret; domain + templates; inbox > « it compiles ».",
    },
  ],
  quiz: notificationsQuizzes.m02,
  exercises: [notificationsExercises.m02_1],
};
