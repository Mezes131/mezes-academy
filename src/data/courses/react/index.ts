import type { Course, Phase } from "@/types";
import type { Locale } from "@/i18n/types";
import { reactMeta } from "./meta";
import { reactMetaEn } from "./meta.en";
import { reactProgram } from "./program";
import { reactProgramEn } from "./program.en";
import { introPhase as introPhaseFr } from "./phases/intro";
import { corePhase as corePhaseFr } from "./phases/core";
import { typescriptPhase as typescriptPhaseFr } from "./phases/typescript";
import { ecosystemPhase as ecosystemPhaseFr } from "./phases/ecosystem";
import { expertPhase as expertPhaseFr } from "./phases/expert";
import { toolingPhase as toolingPhaseFr } from "./phases/tooling";
import { introPhase as introPhaseEn } from "./locales/en/phases/intro";
import { corePhase as corePhaseEn } from "./locales/en/phases/core";
import { typescriptPhase as typescriptPhaseEn } from "./locales/en/phases/typescript";
import { ecosystemPhase as ecosystemPhaseEn } from "./locales/en/phases/ecosystem";
import { expertPhase as expertPhaseEn } from "./locales/en/phases/expert";
import { toolingPhase as toolingPhaseEn } from "./locales/en/phases/tooling";

/** FR authored phases (canonical ids). */
const authoredFr: Record<string, Phase> = {
  [introPhaseFr.id]: introPhaseFr,
  [corePhaseFr.id]: corePhaseFr,
  [typescriptPhaseFr.id]: typescriptPhaseFr,
  [ecosystemPhaseFr.id]: ecosystemPhaseFr,
  [expertPhaseFr.id]: expertPhaseFr,
  [toolingPhaseFr.id]: toolingPhaseFr,
};

/** EN authored phases (same ids as FR). */
const authoredEn: Record<string, Phase> = {
  [introPhaseEn.id]: introPhaseEn,
  [corePhaseEn.id]: corePhaseEn,
  [typescriptPhaseEn.id]: typescriptPhaseEn,
  [ecosystemPhaseEn.id]: ecosystemPhaseEn,
  [expertPhaseEn.id]: expertPhaseEn,
  [toolingPhaseEn.id]: toolingPhaseEn,
};

const phaseOrder = [
  "react-intro",
  "react-core",
  "react-typescript",
  "react-ecosystem",
  "react-expert",
  "react-tooling",
] as const;

/**
 * React track. FR content stays under `phases/`; EN under `locales/en/phases/`.
 * Missing EN phases fall back to FR (same merge pattern as SVC).
 */
export function buildReactCourse(locale: Locale = "fr"): Course {
  const authored =
    locale === "en" ? { ...authoredFr, ...authoredEn } : authoredFr;
  return {
    id: "react",
    slug: "react",
    meta: locale === "en" ? reactMetaEn : reactMeta,
    program: locale === "en" ? reactProgramEn : reactProgram,
    phases: phaseOrder.map((id) => authored[id]).filter(Boolean),
  };
}

/** Default FR catalog (tests + static imports). */
export const reactCourse: Course = buildReactCourse("fr");
