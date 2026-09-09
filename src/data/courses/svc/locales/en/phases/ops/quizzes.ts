import type { Quiz } from "@/types";

export const opsQuizzes: Record<"m01" | "m02" | "m03", Quiz> = {
  m01: {
    id: "svc-ops-quiz-m01",
    title: "Useful logs: check your reading",
    questions: [
      {
        id: "q1",
        question: "Structured logs are mainly…",
        options: [
          {
            id: "a",
            label:
              "Events with fields (level, message, ids) that a log tool can query",
          },
          { id: "b", label: "Random console.log calls with no format" },
          { id: "c", label: "Dumping full request bodies « to be safe »" },
          { id: "d", label: "A replacement for uptime monitoring" },
        ],
        correct: ["a"],
        explanation:
          "JSON / named fields: you filter, correlate, alert. Avoid a wall of text.",
      },
      {
        id: "q2",
        question: "Request / user correlation helps you…",
        options: [
          {
            id: "a",
            label:
              "Tie logs from the same journey (requestId, userId) for faster debugging",
          },
          { id: "b", label: "Log the password on every login" },
          { id: "c", label: "Avoid any 5xx alert" },
          { id: "d", label: "Replace DB backups" },
        ],
        correct: ["a"],
        explanation:
          "Without correlation ids, an auth/payment incident becomes a blind hunt.",
      },
      {
        id: "q3",
        question: "Logging a token, API key, or password…",
        options: [
          {
            id: "a",
            label: "Is a critical trap: zero secrets in logs",
          },
          { id: "b", label: "Helps support « in prod »" },
          { id: "c", label: "Is OK if logs are « private »" },
          { id: "d", label: "Replaces the secrets vault" },
        ],
        correct: ["a"],
        explanation:
          "Syllabus pitfall: logging a token or password. Log aggregators are an attack surface.",
      },
      {
        id: "q4",
        question: "Logs that are « unreadable without context »…",
        options: [
          {
            id: "a",
            label:
              "Do not help: you need event, outcome, and ids rather than just « error »",
          },
          { id: "b", label: "Are enough for a runbook" },
          { id: "c", label: "Replace a webhook-down alert" },
          { id: "d", label: "Guarantee the SLA" },
        ],
        correct: ["a"],
        explanation:
          "Pitfall: logs that lack context. Instrument the critical flow with named events.",
      },
      {
        id: "q5",
        question: "On a payment or auth flow, good instrumentation…",
        options: [
          {
            id: "a",
            label:
              "Adds correlated logs at key steps, with no sensitive data",
          },
          { id: "b", label: "Dumps the Stripe body / session cookie" },
          { id: "c", label: "Uses only email alerts with no logs" },
          { id: "d", label: "Ignores request ids" },
        ],
        correct: ["a"],
        explanation:
          "Exercise m01: critical flow instrumented, correlated, and actionable. Stay provider-agnostic.",
      },
    ],
  },

  m02: {
    id: "svc-ops-quiz-m02",
    title: "Monitoring & alerts: check your reading",
    questions: [
      {
        id: "q1",
        question: "An uptime check is for…",
        options: [
          {
            id: "a",
            label:
              "Knowing whether the URL / health endpoint responds, before customers report it",
          },
          { id: "b", label: "Replacing structured logs" },
          { id: "c", label: "Encrypting the database" },
          { id: "d", label: "Avoiding any CI gate" },
        ],
        correct: ["a"],
        explanation:
          "Uptime = « the service is alive ». Independent of which monitoring vendor you pick.",
      },
      {
        id: "q2",
        question: "Tracking 5xx errors means…",
        options: [
          {
            id: "a",
            label:
              "Catching server / dependency failures that break the user experience",
          },
          { id: "b", label: "Ignoring failing webhooks" },
          { id: "c", label: "Logging request secrets" },
          { id: "d", label: "Replacing rollback" },
        ],
        correct: ["a"],
        explanation:
          "A 5xx spike is a useful signal. Complements uptime (a site can be « up » and still return 500).",
      },
      {
        id: "q3",
        question: "A « payment webhook down » alert…",
        options: [
          {
            id: "a",
            label:
              "Targets an outage that costs money: payments / sync that no longer complete",
          },
          { id: "b", label: "Is useless if homepage uptime is green" },
          { id: "c", label: "Must post the secret payload to Slack" },
          { id: "d", label: "Replaces the incident runbook" },
        ],
        correct: ["a"],
        explanation:
          "Monitor what matters: a down webhook costs money and trust. Knowing the site is reachable is not enough on its own.",
      },
      {
        id: "q4",
        question: "Useful alerts are…",
        options: [
          {
            id: "a",
            label: "Targeted, testable, and actionable, rather than a flood of noise",
          },
          { id: "b", label: "A notification for every debug log" },
          { id: "c", label: "Never tested « so we don't bother anyone »" },
          { id: "d", label: "Only on the local environment" },
        ],
        correct: ["a"],
        explanation:
          "Alert fatigue = ignored alerts. Test the trigger; document the response.",
      },
      {
        id: "q5",
        question: "Setting up a « payment broken » alert implies…",
        options: [
          {
            id: "a",
            label:
              "A signal (webhook failures / endpoint 5xx) + alert channel + proof you tested it",
          },
          { id: "b", label: "Only a dashboard with no notification" },
          { id: "c", label: "Logging the provider secret key" },
          { id: "d", label: "Watching only checkout CSS" },
        ],
        correct: ["a"],
        explanation:
          "Exercise m02: a real alert when the payment webhook fails. Stay provider-agnostic.",
      },
    ],
  },

  m03: {
    id: "svc-ops-quiz-m03",
    title: "Backups & incident: check your reading",
    questions: [
      {
        id: "q1",
        question: "A useful DB backup is…",
        options: [
          {
            id: "a",
            label:
              "A restorable copy, and you have already tested restore at least once",
          },
          { id: "b", label: "A dump never tried « just in case »" },
          { id: "c", label: "A dashboard screenshot" },
          { id: "d", label: "Committing the DB into git" },
        ],
        correct: ["a"],
        explanation:
          "A backup with no tested restore is an illusion. P11 criterion: restorable backup demonstrated.",
      },
      {
        id: "q2",
        question: "A one-page runbook must…",
        options: [
          {
            id: "a",
            label:
              "Be actionable: detection, actions, contacts, minimal communication",
          },
          { id: "b", label: "Be a 40-page SRE theory doc" },
          { id: "c", label: "Live only in the founder's head" },
          { id: "d", label: "Replace live alerts" },
        ],
        correct: ["a"],
        explanation:
          "Under stress, one clear page beats an unfindable wiki. P11 deliverable.",
      },
      {
        id: "q3",
        question: "Minimal incident communication…",
        options: [
          {
            id: "a",
            label:
              "Informs stakeholders (status, impact, next update) without panic",
          },
          { id: "b", label: "Shares secrets and DB dumps publicly" },
          { id: "c", label: "Waits a week before any message" },
          { id: "d", label: "Is optional if uptime is « almost green »" },
        ],
        correct: ["a"],
        explanation:
          "Trust = calibrated transparency. The runbook says who says what, where.",
      },
      {
        id: "q4",
        question: "An incident simulation with the runbook…",
        options: [
          {
            id: "a",
            label:
              "Runs detection → action → communication → short post-mortem",
          },
          { id: "b", label: "Only rereads the runbook with no action" },
          { id: "c", label: "Deletes prod « to learn »" },
          { id: "d", label: "Ignores the backup" },
        ],
        correct: ["a"],
        explanation:
          "Exercise / project: walk the runbook to prove it holds under stress.",
      },
      {
        id: "q5",
        question: "Project P11 especially requires…",
        options: [
          {
            id: "a",
            label:
              "Actionable runbook, tested prod alert, restorable backup demonstrated",
          },
          { id: "b", label: "Only local debug logs" },
          { id: "c", label: "No alerts « to avoid stress »" },
          { id: "d", label: "A backup never restored" },
        ],
        correct: ["a"],
        explanation:
          "Deliverable: runbook + live alert + proven restore.",
      },
    ],
  },
};
