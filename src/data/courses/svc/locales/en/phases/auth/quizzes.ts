import type { Quiz } from "@/types";

export const authQuizzes: Record<"m01" | "m02" | "m03" | "m04", Quiz> = {
  m01: {
    id: "svc-auth-quiz-m01",
    title: "Auth models: check your reading",
    questions: [
      {
        id: "q1",
        question: "Why avoid rolling your own authentication in production?",
        options: [
          { id: "a", label: "Because it is illegal everywhere" },
          {
            id: "b",
            label: "Details (hashing, sessions, reset…) are easy to get wrong; a proven provider lowers risk",
          },
          { id: "c", label: "Because React forbids it" },
          { id: "d", label: "Because Git refuses passwords" },
        ],
        correct: ["b"],
        explanation:
          "AI often generates auth that looks plausible but is fragile. A mature third-party service plus your audit is safer.",
      },
      {
        id: "q2",
        question: "A JWT is mainly…",
        options: [
          {
            id: "a",
            label: "A signed token you can verify; where you store it and when it expires matter a lot",
          },
          { id: "b", label: "A CSS file" },
          { id: "c", label: "A database" },
          { id: "d", label: "A hosting provider" },
        ],
        correct: ["a"],
        explanation:
          "The danger is not JWT itself: it is putting it anywhere with no expiration and no thought.",
      },
      {
        id: "q3",
        question: "A magic link is…",
        options: [
          {
            id: "a",
            label: "Signing in via a link sent by email, often with no password",
          },
          { id: "b", label: "A CSS spell" },
          { id: "c", label: "A Stripe key" },
          { id: "d", label: "A Git commit" },
        ],
        correct: ["a"],
        explanation:
          "Useful to reduce friction. The link should be single-use or tightly limited and short-lived.",
      },
      {
        id: "q4",
        question: "OAuth / sign-in with an existing account is mainly for…",
        options: [
          {
            id: "a",
            label: "Letting users sign in with Google, Microsoft, and similar providers",
          },
          { id: "b", label: "Replacing HTTPS" },
          { id: "c", label: "Removing the database" },
          { id: "d", label: "Disabling tests" },
        ],
        correct: ["a"],
        explanation:
          "Common in B2B (work accounts) and consumer apps.",
      },
      {
        id: "q5",
        question: "What is a classic trap in AI-generated auth code?",
        options: [
          {
            id: "a",
            label: "JWT in localStorage with no thought, or fragile homegrown auth",
          },
          { id: "b", label: "Using HTTPS" },
          { id: "c", label: "Checking the session on the server" },
          { id: "d", label: "Choosing a third-party provider" },
        ],
        correct: ["a"],
        explanation:
          "AI often picks the shortest path, not the safest one.",
      },
    ],
  },

  m02: {
    id: "svc-auth-quiz-m02",
    title: "Wire a provider: check your reading",
    questions: [
      {
        id: "q1",
        question: "In sign-up → session, who has the final say on « is this user signed in? » for a sensitive action?",
        options: [
          { id: "a", label: "The server (session / token verification)" },
          { id: "b", label: "CSS alone" },
          { id: "c", label: "localStorage alone" },
          { id: "d", label: "The README" },
        ],
        correct: ["a"],
        explanation: "The client displays. The server authorizes.",
      },
      {
        id: "q2",
        question: "What is the client SDK from a provider mainly for?",
        options: [
          { id: "a", label: "Forms and sign-in UI state" },
          { id: "b", label: "Replacing all server verification" },
          { id: "c", label: "Storing secret keys in the browser" },
          { id: "d", label: "Disabling HTTPS" },
        ],
        correct: ["a"],
        explanation: "UI comfort. Secrets and rights stay on the server.",
      },
      {
        id: "q3",
        question: "Hiding the Admin menu when !user…",
        options: [
          { id: "a", label: "Is enough to protect /api/admin" },
          {
            id: "b",
            label: "Does not stop calling the API directly if it is not protected",
          },
          { id: "c", label: "Replaces roles" },
          { id: "d", label: "Is forbidden in React" },
        ],
        correct: ["b"],
        explanation: "The UI is not a trust boundary.",
      },
      {
        id: "q4",
        question: "Where do provider secret keys belong?",
        options: [
          { id: "a", label: "Server-side / host environment variables" },
          { id: "b", label: "In CSS" },
          { id: "c", label: "Hard-coded in a public React component" },
          { id: "d", label: "In the site URL" },
        ],
        correct: ["a"],
        explanation:
          "Same as the architecture phase: nothing secret in the browser bundle.",
      },
      {
        id: "q5",
        question: "Clerk, Auth.js, Supabase Auth…",
        options: [
          {
            id: "a",
            label: "Are examples of third-party auth providers / stacks to prefer over homegrown auth",
          },
          { id: "b", label: "Are SQL databases" },
          { id: "c", label: "Replace the need for an audit" },
          { id: "d", label: "Forbid roles" },
        ],
        correct: ["a"],
        explanation: "Pick a provider, frame the integration, audit it.",
      },
    ],
  },

  m03: {
    id: "svc-auth-quiz-m03",
    title: "Authorization: check your reading",
    questions: [
      {
        id: "q1",
        question: "Authentication vs authorization?",
        options: [
          { id: "a", label: "Who are you? vs what are you allowed to do / see?" },
          { id: "b", label: "CSS vs HTML" },
          { id: "c", label: "Build vs preview" },
          { id: "d", label: "Git vs npm" },
        ],
        correct: ["a"],
        explanation: "Being signed in does not grant every right.",
      },
      {
        id: "q2",
        question: "An IDOR (insecure direct object reference) is…",
        options: [
          {
            id: "a",
            label: "Reaching someone else's resource by changing the id (URL / API) with no access check",
          },
          { id: "b", label: "A font family" },
          { id: "c", label: "A hosting provider" },
          { id: "d", label: "A unit test" },
        ],
        correct: ["a"],
        explanation:
          "Classic as soon as numeric or predictable ids exist with no ownership check.",
      },
      {
        id: "q3",
        question: "Database access rules (RLS / policies) are for…",
        options: [
          {
            id: "a",
            label: "Limiting which rows a role / user can read or write",
          },
          { id: "b", label: "Choosing theme colors" },
          { id: "c", label: "Replacing HTTPS" },
          { id: "d", label: "Generating magic JWTs" },
        ],
        correct: ["a"],
        explanation:
          "RLS (row level security) is a useful safety net on top of API checks.",
      },
      {
        id: "q4",
        question: "Why is client-side access control never enough?",
        options: [
          { id: "a", label: "Because the client can be changed or bypassed" },
          { id: "b", label: "Because TypeScript forbids it" },
          { id: "c", label: "Because Git forces the server" },
          { id: "d", label: "Because providers refuse it" },
        ],
        correct: ["a"],
        explanation: "The trust boundary is the server (and database).",
      },
      {
        id: "q5",
        question: "« Hard to guess » ids with no access control…",
        options: [
          { id: "a", label: "Replace real authorization" },
          { id: "b", label: "Are not enough: security through obscurity" },
          { id: "c", label: "Are required by OAuth" },
          { id: "d", label: "Fix IDOR automatically" },
        ],
        correct: ["b"],
        explanation: "Always verify the right to access that object.",
      },
    ],
  },

  m04: {
    id: "svc-auth-quiz-m04",
    title: "Sensitive flows: check your reading",
    questions: [
      {
        id: "q1",
        question: "A password reset token should be…",
        options: [
          {
            id: "a",
            label: "Single-use (or very limited) and short-lived",
          },
          { id: "b", label: "Reusable for weeks" },
          { id: "c", label: "Published in the README" },
          { id: "d", label: "Stored in plain text in the front end" },
        ],
        correct: ["a"],
        explanation:
          "Otherwise someone who intercepts the link keeps durable access.",
      },
      {
        id: "q2",
        question: "Email verification is mainly for…",
        options: [
          {
            id: "a",
            label: "Confirming the inbox exists / belongs to the user before sensitive actions",
          },
          { id: "b", label: "Replacing passwords forever" },
          { id: "c", label: "Disabling HTTPS" },
          { id: "d", label: "Coloring the logo" },
        ],
        correct: ["a"],
        explanation:
          "Reduces fake accounts and some account takeover paths.",
      },
      {
        id: "q3",
        question: "Multi-device session revocation is…",
        options: [
          {
            id: "a",
            label: "Being able to sign out one device / all sessions (e.g. lost phone)",
          },
          { id: "b", label: "Deleting the database" },
          { id: "c", label: "Changing the theme" },
          { id: "d", label: "Disabling tests" },
        ],
        correct: ["a"],
        explanation: "Without revocation, a stolen session lives too long.",
      },
      {
        id: "q4",
        question: "A production auth checklist should include…",
        options: [
          {
            id: "a",
            label: "Provider, server protections, sensitive flows, access policy",
          },
          { id: "b", label: "Font choice only" },
          { id: "c", label: "Animations only" },
          { id: "d", label: "CORS * only" },
        ],
        correct: ["a"],
        explanation: "This is the safety net before Ship.",
      },
      {
        id: "q5",
        question: "Trusting localStorage.role === 'admin'…",
        options: [
          { id: "a", label: "Is solid server protection" },
          {
            id: "b",
            label: "Is bypassable: it is not real authorization",
          },
          { id: "c", label: "Is required by all providers" },
          { id: "d", label: "Replaces RLS" },
        ],
        correct: ["b"],
        explanation:
          "Anyone can edit localStorage. The server decides.",
      },
    ],
  },
};
