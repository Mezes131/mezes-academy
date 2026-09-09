import type { Phase } from "@/types";
import { notificationsModule01 } from "./modules/01-canaux-moments";
import { notificationsModule02 } from "./modules/02-provider-email";
import { notificationsModule03 } from "./modules/03-opt-in-preferences-abuse";
import { notificationsModule04 } from "./modules/04-orchestration";

/** Phase 7: authored content (replaces the program-derived scaffold). */
export const notificationsPhase: Phase = {
  id: "svc-notifications",
  slug: "notifications",
  courseId: "svc",
  color: "eco",
  icon: "fa-envelope",
  label: "Phase 7",
  title: "Notifications & channels",
  summary: "Make email (and related channels) a first-class part of the product.",
  metaTags: ["product", "~2.5h read", "interactive audits", "notifications"],
  modules: [
    notificationsModule01,
    notificationsModule02,
    notificationsModule03,
    notificationsModule04,
  ],
  project: {
    title: "Project P7: Transactional emails + preferences",
    deliverable:
      "The capstone product with three transactional emails (auth + payment) and respected user preferences.",
    assessment: [
      "Three emails wired to real events",
      "Preferences and unsubscribe respected",
      "Decoupled sending (queue/job) rather than inside the HTTP request",
    ],
  },
};
