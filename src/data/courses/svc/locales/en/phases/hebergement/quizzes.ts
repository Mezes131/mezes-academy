import type { Quiz } from "@/types";

export const hebergementQuizzes: Record<"m01" | "m02" | "m03" | "m04", Quiz> = {
  m01: {
    id: "svc-hebergement-quiz-m01",
    title: "Choose where to host: check your reading",
    questions: [
      {
        id: "q1",
        question: "PaaS vs VPS in one line…",
        options: [
          {
            id: "a",
            label:
              "PaaS handles more infra for you; VPS gives you the server and the ops burden",
          },
          { id: "b", label: "VPS is always free; PaaS is always paid" },
          { id: "c", label: "They are identical: only the logo changes" },
          { id: "d", label: "PaaS forbids HTTPS" },
        ],
        correct: ["a"],
        explanation:
          "Real criterion: who patches the OS, reverse proxy, backups? PaaS vs VPS is a cost / control / ops trade-off.",
      },
      {
        id: "q2",
        question: "Vercel, Fly, Railway (market examples) mainly serve to…",
        options: [
          {
            id: "a",
            label:
              "Illustrate PaaS/platform options: compare cost, ops, and cold start for the product",
          },
          { id: "b", label: "Mandate a single required platform for the course" },
          { id: "c", label: "Replace the idea of environments" },
          { id: "d", label: "Avoid any DNS configuration" },
        ],
        correct: ["a"],
        explanation:
          "Provider-agnostic: market options. Choose for the product rather than the tutorial trend.",
      },
      {
        id: "q3",
        question: "Cold start mainly impacts…",
        options: [
          {
            id: "a",
            label:
              "Latency on the first hit when the instance / function was asleep",
          },
          { id: "b", label: "The platform logo color" },
          { id: "c", label: "Only the domain name price" },
          { id: "d", label: "Checkout WCAG contrast" },
        ],
        correct: ["a"],
        explanation:
          "Low-traffic apps on free / scale-to-zero tiers: the first user pays the wake-up. Product criterion.",
      },
      {
        id: "q4",
        question: "Picking a host « because the AI tutorial named it »…",
        options: [
          {
            id: "a",
            label: "Is a bad criterion: cost, ops, stack, and traffic come first",
          },
          { id: "b", label: "Guarantees the best SLA on the market" },
          { id: "c", label: "Replaces preview / prod separation" },
          { id: "d", label: "Avoids runtime secrets" },
        ],
        correct: ["a"],
        explanation:
          "Trend is not product fit. A static landing, a long-running worker, and a DB glued to the process have different needs.",
      },
      {
        id: "q5",
        question: "For three different products, the right approach is…",
        options: [
          {
            id: "a",
            label:
              "Justify hosting per product (constraints, cost, ops burden)",
          },
          { id: "b", label: "Put everything on the same platform « by default »" },
          { id: "c", label: "Ignore cold start and cost" },
          { id: "d", label: "Pick only the most famous logo" },
        ],
        correct: ["a"],
        explanation:
          "P10 m01 exercise: three distinct justifications. Avoid a platform copy-paste.",
      },
    ],
  },

  m02: {
    id: "svc-hebergement-quiz-m02",
    title: "Environments: check your reading",
    questions: [
      {
        id: "q1",
        question: "Local, preview, and prod must…",
        options: [
          {
            id: "a",
            label:
              "Be separated: distinct configs and secrets, no cross-leakage",
          },
          { id: "b", label: "Share the same secret key « to keep it simple »" },
          { id: "c", label: "All point at the prod database" },
          { id: "d", label: "Be indistinguishable in URLs" },
        ],
        correct: ["a"],
        explanation:
          "Preview → prod leakage (keys, webhooks, data) is a classic incident. Three environments, three silos.",
      },
      {
        id: "q2",
        question: "Runtime secrets…",
        options: [
          {
            id: "a",
            label:
              "Are injected at runtime (platform / vault), never committed",
          },
          { id: "b", label: "Live in the repo « so CI can see them »" },
          { id: "c", label: "Can be pasted into the Vite front with no risk" },
          { id: "d", label: "Replace TLS" },
        ],
        correct: ["a"],
        explanation:
          "Secrets = runtime / vault. Git history = attack surface.",
      },
      {
        id: "q3",
        question: "With Vite, a VITE_-prefixed variable…",
        options: [
          {
            id: "a",
            label:
              "Is embedded at build time for the client: never put a secret there",
          },
          { id: "b", label: "Stays magically server-only" },
          { id: "c", label: "Automatically encrypts API keys" },
          { id: "d", label: "Replaces .gitignore" },
        ],
        correct: ["a"],
        explanation:
          "Build vs runtime: what ships in the browser bundle is not a secret. Public URLs OK; secret keys no.",
      },
      {
        id: "q4",
        question: "An environment matrix documents…",
        options: [
          {
            id: "a",
            label:
              "Each variable: where it lives (local/preview/prod) and whether it is secret",
          },
          { id: "b", label: "Only the theme color" },
          { id: "c", label: "The commit count" },
          { id: "d", label: "Marketing pricing" },
        ],
        correct: ["a"],
        explanation:
          "m02 deliverable: full matrix. Avoids « works on my machine » and config leaks.",
      },
      {
        id: "q5",
        question: "Pointing preview at prod DB / webhooks…",
        options: [
          {
            id: "a",
            label: "Is a dangerous leak: real data and side effects",
          },
          { id: "b", label: "Is best-practice CI" },
          { id: "c", label: "Simplifies rollback" },
          { id: "d", label: "Replaces lint gates" },
        ],
        correct: ["a"],
        explanation:
          "Preview = sandbox. Prod = production. Mixing them = incidents + surprise bills.",
      },
    ],
  },

  m03: {
    id: "svc-hebergement-quiz-m03",
    title: "Minimal CI/CD: check your reading",
    questions: [
      {
        id: "q1",
        question: "A minimal CI/CD pipeline mainly includes…",
        options: [
          {
            id: "a",
            label: "Build, tests, deploy, with guardrails before prod",
          },
          { id: "b", label: "Only a git push --force to main" },
          { id: "c", label: "Deploy while skipping tests entirely" },
          { id: "d", label: "Copy secrets into CI logs" },
        ],
        correct: ["a"],
        explanation:
          "Automate the path: build → test → deploy. Do not just « merge and hope ».",
      },
      {
        id: "q2",
        question: "A red lint / audit gate must…",
        options: [
          {
            id: "a",
            label: "Block deployment until the signal is green",
          },
          { id: "b", label: "Be ignored « to ship faster »" },
          { id: "c", label: "Run only after prod" },
          { id: "d", label: "Replace rollback" },
        ],
        correct: ["a"],
        explanation:
          "Syllabus pitfall: deploy with no gates. Red lint or a detected secret means refuse.",
      },
      {
        id: "q3",
        question: "Rollback means…",
        options: [
          {
            id: "a",
            label:
              "Knowing how to return to a healthy version (previous release / controlled revert)",
          },
          { id: "b", label: "Deleting the repo to start over" },
          { id: "c", label: "Ignoring 5xx errors until Monday" },
          { id: "d", label: "Redeploying the same broken build in a loop" },
        ],
        correct: ["a"],
        explanation:
          "If you have no rollback strategy, a bad deploy becomes a prolonged incident.",
      },
      {
        id: "q4",
        question: "A pipeline that correctly « refuses »…",
        options: [
          {
            id: "a",
            label:
              "Refuses to deploy if a secret is scanned or lint/audit fails",
          },
          { id: "b", label: "Deploys anyway with a yellow warning" },
          { id: "c", label: "Skips tests on Fridays" },
          { id: "d", label: "Commits .env into the artifact" },
        ],
        correct: ["a"],
        explanation:
          "m03 exercise: secret + lint gates. Refuse beats « we'll see in prod ».",
      },
      {
        id: "q5",
        question: "Deploying with no gate and no planned rollback…",
        options: [
          {
            id: "a",
            label: "Is a classic trap: incident with no safety net",
          },
          { id: "b", label: "Is fine if the front compiles" },
          { id: "c", label: "Replaces environment separation" },
          { id: "d", label: "Automatically guarantees HTTPS" },
        ],
        correct: ["a"],
        explanation:
          "Syllabus: avoid deploying with no gates, and avoid shipping with no rollback strategy.",
      },
    ],
  },

  m04: {
    id: "svc-hebergement-quiz-m04",
    title: "Domains, TLS, DNS: check your reading",
    questions: [
      {
        id: "q1",
        question: "A custom domain over HTTPS is…",
        options: [
          {
            id: "a",
            label:
              "Your domain name wired to the service with a valid TLS certificate",
          },
          { id: "b", label: "Only a *.vercel.app URL with no DNS" },
          { id: "c", label: "Cleartext HTTP « to go faster »" },
          { id: "d", label: "An MX record that replaces A/CNAME" },
        ],
        correct: ["a"],
        explanation:
          "Go-live: domain → platform + TLS. Public HTTPS URL = P10 criterion.",
      },
      {
        id: "q2",
        question: "TLS / HTTPS is for…",
        options: [
          {
            id: "a",
            label: "Encrypting client ↔ server traffic and building trust",
          },
          { id: "b", label: "Storing secrets in the repo" },
          { id: "c", label: "Replacing CI gates" },
          { id: "d", label: "Avoiding email DNS setup" },
        ],
        correct: ["a"],
        explanation:
          "If you skip HTTPS, auth/payment forms and user trust suffer.",
      },
      {
        id: "q3",
        question: "Redirects (www → apex, HTTP → HTTPS)…",
        options: [
          {
            id: "a",
            label:
              "Avoid duplicate content and force the canonical secure path",
          },
          { id: "b", label: "Are optional even for a paid checkout" },
          { id: "c", label: "Replace SPF/DKIM" },
          { id: "d", label: "Disable the custom domain" },
        ],
        correct: ["a"],
        explanation:
          "Go-live checklist: one canonical URL, HTTPS enforced, coherent redirects.",
      },
      {
        id: "q4",
        question: "Basic SPF / DKIM for email…",
        options: [
          {
            id: "a",
            label:
              "Authenticate the sending domain and improve deliverability",
          },
          { id: "b", label: "Encrypt the database" },
          { id: "c", label: "Replace the site TLS certificate" },
          { id: "d", label: "Are useless if you use an email provider" },
        ],
        correct: ["a"],
        explanation:
          "Email DNS is not the same as web DNS alone. Transactional mail (receipts, reset) depends on SPF/DKIM.",
      },
      {
        id: "q5",
        question: "Project P10 especially requires…",
        options: [
          {
            id: "a",
            label:
              "Public HTTPS prod, distinct preview, documented pipeline or procedure",
          },
          { id: "b", label: "Only a local build with no URL" },
          { id: "c", label: "Preview = prod with the same secrets" },
          { id: "d", label: "HTTP with no custom domain" },
        ],
        correct: ["a"],
        explanation:
          "Deliverable: preview + prod, HTTPS URL, documented deployment.",
      },
    ],
  },
};
