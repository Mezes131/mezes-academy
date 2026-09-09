import type { Module } from "@/types";
import { shipQuizzes } from "../quizzes";
import { shipExercises } from "../exercises";

export const shipModule01: Module = {
  id: "svc-ship-m01",
  index: "01",
  title: "Offer & pricing page",
  subtitle: "Value proposition, Free/Pro, clear CTA",
  duration: "35 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Articulate the value proposition",
    "Build a pricing page that converts",
  ],
  content: [
    { kind: "title", text: "From feature to offer" },
    {
      kind: "paragraph",
      html: "A deployment is not yet an offer. The <strong>value proposition</strong> states the benefit for a target audience. It is not a list of libraries. <strong>Free / Pro</strong> plans must make the upgrade reason obvious.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-list'></i> Feature trap",
        body: "A technical README or ten competing CTAs do not convert. A « why pay » landing centers the message and a single CTA.",
      },
    },
    {
      kind: "paragraph",
      html: "The <strong>pricing page</strong> is a commercial artifact: price or Free/Pro contrast, benefit, <strong>clear CTA</strong> (trial, upgrade, purchase). Page tool of your choice. Message and public URL are what matter.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-bullseye'></i> Single CTA",
        body: "One dominant action. « Docs », « GitHub », and « Try » at the same level = dilution. Prioritize.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-tag'></i> <strong>Rule</strong>: value, Free/Pro plans, and a CTA. Without those, you have a repo online rather than an offer.",
    },
  ],
  quiz: shipQuizzes.m01,
  exercises: [shipExercises.m01_1],
};
