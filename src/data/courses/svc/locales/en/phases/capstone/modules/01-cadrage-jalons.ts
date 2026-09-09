import type { Module } from "@/types";
import { capstoneQuizzes } from "../quizzes";
import { capstoneExercises } from "../exercises";

export const capstoneModule01: Module = {
  id: "svc-capstone-m01",
  index: "01",
  title: "Capstone scoping and milestones",
  subtitle: "Choose your brief, understand the rubric, plan the cycle",
  duration: "40 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Choose one of the three briefs",
    "Understand each rubric criterion and automatic failures",
    "Plan Prompt → Audit → Delivery milestones",
  ],
  content: [
    { kind: "title", text: "Capstone: the playing field" },
    {
      kind: "paragraph",
      html: "The capstone validates the Secure Vibe Coding path: an end-to-end <strong>marketable product</strong>, deployed, audited, and delivered. Three briefs, <strong>one rubric</strong>. Pick the terrain that motivates you. Success criteria stay the same either way.",
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-briefcase'></i> The three briefs",
        body: "<strong>svc-capstone-saas</strong>: B2B SaaS with auth, subscription, and dashboard.<br/><strong>svc-capstone-commerce</strong>: lightweight e-commerce with catalog, payment, and order notifications.<br/><strong>svc-capstone-service</strong>: service product with booking/lead, payment, and transactional emails.",
      },
    },
    {
      kind: "paragraph",
      html: "Compare technical load and domain: SaaS pushes subscription and protected zones; commerce pushes catalog and checkout; service pushes booking / lead and emails. In every case: <strong>third-party auth</strong>, at least one payment or notification service (ideally both), and webhooks + idempotency if payment is in scope.",
    },
    { kind: "title", text: "Required cycle: Prompt → Audit → Delivery" },
    {
      kind: "paragraph",
      html: "<strong>Prompt</strong>: locked brief + prompt journal + target architecture. <strong>Audit</strong>: Security baseline + Quality (Perf / Design / A11y) with <strong>evidence</strong>. <strong>Delivery</strong>: public HTTPS prod + complete release package. No shortcut: each phase produces a verifiable deliverable.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ban'></i> Automatic failures",
        body: "Plaintext secrets (repo or logs) · Checkout with no webhook activation (redirect-only) · Prod with no HTTPS · Authorization only on the client. Any one of these pitfalls = fail, no matter how good the rest is.",
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-clipboard-check'></i> Rubric (excerpt)",
        body: "Public HTTPS · login via third-party service · payment or notification third party · Security pass with no open criticals · Perf / Design / A11y per thresholds · webhooks + idempotency if payment · documented deployment (CI or procedure) · complete delivery package.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-award'></i> <strong>Rule</strong>: chosen brief, milestone cycle, and zero auto-fails. Otherwise there is no certificate (<code>svc-cert-&lt;learnerId&gt;-&lt;yyyy-mm&gt;</code>).",
    },
  ],
  quiz: capstoneQuizzes.m01,
  exercises: [capstoneExercises.m01_projet],
};
