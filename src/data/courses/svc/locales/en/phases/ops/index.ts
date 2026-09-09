import type { Phase } from "@/types";
import { opsModule01 } from "./modules/01-logs-utiles";
import { opsModule02 } from "./modules/02-monitoring-alertes";
import { opsModule03 } from "./modules/03-backups-incident";

/** Phase 11: authored content (replaces the program-derived scaffold). */
export const opsPhase: Phase = {
  id: "svc-ops",
  slug: "ops",
  courseId: "svc",
  color: "expert",
  icon: "fa-heart-pulse",
  label: "Phase 11",
  title: "Observability & lightweight ops",
  summary: "Know when it breaks: and what to do when it does.",
  metaTags: ["observability", "~1.5h read", "interactive audits", "logs", "alerts"],
  modules: [opsModule01, opsModule02, opsModule03],
  project: {
    title: "Project P11: Runbook + live alert",
    deliverable:
      "Product runbook + at least one alert actually active on the prod environment.",
    assessment: [
      "Actionable one-page runbook",
      "Triggerable and tested alert",
      "Restorable backup demonstrated",
    ],
  },
};
