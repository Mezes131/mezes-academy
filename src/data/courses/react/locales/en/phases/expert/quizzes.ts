import type { Quiz } from "@/types";

export const expertQuizzes = {
  m28: {
    id: "react-expert-quiz-m28",
    title: "Quiz: Architecture",
    questions: [
      {
        id: "q1",
        question: "What is the main argument for organizing a React project « by feature » rather than « by type » (components/, hooks/, services/)?",
        options: [
          { id: "a", label: "Code related to the same use case stays colocated: changing or removing a feature becomes trivial" },
          { id: "b", label: "It runs faster at runtime" },
          { id: "c", label: "Linters require it" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "A monorepo with Turborepo mainly provides:",
        options: [
          { id: "a", label: "Shared build/test cache, internal package sharing, unified tooling" },
          { id: "b", label: "Better runtime performance than multi-repo" },
          { id: "c", label: "Better security against XSS attacks" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "In Clean Architecture on the front end, dependencies should point:",
        options: [
          { id: "a", label: "From domain to infrastructure (UI depends on domain, domain depends on infra)" },
          { id: "b", label: "From outside to inside: UI → application → domain. Never the reverse" },
          { id: "c", label: "In every direction: the rule does not exist" },
        ],
        correct: ["b"],
        explanation:
          "The Clean Architecture rule: outer layers know inner layers, not the other way around. The domain must know nothing about React or HTTP.",
      },
    ],
  },

  m29: {
    id: "react-expert-quiz-m29",
    title: "Quiz: DevOps & CI/CD",
    questions: [
      {
        id: "q1",
        question: "What is a cache job in GitHub Actions for a Node/React project used for?",
        options: [
          { id: "a", label: "Caching `node_modules` and the package manager store (pnpm/npm/yarn) to speed up subsequent builds" },
          { id: "b", label: "Saving logs on failure" },
          { id: "c", label: "Encrypting secrets" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "Why use a multi-stage Dockerfile for a Next.js app?",
        options: [
          { id: "a", label: "To separate the build stage (heavy, with devDependencies) from the final image (minimal, runtime only)" },
          { id: "b", label: "Because it is mandatory" },
          { id: "c", label: "To double server speed" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "Vercel vs self-hosted (Node/Fly.io): what is an important trade-off?",
        options: [
          { id: "a", label: "Vercel = exceptional DX and preview deployments, but vendor lock-in and costs that scale up. Self-hosted = maximum flexibility but operational burden" },
          { id: "b", label: "Vercel is free in all circumstances" },
          { id: "c", label: "Self-hosted does not support Next.js" },
        ],
        correct: ["a"],
      },
    ],
  },

  m30: {
    id: "react-expert-quiz-m30",
    title: "Quiz: React Internals",
    questions: [
      {
        id: "q1",
        question: "The Fiber reconciler was introduced to:",
        options: [
          { id: "a", label: "Split rendering into interruptible work units, allowing urgent updates to be prioritized" },
          { id: "b", label: "Replace the Virtual DOM with a real server DOM" },
          { id: "c", label: "Cut bundle size in half" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "What does `useTransition` do?",
        options: [
          { id: "a", label: "It animates CSS transitions" },
          { id: "b", label: "It marks a state update as non-urgent, keeping higher-priority interactions smooth" },
          { id: "c", label: "It automatically cancels the previous update" },
        ],
        correct: ["b"],
      },
      {
        id: "q3",
        question: "Hydration: what happens between the server and the client?",
        options: [
          { id: "a", label: "The server sends static HTML. The client attaches event listeners and « rebuilds » the matching Virtual DOM to pick up where the server left off" },
          { id: "b", label: "The client downloads a `.hydrate.js` file that replaces all the HTML" },
          { id: "c", label: "Nothing: hydration is a myth" },
        ],
        correct: ["a"],
      },
      {
        id: "q4",
        question: "What is a « hydration mismatch » and how do you fix it?",
        options: [
          { id: "a", label: "Server HTML ≠ client-rendered HTML (e.g. `Date.now()` used directly). Fixes: render on the client only, or provide a stable value on the server" },
          { id: "b", label: "It is always a Next.js bug you should ignore" },
          { id: "c", label: "It cannot happen with React 18" },
        ],
        correct: ["a"],
      },
    ],
  },

  m31: {
    id: "react-expert-quiz-m31",
    title: "Quiz: Open Source",
    questions: [
      {
        id: "q1",
        question: "What do `changesets` bring to a library project?",
        options: [
          { id: "a", label: "A declarative flow to version (semver) and generate a changelog from PRs" },
          { id: "b", label: "An end-to-end test engine" },
          { id: "c", label: "An alternative to Git" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "In a modern library `package.json`, which keys indicate the package exposes CJS, ESM, and its types?",
        options: [
          { id: "a", label: "`main`, `module`, and `types` (or better: `exports` with `require`/`import`/`types`)" },
          { id: "b", label: "`browser` only" },
          { id: "c", label: "`bin`" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "A good first open-source contribution:",
        options: [
          { id: "a", label: "A PR that refactors 40 files to \"improve the code\"" },
          { id: "b", label: "A focused fix on an issue marked `good first issue`, with a regression test and a heads-up to the maintainer before starting" },
          { id: "c", label: "Opening a PR without opening an issue first" },
        ],
        correct: ["b"],
      },
    ],
  },

  m32: {
    id: "react-expert-quiz-m32",
    title: "Quiz: React & AI",
    questions: [
      {
        id: "q1",
        question: "What does the Vercel AI SDK `useChat` hook do?",
        options: [
          { id: "a", label: "It manages conversation state, sends messages, and incrementally streams tokens returned by the LLM" },
          { id: "b", label: "It automatically sends messages to OpenAI with no configuration" },
          { id: "c", label: "It replaces WebSocket" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "What is RAG (Retrieval-Augmented Generation)?",
        options: [
          { id: "a", label: "A technique where you retrieve relevant documents via embeddings + a vector database, then inject them into the prompt so the LLM answers from your data" },
          { id: "b", label: "A new OpenAI model" },
          { id: "c", label: "A prompt compression technique" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "Good UX for an AI interface:",
        options: [
          { id: "a", label: "Hide the stream and wait for the full response to avoid confusion" },
          { id: "b", label: "Stream tokens, show status clearly (thinking/tool call/done), and allow interrupting generation" },
          { id: "c", label: "Do not handle errors: the model never makes mistakes" },
        ],
        correct: ["b"],
      },
    ],
  },
} satisfies Record<string, Quiz>;
