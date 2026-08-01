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
  title: "Expert & Legendary",
  summary:
    "Senior level: architecture, DevOps, React internals, open-source contribution, and integrating AI into applications.",
  metaTags: [
    "5 modules",
    "~8 weeks",
    "3 portfolio projects",
    "Architecture",
    "Open Source",
    "AI",
  ],
  modules: [module28, module29, module30, module31, module32],
};
