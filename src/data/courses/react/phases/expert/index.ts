import type { Phase } from "@/types";
import { module28 } from "./modules/28-architecture";
import { module29 } from "./modules/29-devops";
import { module30 } from "./modules/30-internals";
import { module31 } from "./modules/31-open-source";
import { module32 } from "./modules/32-react-ai";

export const expertPhase: Phase = {
  id: "react-expert",
  slug: "expert",
  courseId: "react",
  color: "expert",
  icon: "fa-trophy",
  label: "Expert",
  title: "Expert & Légendaire",
  summary:
    "Le niveau senior : architecture, DevOps, internals de React, contribution open source et intégration de l'IA dans les applications.",
  metaTags: [
    "5 modules",
    "~8 semaines",
    "3 projets portfolio",
    "Architecture",
    "Open Source",
    "IA",
  ],
  modules: [module28, module29, module30, module31, module32],
};
