import type { Quiz } from "@/types";

export const paiementsQuizzes: Record<"m01" | "m02" | "m03" | "m04", Quiz> = {
  m01: {
    id: "svc-paiements-quiz-m01",
    title: "Business models: check your reading",
    questions: [
      {
        id: "q1",
        question: "A one-shot payment is mainly…",
        options: [
          {
            id: "a",
            label: "A single purchase (license, pack): one payment, one access grant or delivery",
          },
          { id: "b", label: "Always automatic monthly billing" },
          { id: "c", label: "Counting every API call and billing by the minute" },
          { id: "d", label: "Granting Pro on redirect with no webhook" },
        ],
        correct: ["a"],
        explanation:
          "One-shot = a point-in-time transaction. Subscription and usage have other lifecycles (renewal, meters).",
      },
      {
        id: "q2",
        question: "A subscription technically implies…",
        options: [
          {
            id: "a",
            label: "A customer, a plan / price, and a lifecycle (active, past_due, canceled…)",
          },
          { id: "b", label: "Only a Pay button with no provider-side object" },
          { id: "c", label: "Storing the card number in localStorage" },
          { id: "d", label: "Billing while never checking webhooks" },
        ],
        correct: ["a"],
        explanation:
          "A Free/Pro offer maps to Customer + Subscription (or the equivalent at another provider).",
      },
      {
        id: "q3",
        question: "Usage-based pricing mainly relies on…",
        options: [
          {
            id: "a",
            label: "Meters / metrics measured in the product, then billed by usage",
          },
          { id: "b", label: "A single fixed lifetime payment with no measurement" },
          { id: "c", label: "The payment provider logo" },
          { id: "d", label: "Hiding the price in CSS" },
        ],
        correct: ["a"],
        explanation:
          "Without a reliable metric (calls, seats, GB…), you cannot bill usage correctly.",
      },
      {
        id: "q4",
        question: "Mapping a product offer to technical objects means…",
        options: [
          {
            id: "a",
            label: "Linking plan / price / entitlements to provider objects and your database",
          },
          { id: "b", label: "Copying the Stripe dashboard with no product model" },
          { id: "c", label: "Putting the price only in marketing copy" },
          { id: "d", label: "Letting the AI invent 12 plans « just in case »" },
        ],
        correct: ["a"],
        explanation:
          "Every offer has technical objects (price, subscription, entitlement). Document the mapping before you code.",
      },
      {
        id: "q5",
        question: "Choosing the business model mainly depends on…",
        options: [
          {
            id: "a",
            label: "The product case (one-off tool, recurring SaaS, metered API…)",
          },
          { id: "b", label: "The provider mandated by the course" },
          { id: "c", label: "How many colors the site uses" },
          { id: "d", label: "Granting access on redirect alone" },
        ],
        correct: ["a"],
        explanation:
          "The model follows the product. The provider (Stripe or another) is a tool rather than the strategy.",
      },
    ],
  },

  m02: {
    id: "svc-paiements-quiz-m02",
    title: "Payment flow: check your reading",
    questions: [
      {
        id: "q1",
        question: "In this course, Stripe Checkout / Portal…",
        options: [
          {
            id: "a",
            label: "Are a market example: one payment provider among others",
          },
          { id: "b", label: "Are the only legally allowed brand" },
          { id: "c", label: "Must be called only from the browser with the secret key" },
          { id: "d", label: "Replace webhooks" },
        ],
        correct: ["a"],
        explanation:
          "Stay provider-agnostic: hosted checkout, customer portal, and test mode exist across providers.",
      },
      {
        id: "q2",
        question: "Test mode is for…",
        options: [
          {
            id: "a",
            label: "Exercising the Free → Pro flow with test cards / events and no real money",
          },
          { id: "b", label: "Going live with no webhook" },
          { id: "c", label: "Publishing the secret key in the front end" },
          { id: "d", label: "Skipping the user ↔ customer mapping" },
        ],
        correct: ["a"],
        explanation:
          "Test mode = real flow, fake money. Validate checkout, return, and later webhooks before production.",
      },
      {
        id: "q3",
        question: "Customer (or equivalent) must be linked…",
        options: [
          {
            id: "a",
            label: "To your product user / org account (durable mapping in the database)",
          },
          { id: "b", label: "Only to localStorage" },
          { id: "c", label: "To nothing: the redirect is enough" },
          { id: "d", label: "To the Pay button CSS" },
        ],
        correct: ["a"],
        explanation:
          "Without a user ↔ customer link, you do not know who paid or which plan to grant.",
      },
      {
        id: "q4",
        question: "The Customer Portal (or equivalent) is mainly for…",
        options: [
          {
            id: "a",
            label: "Letting the customer manage subscription, payment methods, and invoices at the provider",
          },
          { id: "b", label: "Replacing your app authentication" },
          { id: "c", label: "Granting Pro with no webhook signature" },
          { id: "d", label: "Storing the PAN in your logs" },
        ],
        correct: ["a"],
        explanation:
          "Hosted portal = less PCI and less custom UI for cancel / update card.",
      },
      {
        id: "q5",
        question: "Creating a checkout session must…",
        options: [
          {
            id: "a",
            label: "Happen on the server with the secret key, and are never exposed to the browser",
          },
          { id: "b", label: "Use the secret key inside React" },
          { id: "c", label: "Ignore test mode during development" },
          { id: "d", label: "Grant access as soon as the session is created" },
        ],
        correct: ["a"],
        explanation:
          "Secrets stay server-side. Creating a session ≠ successful payment: wait for the signed webhook.",
      },
    ],
  },

  m03: {
    id: "svc-paiements-quiz-m03",
    title: "Webhooks & idempotence: check your reading",
    questions: [
      {
        id: "q1",
        question: "Granting Pro access only on the success redirect…",
        options: [
          {
            id: "a",
            label: "Is a mistake: the redirect is not reliable proof of payment",
          },
          { id: "b", label: "Is the recommended production method" },
          { id: "c", label: "Replaces signature verification" },
          { id: "d", label: "Guarantees idempotence" },
        ],
        correct: ["a"],
        explanation:
          "Users can replay the URL, abandon, or manipulate the return. Source of truth = signed provider event.",
      },
      {
        id: "q2",
        question: "Verifying a webhook signature is for…",
        options: [
          {
            id: "a",
            label: "Proving the event really comes from the provider rather than a forged POST",
          },
          { id: "b", label: "Styling the pricing page" },
          { id: "c", label: "Replacing Customer mapping" },
          { id: "d", label: "Allowing any JSON body" },
        ],
        correct: ["a"],
        explanation:
          "Without a signature, anyone can POST « payment succeeded » to your endpoint.",
      },
      {
        id: "q3",
        question: "Idempotence on webhooks means…",
        options: [
          {
            id: "a",
            label: "Processing the same event_id twice does not double-activate / double-bill",
          },
          { id: "b", label: "Ignoring every webhook after the first" },
          { id: "c", label: "Intentionally granting Pro on every replay" },
          { id: "d", label: "Disabling provider retries" },
        ],
        correct: ["a"],
        explanation:
          "Providers replay. Record processed event ids or use unique constraints.",
      },
      {
        id: "q4",
        question: "Order states (pending → paid → failed…) help to…",
        options: [
          {
            id: "a",
            label: "Model the lifecycle and reconcile product ↔ provider",
          },
          { id: "b", label: "Replace webhooks" },
          { id: "c", label: "Hide failures from users" },
          { id: "d", label: "Avoid test mode" },
        ],
        correct: ["a"],
        explanation:
          "A clear state machine avoids « already Pro » while payment is still pending.",
      },
      {
        id: "q5",
        question: "An unsigned webhook must be…",
        options: [
          {
            id: "a",
            label: "Rejected (4xx), and you never apply a business side effect",
          },
          { id: "b", label: "Accepted « to ship faster »" },
          { id: "c", label: "Used to grant Pro immediately" },
          { id: "d", label: "Logged with the full card number" },
        ],
        correct: ["a"],
        explanation:
          "Classic AI pitfall: a handler that parses JSON and skips verifying the signature.",
      },
    ],
  },

  m04: {
    id: "svc-paiements-quiz-m04",
    title: "Failures & compliance: check your reading",
    questions: [
      {
        id: "q1",
        question: "When a card is declined, the product should…",
        options: [
          {
            id: "a",
            label: "Keep a visible failure state and an actionable user message",
          },
          { id: "b", label: "Grant Pro anyway « for conversion »" },
          { id: "c", label: "Log the full PAN" },
          { id: "d", label: "Ignore the failure webhook" },
        ],
        correct: ["a"],
        explanation:
          "Failure = state + clear UX (retry, update payment method). No phantom paid access.",
      },
      {
        id: "q2",
        question: "Basic dunning is…",
        options: [
          {
            id: "a",
            label: "Following up / informing when a renewal fails, before cutting access",
          },
          { id: "b", label: "Deleting the account with no notice" },
          { id: "c", label: "Showing the card number in the email" },
          { id: "d", label: "Granting on redirect alone" },
        ],
        correct: ["a"],
        explanation:
          "Past_due → communicate → retry / portal → then revoke if needed. Document the policy.",
      },
      {
        id: "q3",
        question: "Minimal payment disclosures mainly cover…",
        options: [
          {
            id: "a",
            label: "Price, renewal, cancellation, and who processes payment (transparency)",
          },
          { id: "b", label: "Only the button color" },
          { id: "c", label: "The provider source code" },
          { id: "d", label: "Nothing: checkout alone is legally enough everywhere" },
        ],
        correct: ["a"],
        explanation:
          "Minimal compliance ≠ a law firm: clearly show what the customer pays and how to stop.",
      },
      {
        id: "q4",
        question: "In payment logs, you must not…",
        options: [
          {
            id: "a",
            label: "Write PAN, CVV, or full card data (nor paste them into Sentry)",
          },
          { id: "b", label: "Log an event_id or payment_intent id" },
          { id: "c", label: "Log a failure status (declined, expired)" },
          { id: "d", label: "Log an internal user id" },
        ],
        correct: ["a"],
        explanation:
          "Useful logs = ids and statuses. Never card data / secrets.",
      },
      {
        id: "q5",
        question: "An errors → reaction → message matrix is for…",
        options: [
          {
            id: "a",
            label: "Deciding in advance what to do and what to say for each common failure",
          },
          { id: "b", label: "Replacing signed webhooks" },
          { id: "c", label: "Allowing double activation" },
          { id: "d", label: "Publishing the secret key" },
        ],
        correct: ["a"],
        explanation:
          "Without a matrix, the AI invents vague messages and leaves inconsistent states.",
      },
    ],
  },
};
