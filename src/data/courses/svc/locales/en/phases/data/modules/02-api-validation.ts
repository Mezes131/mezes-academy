import type { Module } from "@/types";
import { dataQuizzes } from "../quizzes";
import { dataExercises } from "../exercises";

export const dataModule02: Module = {
  id: "svc-data-m02",
  index: "02",
  title: "API and validation at boundaries",
  subtitle: "Never trust the client",
  duration: "45 min",
  difficulty: "intermediate",
  objectives: [
    "Validate all inputs server-side",
    "Return typed errors",
    "Paginate lists",
  ],
  content: [
    { kind: "title", text: "Input validation" },
    {
      kind: "paragraph",
      html: "The <strong>boundary</strong> of your system is every HTTP (or RPC) entry point. <strong>Never trust the client</strong>: a form check is UX; the server must re-validate types, required fields, lengths, and enums with a clear <strong>validation schema</strong> before business logic runs.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-shield-halved'></i> Classic trap",
        body: "AI-generated endpoints often accept <code>req.body</code> as-is, or rely on « the UI already validated ». Attackers call the API directly.",
      },
    },

    { kind: "title", text: "Typed errors and pagination" },
    {
      kind: "paragraph",
      html: "<strong>Typed errors</strong> give clients a stable shape (status + code / fields) rather than a random string or opaque 500. Pair them with correct HTTP statuses. For collections, <strong>paginate</strong> (limit + cursor or offset): unbounded « return all » handlers burn memory, time, and money.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-list-ol'></i> Lists",
        body: "Default a sensible page size. Cap the maximum. Always authorize which rows the caller may see, because validation alone does not fix IDOR.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-server'></i> <strong>Reflex</strong>: validate → authorize → act → respond with typed success or error; paginate every list.",
    },
  ],
  quiz: dataQuizzes.m02,
  exercises: [dataExercises.m02_1],
};
