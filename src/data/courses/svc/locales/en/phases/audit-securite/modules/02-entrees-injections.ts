import type { Module } from "@/types";
import { auditSecuriteQuizzes } from "../quizzes";
import { auditSecuriteExercises } from "../exercises";

export const auditSecuriteModule02: Module = {
  id: "svc-audit-securite-m02",
  index: "02",
  title: "User input and injections",
  subtitle: "SQL, NoSQL, commands, XSS, uploads",
  duration: "50 min",
  difficulty: "intermediate",
  objectives: [
    "Validate at boundaries systematically",
    "Detect SQL/NoSQL/command injections",
    "Audit front-end XSS",
  ],
  content: [
    { kind: "title", text: "Injections" },
    {
      kind: "paragraph",
      html: "Every input (query, body, header, file) is <strong>hostile</strong> until proven otherwise. Validate at <strong>boundaries</strong> on the server: schemas, types, allowlists. <strong>SQL/NoSQL</strong> injection comes from concatenation; the baseline fix is <strong>parameterized queries</strong> (or a correctly used ORM). <strong>Command</strong> injection comes from <code>exec</code> / a shell with user input, so prefer shell-free APIs.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-robot'></i> AI pitfall",
        body: "AI gladly generates `WHERE id = ${id}` or `exec(`ping ${host}`)` « to go fast ». Refuse concatenation. The front end is not a trust boundary.",
      },
    },
    { kind: "title", text: "XSS and uploads" },
    {
      kind: "paragraph",
      html: "<strong>XSS</strong>: uncontrolled HTML or script rendered into the DOM. In React, <code>dangerouslySetInnerHTML</code> with user content and no sanitization is an open door. For <strong>uploads</strong>: do not trust the client MIME; limit size/type, treat filenames as untrusted, store outside execution paths.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-broom'></i> HTML output",
        body: "Escaped text by default. If you must render rich HTML: strict sanitization, CSP as defense in depth.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-syringe'></i> <strong>Rule</strong>: validate on input, parameterize queries, and never inject untrusted raw HTML.",
    },
  ],
  quiz: auditSecuriteQuizzes.m02,
  exercises: [auditSecuriteExercises.m02_1, auditSecuriteExercises.m02_2],
};
