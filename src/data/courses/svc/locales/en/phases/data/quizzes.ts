import type { Quiz } from "@/types";

export const dataQuizzes: Record<"m01" | "m02" | "m03" | "m04", Quiz> = {
  m01: {
    id: "svc-data-quiz-m01",
    title: "Data model: check your reading",
    questions: [
      {
        id: "q1",
        question: "A useful data model starts from…",
        options: [
          {
            id: "a",
            label: "Product requirements: entities and relations you actually need",
          },
          { id: "b", label: "Every table the AI invents in one shot" },
          { id: "c", label: "CSS class names" },
          { id: "d", label: "The hosting provider logo" },
        ],
        correct: ["a"],
        explanation:
          "Translate the domain first. Extra tables and fields are noise until a real need appears.",
      },
      {
        id: "q2",
        question: "A foreign key mainly…",
        options: [
          {
            id: "a",
            label: "Links a row to another entity (e.g. resource → org)",
          },
          { id: "b", label: "Stores a JWT in the browser" },
          { id: "c", label: "Replaces authentication" },
          { id: "d", label: "Chooses a color theme" },
        ],
        correct: ["a"],
        explanation:
          "Relations (1–n, n–n…) live in the schema via keys and join tables when needed.",
      },
      {
        id: "q3",
        question: "Migrations are for…",
        options: [
          {
            id: "a",
            label: "Versioning schema changes in a controlled, reviewable way",
          },
          { id: "b", label: "Deleting Git history" },
          { id: "c", label: "Skipping server validation" },
          { id: "d", label: "Hosting static images only" },
        ],
        correct: ["a"],
        explanation:
          "A migration is a deliberate step: apply, review, and roll forward carefully. In other words, do not « rewrite prod by hand ».",
      },
      {
        id: "q4",
        question: "An AI-hallucinated schema often includes…",
        options: [
          {
            id: "a",
            label: "Unnecessary tables, redundant fields, or relations with no product need",
          },
          { id: "b", label: "Only the three entities you asked for" },
          { id: "c", label: "Mandatory HTTPS" },
          { id: "d", label: "Automatic access control" },
        ],
        correct: ["a"],
        explanation:
          "Audit every proposed table and column against the brief before you ship it.",
      },
      {
        id: "q5",
        question: "Postgres (or similar) in this course is…",
        options: [
          {
            id: "a",
            label: "A market example of a relational database rather than a required brand",
          },
          { id: "b", label: "The only legal database worldwide" },
          { id: "c", label: "A CSS framework" },
          { id: "d", label: "A magic-link provider" },
        ],
        correct: ["a"],
        explanation:
          "Stay provider-agnostic: pick a solid store, model clearly, migrate carefully.",
      },
    ],
  },

  m02: {
    id: "svc-data-quiz-m02",
    title: "API & validation: check your reading",
    questions: [
      {
        id: "q1",
        question: "« Never trust the client » means…",
        options: [
          {
            id: "a",
            label: "Validate every input on the server, even if the UI already checked it",
          },
          { id: "b", label: "Delete the front end" },
          { id: "c", label: "Trust localStorage as the source of truth" },
          { id: "d", label: "Skip authorization if types look fine" },
        ],
        correct: ["a"],
        explanation:
          "The browser can be modified or bypassed. The API boundary is where trust starts.",
      },
      {
        id: "q2",
        question: "A validation schema at the boundary is mainly for…",
        options: [
          {
            id: "a",
            label: "Rejecting malformed or out-of-range payloads before business logic runs",
          },
          { id: "b", label: "Styling forms" },
          { id: "c", label: "Choosing a CDN" },
          { id: "d", label: "Replacing authentication" },
        ],
        correct: ["a"],
        explanation:
          "Types, required fields, lengths, enums: fail fast with a clear error.",
      },
      {
        id: "q3",
        question: "Typed errors help because…",
        options: [
          {
            id: "a",
            label: "Clients can distinguish validation, auth, and not-found with stable codes / shapes",
          },
          { id: "b", label: "They replace HTTP status codes forever" },
          { id: "c", label: "They hide all failures from logs" },
          { id: "d", label: "They make pagination optional" },
        ],
        correct: ["a"],
        explanation:
          "A consistent error contract beats vague 500s and string-only messages.",
      },
      {
        id: "q4",
        question: "Pagination on list endpoints is mainly to…",
        options: [
          {
            id: "a",
            label: "Limit how much data you return per request (page size + cursor or offset)",
          },
          { id: "b", label: "Remove access control" },
          { id: "c", label: "Store secrets in the query string" },
          { id: "d", label: "Disable HTTPS" },
        ],
        correct: ["a"],
        explanation:
          "Unbounded lists crush memory, latency, and cost, especially with AI-generated « return all » handlers.",
      },
      {
        id: "q5",
        question: "Client-only validation of the payload…",
        options: [
          {
            id: "a",
            label: "Is not enough: the server must validate again",
          },
          { id: "b", label: "Fully secures the API" },
          { id: "c", label: "Replaces roles" },
          { id: "d", label: "Is required by every database" },
        ],
        correct: ["a"],
        explanation:
          "UI checks improve UX. Server checks protect the system.",
      },
    ],
  },

  m03: {
    id: "svc-data-quiz-m03",
    title: "Storage & files: check your reading",
    questions: [
      {
        id: "q1",
        question: "A safe upload should at least…",
        options: [
          {
            id: "a",
            label: "Check size, allowed types, and who is allowed to upload",
          },
          { id: "b", label: "Accept any file with no limit" },
          { id: "c", label: "Store the file only in the React bundle" },
          { id: "d", label: "Skip auth if the filename looks friendly" },
        ],
        correct: ["a"],
        explanation:
          "Unvalidated uploads are a classic path to abuse, malware hosting, and cost blowups.",
      },
      {
        id: "q2",
        question: "Object storage (e.g. S3-style) is mainly for…",
        options: [
          {
            id: "a",
            label: "Storing blobs (files) outside the app database, with keys and access controls",
          },
          { id: "b", label: "Replacing authentication" },
          { id: "c", label: "Running CSS animations" },
          { id: "d", label: "Editing Git commits" },
        ],
        correct: ["a"],
        explanation:
          "S3 and similar services are market examples rather than a mandated brand.",
      },
      {
        id: "q3",
        question: "A signed URL is useful because…",
        options: [
          {
            id: "a",
            label: "It grants time-limited access to a specific object so the bucket does not need to be public",
          },
          { id: "b", label: "It makes the file world-readable forever" },
          { id: "c", label: "It replaces server authorization forever" },
          { id: "d", label: "It stores the API secret in the browser safely" },
        ],
        correct: ["a"],
        explanation:
          "Short lifetime + scoped object = safer download / upload paths.",
      },
      {
        id: "q4",
        question: "ACL (access control) on files means…",
        options: [
          {
            id: "a",
            label: "Deciding who can read or write which objects (often tied to org / owner)",
          },
          { id: "b", label: "Choosing a font" },
          { id: "c", label: "Disabling HTTPS" },
          { id: "d", label: "Skipping quotas" },
        ],
        correct: ["a"],
        explanation:
          "Same idea as IDOR on rows: changing a key must not leak another user's file.",
      },
      {
        id: "q5",
        question: "Quotas help because…",
        options: [
          {
            id: "a",
            label: "They cap storage / upload volume per user or org and limit abuse",
          },
          { id: "b", label: "They replace typed errors" },
          { id: "c", label: "They make migrations unnecessary" },
          { id: "d", label: "They fix hallucinated schemas" },
        ],
        correct: ["a"],
        explanation:
          "Without quotas, one account can fill the bucket and your bill.",
      },
    ],
  },

  m04: {
    id: "svc-data-quiz-m04",
    title: "Jobs & async: check your reading",
    questions: [
      {
        id: "q1",
        question: "Why decouple slow work from the HTTP request?",
        options: [
          {
            id: "a",
            label: "So the API can respond quickly while a worker handles email, PDFs, etc.",
          },
          { id: "b", label: "So you can skip validation" },
          { id: "c", label: "So secrets move into the browser" },
          { id: "d", label: "So pagination is forbidden" },
        ],
        correct: ["a"],
        explanation:
          "Queues + workers keep the request path light and failures retryable.",
      },
      {
        id: "q2",
        question: "A lightweight queue early on is…",
        options: [
          {
            id: "a",
            label: "A simple durable job list / worker suited to an early-stage product, rather than overbuilt infra",
          },
          { id: "b", label: "Always a multi-region Kafka cluster on day one" },
          { id: "c", label: "Calling Stripe from React with no server" },
          { id: "d", label: "Storing jobs only in localStorage" },
        ],
        correct: ["a"],
        explanation:
          "Match complexity to stage. You still need durability and clear job status.",
      },
      {
        id: "q3",
        question: "Idempotence for a job means…",
        options: [
          {
            id: "a",
            label: "Replaying the job does not create duplicate side effects (double email, double charge…)",
          },
          { id: "b", label: "The job must never retry" },
          { id: "c", label: "Errors must be silent" },
          { id: "d", label: "HTTP status codes are banned" },
        ],
        correct: ["a"],
        explanation:
          "Use idempotency keys / unique constraints so retries are safe.",
      },
      {
        id: "q4",
        question: "Retries are useful when…",
        options: [
          {
            id: "a",
            label: "Transient failures happen (timeout, third-party blip), so use backoff and a max attempt count",
          },
          { id: "b", label: "You want infinite silent loops forever" },
          { id: "c", label: "Validation failed because the payload is invalid" },
          { id: "d", label: "You skipped authorization on purpose" },
        ],
        correct: ["a"],
        explanation:
          "Retry transient errors. Do not blindly retry permanent validation / auth failures.",
      },
      {
        id: "q5",
        question: "Resend / Stripe (as examples) in async jobs…",
        options: [
          {
            id: "a",
            label: "Are third-party market examples: call them from the worker with secrets on the server",
          },
          { id: "b", label: "Must be hard-coded into every React component" },
          { id: "c", label: "Replace the need for idempotence" },
          { id: "d", label: "Forbid queues" },
        ],
        correct: ["a"],
        explanation:
          "Provider-agnostic rule: server-side credentials, audited integration, safe retries.",
      },
    ],
  },
};
