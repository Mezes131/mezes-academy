import type { Course } from "@/types";
import { programToScaffoldPhases, type PhasePresentation } from "../programScaffold";
import { svcMeta } from "./meta";
import { svcProgram } from "./program";

const phasePresentation: Record<string, PhasePresentation> = {
  bases: { color: "intro", icon: "fa-globe", label: "Phase 0" },
  fondations: { color: "intro", icon: "fa-wand-magic-sparkles", label: "Phase 1" },
  prompt: { color: "core", icon: "fa-pen-to-square", label: "Phase 2" },
  architecture: { color: "core", icon: "fa-diagram-project", label: "Phase 3" },
  auth: { color: "eco", icon: "fa-user-lock", label: "Phase 4" },
  data: { color: "eco", icon: "fa-database", label: "Phase 5" },
  paiements: { color: "eco", icon: "fa-credit-card", label: "Phase 6" },
  notifications: { color: "eco", icon: "fa-envelope", label: "Phase 7" },
  "audit-securite": { color: "expert", icon: "fa-shield-halved", label: "Phase 8" },
  "audit-qualite": { color: "expert", icon: "fa-gauge-high", label: "Phase 9" },
  hebergement: { color: "eco", icon: "fa-cloud-arrow-up", label: "Phase 10" },
  ops: { color: "expert", icon: "fa-heart-pulse", label: "Phase 11" },
  ship: { color: "core", icon: "fa-rocket", label: "Phase 12" },
  capstone: { color: "expert", icon: "fa-award", label: "Capstone" },
};

/**
 * Secure Vibe Coding. Blueprint-level for now: the syllabus lives in
 * `program/`; lesson content will be authored in Strapi. Phases are
 * scaffold-only, derived from the program.
 */
export const svcCourse: Course = {
  id: "svc",
  slug: "secure-vibe-coding",
  meta: svcMeta,
  program: svcProgram,
  phases: programToScaffoldPhases(svcProgram, phasePresentation),
};
