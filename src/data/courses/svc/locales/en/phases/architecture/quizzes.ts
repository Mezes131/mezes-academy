import type { Quiz } from "@/types";

export const architectureQuizzes: Record<"m01" | "m02" | "m03", Quiz> = {
  m01: {
    id: "svc-architecture-quiz-m01",
    title: "Split the system: check your reading",
    questions: [
      {
        id: "q1",
        question: "In a typical web product, what does the API mostly do?",
        options: [
          { id: "a", label: "Render buttons and CSS" },
          { id: "b", label: "Expose server-side operations (data, rights, business rules)" },
          { id: "c", label: "Replace the database" },
          { id: "d", label: "Generate Stripe keys" },
        ],
        correct: ["b"],
        explanation:
          "The UI talks to the API. The API applies rules and talks to the database / external services.",
      },
      {
        id: "q2",
        question: "What is a trust boundary?",
        options: [
          { id: "a", label: "The line between your code and the outside (browser, webhook…): where you must verify" },
          { id: "b", label: "A CSS file" },
          { id: "c", label: "The Git repo name" },
          { id: "d", label: "A dark theme" },
        ],
        correct: ["a"],
        explanation:
          "Whenever data crosses a boundary, you check inputs and rights. The browser is never trusted.",
      },
      {
        id: "q3",
        question: "What are background jobs?",
        options: [
          { id: "a", label: "Work done in the background (emails, imports) outside the immediate user request" },
          { id: "b", label: "Disabled buttons" },
          { id: "c", label: "Git commits" },
          { id: "d", label: "Web fonts" },
        ],
        correct: ["a"],
        explanation:
          "Jobs keep users from waiting on long-running work.",
      },
      {
        id: "q4",
        question: "What must the AI not invent alone?",
        options: [
          { id: "a", label: "A secondary button color" },
          { id: "b", label: "Architecture, API contracts, and critical data shape" },
          { id: "c", label: "A TODO comment" },
          { id: "d", label: "Help text on a field" },
        ],
        correct: ["b"],
        explanation:
          "You own structural decisions. The AI proposes code inside that frame.",
      },
      {
        id: "q5",
        question: "Why draw the building blocks before generating?",
        options: [
          { id: "a", label: "Only to pad the README" },
          { id: "b", label: "To know where to validate, where secrets live, and what the AI may touch" },
          { id: "c", label: "Because TypeScript requires it" },
          { id: "d", label: "To block Git" },
        ],
        correct: ["b"],
        explanation:
          "Without a map, the AI invents fuzzy boundaries. With a map, you audit and Ship cleanly.",
      },
    ],
  },

  m02: {
    id: "svc-architecture-quiz-m02",
    title: "Secrets and environments: check your reading",
    questions: [
      {
        id: "q1",
        question: "A « build-time » variable is…",
        options: [
          { id: "a", label: "A value baked into the package at build time, often readable later" },
          { id: "b", label: "A value that changes on every click" },
          { id: "c", label: "A secret that cannot be stolen" },
          { id: "d", label: "A .gitignore file" },
        ],
        correct: ["a"],
        explanation:
          "If you put a secret in a front build variable, it often ends up in the browser. Disaster.",
      },
      {
        id: "q2",
        question: "Where should production secrets live?",
        options: [
          { id: "a", label: "In the Git repo" },
          { id: "b", label: "In server / host environment variables, per environment" },
          { id: "c", label: "In CSS" },
          { id: "d", label: "In a README comment" },
        ],
        correct: ["b"],
        explanation:
          "Local, online preview, and production each have their own secrets. Never hard-code them.",
      },
      {
        id: "q3",
        question: "Why separate local / online preview / production?",
        options: [
          { id: "a", label: "To multiply licenses" },
          { id: "b", label: "To test without burning prod and limit who sees which secrets" },
          { id: "c", label: "Because React requires it" },
          { id: "d", label: "Only for SEO" },
        ],
        correct: ["b"],
        explanation:
          "You experiment locally and in preview. Production stays protected.",
      },
      {
        id: "q4",
        question: "Which Docker / CI trap should you avoid?",
        options: [
          { id: "a", label: "Logging or baking secrets into images and build logs" },
          { id: "b", label: "Using an untracked local .env file" },
          { id: "c", label: "Reading secrets from the host at startup" },
          { id: "d", label: "Having three named environments" },
        ],
        correct: ["a"],
        explanation:
          "An image or log that contains a secret is a lasting leak. Inject secrets at runtime.",
      },
      {
        id: "q5",
        question: "Putting a live Stripe key in the Vite front…",
        options: [
          { id: "a", label: "Is a good speed practice" },
          { id: "b", label: "Exposes the secret to anyone who opens browser tools" },
          { id: "c", label: "Is required by Stripe" },
          { id: "d", label: "Automatically protects production" },
        ],
        correct: ["b"],
        explanation:
          "Everything in the browser package is public. Secret keys stay on the server.",
      },
    ],
  },

  m03: {
    id: "svc-architecture-quiz-m03",
    title: "Contracts and webhooks: check your reading",
    questions: [
      {
        id: "q1",
        question: "An API contract is mainly…",
        options: [
          { id: "a", label: "A clear agreement on inputs, outputs, errors, and versions both sides honor" },
          { id: "b", label: "A shared CSS file" },
          { id: "c", label: "A release tweet" },
          { id: "d", label: "A dark theme" },
        ],
        correct: ["a"],
        explanation:
          "Without a stable contract, the AI (and teams) break the other side on every change.",
      },
      {
        id: "q2",
        question: "Why verify a webhook signature?",
        options: [
          { id: "a", label: "To decorate logs" },
          { id: "b", label: "To ensure the message really comes from the provider, not an impostor" },
          { id: "c", label: "Because JSON requires it" },
          { id: "d", label: "To speed up payment" },
        ],
        correct: ["b"],
        explanation:
          "Without a signature, anyone can announce a fake « payment succeeded ».",
      },
      {
        id: "q3",
        question: "« Do not process the same event twice » means…",
        options: [
          { id: "a", label: "Idempotency: a duplicate must not double-credit or double-send" },
          { id: "b", label: "Delete the database" },
          { id: "c", label: "Disable HTTPS" },
          { id: "d", label: "Ignore all errors" },
        ],
        correct: ["a"],
        explanation:
          "Networks sometimes resend the same webhook. Your system must stay correct.",
      },
      {
        id: "q4",
        question: "Why bound timeouts and retries?",
        options: [
          { id: "a", label: "To avoid loops hammering a service that is already down" },
          { id: "b", label: "To pad the README" },
          { id: "c", label: "Because Git requires it" },
          { id: "d", label: "Only for CSS" },
        ],
        correct: ["a"],
        explanation:
          "Without bounds, an incident becomes a flood of calls.",
      },
      {
        id: "q5",
        question: "Trusting a webhook JSON body without a signature…",
        options: [
          { id: "a", label: "Is fine in production" },
          { id: "b", label: "Is a dangerous anti-pattern" },
          { id: "c", label: "Is required by all providers" },
          { id: "d", label: "Replaces tests" },
        ],
        correct: ["b"],
        explanation:
          "The body is easy to forge. The signature (or equivalent) proves origin.",
      },
    ],
  },
};
