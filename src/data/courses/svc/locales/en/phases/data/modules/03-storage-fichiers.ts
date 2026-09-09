import type { Module } from "@/types";
import { dataQuizzes } from "../quizzes";
import { dataExercises } from "../exercises";

export const dataModule03: Module = {
  id: "svc-data-m03",
  index: "03",
  title: "Storage & files",
  subtitle: "Uploads, signed URLs, quotas, ACL",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Handle safe uploads",
    "Serve files via signed URLs",
    "Apply quotas and access control",
  ],
  content: [
    { kind: "title", text: "Safe uploads" },
    {
      kind: "paragraph",
      html: "Files are untrusted blobs. A <strong>safe upload</strong> checks <strong>size</strong>, <strong>allowed types</strong>, and who may upload, then stores the object in dedicated <strong>object storage</strong> (S3-style services are common market examples) with metadata in your database. Do not dump arbitrary binaries into a public folder « to go faster ».",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-hard-drive'></i> Split concerns",
        body: "Database for structured facts; object store for files. Keep provider credentials on the server, same rule as any third-party provider.",
      },
    },

    { kind: "title", text: "Signed URLs and ACL" },
    {
      kind: "paragraph",
      html: "A <strong>signed URL</strong> grants time-limited access to one object so you do not have to open the whole bucket. <strong>ACL</strong> (access control) decides who may request that URL, usually the org owner / members. <strong>Quotas</strong> cap how much each user or org can store so one account cannot fill the bill.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Key ≠ permission",
        body: "Guessable or leaked object keys with no auth check are the file equivalent of IDOR. In other words, obscurity does not replace ACL.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-lock'></i> <strong>Reflex</strong>: validate upload → private store → authorize → short-lived signed URL → enforce quotas.",
    },
  ],
  quiz: dataQuizzes.m03,
  exercises: [dataExercises.m03_1],
};
