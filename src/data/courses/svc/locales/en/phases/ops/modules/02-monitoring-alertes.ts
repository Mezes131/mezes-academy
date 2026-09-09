import type { Module } from "@/types";
import { opsQuizzes } from "../quizzes";
import { opsExercises } from "../exercises";

export const opsModule02: Module = {
  id: "svc-ops-m02",
  index: "02",
  title: "Monitoring & alerts",
  subtitle: "Uptime, 5xx, webhook down",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Monitor uptime and 5xx errors",
    "Alert on costly outages (webhook down)",
  ],
  content: [
    { kind: "title", text: "Monitor what matters" },
    {
      kind: "paragraph",
      html: "Logs tell the story; <strong>monitoring</strong> wakes you up. An <strong>uptime</strong> check (URL or health) says whether the service responds. Tracking <strong>5xx</strong> catches app failures even when the homepage ping is green.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-bell'></i> Costly outages",
        body: "A down payment webhook = money and trust. Dedicated alert > discovering the issue via customer tickets.",
      },
    },
    {
      kind: "paragraph",
      html: "Useful alerts are <strong>targeted</strong>, <strong>testable</strong>, and <strong>actionable</strong>. Noise flood = ignored alerts. Tool-agnostic (uptime SaaS, APM, platform metrics): the signal and channel matter.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-vial'></i> Test the alert",
        body: "Trigger it once on purpose (simulated failure, low threshold). Document who gets it and what to do. That links naturally to the m03 runbook.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-heart-pulse'></i> <strong>Rule</strong>: uptime, 5xx, and alerts on paths that cost money. Checking that « the site loads » alone is not enough.",
    },
  ],
  quiz: opsQuizzes.m02,
  exercises: [opsExercises.m02_1],
};
