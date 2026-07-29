import type { Module } from "@/types";
import { authQuizzes } from "../quizzes";
import { authExercises } from "../exercises";

export const authModule03: Module = {
  id: "svc-auth-m03",
  index: "03",
  title: "Real authorization",
  subtitle: "Roles, database rules, IDOR: protect on the server",
  duration: "50 min",
  difficulty: "intermediate",
  objectives: [
    "Model roles and permissions",
    "Understand database access rules (RLS / policies)",
    "Detect and fix an IDOR",
  ],
  content: [
    { kind: "title", text: "Roles and policies" },
    {
      kind: "paragraph",
      html: "Being signed in ≠ being allowed to do everything. <strong>Authorization</strong> defines who can read / write what. You often model <strong>roles</strong> (member, admin…). <strong>Database access rules</strong> (<strong>RLS</strong>: row level security, or equivalent policies) limit which rows a user can see.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-user-shield'></i> Layers",
        body: "API that checks the right + database rules = double safety net. AI often forgets one of the two.",
      },
    },

    { kind: "title", text: "IDOR" },
    {
      kind: "paragraph",
      html: "An <strong>IDOR</strong> (insecure direct object reference) is reaching someone else's resource by changing the id in the URL or API (<code>/notes/101</code> → <code>/notes/102</code>) without the server checking ownership. Common, serious, and often present in generated code that « works ».",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-bug'></i> <strong>Fix</strong>: server-side access control (and policies). Hiding a link or making an id « hard to guess » is not enough.",
    },
  ],
  quiz: authQuizzes.m03,
  exercises: [authExercises.m03_1],
};
