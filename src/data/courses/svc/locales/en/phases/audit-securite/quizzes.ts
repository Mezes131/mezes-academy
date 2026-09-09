import type { Quiz } from "@/types";

export const auditSecuriteQuizzes: Record<"m01" | "m02" | "m03" | "m04", Quiz> = {
  m01: {
    id: "svc-audit-securite-quiz-m01",
    title: "Secrets and configuration: check your understanding",
    questions: [
      {
        id: "q1",
        question: "A « hardcoded » secret is mainly…",
        options: [
          {
            id: "a",
            label: "A key, token, or password pasted into code, config, or Docker",
          },
          { id: "b", label: "An environment variable injected at runtime from a vault" },
          { id: "c", label: "A public commit hash" },
          { id: "d", label: "A TODO comment with no sensitive value" },
        ],
        correct: ["a"],
        explanation:
          "AI often pastes example keys into code. A live hardcoded secret is an incident, even if « temporary ».",
      },
      {
        id: "q2",
        question: "Is removing a secret from the current file enough if the commit was already pushed?",
        options: [
          {
            id: "a",
            label: "No: the secret remains in git history and must be rotated (revoked)",
          },
          { id: "b", label: "Yes: git forgets history once the file is edited" },
          { id: "c", label: "Yes if the file is named .env.local" },
          { id: "d", label: "Yes if nobody has cloned the repo yet" },
        ],
        correct: ["a"],
        explanation:
          "History keeps the blob. Rotation is mandatory: never « just a new commit ».",
      },
      {
        id: "q3",
        question: ".gitignore and .dockerignore mainly help to…",
        options: [
          {
            id: "a",
            label: "Stop versioning or baking secret / .env files into images",
          },
          { id: "b", label: "Automatically encrypt API keys" },
          { id: "c", label: "Replace a secrets vault" },
          { id: "d", label: "Allow secrets in the React front end" },
        ],
        correct: ["a"],
        explanation:
          "Without ignore files, AI (or you) commits .env. Dockerignore avoids copying secrets into the image.",
      },
      {
        id: "q4",
        question: "Least privilege for secrets means…",
        options: [
          {
            id: "a",
            label: "Each secret is only accessible to services / people that need it",
          },
          { id: "b", label: "One master key for the whole monorepo" },
          { id: "c", label: "Put every key in the repo « for simplicity »" },
          { id: "d", label: "Share the prod key in the team Slack channel" },
        ],
        correct: ["a"],
        explanation:
          "Vaults, scopes, separated environments. One shared key = maximum blast radius.",
      },
      {
        id: "q5",
        question: "When AI generates an example with a realistic-looking API key…",
        options: [
          {
            id: "a",
            label: "Treat it as suspect: placeholders, scanning, and never commit a real key",
          },
          { id: "b", label: "Copy it into prod to save time" },
          { id: "c", label: "Expose it on the client with VITE_ to share it" },
          { id: "d", label: "Leave it: scanners never look at examples" },
        ],
        correct: ["a"],
        explanation:
          "Generated snippets are a classic leak source. Placeholders + vault + secret scanning.",
      },
    ],
  },

  m02: {
    id: "svc-audit-securite-quiz-m02",
    title: "Inputs and injections: check your understanding",
    questions: [
      {
        id: "q1",
        question: "Validation at the boundaries means…",
        options: [
          {
            id: "a",
            label: "Validate / type inputs where they enter (API, forms, uploads) before processing",
          },
          { id: "b", label: "Trust the front end only" },
          { id: "c", label: "Concatenate SQL with user input" },
          { id: "d", label: "Disable CORS to simplify" },
        ],
        correct: ["a"],
        explanation:
          "The front end is bypassable. Schemas, types, allowlists on the server (and parameterized DB queries).",
      },
      {
        id: "q2",
        question: "The baseline defense against SQL injection is…",
        options: [
          {
            id: "a",
            label: "Parameterized queries / a correctly used ORM rather than SQL concatenation",
          },
          { id: "b", label: "Manually escaping with replace(\"'\", \"\") only" },
          { id: "c", label: "Hiding table names" },
          { id: "d", label: "Making the whole database read-only for everyone" },
        ],
        correct: ["a"],
        explanation:
          "AI loves `WHERE id = ${id}`. Bound parameters (or a safe query builder) are non-negotiable.",
      },
      {
        id: "q3",
        question: "dangerouslySetInnerHTML is especially risky when…",
        options: [
          {
            id: "a",
            label: "The HTML comes from user input or an untrusted source with no sanitization",
          },
          { id: "b", label: "You use it for a static, trusted hardcoded fragment" },
          { id: "c", label: "The component has a Tailwind className" },
          { id: "d", label: "The bundle is minified" },
        ],
        correct: ["a"],
        explanation:
          "Stored / reflected XSS: script injected into the DOM. Sanitize or do not use dangerouslySetInnerHTML.",
      },
      {
        id: "q4",
        question: "Command injection typically appears when…",
        options: [
          {
            id: "a",
            label: "User input is passed to a shell (exec, spawn with shell:true) with no controls",
          },
          { id: "b", label: "You only use filesystem APIs and avoid a shell" },
          { id: "c", label: "You validate an enum on the server" },
          { id: "d", label: "You store a UUID in the database" },
        ],
        correct: ["a"],
        explanation:
          "AI often wires `exec(\`convert ${filename}\`)`. Prefer shell-free APIs + allowlists.",
      },
      {
        id: "q5",
        question: "A safe minimum for uploads includes…",
        options: [
          {
            id: "a",
            label: "Type/size checks, untrusted filenames, storage outside execution paths",
          },
          { id: "b", label: "Accepting any MIME type the client declares" },
          { id: "c", label: "Serving uploads from /public with a .php extension" },
          { id: "d", label: "Disabling all validation « for UX »" },
        ],
        correct: ["a"],
        explanation:
          "Client MIME is a lie. Check content, limit size, random names, no server-side execution.",
      },
    ],
  },

  m03: {
    id: "svc-audit-securite-quiz-m03",
    title: "AuthZ and API surfaces: check your understanding",
    questions: [
      {
        id: "q1",
        question: "An IDOR is…",
        options: [
          {
            id: "a",
            label: "Accessing another user's resource by changing an id (without an ownership check)",
          },
          { id: "b", label: "A DNS error" },
          { id: "c", label: "A correctly configured HttpOnly cookie" },
          { id: "d", label: "An overly strict rate limit" },
        ],
        correct: ["a"],
        explanation:
          "GET /orders/123 → 124 while skipping a check that the order belongs to the caller. Classic in generated code.",
      },
      {
        id: "q2",
        question: "Mapping exposed surfaces helps you…",
        options: [
          {
            id: "a",
            label: "List routes / webhooks / public jobs and verify authn/authz for each",
          },
          { id: "b", label: "Replace unit tests" },
          { id: "c", label: "Avoid writing RLS policies" },
          { id: "d", label: "Publish every route and skip middleware" },
        ],
        correct: ["a"],
        explanation:
          "Without a map, AI leaves /api/admin open. Route × role matrix before shipping.",
      },
      {
        id: "q3",
        question: "Webhooks are « public by design », so…",
        options: [
          {
            id: "a",
            label: "They must verify a signature (or secret) and stay strictly scoped",
          },
          { id: "b", label: "They need no verification at all" },
          { id: "c", label: "They can run any SQL received in the body" },
          { id: "d", label: "They should be callable from the browser with the secret key" },
        ],
        correct: ["a"],
        explanation:
          "Without signature checks, anyone can forge events. Idempotency + provider auth.",
      },
      {
        id: "q4",
        question: "RLS (Row Level Security) used well…",
        options: [
          {
            id: "a",
            label: "Applies database policies to limit which rows a role can see / change",
          },
          { id: "b", label: "Fully replaces app auth with no policies needed" },
          { id: "c", label: "Disables indexes" },
          { id: "d", label: "Allows SELECT * for anon by default" },
        ],
        correct: ["a"],
        explanation:
          "RLS is a DB safety net. Explicit policies; « RLS on » with no useful policies is false security.",
      },
      {
        id: "q5",
        question: "A route « protected » only in the React front end…",
        options: [
          {
            id: "a",
            label: "Is not protected: the API must check session/role on the server (or equivalent)",
          },
          { id: "b", label: "Is enough if the Admin button is hidden" },
          { id: "c", label: "Automatically blocks curl and Postman" },
          { id: "d", label: "Replaces RLS policies" },
        ],
        correct: ["a"],
        explanation:
          "Hiding a link ≠ AuthZ. Every API surface must enforce on the server.",
      },
    ],
  },

  m04: {
    id: "svc-audit-securite-quiz-m04",
    title: "Dependencies and supply chain: check your understanding",
    questions: [
      {
        id: "q1",
        question: "An AI-« hallucinated » dependency is…",
        options: [
          {
            id: "a",
            label: "An invented or misspelled package the AI suggests installing",
          },
          { id: "b", label: "A dep listed on npm with millions of downloads" },
          { id: "c", label: "An official @types/* package" },
          { id: "d", label: "The Node runtime itself" },
        ],
        correct: ["a"],
        explanation:
          "Typosquatting / invented names: someone can publish the fake package. Verify before npm install.",
      },
      {
        id: "q2",
        question: "Pinning versions helps to…",
        options: [
          {
            id: "a",
            label: "Control exactly what gets installed and limit surprises from wide ranges",
          },
          { id: "b", label: "Speed up npm by ignoring the lockfile" },
          { id: "c", label: "Automatically install every major bump" },
          { id: "d", label: "Disable npm audit" },
        ],
        correct: ["a"],
        explanation:
          "Wide `^` / `*` plus install with no lock = floating supply chain. Lock + sensible pins.",
      },
      {
        id: "q3",
        question: "npm audit (or equivalent) in Secure Vibe Coding…",
        options: [
          {
            id: "a",
            label: "Is a regular guardrail: read, fix or justify, rather than blindly ignoring it",
          },
          { id: "b", label: "Is useless once the code compiles" },
          { id: "c", label: "Replaces secret review" },
          { id: "d", label: "Should be disabled in CI to ship faster" },
        ],
        correct: ["a"],
        explanation:
          "Not magic, but it flags known CVEs. CI gate + triage rather than blind `audit --force`.",
      },
      {
        id: "q4",
        question: "Facing a generated package.json with 40 « just in case » deps…",
        options: [
          {
            id: "a",
            label: "Clean it up: remove unused, verify existence, pin, audit",
          },
          { id: "b", label: "Install everything and skip reading" },
          { id: "c", label: "Add more deps to « stay modern »" },
          { id: "d", label: "Commit node_modules to freeze it" },
        ],
        correct: ["a"],
        explanation:
          "Attack surface = every dep. Fewer deps = less risk and less maintenance.",
      },
      {
        id: "q5",
        question: "Typosquatting in the supply chain is…",
        options: [
          {
            id: "a",
            label: "Publishing a package with a name close to a real one (e.g. lodahs) to trap installs",
          },
          { id: "b", label: "Only using verified @org scopes" },
          { id: "c", label: "A TypeScript error type" },
          { id: "d", label: "A good monorepo naming practice" },
        ],
        correct: ["a"],
        explanation:
          "AI inventing a name close to a real package is a vector. Check registry + maintainers.",
      },
    ],
  },
};
