import type { Module } from "@/types";
import { authQuizzes } from "../quizzes";
import { authExercises } from "../exercises";

export const authModule04: Module = {
  id: "svc-auth-m04",
  index: "04",
  title: "Sensitive flows",
  subtitle: "Reset, email verification, multi-device sessions, production checklist",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Secure reset and email verification",
    "Handle multi-device sessions and revocation",
    "Validate an auth checklist before production",
  ],
  content: [
    { kind: "title", text: "Reset and email verification" },
    {
      kind: "paragraph",
      html: "Password reset and email verification use <strong>single-use tokens</strong> (or very limited use) with a <strong>short lifetime</strong>. A link valid for weeks is an open door. Let the provider handle these flows when you can; otherwise audit every detail.",
    },

    { kind: "title", text: "Sessions and revocation" },
    {
      kind: "paragraph",
      html: "Multi-device: phone, laptop, tablet. You must be able to <strong>sign out</strong> and <strong>revoke</strong> a session (lost device, suspected breach). Without that, a stolen token survives too long.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Admin zone",
        body: "It is not a hidden page. It is server-protected routes and data, with a written access policy (who can do what).",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-clipboard-check'></i> <strong>P4 project</strong>: the checklist below is your safety net before shipping the auth increment on the capstone.",
    },
  ],
  quiz: authQuizzes.m04,
  exercises: [authExercises.m04_projet],
};
