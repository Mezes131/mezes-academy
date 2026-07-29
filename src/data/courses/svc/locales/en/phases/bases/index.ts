import type { Phase } from "@/types";
import { basesModule01 } from "./modules/01-http-html-js";
import { basesModule02 } from "./modules/02-git-projet-local";
import { basesModule03 } from "./modules/03-front-api";

/** Phase 0 : authored content (replaces the program-derived scaffold). */
export const basesPhase: Phase = {
  id: "svc-bases",
  slug: "bases",
  courseId: "svc",
  color: "intro",
  icon: "fa-globe",
  label: "Phase 0",
  title: "Web basics (optional)",
  summary:
    "For product builders coming from no-code: the web vocabulary and habits you need to follow the core path. Skip freely if your basics are already solid.",
  metaTags: ["optional", "reading ~1h45", "no prerequisites", "off critical path"],
  modules: [basesModule01, basesModule02, basesModule03],
  project: {
    title: "Project P0: Page connected to an API",
    deliverable:
      "A page that calls a public API and correctly shows loading / error / success states.",
    assessment: [
      "All three states are visible and correct",
      "HTTP errors are handled explicitly",
      "The project is versioned cleanly (.gitignore, .env.example)",
    ],
  },
};
