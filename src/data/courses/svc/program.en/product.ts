import type { ProgramPhase } from "@/types";
import { lesson, module, phase } from "./helpers";

/* ── P4: Sign-in & identity (third-party services) ──────────────── */

export const authPhase: ProgramPhase = phase({
  slug: "auth",
  title: "Sign-in & identity",
  objective:
    "Wire up a real sign-in service: never reinvent authentication. From here, phase projects feed into the final product.",
  modules: [
    module({
      id: "svc-auth-m01",
      index: "01",
      title: "Modern sign-in models",
      subtitle: "Sessions, signed tokens, magic link, existing account",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Compare sessions, signed tokens, magic link, and existing account flows",
        "Pick a model based on the product use case",
        "Spot common mistakes in generated sign-in code",
      ],
      lessons: [
        lesson({
          id: "svc-auth-m01-l1",
          title: "Model overview",
          objective: "Understand sessions, signed tokens, magic link, existing account, and their trade-offs.",
          concepts: ["sessions", "signed token", "magic link", "existing account"],
        }),
        lesson({
          id: "svc-auth-m01-l2",
          title: "Generated code pitfalls",
          objective: "Identify typical flaws in AI-written sign-in flows.",
          concepts: ["token storage", "expiration", "fragile custom sign-in"],
          pitfalls: ["token in browser storage without thought", "custom sign-in instead of a third-party service"],
        }),
      ],
      exercises: [
        {
          title: "Pick a model for three cases",
          kind: "synthesis",
          brief:
            "Choose and justify a sign-in model for three product cases (B2B software, consumer app, internal tool).",
        },
      ],
    }),
    module({
      id: "svc-auth-m02",
      index: "02",
      title: "Wire up a sign-in service",
      subtitle: "Market examples: guided flow + variants",
      duration: "50 min",
      difficulty: "intermediate",
      objectives: [
        "Integrate a sign-in service end to end",
        "Understand the sign-up → stay signed in flow",
        "Distinguish browser library vs server verification",
      ],
      lessons: [
        lesson({
          id: "svc-auth-m02-l1",
          title: "Guided flow",
          objective: "Wire up a sign-in service (market examples, guided).",
          concepts: ["sign-in service", "sign-up", "session"],
        }),
        lesson({
          id: "svc-auth-m02-l2",
          title: "Browser vs server",
          objective: "Know what is verified on the browser and what MUST be verified on the server.",
          concepts: ["browser library", "server verification", "tokens"],
        }),
      ],
      exercises: [
        {
          title: "Sign-up → sign-in flow",
          kind: "guided",
          brief:
            "Implement the full sign-up → sign-in → session flow on a starter app with a third-party service.",
        },
      ],
    }),
    module({
      id: "svc-auth-m03",
      index: "03",
      title: "Real authorization",
      subtitle: "Roles, database rules, unauthorized access: protect on the server",
      duration: "50 min",
      difficulty: "intermediate",
      objectives: [
        "Model roles and permissions",
        "Write database access rules",
        "Detect and fix unauthorized access via an ID",
      ],
      lessons: [
        lesson({
          id: "svc-auth-m03-l1",
          title: "Roles and rules",
          objective: "Structure authorization with roles and database access rules.",
          concepts: ["roles", "database access rules"],
        }),
        lesson({
          id: "svc-auth-m03-l2",
          title: "Unauthorized access and server protection",
          objective: "Understand access via a manipulated ID and why the browser is never enough.",
          concepts: ["unauthorized access", "server-side access control"],
          pitfalls: ["hiding a button instead of protecting the route", "guessable IDs without checks"],
        }),
      ],
      exercises: [
        {
          title: "Break then fix unauthorized access",
          kind: "audit",
          brief:
            "Exploit unauthorized access on a deliberately vulnerable app, then fix it server-side with proof.",
        },
      ],
    }),
    module({
      id: "svc-auth-m04",
      index: "04",
      title: "Sensitive flows",
      subtitle: "Password reset, email verification, multiple devices",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Secure password reset and email verification",
        "Handle multiple devices and sign-out",
        "Build a production sign-in checklist",
      ],
      lessons: [
        lesson({
          id: "svc-auth-m04-l1",
          title: "Password reset and email verification",
          objective: "Implement sensitive flows without classic vulnerabilities.",
          concepts: ["password reset", "email verification", "one-time tokens"],
        }),
        lesson({
          id: "svc-auth-m04-l2",
          title: "Sessions and sign-out",
          objective: "Handle multiple devices, sign-out, and session revocation.",
          concepts: ["multiple devices", "sign-out", "expiration"],
        }),
      ],
      exercises: [
        {
          title: "Production sign-in checklist",
          kind: "synthesis",
          brief:
            "Write the production sign-in checklist for the current product and verify it point by point.",
        },
      ],
    }),
  ],
  project: {
    title: "Project P4: Third-party sign-in + admin area",
    deliverable:
      "The final product with third-party sign-in, a protected admin area, and documented access rules.",
    assessment: [
      "End-to-end working sign-in service",
      "Admin area actually protected server-side",
      "Access rules written and consistent with the code",
    ],
  },
});

/* ── P5: Data & backend ─────────────────────────────────────────── */

export const dataPhase: ProgramPhase = phase({
  slug: "data",
  title: "Data & backend",
  objective: "Solid persistence, API, and async processing for the product.",
  modules: [
    module({
      id: "svc-data-m01",
      index: "01",
      title: "A useful data model",
      subtitle: "Entities, relations, migrations: no hallucinated schema",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Model entities and relations from requirements",
        "Manage migrations cleanly",
        "Spot an AI-hallucinated schema",
      ],
      lessons: [
        lesson({
          id: "svc-data-m01-l1",
          title: "Entities and relations",
          objective: "Translate the domain into a minimal relational schema.",
          concepts: ["entities", "relations", "foreign keys"],
        }),
        lesson({
          id: "svc-data-m01-l2",
          title: "Migrations and hallucinated schema",
          objective: "Version the schema and audit what the AI proposes.",
          concepts: ["migrations", "hallucinated schema", "schema review"],
          pitfalls: ["unnecessary generated tables", "redundant fields"],
        }),
      ],
      exercises: [
        {
          title: "Schema for a simple SaaS",
          kind: "synthesis",
          brief:
            "Design the users / orgs / resources schema for a simple SaaS, with justification for the relations.",
        },
      ],
    }),
    module({
      id: "svc-data-m02",
      index: "02",
      title: "API and validation at boundaries",
      subtitle: "Never trust the client",
      duration: "45 min",
      difficulty: "intermediate",
      objectives: [
        "Validate all inputs server-side",
        "Return typed errors",
        "Paginate lists",
      ],
      lessons: [
        lesson({
          id: "svc-data-m02-l1",
          title: "Input validation",
          objective: "Validate systematically at system boundaries.",
          concepts: ["input validation", "validation schemas", "boundaries"],
          pitfalls: ["client-only validation", "trusting the payload"],
        }),
        lesson({
          id: "svc-data-m02-l2",
          title: "Typed errors and pagination",
          objective: "Structure error responses and paginate collections.",
          concepts: ["typed errors", "pagination", "HTTP status codes"],
        }),
      ],
      exercises: [
        {
          title: "Secure a generated endpoint",
          kind: "audit",
          brief:
            "Audit an AI-generated endpoint and secure it: validation, errors, authorization.",
        },
      ],
    }),
    module({
      id: "svc-data-m03",
      index: "03",
      title: "Storage & files",
      subtitle: "Uploads, signed URLs, quotas, ACL",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Handle safe uploads",
        "Serve files via signed URLs",
        "Apply quotas and access control",
      ],
      lessons: [
        lesson({
          id: "svc-data-m03-l1",
          title: "Safe uploads",
          objective: "Accept files without opening a vulnerability.",
          concepts: ["file validation", "size and type", "object storage"],
        }),
        lesson({
          id: "svc-data-m03-l2",
          title: "Signed URLs and ACL",
          objective: "Control who accesses what and for how long.",
          concepts: ["signed URLs", "ACL", "quotas"],
        }),
      ],
      exercises: [
        {
          title: "Upload with access control",
          kind: "guided",
          brief:
            "Implement an upload with a signed URL and read-access verification.",
        },
      ],
    }),
    module({
      id: "svc-data-m04",
      index: "04",
      title: "Jobs & async processing",
      subtitle: "Lightweight queues, retries, idempotence",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Decouple slow processing from the HTTP request",
        "Design idempotent jobs",
        "Handle retries and failures",
      ],
      lessons: [
        lesson({
          id: "svc-data-m04-l1",
          title: "Lightweight queues",
          objective: "Pick a queue solution suited to an early-stage product.",
          concepts: ["queues", "workers", "decoupling"],
        }),
        lesson({
          id: "svc-data-m04-l2",
          title: "Job idempotence",
          objective: "Write replayable jobs without duplicate side effects.",
          concepts: ["idempotence", "retries", "dead letter"],
        }),
      ],
      exercises: [
        {
          title: "Send email job",
          kind: "guided",
          brief:
            "Implement an email-sending job decoupled from the HTTP request, with safe retry.",
        },
      ],
    }),
  ],
  project: {
    title: "Project P5: Business CRUD + upload + async job",
    deliverable:
      "The enriched capstone product: business CRUD, file upload, and an async job, generated then audited.",
    assessment: [
      "Systematic server-side validation",
      "Upload with proven access control",
      "Idempotent, replayable async job",
    ],
  },
});

/* ── P6: Payments & third-party services ────────────────────────── */

export const paiementsPhase: ProgramPhase = phase({
  slug: "paiements",
  title: "Payments & third-party services",
  objective: "Monetize the product correctly: webhooks included.",
  modules: [
    module({
      id: "svc-paiements-m01",
      index: "01",
      title: "Business models",
      subtitle: "One-shot, subscription, usage: offer ↔ technical mapping",
      duration: "30 min",
      difficulty: "intermediate",
      objectives: [
        "Compare one-shot, subscription, and usage-based pricing",
        "Translate an offer into technical objects",
      ],
      lessons: [
        lesson({
          id: "svc-paiements-m01-l1",
          title: "Models and implications",
          objective: "Connect each business model to its technical mechanics.",
          concepts: ["one-shot", "subscription", "usage-based", "offer/technical mapping"],
        }),
      ],
      exercises: [
        {
          title: "Pick the model for three products",
          kind: "synthesis",
          brief:
            "Choose and justify a business model for three typical products.",
        },
      ],
    }),
    module({
      id: "svc-paiements-m02",
      index: "02",
      title: "Stripe end to end",
      subtitle: "Checkout, Customer Portal, test mode",
      duration: "55 min",
      difficulty: "intermediate",
      objectives: [
        "Set up Stripe Checkout and the Customer Portal",
        "Work with Customer and Subscription",
        "Work in test mode",
      ],
      lessons: [
        lesson({
          id: "svc-paiements-m02-l1",
          title: "Checkout and Portal",
          objective: "Integrate Stripe-hosted payment flow.",
          concepts: ["Checkout", "Customer Portal", "test mode"],
        }),
        lesson({
          id: "svc-paiements-m02-l2",
          title: "Customer and Subscription",
          objective: "Link Stripe objects to product accounts.",
          concepts: ["Customer", "Subscription", "user ↔ customer mapping"],
        }),
      ],
      exercises: [
        {
          title: "Free → Pro flow",
          kind: "guided",
          brief:
            "Implement the Free → Pro upgrade flow in test mode, from the pricing page to the Checkout return.",
        },
      ],
    }),
    module({
      id: "svc-paiements-m03",
      index: "03",
      title: "Webhooks & idempotence",
      subtitle: "Never grant access on redirect alone",
      duration: "50 min",
      difficulty: "advanced",
      objectives: [
        "Verify webhook signatures",
        "Handle replays without duplicate effects",
        "Model order states",
      ],
      lessons: [
        lesson({
          id: "svc-paiements-m03-l1",
          title: "Signature and replay",
          objective: "Authenticate every webhook and absorb duplicates.",
          concepts: ["webhook signature", "replay", "idempotence"],
          pitfalls: ["granting access on redirect", "processing an unsigned webhook"],
        }),
        lesson({
          id: "svc-paiements-m03-l2",
          title: "Order states",
          objective: "Model the payment lifecycle on the product side.",
          concepts: ["order states", "state machine", "reconciliation"],
        }),
      ],
      exercises: [
        {
          title: "Duplicate webhook",
          kind: "audit",
          brief:
            "Simulate a duplicate webhook and prove the system stays consistent (no double activation).",
        },
      ],
    }),
    module({
      id: "svc-paiements-m04",
      index: "04",
      title: "Failures & minimal compliance",
      subtitle: "Declined cards, disclosures, logs without leaks",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Handle payment failures on the product side",
        "Cover minimal disclosures",
        "Log without exposing sensitive data",
      ],
      lessons: [
        lesson({
          id: "svc-paiements-m04-l1",
          title: "Card failures",
          objective: "Respond cleanly to declined or expired payments.",
          concepts: ["card failures", "basic dunning", "customer communication"],
        }),
        lesson({
          id: "svc-paiements-m04-l2",
          title: "Compliance and logs",
          objective: "Minimal disclosures and logs without payment data.",
          concepts: ["payment legal disclosures", "logs without PAN/PII"],
        }),
      ],
      exercises: [
        {
          title: "Payment error matrix",
          kind: "synthesis",
          brief:
            "Build the matrix: payment error → product response → user message.",
        },
      ],
    }),
  ],
  project: {
    title: "Project P6: Free/Pro plan with webhook",
    deliverable:
      "The monetized capstone product: Free/Pro plan, Stripe checkout, and a webhook that actually grants access.",
    assessment: [
      "Activation via signed webhook, never redirect alone",
      "Proven idempotence (duplicate webhook)",
      "Failure flow handled and visible",
    ],
  },
});

/* ── P7: Notifications ──────────────────────────────────────────── */

export const notificationsPhase: ProgramPhase = phase({
  slug: "notifications",
  title: "Notifications",
  objective: "Make email (and related channels) a first-class part of the product.",
  modules: [
    module({
      id: "svc-notifications-m01",
      index: "01",
      title: "Channels & moments",
      subtitle: "Transactional vs marketing, business moments",
      duration: "30 min",
      difficulty: "intermediate",
      objectives: [
        "Distinguish transactional and marketing",
        "Link business events to channels",
      ],
      lessons: [
        lesson({
          id: "svc-notifications-m01-l1",
          title: "Channels and business moments",
          objective: "Pick the right channel (email, push, SMS) at the right moment.",
          concepts: ["transactional vs marketing", "optional push/SMS", "business moments"],
        }),
      ],
      exercises: [
        {
          title: "Event → channel matrix",
          kind: "synthesis",
          brief:
            "Build the matrix of business events for the product and the associated notification channel.",
        },
      ],
    }),
    module({
      id: "svc-notifications-m02",
      index: "02",
      title: "Email provider",
      subtitle: "Resend / Postmark: templates, domains, deliverability",
      duration: "45 min",
      difficulty: "intermediate",
      objectives: [
        "Wire up an email provider",
        "Create clean templates",
        "Understand basic deliverability",
      ],
      lessons: [
        lesson({
          id: "svc-notifications-m02-l1",
          title: "Wire up a provider",
          objective: "Send a transactional email via Resend/Postmark.",
          concepts: ["email provider", "send API", "templates"],
        }),
        lesson({
          id: "svc-notifications-m02-l2",
          title: "Domains and deliverability",
          objective: "Configure the sending domain to reach the inbox.",
          concepts: ["sending domain", "basic SPF/DKIM", "deliverability"],
        }),
      ],
      exercises: [
        {
          title: "Welcome + receipt emails",
          kind: "guided",
          brief:
            "Implement welcome and payment receipt emails with templates.",
        },
      ],
    }),
    module({
      id: "svc-notifications-m03",
      index: "03",
      title: "Opt-in, preferences, abuse",
      subtitle: "Consent, unsubscribe, rate limits",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Respect consent and unsubscribe",
        "Protect sending against abuse",
      ],
      lessons: [
        lesson({
          id: "svc-notifications-m03-l1",
          title: "Consent and preferences",
          objective: "Handle opt-in, preferences, and unsubscribe.",
          concepts: ["opt-in", "unsubscribe", "user preferences"],
        }),
        lesson({
          id: "svc-notifications-m03-l2",
          title: "Anti-abuse",
          objective: "Rate-limit and prevent malicious use.",
          concepts: ["rate limits", "abuse", "send quotas"],
        }),
      ],
      exercises: [
        {
          title: "User preferences",
          kind: "guided",
          brief:
            "Implement a notification preferences screen enforced at send time.",
        },
      ],
    }),
    module({
      id: "svc-notifications-m04",
      index: "04",
      title: "Orchestration",
      subtitle: "Business triggers → queue → notification",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Chain business events, queue, and sending",
        "Correlate notifications, payments, and auth",
      ],
      lessons: [
        lesson({
          id: "svc-notifications-m04-l1",
          title: "From trigger to send",
          objective: "Orchestrate event → job → notification reliably.",
          concepts: ["business triggers", "queue", "payment/auth correlation"],
        }),
      ],
      exercises: [
        {
          title: "Payment → email chain",
          kind: "guided",
          brief:
            "Implement the full chain: payment webhook → job → confirmation email.",
        },
      ],
    }),
  ],
  project: {
    title: "Project P7: Transactional emails + preferences",
    deliverable:
      "The capstone product with three transactional emails (auth + payment) and respected user preferences.",
    assessment: [
      "Three emails wired to real events",
      "Preferences and unsubscribe respected",
      "Decoupled sending (queue/job), not in the HTTP request",
    ],
  },
});
