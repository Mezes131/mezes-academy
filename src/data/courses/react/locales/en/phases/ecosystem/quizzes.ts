import type { Quiz } from "@/types";

export const ecosystemQuizzes = {
  m22: {
    id: "react-ecosystem-quiz-m22",
    title: "Quiz: Next.js App Router",
    questions: [
      {
        id: "q1",
        question: "In App Router (Next.js 14), by default a component defined in the `app/` folder is:",
        options: [
          { id: "a", label: "A Client Component" },
          { id: "b", label: "A Server Component" },
          { id: "c", label: "Both at once" },
        ],
        correct: ["b"],
        explanation:
          "All components in `app/` are Server Components by default. Add `'use client'` at the top of the file to switch to a Client Component.",
      },
      {
        id: "q2",
        question: "What does adding the `'use client'` directive at the top of a file do?",
        options: [
          { id: "a", label: "The component and its descendants become Client Components (hydration, hooks available)" },
          { id: "b", label: "The component is rendered only on the server" },
          { id: "c", label: "The component can no longer fetch data" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "What are Server Actions used for?",
        options: [
          { id: "a", label: "Calling server code (DB mutations, sending emails, etc.) directly from a form or handler, without creating an API route" },
          { id: "b", label: "Running JavaScript in the browser faster" },
          { id: "c", label: "Replacing Redux" },
        ],
        correct: ["a"],
      },
      {
        id: "q4",
        question: "What is the purpose of the `loading.tsx` file in a route segment?",
        options: [
          { id: "a", label: "Defining the page favicon" },
          { id: "b", label: "Automatically showing a loading state while the segment is streamed, via Suspense" },
          { id: "c", label: "Declaring SEO metadata" },
        ],
        correct: ["b"],
      },
    ],
  },

  m23: {
    id: "react-ecosystem-quiz-m23",
    title: "Quiz: Global state",
    questions: [
      {
        id: "q1",
        question: "Why do many modern teams choose Zustand over Redux?",
        options: [
          { id: "a", label: "Zustand is faster at runtime" },
          { id: "b", label: "Zustand has a minimal API (1 hook), no boilerplate, no required Provider" },
          { id: "c", label: "Redux is no longer maintained" },
        ],
        correct: ["b"],
      },
      {
        id: "q2",
        question: "What is the fundamental difference between Zustand and TanStack Query?",
        options: [
          { id: "a", label: "None — they are equivalent alternatives" },
          { id: "b", label: "Zustand manages CLIENT state (UI); TanStack Query manages SERVER state (cache, refetch, invalidation)" },
          { id: "c", label: "Zustand is for small projects, TanStack for large ones" },
        ],
        correct: ["b"],
        explanation:
          "Modern rule: separate client state from server state. Zustand/Jotai for UI state, TanStack Query for remote data.",
      },
      {
        id: "q3",
        question: "Which bad practice should you absolutely avoid with a global store?",
        options: [
          { id: "a", label: "Putting everything in it (forms, modal state, everything)" },
          { id: "b", label: "Only putting what is truly shared between distant components" },
          { id: "c", label: "Splitting the store into thematic slices" },
        ],
        correct: ["a"],
        explanation:
          "Local state remains the default choice. Only lift to global what needs to be shared or persisted.",
      },
    ],
  },

  m24: {
    id: "react-ecosystem-quiz-m24",
    title: "Quiz: Authentication",
    questions: [
      {
        id: "q1",
        question: "Essential difference between a session (cookie) and a JWT stored on the client?",
        options: [
          { id: "a", label: "A session relies on server-side state (revocable); a JWT is self-contained (lighter but nearly impossible to revoke before expiry)" },
          { id: "b", label: "JWT is always more secure" },
          { id: "c", label: "Sessions are obsolete" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "Where should you store an authentication token in the browser?",
        options: [
          { id: "a", label: "localStorage: convenient and shared across all tabs" },
          { id: "b", label: "Cookie with `httpOnly` + `Secure` + `SameSite=Lax`: not accessible from JS, so protected against XSS" },
          { id: "c", label: "In a global `window.token` variable" },
        ],
        correct: ["b"],
        explanation:
          "localStorage is readable by any script (XSS risk). httpOnly cookies are the standard for storing session tokens.",
      },
      {
        id: "q3",
        question: "What does a typical Next.js authentication middleware do?",
        options: [
          { id: "a", label: "It intercepts requests, checks the session/cookie, and redirects to /login if needed" },
          { id: "b", label: "It automatically encrypts responses" },
          { id: "c", label: "It automatically hashes passwords with bcrypt" },
        ],
        correct: ["a"],
      },
    ],
  },

  m25: {
    id: "react-ecosystem-quiz-m25",
    title: "Quiz: Databases & ORM",
    questions: [
      {
        id: "q1",
        question: "What does an ORM like Prisma provide compared to raw SQL queries?",
        options: [
          { id: "a", label: "An auto-generated typed client from the schema, versioned migrations, and an ergonomic API" },
          { id: "b", label: "Better performance than native SQL" },
          { id: "c", label: "Absolute security against all attacks" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "Prisma vs Drizzle — what is the main trade-off?",
        options: [
          { id: "a", label: "Prisma = high-level DSL (.prisma schema); Drizzle = close to SQL, type-safe, no abstract runtime" },
          { id: "b", label: "No notable difference" },
          { id: "c", label: "Drizzle does not support PostgreSQL" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "True or false: using an ORM completely removes the need to learn SQL.",
        options: [
          { id: "a", label: "True" },
          { id: "b", label: "False: understanding indexes, joins, and execution plans is still essential for diagnosing slowness" },
        ],
        correct: ["b"],
      },
    ],
  },

  m26: {
    id: "react-ecosystem-quiz-m26",
    title: "Quiz: Testing",
    questions: [
      {
        id: "q1",
        question: "What is the philosophy of React Testing Library?",
        options: [
          { id: "a", label: "Testing internal implementation (state, private methods)" },
          { id: "b", label: "Testing from the user's perspective (what they see, what they click), via role or text queries" },
          { id: "c", label: "Generating HTML snapshots without assertions" },
        ],
        correct: ["b"],
      },
      {
        id: "q2",
        question: "Which test pyramid is generally recommended?",
        options: [
          { id: "a", label: "Lots of e2e, few unit tests" },
          { id: "b", label: "Lots of fast unit/integration tests, a few e2e on critical paths" },
          { id: "c", label: "Only e2e tests" },
        ],
        correct: ["b"],
      },
      {
        id: "q3",
        question: "In a Vitest + RTL test, to wait for an element to appear after an async fetch, you use:",
        options: [
          { id: "a", label: "getByText: it waits automatically" },
          { id: "b", label: "findByText: async version, retries until found or timeout" },
          { id: "c", label: "queryByText: only to confirm absence" },
        ],
        correct: ["b"],
      },
    ],
  },

  m27: {
    id: "react-ecosystem-quiz-m27",
    title: "Quiz: Performance & SEO",
    questions: [
      {
        id: "q1",
        question: "Among the Core Web Vitals, which one measures visual stability (layout shift)?",
        options: [
          { id: "a", label: "LCP (Largest Contentful Paint)" },
          { id: "b", label: "INP (Interaction to Next Paint)" },
          { id: "c", label: "CLS (Cumulative Layout Shift)" },
        ],
        correct: ["c"],
      },
      {
        id: "q2",
        question: "Main advantage of `next/image`?",
        options: [
          { id: "a", label: "Automatic optimization (modern formats, responsive, lazy-loading, fixed dimensions against CLS)" },
          { id: "b", label: "It automatically injects a watermark" },
          { id: "c", label: "It replaces all images with SVG" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "Which file / API do you use in App Router to declare a page's SEO metadata?",
        options: [
          { id: "a", label: "A `metadata.json` file in `public/`" },
          { id: "b", label: "The `metadata` export (object or async `generateMetadata`) from `page.tsx` or `layout.tsx`" },
          { id: "c", label: "A `<Head>` component imported from `next/head`" },
        ],
        correct: ["b"],
        explanation:
          "In App Router, you no longer use `next/head`. Export a `metadata` object (or a `generateMetadata` function) from each segment.",
      },
    ],
  },
} satisfies Record<string, Quiz>;
