import type { Module } from "@/types";
import { paiementsQuizzes } from "../quizzes";
import { paiementsExercises } from "../exercises";

export const paiementsModule04: Module = {
  id: "svc-paiements-m04",
  index: "04",
  title: "Failures & minimal compliance",
  subtitle: "Declined cards, disclosures, and logs that do not leak",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Handle payment failures on the product side",
    "Cover minimal disclosures",
    "Log in a way that does not expose sensitive data",
  ],
  content: [
    { kind: "title", text: "Card failures" },
    {
      kind: "paragraph",
      html: "Declined, expired, insufficient funds: the product must keep a <strong>visible failure state</strong> and an <strong>actionable message</strong> (retry, open the portal). <strong>Basic dunning</strong> informs on past_due before cutting access. Granting Pro « for conversion » despite a decline is debt and internal fraud.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-table'></i> Error matrix",
        body: "For each common error: product reaction + user message. Without a matrix, AI invents vague copy and inconsistent states.",
      },
    },

    { kind: "title", text: "Compliance and logs" },
    {
      kind: "paragraph",
      html: "<strong>Minimal</strong> compliance: clear price, renewal, cancellation, who processes payment. In <strong>logs</strong>: event ids and statuses, but <strong>never</strong> PAN, CVV, or secrets. Pasting a card into Sentry is an incident rather than debugging.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-eye-slash'></i> Leak",
        body: "Generated handlers often log the full webhook body. Audit and redact before production.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-clipboard-check'></i> <strong>P6 project</strong>: Free/Pro + checkout + signed idempotent webhook + visible failures. Generate, then audit on the capstone.",
    },
  ],
  quiz: paiementsQuizzes.m04,
  exercises: [paiementsExercises.m04_projet],
};
