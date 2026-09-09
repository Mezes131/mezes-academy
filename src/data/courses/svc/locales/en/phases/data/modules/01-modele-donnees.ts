import type { Module } from "@/types";
import { dataQuizzes } from "../quizzes";
import { dataExercises } from "../exercises";

export const dataModule01: Module = {
  id: "svc-data-m01",
  index: "01",
  title: "A useful data model",
  subtitle: "Entities, relations, migrations: no hallucinated schema",
  duration: "40 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Model entities and relations from requirements",
    "Manage migrations cleanly",
    "Spot an AI-hallucinated schema",
  ],
  content: [
    { kind: "title", text: "Entities and relations" },
    {
      kind: "paragraph",
      html: "A <strong>data model</strong> translates the product into durable facts: <strong>entities</strong> (user, org, resource…), <strong>relations</strong> (belongs to, owns, member of), and usually <strong>foreign keys</strong> so the database enforces those links. Start from the brief rather than from a dump of tables the AI invented.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-diagram-project'></i> Minimal first",
        body: "For a simple SaaS: users, orgs, membership, and resources owned by an org cover most early needs. Add tables when a real feature demands them.",
      },
    },

    { kind: "title", text: "Migrations and hallucinated schema" },
    {
      kind: "paragraph",
      html: "<strong>Migrations</strong> version schema changes so every environment evolves the same way. AI often ships a <strong>hallucinated schema</strong>: unused tables, redundant columns, missing ownership keys. Treat every proposed field as a claim to audit. Postgres (or any solid relational store) is a market example rather than a brand mandate.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Schema review",
        body: "Unnecessary generated tables and duplicate fields slow you down and hide tenancy bugs. Reject what the product does not need.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-database'></i> <strong>Phase rule</strong>: model from requirements, migrate deliberately, refuse hallucinated tables.",
    },
  ],
  quiz: dataQuizzes.m01,
  exercises: [dataExercises.m01_1],
};
