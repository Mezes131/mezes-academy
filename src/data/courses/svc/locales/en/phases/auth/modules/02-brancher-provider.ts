import type { Module } from "@/types";
import { authQuizzes } from "../quizzes";
import { authExercises } from "../exercises";

export const authModule02: Module = {
  id: "svc-auth-m02",
  index: "02",
  title: "Wire a provider",
  subtitle: "Clerk / Auth.js / Supabase Auth: guided flow and variants",
  duration: "50 min",
  difficulty: "intermediate",
  objectives: [
    "Understand an end-to-end provider flow",
    "Follow sign-up → session",
    "Separate the client SDK from server verification",
  ],
  content: [
    { kind: "title", text: "Guided flow" },
    {
      kind: "paragraph",
      html: "A <strong>provider</strong> (e.g. Supabase Auth, Clerk, Auth.js) handles sign-up, sign-in, and sessions. You configure the project with them, wire the <strong>SDK</strong> (library) into your app, and test the flow: create an account → sign in → stay recognized.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-route'></i> On this platform",
        body: "You do not install the provider here. You learn the mental model and validate reflexes through audits. Real integration happens on your capstone repo.",
      },
    },

    { kind: "title", text: "SDK vs server" },
    {
      kind: "paragraph",
      html: "The client SDK helps the interface (forms, « signed in » state). For any sensitive action (data, admin, payment), the <strong>server</strong> must verify the session or token. Hiding a button is not protection.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-server'></i> <strong>Reflex</strong>: provider secrets stay out of the browser; every sensitive API re-validates identity.",
    },
  ],
  quiz: authQuizzes.m02,
  exercises: [authExercises.m02_1],
};
