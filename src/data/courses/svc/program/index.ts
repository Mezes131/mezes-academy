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
 * Secure Vibe Coding : programme back-office ready.
 * Source : docs/courses/secure-vibe-coding-syllabus.md (draft validé 2026-07-27).
 * Fil conducteur : dès P4, les projets de phase alimentent le même produit
 * qui devient le capstone.
 */
export const svcProgram: CourseProgram = {
  courseId: "svc",
  version: "2026-07-27",
  reusableStructure: [
    "Cycle Prompt → Audit → Ship appliqué à chaque phase",
    "Checklists Strapi : security-baseline (P8), performance-baseline / design-baseline / accessibility-baseline (P9), toutes au capstone",
    "Quiz de module : 5 questions ; quick-check de leçon : 3 questions",
    "Projet de phase = incrément du produit capstone à partir de P4",
    "Certificat : svc-cert-<learnerId>-<yyyy-mm> si rubrique validée",
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
      target: "P1–P3 (fondations, prompt, architecture)",
      rationale: "Socle du cycle et de l'architecture : requis par tout le reste.",
    },
    {
      order: 2,
      target: "P4–P7 (auth, data, paiements, notifications)",
      rationale: "Rend le produit fil rouge monétisable : cœur de la promesse.",
    },
    {
      order: 3,
      target: "P8–P9 (audits sécurité et qualité)",
      rationale: "Différenciateur « Secure » du positionnement.",
    },
    {
      order: 4,
      target: "P10–P12 (hébergement, ops, ship)",
      rationale: "Go-live : transforme le projet en produit en ligne.",
    },
    {
      order: 5,
      target: "Capstone briefs + rubrique certificat",
      rationale: "Formalise l'évaluation finale une fois le parcours stable.",
    },
    {
      order: 6,
      target: "P0 (bases web, optionnelle)",
      rationale: "Hors chemin critique : peut être produite en parallèle.",
    },
  ],
};
