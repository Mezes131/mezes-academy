import type { Module } from "@/types";
import { auditSecuriteQuizzes } from "../quizzes";
import { auditSecuriteExercises } from "../exercises";

export const auditSecuriteModule04: Module = {
  id: "svc-audit-securite-m04",
  index: "04",
  title: "Dependencies and supply chain",
  subtitle: "Unnecessary or hallucinated deps, pin, npm audit",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Detect unnecessary or hallucinated dependencies",
    "Pin versions and audit regularly",
  ],
  content: [
    { kind: "title", text: "Generated code supply chain" },
    {
      kind: "paragraph",
      html: "A prompt can pull in dozens of « useful » packages. Among them: <strong>unused</strong> deps, <strong>hallucinated</strong> names (typosquatting), overly wide ranges (<code>*</code>, <code>^</code> with no lock). Every dependency is an <strong>attack surface</strong> and maintenance cost.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ghost'></i> Invented packages",
        body: "Check the registry before `npm install`. A name close to a famous package may be a trap published after the AI hallucination.",
      },
    },
    {
      kind: "paragraph",
      html: "<strong>Clean up</strong> <code>package.json</code>: remove unused, pin / lockfile, run <strong>npm audit</strong> (or equivalent) and triage. Do not disable the CI gate to « ship faster ». The phase deliverable is the capstone <strong>Security baseline report</strong>: secrets, injections, AuthZ, deps, with evidence and fixes.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-clipboard-check'></i> Baseline",
        body: "Full security-baseline checklist. Every finding: evidence + fix. No open critical vulnerability before declaring P8 done.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-box'></i> <strong>Project P8</strong>: capstone Security baseline report, cleaned deps included, zero open criticals.",
    },
  ],
  quiz: auditSecuriteQuizzes.m04,
  exercises: [auditSecuriteExercises.m04_projet],
};
