import type { Phase } from "@/types";
import { hebergementModule01 } from "./modules/01-choisir-ou-heberger";
import { hebergementModule02 } from "./modules/02-environnements";
import { hebergementModule03 } from "./modules/03-ci-cd-minimal";
import { hebergementModule04 } from "./modules/04-domaines-tls-dns";

/** Phase 10: authored content (replaces the program-derived scaffold). */
export const hebergementPhase: Phase = {
  id: "svc-hebergement",
  slug: "hebergement",
  courseId: "svc",
  color: "eco",
  icon: "fa-cloud-arrow-up",
  label: "Phase 10",
  title: "Hosting & deployment",
  summary: "Get the product live for real.",
  metaTags: ["hosting", "~2.5h read", "interactive audits", "CI/CD", "DNS"],
  modules: [
    hebergementModule01,
    hebergementModule02,
    hebergementModule03,
    hebergementModule04,
  ],
  project: {
    title: "Project P10: Preview + prod deployment",
    deliverable:
      "Capstone product deployed: preview + prod environments with public HTTPS URL.",
    assessment: [
      "Prod accessible over HTTPS on a public URL",
      "Preview distinct from prod",
      "Pipeline or deployment procedure documented",
    ],
  },
};
