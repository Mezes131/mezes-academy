import type { Module } from "@/types";
import { auditSecuriteQuizzes } from "../quizzes";
import { auditSecuriteExercises } from "../exercises";

export const auditSecuriteModule03: Module = {
  id: "svc-audit-securite-m03",
  index: "03",
  title: "AuthZ and API surfaces",
  subtitle: "IDOR, unprotected routes, exposed webhooks, RLS",
  duration: "50 min",
  difficulty: "intermediate",
  objectives: [
    "Map exposed surfaces",
    "Check every route for IDOR",
    "Audit RLS and webhooks",
  ],
  content: [
    { kind: "title", text: "Surfaces and routes" },
    {
      kind: "paragraph",
      html: "List everything reachable: API routes, server pages, jobs, webhooks. For each entry, note <strong>who</strong> can call it and <strong>on which resources</strong>. An <strong>IDOR</strong> is changing an id in the URL and reading/changing someone else's resource. It is classic when AI checks « logged in » and skips ownership.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-table'></i> Route × role matrix",
        body: "Columns: route, required authn, roles, ownership check, verdict. Without a matrix, « temporary » /api/admin routes stay open.",
      },
    },
    { kind: "title", text: "Webhooks and RLS" },
    {
      kind: "paragraph",
      html: "<strong>Webhooks</strong> are public by design: verify the provider <strong>signature</strong>, keep scope tight, stay idempotent. <strong>RLS</strong>: explicit database policies; « RLS enabled » with <code>USING (true)</code> protects nothing. Hiding a button in React is <strong>not</strong> AuthZ.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-eye-slash'></i> False sense of security",
        body: "Hiding Admin in the menu + RLS on while skipping a read of the policies = surface still open. Audit server and database.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-user-lock'></i> <strong>Rule</strong>: every surface has server authz (and DB policies when relevant), rather than UI alone.",
    },
  ],
  quiz: auditSecuriteQuizzes.m03,
  exercises: [auditSecuriteExercises.m03_1],
};
