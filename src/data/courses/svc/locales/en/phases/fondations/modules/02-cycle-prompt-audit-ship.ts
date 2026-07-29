import type { Module } from "@/types";
import { fondationsQuizzes } from "../quizzes";
import { fondationsExercises } from "../exercises";

export const fondationsModule02: Module = {
  id: "svc-fondations-m02",
  index: "02",
  title: "The Prompt → Audit → Ship cycle",
  subtitle: "The thread running through the whole course",
  duration: "30 min",
  difficulty: "intro",
  objectives: [
    "Explain why three distinct phases",
    "Describe what you produce at each phase",
    "Prefer small loops over one big tunnel",
  ],
  content: [
    { kind: "title", text: "Why three phases" },
    {
      kind: "paragraph",
      html: "Mixing specification, generation, verification, and go-live in one rush is the tunnel. We deliberately separate:",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-pen'></i> <strong>Prompt</strong> (specify and generate): write the need clearly, then generate a limited proposal.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-shield-halved'></i> <strong>Audit</strong> (verify with proof): check with checklists and evidence (not « looks ok »).",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-rocket'></i> <strong>Ship</strong> (deliver with evidence): release a version (preview or production) carrying that proof.",
    },
    {
      kind: "paragraph",
      html: "Every course phase (sign-in, payments, hosting…) replays this rhythm. You learn not only technical building blocks: you learn a <strong>delivery discipline</strong>.",
    },

    { kind: "title", text: "Small loop vs tunnel" },
    {
      kind: "paragraph",
      html: "A small loop: one micro-feature, a readable change preview, an audit, a partial release. A tunnel: 95 files at once, « we will verify Monday ». The tunnel makes human verification impossible and multiplies forgotten secrets.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-rotate'></i> Practical rule",
        body: "If you cannot summarize the changes in three sentences, the batch is too big. Split it again before auditing.",
      },
    },
    {
      kind: "paragraph",
      html: "The exercise below has you tell healthy steps for a contact form apart from tunnel habits. Later, audit evidence becomes more formal (automatic tools, scores, procedures).",
    },
  ],
  quiz: fondationsQuizzes.m02,
  exercises: [fondationsExercises.m02_1],
};
