import type { Phase } from "@/types";
import { architectureModule01 } from "./modules/01-decouper-systeme";
import { architectureModule02 } from "./modules/02-secrets-environnements";
import { architectureModule03 } from "./modules/03-contrats-frontieres";

/** Phase 3: authored content (replaces the program-derived scaffold). */
export const architecturePhase: Phase = {
  id: "svc-architecture",
  slug: "architecture",
  courseId: "svc",
  color: "core",
  icon: "fa-diagram-project",
  label: "Phase 3",
  title: "Architecture of a vibe product",
  summary:
    "Split a shippable system before generating: building blocks, trust boundaries, secrets per environment, contracts and webhooks.",
  metaTags: ["core track", "~2h read", "interactive audits", "architecture"],
  modules: [architectureModule01, architectureModule02, architectureModule03],
  project: {
    title: "P3 project: Capstone target architecture",
    deliverable:
      "An architecture folder for the future capstone: block diagram, decisions, risks (offline for now; m02/m03 audits train the key reflexes).",
    assessment: [
      "Readable diagram with trust boundaries",
      "Justified decisions (explicit trade-offs)",
      "Identified risks with mitigation ideas",
    ],
  },
};
