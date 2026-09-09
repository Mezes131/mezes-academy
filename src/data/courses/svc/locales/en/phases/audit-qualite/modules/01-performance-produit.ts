import type { Module } from "@/types";
import { auditQualiteQuizzes } from "../quizzes";
import { auditQualiteExercises } from "../exercises";

export const auditQualiteModule01: Module = {
  id: "svc-audit-qualite-m01",
  index: "01",
  title: "Product performance",
  subtitle: "LCP, TBT, budgets, images, waterfalls",
  duration: "40 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Measure LCP/TBT and read a waterfall",
    "Set performance budgets",
    "Optimize images",
  ],
  content: [
    { kind: "title", text: "Measure and budget" },
    {
      kind: "paragraph",
      html: "If you skip measurement, performance is an opinion. <strong>Lighthouse</strong> (and equivalents) give you LCP, TBT, and a trail. The <strong>waterfall</strong> shows what loads, in what order, and what blocks. Then set realistic <strong>budgets</strong>: LCP, page weight, JS. Enforce them after every « add a lib » prompt.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-gauge-high'></i> Images and LCP",
        body: "The uncompressed hero is the classic generated-code fail. Modern format, right dimensions, priority on LCP, lazy-load for the rest.",
      },
    },
    {
      kind: "paragraph",
      html: "A shippable perf audit = score + diagnosis + <strong>prioritized action plan</strong> (impact × effort). In other words, not a Lighthouse screenshot with no follow-up.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-list-check'></i> Perf checklist",
        body: "Realistic mobile measure, waterfall read, budgets written, images and JS first when LCP/TBT hurt.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-stopwatch'></i> <strong>Rule</strong>: measure → budget → fix the top of the plan, rather than « optimize by feel ».",
    },
  ],
  quiz: auditQualiteQuizzes.m01,
  exercises: [auditQualiteExercises.m01_1],
};
