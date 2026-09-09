import type { Module } from "@/types";
import { hebergementQuizzes } from "../quizzes";
import { hebergementExercises } from "../exercises";

export const hebergementModule01: Module = {
  id: "svc-hebergement-m01",
  index: "01",
  title: "Choose where to host",
  subtitle: "Vercel, Fly, Railway, VPS: real criteria",
  duration: "30 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Compare platforms by cost, ops, and cold start",
    "Choose based on the product rather than trends",
  ],
  content: [
    { kind: "title", text: "Hosting landscape" },
    {
      kind: "paragraph",
      html: "Going live means more than pasting the platform name from the last tutorial. <strong>Vercel</strong>, <strong>Fly</strong>, <strong>Railway</strong>, and a <strong>VPS</strong> are <strong>market options</strong>: PaaS or server. Compare them on concrete criteria: <strong>cost</strong>, <strong>ops burden</strong> (who patches, who monitors), <strong>cold start</strong>, and fit with your stack.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-cloud'></i> PaaS vs VPS",
        body: "PaaS = less ops, runtime constraints. VPS = control and responsibility. Neither is « always better ».",
      },
    },
    {
      kind: "paragraph",
      html: "A low-traffic static landing does not share needs with an SLA-sensitive API or a long-running worker. <strong>Cold start</strong> (waking an instance / function) can kill UX on a scale-to-zero free tier.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Trend is not the same as fit",
        body: "AI often defaults to one platform. You justify the choice for <em>this</em> product: traffic, budget, ops skills.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-scale-balanced'></i> <strong>Rule</strong>: criteria (cost, ops, cold start, stack) before the logo. Stay provider-agnostic.",
    },
  ],
  quiz: hebergementQuizzes.m01,
  exercises: [hebergementExercises.m01_1],
};
