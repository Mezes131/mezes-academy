import type { Quiz } from "@/types";

export const promptQuizzes: Record<"m01" | "m02" | "m03", Quiz> = {
  m01: {
    id: "svc-prompt-quiz-m01",
    title: "Need to first deliverable: check your reading",
    questions: [
      {
        id: "q1",
        question: "What is a success rule (acceptance criterion) for?",
        options: [
          { id: "a", label: "Describing the logo design" },
          { id: "b", label: "Stating clearly when the need is met (you can say yes or no)" },
          { id: "c", label: "Replacing automated tests" },
          { id: "d", label: "Listing npm packages" },
        ],
        correct: ["b"],
        explanation:
          "A success rule is an observable condition: yes or no. Without it, the AI (and you) invent the finish line.",
      },
      {
        id: "q2",
        question: "What is out of scope in a first deliverable?",
        options: [
          { id: "a", label: "A feature you will not build in this version" },
          { id: "b", label: "A known production bug" },
          { id: "c", label: "An API secret" },
          { id: "d", label: "A .gitignore file" },
        ],
        correct: ["a"],
        explanation:
          "Out of scope protects the project: you explicitly say what you will not build now.",
      },
      {
        id: "q3",
        question: "Why write security, speed, and accessibility before generating?",
        options: [
          { id: "a", label: "To pad the README" },
          { id: "b", label: "So the AI does not skip them" },
          { id: "c", label: "Because TypeScript requires it" },
          { id: "d", label: "To block Git" },
        ],
        correct: ["b"],
        explanation:
          "The AI optimizes what you ask for. If you do not ask for security or accessibility, it often skips them.",
      },
      {
        id: "q4",
        question: "What does a « verifiable task » mean?",
        options: [
          { id: "a", label: "A task you can check alone, with a clear done rule" },
          { id: "b", label: "A task reserved for an external auditor" },
          { id: "c", label: "A task with no delivery" },
          { id: "d", label: "A task that generates 50 files" },
        ],
        correct: ["a"],
        explanation:
          "Small increment + done proof = you can verify. A 50-file monolith, no.",
      },
      {
        id: "q5",
        question: "Which brief is most dangerous before an AI request?",
        options: [
          { id: "a", label: "« Notes app: create / list / archive, team accounts, no public sharing in the first deliverable »" },
          { id: "b", label: "« Make something cool with AI, ship fast »" },
          { id: "c", label: "Written user stories + success rules + out of scope" },
          { id: "d", label: "Task list with a done rule each" },
        ],
        correct: ["b"],
        explanation:
          "Vague + « fast » = invention, too many features, critical gaps. The other options frame the work.",
      },
    ],
  },

  m02: {
    id: "svc-prompt-quiz-m02",
    title: "AI request techniques: check your reading",
    questions: [
      {
        id: "q1",
        question: "What is « just enough context »?",
        options: [
          { id: "a", label: "Paste the whole repo into the chat" },
          { id: "b", label: "Give enough useful info (files, rules), without noise" },
          { id: "c", label: "Never mention the project tools" },
          { id: "d", label: "Only ask « do your best »" },
        ],
        correct: ["b"],
        explanation:
          "Too little: the AI invents. Too much: it gets lost. Aim for the minimum that anchors the answer.",
      },
      {
        id: "q2",
        question: "Why frame the output (tools, conventions, tests)?",
        options: [
          { id: "a", label: "To slow the AI down" },
          { id: "b", label: "To get an aligned, verifiable proposal" },
          { id: "c", label: "Because models refuse otherwise" },
          { id: "d", label: "Only for CSS" },
        ],
        correct: ["b"],
        explanation:
          "Without rules you get « something ». With rules you get something verifiable.",
      },
      {
        id: "q3",
        question: "Which fix is healthy after a mistake?",
        options: [
          { id: "a", label: "Relaunch « redo the whole project »" },
          { id: "b", label: "Fix the faulty area, ask for a targeted critique" },
          { id: "c", label: "Always accept the first answer" },
          { id: "d", label: "Delete tests so it passes" },
        ],
        correct: ["b"],
        explanation:
          "Targeted fix + AI critique on the change preview. Starting over leaves the intended scope.",
      },
      {
        id: "q4",
        question: "Which sign points to a dangerous request?",
        options: [
          { id: "a", label: "It asks for checks, secrets in environment variables, tests" },
          { id: "b", label: "It asks to skip checks or paste secrets" },
          { id: "c", label: "It limits touched files" },
          { id: "d", label: "It specifies TypeScript" },
        ],
        correct: ["b"],
        explanation:
          "If the request pushes dangerous shortcuts, the code will follow. Fix the request first.",
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
        question: "Why plan sign-in / payments / notifications in the brief early?",
        options: [
          { id: "a", label: "To inflate the quote" },
          { id: "b", label: "To avoid a throwaway prototype with no path to a sellable product" },
          { id: "c", label: "Because React requires it" },
          { id: "d", label: "Only for SEO" },
        ],
        correct: ["b"],
        explanation:
          "These services change architecture. Bolting them on later is expensive.",
      },
      {
        id: "q2",
        question: "What does a « product-ready » list verify?",
        options: [
          { id: "a", label: "That the brief covers what makes the product sellable" },
          { id: "b", label: "That the CSS uses purple" },
          { id: "c", label: "That the README has emojis" },
          { id: "d", label: "That nobody writes tests" },
        ],
        correct: ["a"],
        explanation:
          "Product-ready means sign-in, environments, secrets, critical journeys, not just a demo CRUD.",
      },
      {
        id: "q3",
        question: "Which anti-pattern is « demo with no path to production »?",
        options: [
          { id: "a", label: "Throwaway prototype" },
          { id: "b", label: "Well-limited first deliverable" },
          { id: "c", label: "Successful audit" },
          { id: "d", label: "Just enough context" },
        ],
        correct: ["a"],
        explanation:
          "A local demo without sign-in, clean secrets, or environments does not magically become production.",
      },
      {
        id: "q4",
        question: "Where should secrets (API keys, database addresses) live?",
        options: [
          { id: "a", label: "In the AI request and the Git repo" },
          { id: "b", label: "In environment variables, one set per environment" },
          { id: "c", label: "In CSS" },
          { id: "d", label: "In the browser in clear text" },
        ],
        correct: ["b"],
        explanation:
          "Local / online preview / prod each have their secrets. Never hard-code them in code or chat pasted into the repo.",
      },
      {
        id: "q5",
        question: "Enriching a bare CRUD request mostly means…",
        options: [
          { id: "a", label: "Adding animations before sign-in" },
          { id: "b", label: "Adding sign-in, boundaries, environments, and missing business journeys" },
          { id: "c", label: "Removing all checks" },
          { id: "d", label: "Asking for CORS * (every site)" },
        ],
        correct: ["b"],
        explanation:
          "Bare CRUD ships a shell. A product brief adds what makes the shell sellable and safe.",
      },
    ],
  },
};
