import type { ProgramPhase } from "@/types";
import { lesson, module, phase } from "./helpers";

/* ── P8: Security Audit (security-baseline checklist) ──────────── */

export const auditSecuritePhase: ProgramPhase = phase({
  slug: "audit-securite",
  title: "Security Audit",
  objective:
    "Apply the Security baseline checklist to the product. The 'Secure' core of the positioning.",
  modules: [
    module({
      id: "svc-audit-securite-m01",
      index: "01",
      title: "Secrets and configuration",
      subtitle: "Hardcoded secrets AI drops in without warning",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Detect hardcoded secrets in a repo",
        "Organize vaults and rotation",
        "Lock down .gitignore and .dockerignore",
      ],
      lessons: [
        lesson({
          id: "svc-audit-securite-m01-l1",
          title: "Hardcoded secrets",
          objective: "Spot secrets pasted by AI in code, config, and Docker.",
          concepts: ["hardcoded secrets", "secret scanning", ".gitignore/.dockerignore"],
          pitfalls: ["API key in copied example code", "secret in git history"],
        }),
        lesson({
          id: "svc-audit-securite-m01-l2",
          title: "Vaults and rotation",
          objective: "Store and rotate secrets properly.",
          concepts: ["secret vaults", "rotation", "least privilege"],
        }),
      ],
      exercises: [
        {
          title: "Find and fix five leaks",
          kind: "audit",
          brief:
            "Audit a rigged repo: find five secret leaks and fix them (code + history + rotation).",
        },
      ],
    }),
    module({
      id: "svc-audit-securite-m02",
      index: "02",
      title: "User input and injections",
      subtitle: "SQL, NoSQL, commands, XSS, uploads",
      duration: "50 min",
      difficulty: "intermediate",
      objectives: [
        "Validate at boundaries systematically",
        "Detect SQL/NoSQL/command injections",
        "Audit front-end XSS",
      ],
      lessons: [
        lesson({
          id: "svc-audit-securite-m02-l1",
          title: "Injections",
          objective: "Understand and block SQL/NoSQL/command injection.",
          concepts: ["SQL injection", "NoSQL injection", "command injection", "parameterized queries"],
        }),
        lesson({
          id: "svc-audit-securite-m02-l2",
          title: "XSS and uploads",
          objective: "Audit HTML output and incoming files.",
          concepts: ["XSS", "dangerouslySetInnerHTML", "upload validation"],
          pitfalls: ["unescaped HTML rendered as-is", "upload without type checks"],
        }),
      ],
      exercises: [
        {
          title: "Exploit and fix an injection",
          kind: "audit",
          brief:
            "Exploit an injection on a training app, then fix it with proof.",
        },
        {
          title: "Audit an XSS component",
          kind: "audit",
          brief:
            "Audit a React component using dangerouslySetInnerHTML and secure it.",
        },
      ],
    }),
    module({
      id: "svc-audit-securite-m03",
      index: "03",
      title: "AuthZ and API surfaces",
      subtitle: "IDOR, unprotected routes, exposed webhooks, RLS",
      duration: "50 min",
      difficulty: "intermediate",
      objectives: [
        "Map exposed surfaces",
        "Check every route for IDOR",
        "Audit RLS and webhooks",
      ],
      lessons: [
        lesson({
          id: "svc-audit-securite-m03-l1",
          title: "Surfaces and routes",
          objective: "List everything accessible and verify its protection.",
          concepts: ["route mapping", "IDOR", "unprotected routes"],
        }),
        lesson({
          id: "svc-audit-securite-m03-l2",
          title: "Webhooks and RLS",
          objective: "Audit inherently public endpoints and policies.",
          concepts: ["exposed webhooks", "RLS", "policies"],
        }),
      ],
      exercises: [
        {
          title: "Access audit of the current app",
          kind: "audit",
          brief:
            "Audit capstone product access: route × role matrix with verdicts and fixes.",
        },
      ],
    }),
    module({
      id: "svc-audit-securite-m04",
      index: "04",
      title: "Dependencies and supply chain",
      subtitle: "Unnecessary or hallucinated deps, pin, npm audit",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Detect unnecessary or hallucinated dependencies",
        "Pin versions and audit regularly",
      ],
      lessons: [
        lesson({
          id: "svc-audit-securite-m04-l1",
          title: "Generated code supply chain",
          objective: "Clean up dependencies a prompt introduced.",
          concepts: ["hallucinated deps", "version pinning", "npm audit", "typosquatting"],
          pitfalls: ["installing an AI-invented library", "overly wide version ranges"],
        }),
      ],
      exercises: [
        {
          title: "Clean up package.json",
          kind: "audit",
          brief:
            "Audit and clean up a generated project's package.json: remove, pin, fix.",
        },
      ],
    }),
  ],
  project: {
    title: "Project P8: Security baseline report",
    deliverable:
      "The capstone product's Security baseline report: evidence, fixes applied, remaining items.",
    assessment: [
      "Full security-baseline checklist passed",
      "Every finding has evidence and a fix",
      "No open critical vulnerabilities",
    ],
  },
});

/* ── P9: Quality Audit (perf / design / a11y) ──────────────────── */

export const auditQualitePhase: ProgramPhase = phase({
  slug: "audit-qualite",
  title: "Quality Audit",
  objective:
    "Apply the Performance, Design, and Accessibility checklists to the product.",
  modules: [
    module({
      id: "svc-audit-qualite-m01",
      index: "01",
      title: "Product performance",
      subtitle: "LCP, TBT, budgets, images, waterfalls",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Measure LCP/TBT and read a waterfall",
        "Set performance budgets",
        "Optimize images",
      ],
      lessons: [
        lesson({
          id: "svc-audit-qualite-m01-l1",
          title: "Measure and budget",
          objective: "Use Lighthouse and set realistic budgets.",
          concepts: ["LCP", "TBT", "perf budgets", "waterfalls", "images"],
        }),
      ],
      exercises: [
        {
          title: "Lighthouse + action plan",
          kind: "audit",
          brief:
            "Run Lighthouse on the product and produce a prioritized action plan.",
        },
      ],
    }),
    module({
      id: "svc-audit-qualite-m02",
      index: "02",
      title: "Shippable design",
      subtitle: "Hierarchy, single CTA, empty/error/loading states",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Verify visual hierarchy",
        "Ensure empty, error, and loading states",
      ],
      lessons: [
        lesson({
          id: "svc-audit-qualite-m02-l1",
          title: "Structured design review",
          objective: "Audit a screen with the design-baseline checklist.",
          concepts: ["visual hierarchy", "single CTA", "empty/error/loading states"],
          pitfalls: ["screen with no empty state", "three competing CTAs"],
        }),
      ],
      exercises: [
        {
          title: "Design review of a critical screen",
          kind: "audit",
          brief:
            "Audit the product's most critical screen with the design checklist and fix issues.",
        },
      ],
    }),
    module({
      id: "svc-audit-qualite-m03",
      index: "03",
      title: "Accessibility",
      subtitle: "Contrast, keyboard, labels, focus",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Verify contrast and keyboard navigation",
        "Label controls correctly",
        "Manage focus",
      ],
      lessons: [
        lesson({
          id: "svc-audit-qualite-m03-l1",
          title: "Basic a11y audit",
          objective: "Run the accessibility-baseline checklist on a user flow.",
          concepts: ["contrast", "keyboard navigation", "labels", "focus management"],
        }),
      ],
      exercises: [
        {
          title: "Targeted a11y audit",
          kind: "audit",
          brief:
            "Audit a full flow with keyboard + screen reader and fix blockers.",
        },
      ],
    }),
    module({
      id: "svc-audit-qualite-m04",
      index: "04",
      title: "Revenue flow UX",
      subtitle: "Checkout, trust emails, unnecessary friction",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Streamline the payment flow",
        "Build trust at critical moments",
      ],
      lessons: [
        lesson({
          id: "svc-audit-qualite-m04-l1",
          title: "The flow that pays",
          objective: "Audit checkout and emails for conversion + trust.",
          concepts: ["checkout", "trust emails", "unnecessary friction"],
        }),
      ],
      exercises: [
        {
          title: "Frictionless paid flow",
          kind: "audit",
          brief:
            "Walk through the full paid flow and eliminate every friction point found.",
        },
      ],
    }),
  ],
  project: {
    title: "Project P9: Before/after scores",
    deliverable:
      "Perf / Design / A11y checklists passed on the capstone, with documented before/after scores.",
    assessment: [
      "Scores measured before and after, improvement demonstrated",
      "Perf/design/a11y checklists passed per published thresholds",
      "Fixes tracked (commit or diff)",
    ],
  },
});

/* ── P10: Hosting & deployment ────────────────────────────── */

export const hebergementPhase: ProgramPhase = phase({
  slug: "hebergement",
  title: "Hosting & deployment",
  objective: "Get the product live for real.",
  modules: [
    module({
      id: "svc-hebergement-m01",
      index: "01",
      title: "Choose where to host",
      subtitle: "Vercel, Fly, Railway, VPS: real criteria",
      duration: "30 min",
      difficulty: "intermediate",
      objectives: [
        "Compare platforms by cost, ops, and cold start",
        "Choose based on the product, not trends",
      ],
      lessons: [
        lesson({
          id: "svc-hebergement-m01-l1",
          title: "Hosting landscape",
          objective: "Evaluate Vercel / Fly / Railway / VPS on concrete criteria.",
          concepts: ["PaaS vs VPS", "cost", "ops burden", "cold start"],
        }),
      ],
      exercises: [
        {
          title: "Choose for three products",
          kind: "synthesis",
          brief:
            "Choose and justify hosting for three different products.",
        },
      ],
    }),
    module({
      id: "svc-hebergement-m02",
      index: "02",
      title: "Environments",
      subtitle: "Local, preview, prod, and runtime secrets",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Separate local / preview / prod",
        "Manage runtime secrets and build config",
      ],
      lessons: [
        lesson({
          id: "svc-hebergement-m02-l1",
          title: "Three environments",
          objective: "Configure local/preview/prod without cross-leakage.",
          concepts: ["environments", "runtime secrets", "Vite build vs runtime config"],
        }),
      ],
      exercises: [
        {
          title: "Environment matrix",
          kind: "synthesis",
          brief:
            "Build the full product variable matrix per environment.",
        },
      ],
    }),
    module({
      id: "svc-hebergement-m03",
      index: "03",
      title: "Minimal CI/CD",
      subtitle: "Build, test, deploy, rollback — and block on audit",
      duration: "45 min",
      difficulty: "intermediate",
      objectives: [
        "Set up a build/test/deploy pipeline",
        "Block deployment on failed lint or audit",
        "Know how to roll back",
      ],
      lessons: [
        lesson({
          id: "svc-hebergement-m03-l1",
          title: "Minimal pipeline",
          objective: "Automate build, tests, and deployment with guardrails.",
          concepts: ["CI/CD", "lint/audit gates", "rollback"],
          pitfalls: ["deploying without gates", "no rollback strategy"],
        }),
      ],
      exercises: [
        {
          title: "Pipeline that refuses",
          kind: "guided",
          brief:
            "Configure a pipeline that refuses to deploy if a secret or lint failure is detected.",
        },
      ],
    }),
    module({
      id: "svc-hebergement-m04",
      index: "04",
      title: "Domains, TLS, DNS",
      subtitle: "Custom domain, HTTPS, redirects, email DNS",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Connect a custom domain over HTTPS",
        "Configure redirects and email DNS",
      ],
      lessons: [
        lesson({
          id: "svc-hebergement-m04-l1",
          title: "Go-live DNS",
          objective: "Configure domain, TLS, redirects, and basic SPF/DKIM.",
          concepts: ["custom domain", "HTTPS/TLS", "redirects", "SPF/DKIM"],
        }),
      ],
      exercises: [
        {
          title: "Go-live DNS checklist",
          kind: "synthesis",
          brief:
            "Run the full go-live DNS checklist on the product domain.",
        },
      ],
    }),
  ],
  project: {
    title: "Project P10: Preview + prod deployment",
    deliverable:
      "Capstone product deployed: preview + prod environments with public HTTPS URL.",
    assessment: [
      "Prod accessible over HTTPS on a public URL",
      "Preview distinct from prod",
      "Pipeline or deployment procedure documented",
    ],
  },
});

/* ── P11: Observability & lightweight ops ───────────────────────────── */

export const opsPhase: ProgramPhase = phase({
  slug: "ops",
  title: "Observability & lightweight ops",
  objective: "Know when it breaks — and what to do when it does.",
  modules: [
    module({
      id: "svc-ops-m01",
      index: "01",
      title: "Useful logs",
      subtitle: "Request/user correlation, never secrets",
      duration: "30 min",
      difficulty: "intermediate",
      objectives: [
        "Structure correlated logs",
        "Ensure zero secrets in logs",
      ],
      lessons: [
        lesson({
          id: "svc-ops-m01-l1",
          title: "Logs that help",
          objective: "Log what's useful for debugging, correlated, without sensitive data.",
          concepts: ["request/user correlation", "structured logs", "no secrets"],
          pitfalls: ["logging a token or password", "unreadable logs without context"],
        }),
      ],
      exercises: [
        {
          title: "Instrument a critical flow",
          kind: "guided",
          brief:
            "Instrument the payment or auth flow with actionable correlated logs.",
        },
      ],
    }),
    module({
      id: "svc-ops-m02",
      index: "02",
      title: "Monitoring & alerts",
      subtitle: "Uptime, 5xx, webhook down",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Monitor uptime and 5xx errors",
        "Alert on costly outages (webhook down)",
      ],
      lessons: [
        lesson({
          id: "svc-ops-m02-l1",
          title: "Monitor what matters",
          objective: "Set up uptime checks, 5xx tracking, and targeted alerts.",
          concepts: ["uptime", "5xx errors", "webhook-down alert"],
        }),
      ],
      exercises: [
        {
          title: "'Payment broken' alert",
          kind: "guided",
          brief:
            "Configure an alert that fires when the payment webhook fails.",
        },
      ],
    }),
    module({
      id: "svc-ops-m03",
      index: "03",
      title: "Backups & minimal incident response",
      subtitle: "DB backup, 1-page runbook, communication",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Set up a restorable DB backup",
        "Write a one-page incident runbook",
      ],
      lessons: [
        lesson({
          id: "svc-ops-m03-l1",
          title: "Backups and runbook",
          objective: "Prepare for incidents: tested backup + runbook + minimal communication.",
          concepts: ["DB backup", "tested restore", "1-page runbook", "incident communication"],
        }),
      ],
      exercises: [
        {
          title: "Incident simulation",
          kind: "synthesis",
          brief:
            "Run an incident simulation with the runbook: detection, action, communication, short post-mortem.",
        },
      ],
    }),
  ],
  project: {
    title: "Project P11: Runbook + live alert",
    deliverable:
      "Product runbook + at least one alert actually active on the prod environment.",
    assessment: [
      "Actionable one-page runbook",
      "Triggerable and tested alert",
      "Restorable backup demonstrated",
    ],
  },
});

/* ── P12: Commercial delivery ────────────────────────────────── */

export const shipPhase: ProgramPhase = phase({
  slug: "ship",
  title: "Commercial delivery",
  objective: "Turn a deployment into a marketable offer.",
  modules: [
    module({
      id: "svc-ship-m01",
      index: "01",
      title: "Offer & pricing page",
      subtitle: "Value proposition, Free/Pro, clear CTA",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Articulate the value proposition",
        "Build a pricing page that converts",
      ],
      lessons: [
        lesson({
          id: "svc-ship-m01-l1",
          title: "From feature to offer",
          objective: "Translate the product into a value proposition and clear plans.",
          concepts: ["value proposition", "Free/Pro plans", "clear CTA"],
        }),
      ],
      exercises: [
        {
          title: "'Why pay' landing",
          kind: "synthesis",
          brief:
            "Write the product landing focused on the reason to pay, with a single CTA.",
        },
      ],
    }),
    module({
      id: "svc-ship-m02",
      index: "02",
      title: "Trust & minimal legal",
      subtitle: "Light ToS/privacy, legal notices, support",
      duration: "30 min",
      difficulty: "intermediate",
      objectives: [
        "Cover ToS, privacy, and minimal legal notices",
        "Open a credible support channel",
      ],
      lessons: [
        lesson({
          id: "svc-ship-m02-l1",
          title: "The minimum that builds trust",
          objective: "Set up the legal and support foundation for a paid product.",
          concepts: ["light ToS/privacy", "legal notices", "support channel"],
        }),
      ],
      exercises: [
        {
          title: "Mini compliance checklist",
          kind: "synthesis",
          brief:
            "Run the minimal compliance checklist on the product and fill gaps.",
        },
      ],
    }),
    module({
      id: "svc-ship-m03",
      index: "03",
      title: "Delivery proof",
      subtitle: "Changelog, smoke tests, release package",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Maintain a changelog",
        "Automate smoke tests",
        "Assemble the release package",
      ],
      lessons: [
        lesson({
          id: "svc-ship-m03-l1",
          title: "Ship with proof",
          objective: "Produce artifacts that prove the product is delivered.",
          concepts: ["changelog", "smoke tests", "release package"],
        }),
      ],
      exercises: [
        {
          title: "Assemble the delivery package",
          kind: "synthesis",
          brief:
            "Assemble the product delivery package: URL, plans, audit evidence, runbook.",
        },
      ],
    }),
  ],
  project: {
    title: "Project P12: Delivery package",
    deliverable:
      "Complete delivery package: public URL, plans and pricing, audit evidence, runbook.",
    assessment: [
      "Complete and verifiable package",
      "Pricing page live with CTA",
      "Legal foundation and support in place",
    ],
  },
});
