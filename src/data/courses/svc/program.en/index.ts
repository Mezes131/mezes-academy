import type { CourseProgram } from "@/types";
import {
  architecturePhase,
  basesPhase,
  fondationsPhase,
  promptPhase,
} from "./foundations";
import {
  authPhase,
  dataPhase,
  notificationsPhase,
  paiementsPhase,
} from "./product";
import {
  auditQualitePhase,
  auditSecuritePhase,
  hebergementPhase,
  opsPhase,
  shipPhase,
} from "./audit-ship";
import { capstonePhase } from "./capstone";

/**
 * Secure Vibe Coding: back-office-ready program (English).
 * Source: docs/courses/secure-vibe-coding-syllabus.md (draft validated 2026-07-27).
 * Thread: from P4 onward, phase projects feed the same product that becomes the capstone.
 */
export const svcProgramEn: CourseProgram = {
  courseId: "svc",
  version: "2026-07-27",
  reusableStructure: [
    "Prompt → Audit → Ship cycle applied to every phase",
    "Strapi checklists: security-baseline (P8), performance-baseline / design-baseline / accessibility-baseline (P9), all at capstone",
    "Module quiz: 5 questions; lesson quick-check: 3 questions",
    "Phase project = capstone product increment starting at P4",
    "Certificate: svc-cert-<learnerId>-<yyyy-mm> when rubric is passed",
  ],
  phases: [
    basesPhase,
    fondationsPhase,
    promptPhase,
    architecturePhase,
    authPhase,
    dataPhase,
    paiementsPhase,
    notificationsPhase,
    auditSecuritePhase,
    auditQualitePhase,
    hebergementPhase,
    opsPhase,
    shipPhase,
    capstonePhase,
  ],
  authoringPriorities: [
    {
      order: 1,
      target: "P1–P3 (foundations, prompt, architecture)",
      rationale: "Core of the cycle and architecture: required by everything else.",
    },
    {
      order: 2,
      target: "P4–P7 (auth, data, payments, notifications)",
      rationale: "Makes the thread product monetizable: the heart of the promise.",
    },
    {
      order: 3,
      target: "P8–P9 (security and quality audits)",
      rationale: "Differentiator for the « Secure » positioning.",
    },
    {
      order: 4,
      target: "P10–P12 (hosting, ops, ship)",
      rationale: "Go-live: turns the project into a live product.",
    },
    {
      order: 5,
      target: "Capstone briefs + certificate rubric",
      rationale: "Formalize final assessment once the path is stable.",
    },
    {
      order: 6,
      target: "P0 (web foundations, optional)",
      rationale: "Off critical path: can be produced in parallel.",
    },
  ],
};
