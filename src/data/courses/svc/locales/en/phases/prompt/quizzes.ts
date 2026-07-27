import type { Quiz } from "@/types";

export const promptQuizzes: Record<"m01" | "m02" | "m03", Quiz> = {
  m01: {
    id: "svc-prompt-quiz-m01",
    title: "Need to MVP: check your reading",
    questions: [
      {
        id: "q1",
        question: "What is an acceptance criterion for?",
        options: [
          { id: "a", label: "Describing the logo design" },
          { id: "b", label: "Stating clearly when the need is met (testable)" },
          { id: "c", label: "Replacing automated tests" },
          { id: "d", label: "Listing npm dependencies" },
        ],
        correct: ["b"],
        explanation:
          "An acceptance criterion is an observable condition: yes or no. Without it, the AI (and you) invent the finish line.",
      },
      {
        id: "q2",
        question: "What is a non-goal in an MVP brief?",
        options: [
          { id: "a", label: "A feature out of scope for this version" },
          { id: "b", label: "A known production bug" },
          { id: "c", label: "An API secret" },
          { id: "d", label: "A .gitignore file" },
        ],
        correct: ["a"],
        explanation:
          "Non-goals protect scope: you explicitly say what you will not build now.",
      },
      {
        id: "q3",
        question: "Why write non-functional constraints before generating?",
        options: [
          { id: "a", label: "To pad the README" },
          { id: "b", label: "So security, perf, and accessibility are not skipped by the AI" },
          { id: "c", label: "Because TypeScript requires it" },
          { id: "d", label: "To block Git" },
        ],
        correct: ["b"],
        explanation:
          "The AI optimizes what you ask for. If you do not ask for security or a11y, it often skips them.",
      },
      {
        id: "q4",
        question: "What does an « auditable task » mean?",
        options: [
          { id: "a", label: "A task you can verify alone, with a done criterion" },
          { id: "b", label: "A task reserved for an external auditor" },
          { id: "c", label: "A task with no delivery" },
          { id: "d", label: "A task that generates 50 files" },
        ],
        correct: ["a"],
        explanation:
          "Small increment + done proof = you can audit. A 50-file monolith, no.",
      },
      {
        id: "q5",
        question: "Which brief is most dangerous before a prompt?",
        options: [
          { id: "a", label: "« Notes app: create / list / archive, team accounts, no public sharing in MVP »" },
          { id: "b", label: "« Make something cool with AI, ship fast »" },
          { id: "c", label: "Written stories + criteria + non-goals" },
          { id: "d", label: "Task list with a done criterion each" },
        ],
        correct: ["b"],
        explanation:
          "Vague + « fast » = invention, over-scope, critical gaps. The other options frame the work.",
      },
    ],
  },

  m02: {
    id: "svc-prompt-quiz-m02",
    title: "Prompt techniques: check your reading",
    questions: [
      {
        id: "q1",
        question: "What is « minimal sufficient context »?",
        options: [
          { id: "a", label: "Paste the whole repo into the chat" },
          { id: "b", label: "Give enough useful info (files, contracts), without noise" },
          { id: "c", label: "Never mention the stack" },
          { id: "d", label: "Only ask « do your best »" },
        ],
        correct: ["b"],
        explanation:
          "Too little: the AI invents. Too much: it gets lost. Aim for the minimum that anchors the answer.",
      },
      {
        id: "q2",
        question: "Why constrain the output (stack, conventions, tests)?",
        options: [
          { id: "a", label: "To slow the AI down" },
          { id: "b", label: "To get an aligned, verifiable proposal" },
          { id: "c", label: "Because models refuse otherwise" },
          { id: "d", label: "Only for CSS" },
        ],
        correct: ["b"],
        explanation:
          "Without constraints you get « something ». With constraints you get something auditable.",
      },
      {
        id: "q3",
        question: "Which iteration is healthy after a mistake?",
        options: [
          { id: "a", label: "Full reprompt « redo the whole project »" },
          { id: "b", label: "Fix the faulty area, ask for a targeted critique" },
          { id: "c", label: "Always accept the first answer" },
          { id: "d", label: "Delete tests so it passes" },
        ],
        correct: ["b"],
        explanation:
          "Targeted iteration + AI self-review on the diff. Full reprompts drift scope.",
      },
      {
        id: "q4",
        question: "Which sign points to a vulnerable prompt?",
        options: [
          { id: "a", label: "It asks for validation, env secrets, tests" },
          { id: "b", label: "It asks to skip validation or paste secrets" },
          { id: "c", label: "It bounds touched files" },
          { id: "d", label: "It specifies TypeScript" },
        ],
        correct: ["b"],
        explanation:
          "If the prompt pushes dangerous shortcuts, the code will follow. Fix the prompt first.",
      },
      {
        id: "q5",
        question: "Why ask the AI to critique the code after generation?",
        options: [
          { id: "a", label: "To fully replace human review" },
          { id: "b", label: "To surface gaps before your human audit" },
          { id: "c", label: "Because it is legally required" },
          { id: "d", label: "To disable Git" },
        ],
        correct: ["b"],
        explanation:
          "AI as reviewer helps. You still own the final audit.",
      },
    ],
  },

  m03: {
    id: "svc-prompt-quiz-m03",
    title: "Business constraints: check your reading",
    questions: [
      {
        id: "q1",
        question: "Why anticipate auth / payments / notifications in the brief?",
        options: [
          { id: "a", label: "To inflate the quote" },
          { id: "b", label: "To avoid a throwaway prototype with no path to a sellable product" },
          { id: "c", label: "Because React requires it" },
          { id: "d", label: "Only for SEO" },
        ],
        correct: ["b"],
        explanation:
          "Third-party services change architecture. Bolting them on later is expensive.",
      },
      {
        id: "q2",
        question: "What does a « product-ready » checklist verify?",
        options: [
          { id: "a", label: "That the brief covers what makes the product commercializable" },
          { id: "b", label: "That the CSS uses purple" },
          { id: "c", label: "That the README has emojis" },
          { id: "d", label: "That nobody writes tests" },
        ],
        correct: ["a"],
        explanation:
          "Product-ready means auth, envs, secrets, critical journeys, not just a demo CRUD.",
      },
      {
        id: "q3",
        question: "Which anti-pattern is « demo with no path to prod »?",
        options: [
          { id: "a", label: "Throwaway prototype" },
          { id: "b", label: "Well-bounded MVP" },
          { id: "c", label: "Successful audit" },
          { id: "d", label: "Minimal sufficient context" },
        ],
        correct: ["a"],
        explanation:
          "A local demo without envs, auth, or clean secrets does not magically become production.",
      },
      {
        id: "q4",
        question: "Where should secrets (API keys, database URLs) live?",
        options: [
          { id: "a", label: "In the prompt and the Git repo" },
          { id: "b", label: "In environment variables per environment" },
          { id: "c", label: "In CSS" },
          { id: "d", label: "In the browser in clear text" },
        ],
        correct: ["b"],
        explanation:
          "Local / preview / prod each have their secrets. Never hard-code them in code or chat pasted into the repo.",
      },
      {
        id: "q5",
        question: "Enriching a bare CRUD prompt mostly means…",
        options: [
          { id: "a", label: "Adding animations before auth" },
          { id: "b", label: "Adding auth, trust boundaries, envs, and missing business journeys" },
          { id: "c", label: "Removing all validation" },
          { id: "d", label: "Asking for CORS *" },
        ],
        correct: ["b"],
        explanation:
          "Bare CRUD ships a shell. A product brief adds what makes the shell sellable and safe.",
      },
    ],
  },
};
