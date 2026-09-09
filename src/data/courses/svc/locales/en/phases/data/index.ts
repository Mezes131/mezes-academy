import type { Phase } from "@/types";
import { dataModule01 } from "./modules/01-modele-donnees";
import { dataModule02 } from "./modules/02-api-validation";
import { dataModule03 } from "./modules/03-storage-fichiers";
import { dataModule04 } from "./modules/04-jobs-async";

/** Phase 5: authored content (replaces the program-derived scaffold). */
export const dataPhase: Phase = {
  id: "svc-data",
  slug: "data",
  courseId: "svc",
  color: "eco",
  icon: "fa-database",
  label: "Phase 5",
  title: "Data & backend",
  summary: "Solid persistence, API, and async processing for the product.",
  metaTags: ["product", "~3h read", "interactive audits", "data"],
  modules: [dataModule01, dataModule02, dataModule03, dataModule04],
  project: {
    title: "Project P5: Business CRUD + upload + async job",
    deliverable:
      "The enriched capstone product: business CRUD, file upload, and an async job, generated then audited.",
    assessment: [
      "Systematic server-side validation",
      "Upload with proven access control",
      "Idempotent, replayable async job",
    ],
  },
};
