import type { Quiz } from "@/types";

export const fondationsQuizzes: Record<"m01" | "m02" | "m03", Quiz> = {
  m01: {
    id: "svc-fondations-quiz-m01",
    title: "Vibe coding: check your reading",
    questions: [
      {
        id: "q1",
        question: "On the AI tools spectrum, what is an agent?",
        options: [
          { id: "a", label: "A simple word suggestion in the editor" },
          { id: "b", label: "A system that chains actions (read, write, run) with little supervision" },
          { id: "c", label: "A competing React framework" },
          { id: "d", label: "A database server" },
        ],
        correct: ["b"],
        explanation:
          "An agent acts: it can change several files, run commands, iterate. That requires stricter audit than autocomplete.",
      },
      {
        id: "q2",
        question: "Which failure is typical of AI-generated code?",
        options: [
          { id: "a", label: "It never compiles" },
          { id: "b", label: "It is plausible, passes a quick glance, but hides flaws or nonsense" },
          { id: "c", label: "It refuses to use TypeScript" },
          { id: "d", label: "It only produces HTML" },
        ],
        correct: ["b"],
        explanation:
          "The danger is not unreadable code: it is code that looks correct. Hence systematic audit.",
      },
      {
        id: "q3",
        question: "Who carries final responsibility for shipped code?",
        options: [
          { id: "a", label: "The AI model provider" },
          { id: "b", label: "The developer (or team) who signs and deploys" },
          { id: "c", label: "Nobody, it is experimental" },
          { id: "d", label: "The customer only" },
        ],
        correct: ["b"],
        explanation:
          "AI proposes. You ship. In production, your signature is what counts.",
      },
      {
        id: "q4",
        question: "Which trap do you avoid by actually reading the generated change preview?",
        options: [
          { id: "a", label: "Blind trust" },
          { id: "b", label: "Network timeouts" },
          { id: "c", label: "Broken CSS only" },
          { id: "d", label: "Git conflicts" },
        ],
        correct: ["a"],
        explanation:
          "Accepting without reading means delegating responsibility to a black box. The change preview is your first safety net.",
      },
      {
        id: "q5",
        question: "Why is a vague request (vague prompt) dangerous?",
        options: [
          { id: "a", label: "AI refuses to answer" },
          { id: "b", label: "It invents constraints, over-engineers, or drops critical requirements" },
          { id: "c", label: "It can only generate Python" },
          { id: "d", label: "It disables Git" },
        ],
        correct: ["b"],
        explanation:
          "A vague brief produces vague code. Specifying (Prompt) before generating shrinks the error space.",
      },
    ],
  },

  m02: {
    id: "svc-fondations-quiz-m02",
    title: "Prompt → Audit → Ship: check your reading",
    questions: [
      {
        id: "q1",
        question: "What is the « Prompt » phase for in the cycle?",
        options: [
          { id: "a", label: "Deploying to production" },
          { id: "b", label: "Specifying the need and generating a proposal" },
          { id: "c", label: "Running Lighthouse only" },
          { id: "d", label: "Configuring DNS" },
        ],
        correct: ["b"],
        explanation:
          "Prompt = scope + get a proposal. Without a spec, audit has no reference.",
      },
      {
        id: "q2",
        question: "What does a good Audit produce?",
        options: [
          { id: "a", label: "More lines of code" },
          { id: "b", label: "Evidence (checklists, scans, tests) that the deliverable is acceptable" },
          { id: "c", label: "A new foundation model" },
          { id: "d", label: "A marketing page" },
        ],
        correct: ["b"],
        explanation:
          "Audit = verify with evidence, not « looks ok ».",
      },
      {
        id: "q3",
        question: "What does « Ship » mean here?",
        options: [
          { id: "a", label: "Deliver with audit evidence, not just push code" },
          { id: "b", label: "Delete the repository" },
          { id: "c", label: "Change framework" },
          { id: "d", label: "Write a tweet" },
        ],
        correct: ["a"],
        explanation:
          "Ship = controlled release (preview/production) with a folder of evidence.",
      },
      {
        id: "q4",
        question: "Why prefer short loops over the « tunnel »?",
        options: [
          { id: "a", label: "Because Git only accepts small saves" },
          { id: "b", label: "You catch drift early; a 2000-line tunnel is almost impossible to verify" },
          { id: "c", label: "AI charges less" },
          { id: "d", label: "Browsers limit file size" },
        ],
        correct: ["b"],
        explanation:
          "Small feature → audit → partial ship. Then repeat. That is the rhythm of the whole course.",
      },
      {
        id: "q5",
        question: "Which tunnel anti-pattern should you avoid?",
        options: [
          { id: "a", label: "Generate one big delivery at once, audit only at the end" },
          { id: "b", label: "Read the change preview after each generation" },
          { id: "c", label: "Write a brief before generating" },
          { id: "d", label: "Run a secret scan" },
        ],
        correct: ["a"],
        explanation:
          "Auditing too late is expensive. The cycle requires audit at every increment.",
      },
    ],
  },

  m03: {
    id: "svc-fondations-quiz-m03",
    title: "Toolkit: check your reading",
    questions: [
      {
        id: "q1",
        question: "What are « project rules » for an AI assistant?",
        options: [
          { id: "a", label: "Decorating the README" },
          { id: "b", label: "Scoping generation (stack, conventions, forbidden patterns) before it goes off track" },
          { id: "c", label: "Replacing automated quality checks" },
          { id: "d", label: "Disabling Git" },
        ],
        correct: ["b"],
        explanation:
          "Project rules (e.g. instruction files in the editor) reduce stack and style mistakes.",
      },
      {
        id: "q2",
        question: "Which check is deterministic (not an AI opinion)?",
        options: [
          { id: "a", label: "A ChatGPT summary of the repo" },
          { id: "b", label: "A secret scan / quality check / dependency review" },
          { id: "c", label: "A like on a Git save" },
          { id: "d", label: "A screenshot" },
        ],
        correct: ["b"],
        explanation:
          "Automatic checks give repeatable evidence. They complement (and do not replace) human review.",
      },
      {
        id: "q3",
        question: "When is it better NOT to let AI generate?",
        options: [
          { id: "a", label: "A plain UI component" },
          { id: "b", label: "Crypto, fragile home-grown sign-in, critical business logic with no spec" },
          { id: "c", label: "A README file" },
          { id: "d", label: "Layout CSS" },
        ],
        correct: ["b"],
        explanation:
          "High-risk zones (fine security, money, personal data) need human spec + tight review, not solo vibe coding.",
      },
      {
        id: "q4",
        question: "Why combine an in-editor assistant and automatic checks?",
        options: [
          { id: "a", label: "Because one writes fast and the other verifies without opinion" },
          { id: "b", label: "Because checks generate the code" },
          { id: "c", label: "It is never useful" },
          { id: "d", label: "To replace tests" },
        ],
        correct: ["a"],
        explanation:
          "Speed (AI) + automatic safety net (quality, secrets, dependencies) + human review = Prompt → Audit → Ship cycle.",
      },
      {
        id: "q5",
        question: "What must a minimal audit report of a generated repo contain?",
        options: [
          { id: "a", label: "Only « works on my machine »" },
          { id: "b", label: "Findings with evidence, severity, prioritized recommendations" },
          { id: "c", label: "The README emoji list" },
          { id: "d", label: "The AI model price" },
        ],
        correct: ["b"],
        explanation:
          "That is exactly the Project P1 deliverable and the habit of later Audit phases.",
      },
    ],
  },
};
