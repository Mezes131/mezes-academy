import type { Quiz } from "@/types";

export const notificationsQuizzes: Record<"m01" | "m02" | "m03" | "m04", Quiz> = {
  m01: {
    id: "svc-notifications-quiz-m01",
    title: "Channels & moments: check your reading",
    questions: [
      {
        id: "q1",
        question: "A transactional email is mainly…",
        options: [
          {
            id: "a",
            label: "A message tied to a business action (auth, payment, critical alert) the user expects",
          },
          { id: "b", label: "Always a promotional newsletter" },
          { id: "c", label: "An optional push with no link to an event" },
          { id: "d", label: "An SMS sent to sell with no consent" },
        ],
        correct: ["a"],
        explanation:
          "Transactional = follows a product event (reset, receipt, invite). Marketing = promo / digest, under different consent rules.",
      },
      {
        id: "q2",
        question: "Mixing marketing and transactional is risky because…",
        options: [
          {
            id: "a",
            label: "You can spam, hurt deliverability, and violate consent / unsubscribe",
          },
          { id: "b", label: "HTML templates become prettier" },
          { id: "c", label: "The provider rejects all technical email" },
          { id: "d", label: "Async queues stop existing" },
        ],
        correct: ["a"],
        explanation:
          "A product welcome can be transactional; a weekly promo is not. Mixing them leads to complaints, opt-outs, and blacklists.",
      },
      {
        id: "q3",
        question: "Choosing a channel (email, push, SMS) mostly depends on…",
        options: [
          {
            id: "a",
            label: "The business moment, urgency, and available consent",
          },
          { id: "b", label: "The logo of the email provider in the tutorial" },
          { id: "c", label: "Sending on all three channels for every event" },
          { id: "d", label: "The color of the « Notify » button" },
        ],
        correct: ["a"],
        explanation:
          "Password reset → email (usually). Mobile urgency → push/SMS if opted in. No default multi-channel spray.",
      },
      {
        id: "q4",
        question: "An event → channel matrix is for…",
        options: [
          {
            id: "a",
            label: "Deciding ahead which channel (and transactional vs marketing) for each event",
          },
          { id: "b", label: "Replacing the email provider" },
          { id: "c", label: "Avoiding templates" },
          { id: "d", label: "Sending from the browser with the secret key" },
        ],
        correct: ["a"],
        explanation:
          "Without a matrix, the AI invents promo emails on every webhook and skips critical messages.",
      },
      {
        id: "q5",
        question: "Push and SMS in this course are…",
        options: [
          {
            id: "a",
            label: "Optional channels: useful when consent and the moment justify them, rather than required everywhere",
          },
          { id: "b", label: "Mandatory for every SaaS from day one" },
          { id: "c", label: "Forbidden for transactional mail" },
          { id: "d", label: "Equivalent to logging a PAN" },
        ],
        correct: ["a"],
        explanation:
          "Email remains the transactional backbone. Push/SMS are extras with opt-in and abuse/cost to manage.",
      },
    ],
  },

  m02: {
    id: "svc-notifications-quiz-m02",
    title: "Email provider: check your reading",
    questions: [
      {
        id: "q1",
        question: "In this course, Resend / Postmark…",
        options: [
          {
            id: "a",
            label: "Are market examples: one email provider among others",
          },
          { id: "b", label: "Are the only brands legally allowed in production" },
          { id: "c", label: "Must be called only from the browser with the secret key" },
          { id: "d", label: "Replace SPF/DKIM" },
        ],
        correct: ["a"],
        explanation:
          "Stay provider-agnostic: send API, templates, domain, and deliverability exist across many providers.",
      },
      {
        id: "q2",
        question: "The send API (secret key) must…",
        options: [
          {
            id: "a",
            label: "Live on the server / worker, and never exposed to the browser",
          },
          { id: "b", label: "Be pasted into React to « go faster »" },
          { id: "c", label: "Be committed to a public repo" },
          { id: "d", label: "Replace user preferences" },
        ],
        correct: ["a"],
        explanation:
          "Provider key = secret. Leak = spam from your domain / burned quota.",
      },
      {
        id: "q3",
        question: "Transactional email templates should mainly…",
        options: [
          {
            id: "a",
            label: "Be clear, versioned, with controlled variables (no unescaped raw HTML)",
          },
          { id: "b", label: "Always include a big marketing promo" },
          { id: "c", label: "Be generated on the fly with no review" },
          { id: "d", label: "Contain the API key in the footer" },
        ],
        correct: ["a"],
        explanation:
          "Welcome, receipt, reset: predictable content, escape user data, safe action links.",
      },
      {
        id: "q4",
        question: "Basic SPF / DKIM is for…",
        options: [
          {
            id: "a",
            label: "Authenticating your sending domain and improving deliverability (reaching the inbox)",
          },
          { id: "b", label: "End-to-end encrypting the email body" },
          { id: "c", label: "Replacing marketing opt-in" },
          { id: "d", label: "Granting Pro on redirect" },
        ],
        correct: ["a"],
        explanation:
          "Without a properly configured domain, even a good provider lands in spam.",
      },
      {
        id: "q5",
        question: "Basic deliverability mostly means…",
        options: [
          {
            id: "a",
            label: "Verified domain, reasonable volume, expected content, few complaints",
          },
          { id: "b", label: "Sending from a shared random @gmail.com domain" },
          { id: "c", label: "Ignoring bounces and continuing" },
          { id: "d", label: "Putting the secret key in the template" },
        ],
        correct: ["a"],
        explanation:
          "Reputation = DNS config + send behavior. Abuse and spam kill inbox placement.",
      },
    ],
  },

  m03: {
    id: "svc-notifications-quiz-m03",
    title: "Opt-in, preferences, abuse: check your reading",
    questions: [
      {
        id: "q1",
        question: "Unsubscribe must…",
        options: [
          {
            id: "a",
            label: "Be enforced at send time (especially marketing) rather than only as a cosmetic link",
          },
          { id: "b", label: "Be ignored to « re-engage inactive users »" },
          { id: "c", label: "Apply only to the footer CSS" },
          { id: "d", label: "Also block password-reset emails with no alternative" },
        ],
        correct: ["a"],
        explanation:
          "Preferences and unsubscribe are checked server-side before marketing sends. Critical transactional mail is scoped separately.",
      },
      {
        id: "q2",
        question: "User preferences are for…",
        options: [
          {
            id: "a",
            label: "Letting users choose categories (digest, product, marketing) and enforcing them at send time",
          },
          { id: "b", label: "Replacing the email provider" },
          { id: "c", label: "Storing the API key in the profile" },
          { id: "d", label: "Sending more often for « engagement »" },
        ],
        correct: ["a"],
        explanation:
          "A preferences UI with no enforcement is theater. The worker reads prefs before sending.",
      },
      {
        id: "q3",
        question: "A send rate limit protects against…",
        options: [
          {
            id: "a",
            label: "Abuse (spam, reset / invite flood) and burned quota / reputation",
          },
          { id: "b", label: "HTML templates that are too long" },
          { id: "c", label: "Signed payment webhooks" },
          { id: "d", label: "SPF configuration" },
        ],
        correct: ["a"],
        explanation:
          "Without quotas, an open « send » endpoint or a bot burns your domain and provider.",
      },
      {
        id: "q4",
        question: "Marketing opt-in mainly means…",
        options: [
          {
            id: "a",
            label: "Explicit consent before sending promo / non-essential messages",
          },
          { id: "b", label: "Pre-checking every box while saying nothing about it" },
          { id: "c", label: "Sending on sign-up with no mention" },
          { id: "d", label: "Mixing payment receipts with newsletters" },
        ],
        correct: ["a"],
        explanation:
          "Expected transactional ≠ marketing. Document the difference and store consent.",
      },
      {
        id: "q5",
        question: "For anti-abuse, a good practice is…",
        options: [
          {
            id: "a",
            label: "Limit by user / IP / email type, and log refusals",
          },
          { id: "b", label: "Let anyone POST to a public send API" },
          { id: "c", label: "Remove unsubscribe to « retain » users" },
          { id: "d", label: "Log full secret contents into Sentry" },
        ],
        correct: ["a"],
        explanation:
          "Quotas + auth on send endpoints + respected prefs = anti-abuse baseline.",
      },
    ],
  },

  m04: {
    id: "svc-notifications-quiz-m04",
    title: "Orchestration: check your reading",
    questions: [
      {
        id: "q1",
        question: "Sending email directly inside the HTTP request…",
        options: [
          {
            id: "a",
            label: "Is fragile: prefer event → queue / job → decoupled send",
          },
          { id: "b", label: "Is the only recommended method in production" },
          { id: "c", label: "Guarantees idempotence" },
          { id: "d", label: "Replaces preferences" },
        ],
        correct: ["a"],
        explanation:
          "Timeouts, retries, and spikes break synchronous requests. A replayable job is more reliable.",
      },
      {
        id: "q2",
        question: "A typical payment → confirmation email chain is…",
        options: [
          {
            id: "a",
            label: "Signed webhook → business effect → notification job → email provider",
          },
          { id: "b", label: "Redirect alone → email from React with the secret key" },
          { id: "c", label: "Ignore the webhook and spam marketing" },
          { id: "d", label: "Send before payment is confirmed" },
        ],
        correct: ["a"],
        explanation:
          "Payment/auth correlation: the notification follows a reliable business event rather than the UX redirect.",
      },
      {
        id: "q3",
        question: "An idempotent send job means…",
        options: [
          {
            id: "a",
            label: "Replaying the job (same key / event) does not cause an unwanted duplicate send",
          },
          { id: "b", label: "Sending twice « to be sure »" },
          { id: "c", label: "Disabling all retries" },
          { id: "d", label: "Ignoring preferences on retry" },
        ],
        correct: ["a"],
        explanation:
          "Idempotency key (event_id, notification_id): one effective successful send.",
      },
      {
        id: "q4",
        question: "Correlating notifications, payments, and auth is for…",
        options: [
          {
            id: "a",
            label: "Ensuring welcome / reset / receipt fire on real events rather than stubs",
          },
          { id: "b", label: "Mixing marketing and PAN in the same log" },
          { id: "c", label: "Calling the provider from the browser" },
          { id: "d", label: "Skipping the queue" },
        ],
        correct: ["a"],
        explanation:
          "Three emails wired to real triggers (auth + payment) is a P7 project criterion.",
      },
      {
        id: "q5",
        question: "If the worker fails after the webhook…",
        options: [
          {
            id: "a",
            label: "Job retry must be able to resend while avoiding duplicate business effects or flood",
          },
          { id: "b", label: "You grant Pro a second time « just in case »" },
          { id: "c", label: "You give up with no dead-letter or alert" },
          { id: "d", label: "You expose the provider key in the client error" },
        ],
        correct: ["a"],
        explanation:
          "Queue + retries + idempotence + observability: email may lag; the product stays consistent.",
      },
    ],
  },
};
