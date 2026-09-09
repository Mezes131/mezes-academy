import type { AuditExercise } from "@/types";

export const auditQualiteExercises: Record<
  "m01_1" | "m02_1" | "m03_1" | "m04_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-audit-qualite-ex-m01-1",
    format: "audit",
    title: "Lighthouse + action plan",
    instructions:
      "Check the correct findings for a Lighthouse audit and a prioritized action plan.",
    hints: [
      "LCP / TBT / waterfall / images = classic levers.",
      "A score with no prioritized action plan = incomplete audit.",
    ],
    scenario: `<p>Capstone product: mobile Lighthouse shows LCP 4.8s (3.2 MB hero PNG), TBT 650 ms (monolithic JS bundle), waterfall with blocking CSS and three non-subset fonts. The team wants « a green score » with no budget or prioritization.</p>
<p>Goal: identify what is true for measuring, budgeting, and planning fixes.</p>`,
    findings: [
      {
        id: "f1",
        label: "High LCP + unoptimized hero image = typical perf priority",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "High TBT signals a blocked main thread (heavy JS / long tasks)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "A prioritized action plan (impact × effort) is the deliverable after Lighthouse",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Setting budgets (LCP, weight, JS) prevents drift after every prompt",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "A Lighthouse score « by feel » with no waterfall or metrics is enough",
        correct: false,
      },
      {
        id: "f6",
        label: "Ignoring images and JS as long as the design looks good is a valid strategy",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Measure (Lighthouse + waterfall), budgets, then prioritized plan: images/LCP, JS/TBT, CSS/fonts. No magic score with no actions.</p>`,
  },

  m02_1: {
    id: "svc-audit-qualite-ex-m02-1",
    format: "audit",
    title: "Design review of a critical screen",
    instructions:
      "Audit the critical screen. Check the correct design-baseline findings.",
    hints: [
      "Hierarchy + single CTA + empty/error/loading states.",
      "Three equal-weight CTAs = fail.",
    ],
    scenario: `<p>Generated capstone dashboard: three primary buttons (« Upgrade », « Invite », « Explore ») same style. Empty list = blank area with no message. API error = unreadable technical toast. Loading = nothing (layout jump). Hierarchy: six competing H1s.</p>`,
    findings: [
      {
        id: "f1",
        label: "Several competing primary CTAs dilute the expected action",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "An empty state must explain and offer an action (not a blank)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Error and loading states are part of the design-baseline checklist",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Visual hierarchy (one dominant title, message, action) must be clear",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Shipping only the happy path while skipping empty/error/loading is acceptable",
        correct: false,
      },
      {
        id: "f6",
        label: "Six H1s and three primary CTAs improve clarity",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Fix: one primary CTA, designed empty/error/loading, tightened hierarchy. Then re-run the design checklist.</p>`,
  },

  m03_1: {
    id: "svc-audit-qualite-ex-m03-1",
    format: "audit",
    title: "Targeted a11y audit",
    instructions:
      "Check what is true for a keyboard + screen reader audit on a flow.",
    hints: [
      "Contrast, labels, focus, Tab order.",
      "outline:none everywhere = red flag.",
    ],
    scenario: `<p>« Create invoice » flow: gray text #AAA on #F5F5F5. Icon buttons with no accessible name. Confirmation modal steals focus then loses it on close. Global <code>outline: none</code>. A clickable <code>div</code> is not focusable. Lighthouse a11y at 92 but keyboard flow breaks at step 2.</p>`,
    findings: [
      {
        id: "f1",
        label: "Insufficient text/background contrast = WCAG fail to fix",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Controls with no label / accessible name block screen readers",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Focus must be managed when opening/closing modals",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "A high automated score does not replace keyboard + screen reader walkthrough",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Removing all focus outlines is good visual practice",
        correct: false,
      },
      {
        id: "f6",
        label: "A clickable div with no role or tabindex is enough for a11y",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Fix contrast, names, modal focus, visible focus, native elements or correct ARIA. Replay the keyboard flow until zero blockers.</p>`,
  },

  m04_projet: {
    id: "svc-audit-qualite-ex-m04-projet",
    format: "audit",
    title: "Project P9: Before/after scores",
    instructions:
      "Before closing P9, check what must be true for before/after scores and the paid flow.",
    hints: [
      "Perf / Design / A11y checklists + before/after measurements.",
      "Checkout friction removed; fixes tracked.",
    ],
    scenario: `<p>P9 goal: Perf / Design / A11y checklists passed on the capstone, with documented before/after scores. Current state: Lighthouse not re-run after « a few fixes », checkout with forced account + 12 fields, no receipt email, empty states still blank, an open keyboard blocker « for later », no commits listed in the report.</p>`,
    findings: [
      {
        id: "f1",
        label: "Scores measured before and after with demonstrated improvement",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Perf/design/a11y checklists passed per course thresholds",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Fixes tracked (commit or diff) in the deliverable",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Paid flow walked: unnecessary friction removed, trust emails in place",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Claiming « it's better » with no re-measure or checklist is enough",
        correct: false,
      },
      {
        id: "f6",
        label: "Leaving a keyboard blocker and blank empty states is OK to close P9",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>P9 = measure → fixes (perf, design, a11y, checkout) → re-measure + evidence. No close on intention alone.</p>`,
  },
};
