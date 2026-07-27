import type { Phase } from "@/types";
import { authModule01 } from "./modules/01-modeles-auth";
import { authModule02 } from "./modules/02-brancher-provider";
import { authModule03 } from "./modules/03-autorisation";
import { authModule04 } from "./modules/04-parcours-sensibles";

/** Phase 4: authored content (replaces the program-derived scaffold). */
export const authPhase: Phase = {
  id: "svc-auth",
  slug: "auth",
  courseId: "svc",
  color: "eco",
  icon: "fa-user-lock",
  label: "Phase 4",
  title: "Auth & identity",
  summary:
    "Wire a real sign-in provider: never reinvent auth. From here, phase projects feed the capstone product.",
  metaTags: ["product", "~3h read", "interactive audits", "auth"],
  modules: [authModule01, authModule02, authModule03, authModule04],
  project: {
    title: "P4 project: Third-party auth + admin zone",
    deliverable:
      "Auth checklist + validated admin zone (P4 project exercise in module 04): third-party provider, server protections, access policy. Real integration happens on the capstone repo.",
    assessment: [
      "End-to-end sign-in provider (off-platform: on your repo)",
      "Admin zone protected on the server",
      "Written, consistent access policy",
    ],
  },
};
