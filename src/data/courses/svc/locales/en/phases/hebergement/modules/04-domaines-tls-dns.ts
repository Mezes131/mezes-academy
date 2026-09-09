import type { Module } from "@/types";
import { hebergementQuizzes } from "../quizzes";
import { hebergementExercises } from "../exercises";

export const hebergementModule04: Module = {
  id: "svc-hebergement-m04",
  index: "04",
  title: "Domains, TLS, DNS",
  subtitle: "Custom domain, HTTPS, redirects, email DNS",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Connect a custom domain over HTTPS",
    "Configure redirects and email DNS",
  ],
  content: [
    { kind: "title", text: "Go-live DNS" },
    {
      kind: "paragraph",
      html: "Go-live is more than « a preview URL ». You wire a <strong>custom domain</strong>, enable <strong>HTTPS/TLS</strong>, set <strong>redirects</strong> (www ↔ apex, HTTP → HTTPS). If you send transactional email, configure at least basic <strong>SPF/DKIM</strong> on the sending domain.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-globe'></i> Go-live checklist",
        body: "DNS to the platform, valid certificate, canonical redirects, email DNS if needed. Then smoke-test from outside.",
      },
    },
    {
      kind: "paragraph",
      html: "<strong>Project P10</strong> closes the phase: capstone deployed on <strong>preview + prod</strong>, public <strong>HTTPS</strong> URL, pipeline or deployment procedure documented. Preview must stay distinct from prod. A single « almost live » environment does not count.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-link'></i> Almost live is not live",
        body: "HTTP only, shared preview/prod secrets, no deploy docs: that is not the P10 deliverable.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-rocket'></i> <strong>Project P10</strong>: preview + prod HTTPS, DNS/TLS/redirects (+ email DNS), documented deployment.",
    },
  ],
  quiz: hebergementQuizzes.m04,
  exercises: [hebergementExercises.m04_projet],
};
