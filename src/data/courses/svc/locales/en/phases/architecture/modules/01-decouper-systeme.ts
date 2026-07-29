import type { Module } from "@/types";
import { architectureQuizzes } from "../quizzes";

export const architectureModule01: Module = {
  id: "svc-architecture-m01",
  index: "01",
  title: "Split the system",
  subtitle: "UI, API, database, background jobs, external services, and trust boundaries",
  duration: "40 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Name the building blocks of a full web product",
    "Spot trust boundaries (where you verify)",
    "Decide what the AI must not invent alone",
  ],
  content: [
    { kind: "title", text: "System building blocks" },
    {
      kind: "paragraph",
      html: "Before generating, draw the map. A typical web product has: a <strong>UI</strong> (browser), an <strong>API</strong> (server that applies rules), a <strong>database</strong>, sometimes <strong>background jobs</strong> (emails, imports), and <strong>external services</strong> (sign-in, payments, email delivery).",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-map'></i> Mini map",
        body: "UI → API → database. External services mostly attach to the API. Background jobs leave the API when work is too long for one request.",
      },
    },

    { kind: "title", text: "Trust boundaries" },
    {
      kind: "paragraph",
      html: "A <strong>trust boundary</strong> is the line between your system and the outside world (browser, webhook, other API). Whenever data crosses that line, you <strong>verify</strong> inputs and rights. The browser is never trusted: it can be modified.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-shield-halved'></i> <strong>Reflex</strong>: validation and authorization on the server, at the boundaries, not only in the UI.",
    },

    { kind: "title", text: "What the AI does not invent alone" },
    {
      kind: "paragraph",
      html: "You keep under human control: how blocks are split, <strong>API contracts</strong> (inputs / outputs / errors), and the critical <strong>data shape</strong>. The AI can propose code inside that frame. Not rewrite the frame in silence.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Trap",
        body: "« Generate the whole SaaS » with no map = fuzzy boundaries, misplaced secrets, invented contracts. Frame first, generate next, then audit and Ship.",
      },
    },
  ],
  quiz: architectureQuizzes.m01,
  exercises: [],
};
