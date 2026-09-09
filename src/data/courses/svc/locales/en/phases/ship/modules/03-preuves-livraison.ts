import type { Module } from "@/types";
import { shipQuizzes } from "../quizzes";
import { shipExercises } from "../exercises";

export const shipModule03: Module = {
  id: "svc-ship-m03",
  index: "03",
  title: "Delivery proof",
  subtitle: "Changelog, smoke tests, release package",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Maintain a changelog",
    "Automate smoke tests",
    "Assemble the release package",
  ],
  content: [
    { kind: "title", text: "Ship with proof" },
    {
      kind: "paragraph",
      html: "« It's deployed » is not the same as « it's commercially delivered ». A <strong>changelog</strong> states what changed for users / ops. <strong>Smoke tests</strong> quickly verify critical paths after deployment.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-folder-open'></i> Release package",
        body: "Gather public URL, plans and pricing, audit evidence (P8–P9), runbook (P11). You need verifiable artifacts rather than a homepage screenshot.",
      },
    },
    {
      kind: "paragraph",
      html: "The P12 <strong>delivery package</strong> proves the offer is marketable: live pricing with CTA, legal/support foundation, technical proof. Package format is free (repo, Notion, PDF). Content is what matters.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-rocket'></i> « Ship » illusion",
        body: "If you skip changelog, smoke, or package, you have a deployment rather than commercial delivery.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-clipboard-check'></i> <strong>Rule</strong>: changelog, smoke, and a verifiable package. Those are the proofs of ship.",
    },
  ],
  quiz: shipQuizzes.m03,
  exercises: [shipExercises.m03_projet],
};
