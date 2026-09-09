import type { Quiz } from "@/types";

export const auditQualiteQuizzes: Record<"m01" | "m02" | "m03" | "m04", Quiz> = {
  m01: {
    id: "svc-audit-qualite-quiz-m01",
    title: "Product performance: check your reading",
    questions: [
      {
        id: "q1",
        question: "LCP (Largest Contentful Paint) mainly measures…",
        options: [
          {
            id: "a",
            label: "When the largest visible page element becomes useful on screen",
          },
          { id: "b", label: "Total TypeScript compile time" },
          { id: "c", label: "Number of CSS lines" },
          { id: "d", label: "DNS latency only" },
        ],
        correct: ["a"],
        explanation:
          "LCP = perception that « the page is here ». Hero images and heavy text blocks are classic optimization targets.",
      },
      {
        id: "q2",
        question: "TBT (Total Blocking Time) indicates…",
        options: [
          {
            id: "a",
            label: "How long the main thread is blocked and prevents interaction",
          },
          { id: "b", label: "npm lockfile size" },
          { id: "c", label: "Number of unit tests" },
          { id: "d", label: "Delay before the first marketing email" },
        ],
        correct: ["a"],
        explanation:
          "Heavy JS or long tasks → high TBT. Budget JS and split critical work.",
      },
      {
        id: "q3",
        question: "A performance budget is used to…",
        options: [
          {
            id: "a",
            label: "Set measurable thresholds (LCP, weight, JS) and enforce them",
          },
          { id: "b", label: "Replace Lighthouse with subjective feel" },
          { id: "c", label: "Allow any uncompressed 4K image" },
          { id: "d", label: "Disable Core Web Vitals in production" },
        ],
        correct: ["a"],
        explanation:
          "Without a budget, every « add a lib » prompt drifts the product. Thresholds + CI gate / review.",
      },
      {
        id: "q4",
        question: "Reading a network waterfall mainly helps you…",
        options: [
          {
            id: "a",
            label: "See order, size, and blocking of resources (images, JS, CSS)",
          },
          { id: "b", label: "Automatically encrypt assets" },
          { id: "c", label: "Replace accessibility testing" },
          { id: "d", label: "Generate pricing" },
        ],
        correct: ["a"],
        explanation:
          "Waterfall = diagnosis: blocking request, heavy image, JS dependency chain.",
      },
      {
        id: "q5",
        question: "For images, a minimal shippable practice includes…",
        options: [
          {
            id: "a",
            label: "Right format, correct dimensions, lazy-load off LCP, compression",
          },
          { id: "b", label: "4000px PNG for every icon" },
          { id: "c", label: "Load every above-the-fold image with no priority" },
          { id: "d", label: "Ignore weight as long as the design « feels premium »" },
        ],
        correct: ["a"],
        explanation:
          "Images often drive LCP. WebP/AVIF, srcset, lazy off critical path, budgeted weight.",
      },
    ],
  },

  m02: {
    id: "svc-audit-qualite-quiz-m02",
    title: "Shippable design: check your reading",
    questions: [
      {
        id: "q1",
        question: "Visual hierarchy means…",
        options: [
          {
            id: "a",
            label: "Guiding the eye: title → message → action, with no competing weight",
          },
          { id: "b", label: "Putting eight primary colors on every screen" },
          { id: "c", label: "Hiding the primary CTA" },
          { id: "d", label: "Using 10px text only" },
        ],
        correct: ["a"],
        explanation:
          "A shippable screen has a clear reading path. Too many « important » blocks = no priority.",
      },
      {
        id: "q2",
        question: "A single CTA on a critical screen helps…",
        options: [
          {
            id: "a",
            label: "Avoid competing actions and clarify the next step",
          },
          { id: "b", label: "Multiply buttons « for choice »" },
          { id: "c", label: "Replace error states" },
          { id: "d", label: "Disable the keyboard" },
        ],
        correct: ["a"],
        explanation:
          "Three competing CTAs dilute conversion. One primary action; everything else secondary.",
      },
      {
        id: "q3",
        question: "Empty, error, and loading states…",
        options: [
          {
            id: "a",
            label: "Must be designed: message, possible action, no dead screen",
          },
          { id: "b", label: "Can stay blank « we'll see later »" },
          { id: "c", label: "Only matter for native desktop apps" },
          { id: "d", label: "Replace visual hierarchy" },
        ],
        correct: ["a"],
        explanation:
          "AI often ships the happy path only. Empty / error / loading = design-baseline checklist.",
      },
      {
        id: "q4",
        question: "A classic AI-generated design trap is…",
        options: [
          {
            id: "a",
            label: "A screen with no empty state and several equal-weight CTAs",
          },
          { id: "b", label: "One clear CTA and covered states" },
          { id: "c", label: "WCAG contrast respected everywhere" },
          { id: "d", label: "Visible focus on every control" },
        ],
        correct: ["a"],
        explanation:
          "Syllabus pitfalls: no empty state, three competing CTAs. Fix those before ship.",
      },
      {
        id: "q5",
        question: "The design-baseline checklist on a critical screen…",
        options: [
          {
            id: "a",
            label: "Structures the review: hierarchy, CTA, states, then tracked fixes",
          },
          { id: "b", label: "Is limited to changing a random color" },
          { id: "c", label: "Replaces Lighthouse and a11y" },
          { id: "d", label: "Is optional if the code compiles" },
        ],
        correct: ["a"],
        explanation:
          "Structured review > subjective opinion. Run the checklist, fix, document.",
      },
    ],
  },

  m03: {
    id: "svc-audit-qualite-quiz-m03",
    title: "Accessibility: check your reading",
    questions: [
      {
        id: "q1",
        question: "Insufficient contrast…",
        options: [
          {
            id: "a",
            label: "Makes text unreadable for some users (WCAG)",
          },
          { id: "b", label: "Always improves a « premium » look" },
          { id: "c", label: "Only affects SEO bots" },
          { id: "d", label: "Is fixed automatically by React" },
        ],
        correct: ["a"],
        explanation:
          "Pale gray text on light backgrounds is a common generated-design a11y fail.",
      },
      {
        id: "q2",
        question: "Keyboard navigation must allow you to…",
        options: [
          {
            id: "a",
            label: "Reach and activate every interactive control using the keyboard alone",
          },
          { id: "b", label: "Skip menus and modals" },
          { id: "c", label: "Use the trackpad only" },
          { id: "d", label: "Disable Tab « for style »" },
        ],
        correct: ["a"],
        explanation:
          "Tab / Enter / Escape on the critical flow. Traps: clickable divs with no role or focus.",
      },
      {
        id: "q3",
        question: "Labeling a control correctly means…",
        options: [
          {
            id: "a",
            label: "Associating an accessible name (label, aria-label…) with the field or button",
          },
          { id: "b", label: "Using a placeholder as the only « label »" },
          { id: "c", label: "Relying on an icon alone with no accessible name" },
          { id: "d", label: "Letting the screen reader invent the name" },
        ],
        correct: ["a"],
        explanation:
          "Placeholder ≠ label. Icon-only button with no accessible name blocks screen readers.",
      },
      {
        id: "q4",
        question: "Focus management is especially critical…",
        options: [
          {
            id: "a",
            label: "When opening/closing modals, drawers, and multi-step flows",
          },
          { id: "b", label: "Only on 404 pages" },
          { id: "c", label: "When you disable outline:none everywhere" },
          { id: "d", label: "If you never use the keyboard" },
        ],
        correct: ["a"],
        explanation:
          "Trapped or lost focus = broken flow. Restore focus, keep it visible, trap focus in modals.",
      },
      {
        id: "q5",
        question: "A targeted a11y audit on a flow…",
        options: [
          {
            id: "a",
            label: "Combines checklist, keyboard, and ideally a screen reader, then fixes",
          },
          { id: "b", label: "Is limited to running Lighthouse once with no fixes" },
          { id: "c", label: "Ignores contrast if the brand guide asks for it" },
          { id: "d", label: "Replaces performance testing" },
        ],
        correct: ["a"],
        explanation:
          "Tools + real flow. Fix blockers before declaring the baseline passed.",
      },
    ],
  },

  m04: {
    id: "svc-audit-qualite-quiz-m04",
    title: "Revenue flow UX: check your reading",
    questions: [
      {
        id: "q1",
        question: "On checkout, unnecessary friction is…",
        options: [
          {
            id: "a",
            label: "Steps, fields, or doubts that do not help users pay with confidence",
          },
          { id: "b", label: "Security cues and a clear recap" },
          { id: "c", label: "A single well-labeled « Pay » CTA" },
          { id: "d", label: "Useful confirmation emails" },
        ],
        correct: ["a"],
        explanation:
          "Forced account too early, redundant fields, price ambiguity = abandonment. Audit every step.",
      },
      {
        id: "q2",
        question: "Trust emails around payment…",
        options: [
          {
            id: "a",
            label: "Confirm the purchase, reassure, and give a clear next step (access, support)",
          },
          { id: "b", label: "Can be missing if the webhook « looks OK »" },
          { id: "c", label: "Must include the secret API key" },
          { id: "d", label: "Replace the in-app receipt" },
        ],
        correct: ["a"],
        explanation:
          "After payment: confirmation, product access, support contact. No radio silence.",
      },
      {
        id: "q3",
        question: "Streamlining the paid flow means…",
        options: [
          {
            id: "a",
            label: "Cutting friction while keeping clarity, trust, and minimal compliance",
          },
          { id: "b", label: "Removing every confirmation « to go faster »" },
          { id: "c", label: "Hiding the price until the last second with no recap" },
          { id: "d", label: "Forcing ten marketing fields before pay" },
        ],
        correct: ["a"],
        explanation:
          "Less friction ≠ less trust. Clear price, recoverable errors, justified steps.",
      },
      {
        id: "q4",
        question: "The P9 « before/after scores » deliverable requires…",
        options: [
          {
            id: "a",
            label: "Measure, fix, re-measure perf/design/a11y with tracked evidence",
          },
          { id: "b", label: "Claim « it's better » with no numbers" },
          { id: "c", label: "Only walk checkout with no checklists" },
          { id: "d", label: "Ignore a11y if Lighthouse perf is green" },
        ],
        correct: ["a"],
        explanation:
          "Project P9: checklists passed, before/after scores, fixes in commit/diff.",
      },
      {
        id: "q5",
        question: "Auditing the flow that pays…",
        options: [
          {
            id: "a",
            label: "Walk checkout + emails for conversion and trust, then fix",
          },
          { id: "b", label: "Trust the AI happy path and skip replaying it" },
          { id: "c", label: "Optimize only the marketing homepage" },
          { id: "d", label: "Disable payment error states" },
        ],
        correct: ["a"],
        explanation:
          "The revenue flow is the business core. Every friction found must go or be justified.",
      },
    ],
  },
};
