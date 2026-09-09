import type { Module } from "@/types";
import { paiementsQuizzes } from "../quizzes";
import { paiementsExercises } from "../exercises";

export const paiementsModule01: Module = {
  id: "svc-paiements-m01",
  index: "01",
  title: "Business models",
  subtitle: "One-shot, subscription, usage: offer ↔ technical mapping",
  duration: "30 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Compare one-shot, subscription, and usage-based pricing",
    "Translate an offer into technical objects",
  ],
  content: [
    { kind: "title", text: "Models and implications" },
    {
      kind: "paragraph",
      html: "Before wiring a <strong>payment provider</strong>, pick the <strong>business model</strong>: <strong>one-shot</strong> (single purchase → entitlement or delivery), <strong>subscription</strong> (renewal, active / past_due / canceled states), or <strong>usage-based</strong> (meters measured then billed). The wrong model forces technical contortions for months.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-scale-balanced'></i> Three typical cases",
        body: "Pack / license = often one-shot. Free/Pro SaaS = subscription. Volume API = usage. Start from the product rather than from the provider tutorial.",
      },
    },
    {
      kind: "paragraph",
      html: "<strong>Offer ↔ technical mapping</strong> links each plan to concrete objects: price, customer, subscription or meters, and <strong>entitlements</strong> in your database. Document that mapping before the AI invents eight « Enterprise » plans with no brief.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Pricing hallucinations",
        body: "AI over-generates tiers and coupons. Keep the minimal set the brief needs, and add when a real offer demands it.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-credit-card'></i> <strong>Rule</strong>: model from the product, name the technical objects, zero ghost plans.",
    },
  ],
  quiz: paiementsQuizzes.m01,
  exercises: [paiementsExercises.m01_1],
};
