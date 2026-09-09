import type { Module } from "@/types";
import { paiementsQuizzes } from "../quizzes";
import { paiementsExercises } from "../exercises";

export const paiementsModule02: Module = {
  id: "svc-paiements-m02",
  index: "02",
  title: "Stripe end to end",
  subtitle: "Checkout, Customer Portal, test mode",
  duration: "55 min",
  difficulty: "intermediate",
  objectives: [
    "Set up hosted checkout and a customer portal (e.g. Stripe)",
    "Work with Customer and Subscription (or equivalents)",
    "Work in test mode",
  ],
  content: [
    { kind: "title", text: "Checkout and Portal" },
    {
      kind: "paragraph",
      html: "<strong>Stripe</strong> is a <strong>market example</strong> among payment providers, and the same ideas exist elsewhere: <strong>hosted checkout</strong>, <strong>customer portal</strong>, <strong>test mode</strong>. You create a session on the server (secret key never in the browser), redirect the user, and return to a success page for <em>UX</em>. That page does not yet grant Pro.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-flask'></i> Test mode",
        body: "Test cards and events: exercise Free → Pro with no real money. Validate the flow before production. Stay agnostic: another provider will have an equivalent sandbox.",
      },
    },

    { kind: "title", text: "Customer and Subscription" },
    {
      kind: "paragraph",
      html: "Link each product account to a durable <strong>Customer</strong> (or equivalent) in your database. The <strong>subscription</strong> / plan carries the lifecycle. If you skip a <strong>user ↔ customer</strong> mapping, you do not know who paid. The <strong>Customer Portal</strong> (or equivalent) lets customers change cards, cancel, and view invoices, which means less custom PCI surface.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-key'></i> Secrets",
        body: "Create the session with the secret key on the server. Publishing that key in React compromises the whole provider account.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-shuffle'></i> <strong>Reflex</strong>: server + customer mapping + test mode; session created ≠ paid access (webhook in the next module).",
    },
  ],
  quiz: paiementsQuizzes.m02,
  exercises: [paiementsExercises.m02_1],
};
