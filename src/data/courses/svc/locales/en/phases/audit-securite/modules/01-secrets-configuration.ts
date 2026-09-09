import type { Module } from "@/types";
import { auditSecuriteQuizzes } from "../quizzes";
import { auditSecuriteExercises } from "../exercises";

export const auditSecuriteModule01: Module = {
  id: "svc-audit-securite-m01",
  index: "01",
  title: "Secrets and configuration",
  subtitle: "Hardcoded secrets AI drops in with no warning",
  duration: "40 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Detect hardcoded secrets in a repo",
    "Organize vaults and rotation",
    "Lock down .gitignore and .dockerignore",
  ],
  content: [
    { kind: "title", text: "Hardcoded secrets" },
    {
      kind: "paragraph",
      html: "A <strong>hardcoded secret</strong> is an API key, token, or password pasted into code, config, a Dockerfile, or a sample README. AI does this often: it copies a snippet and leaves a key that <em>looks</em> real. Once a live secret is versioned, treat it as <strong>compromised</strong>.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Git history",
        body: "Deleting the line in the next commit is not enough: the blob remains in history. Rotation (revocation) is mandatory. Then ignore files + vault.",
      },
    },
    { kind: "title", text: "Vaults and rotation" },
    {
      kind: "paragraph",
      html: "Store secrets in a <strong>vault</strong> or the platform's runtime variables rather than in the repo. <strong>Least privilege</strong>: each secret is readable only by the service that needs it. Separate local / preview / prod. When a leak is suspected: <strong>rotate</strong> immediately.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-shield'></i> Ignore files",
        body: ".gitignore for .env and derivatives. .dockerignore so you do not COPY secrets into the image. Scan the repo (gitleaks, etc.) before shipping.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-key'></i> <strong>Rule</strong>: placeholders in code, secrets at runtime, rotate if exposed. Never leave a live key in git.",
    },
  ],
  quiz: auditSecuriteQuizzes.m01,
  exercises: [auditSecuriteExercises.m01_1],
};
