import type { Course, Phase } from "@/types";
import type { Locale } from "@/i18n/types";
import { programToScaffoldPhases, type PhasePresentation } from "../programScaffold";
import { svcMeta } from "./meta";
import { svcProgram } from "./program";
import { basesPhase as basesPhaseFr } from "./locales/fr/phases/bases";
import { fondationsPhase as fondationsPhaseFr } from "./locales/fr/phases/fondations";
import { promptPhase as promptPhaseFr } from "./locales/fr/phases/prompt";
import { architecturePhase as architecturePhaseFr } from "./locales/fr/phases/architecture";
import { authPhase as authPhaseFr } from "./locales/fr/phases/auth";
import { basesPhase as basesPhaseEn } from "./locales/en/phases/bases";
import { fondationsPhase as fondationsPhaseEn } from "./locales/en/phases/fondations";
import { promptPhase as promptPhaseEn } from "./locales/en/phases/prompt";
import { architecturePhase as architecturePhaseEn } from "./locales/en/phases/architecture";
import { authPhase as authPhaseEn } from "./locales/en/phases/auth";

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

const authoredFr: Record<string, Phase> = {
  [basesPhaseFr.id]: basesPhaseFr,
  [fondationsPhaseFr.id]: fondationsPhaseFr,
  [promptPhaseFr.id]: promptPhaseFr,
  [architecturePhaseFr.id]: architecturePhaseFr,
  [authPhaseFr.id]: authPhaseFr,
};

/** EN-authored phases (same phase ids as FR). */
const authoredEn: Record<string, Phase> = {
  [basesPhaseEn.id]: basesPhaseEn,
  [fondationsPhaseEn.id]: fondationsPhaseEn,
  [promptPhaseEn.id]: promptPhaseEn,
  [architecturePhaseEn.id]: architecturePhaseEn,
  [authPhaseEn.id]: authPhaseEn,
};

/**
 * Secure Vibe Coding. Syllabus in `program/`; authored phases under
 * `locales/{fr,en}/phases/`. Missing EN phases fall back to FR.
 */
export function buildSvcCourse(locale: Locale = "fr"): Course {
  const authored =
    locale === "en" ? { ...authoredFr, ...authoredEn } : authoredFr;
  return {
    id: "svc",
    slug: "secure-vibe-coding",
    meta: svcMeta,
    program: svcProgram,
    phases: programToScaffoldPhases(svcProgram, phasePresentation).map(
      (phase) => authored[phase.id] ?? phase,
    ),
  };
}

/** Default FR catalog (tests + static imports). */
export const svcCourse: Course = buildSvcCourse("fr");
