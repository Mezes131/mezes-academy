import type { Module } from "@/types";
import { opsQuizzes } from "../quizzes";
import { opsExercises } from "../exercises";

export const opsModule03: Module = {
  id: "svc-ops-m03",
  index: "03",
  title: "Backups & minimal incident response",
  subtitle: "DB backup, 1-page runbook, communication",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Set up a restorable DB backup",
    "Write a one-page incident runbook",
  ],
  content: [
    { kind: "title", text: "Backups and runbook" },
    {
      kind: "paragraph",
      html: "Prepare for incidents: a <strong>DB backup</strong> only counts if you have <strong>tested restore</strong>. An untried dump is an illusion. Storage and tool of your choice (platform snapshots, scheduled dumps). What matters is restore proof.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-book'></i> 1-page runbook",
        body: "Detection (which signals), actions (what to do in order), contacts, minimal communication (who says what). Under stress, one clear page beats a 40-page wiki.",
      },
    },
    {
      kind: "paragraph",
      html: "Minimal <strong>incident communication</strong> informs without panic: status, impact, next update. Then a short <strong>simulation</strong>: detection → action → coms → half-page post-mortem. That validates runbook + live alert.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> « We'll see »",
        body: "Chat notes are not a runbook. An untested alert is not an alert. A never-restored backup is not a backup.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-shield-halved'></i> <strong>Rule</strong>: restorable backup, actionable runbook, and tested alert. That is the P11 trio.",
    },
  ],
  quiz: opsQuizzes.m03,
  exercises: [opsExercises.m03_projet],
};
