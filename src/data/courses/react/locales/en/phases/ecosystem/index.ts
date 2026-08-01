import type { Phase } from "@/types";
import { module22 } from "./modules/22-nextjs";
import { module23 } from "./modules/23-state-global";
import { module24 } from "./modules/24-auth";
import { module25 } from "./modules/25-database-orm";
import { module26 } from "./modules/26-testing";
import { module27 } from "./modules/27-performance-seo";

export const ecosystemPhase: Phase = {
  id: "react-ecosystem",
  slug: "ecosystem",
  courseId: "react",
  color: "eco",
  icon: "fa-rocket",
  label: "Ecosystem",
  title: "Ecosystem & Fullstack",
  summary:
    "Go beyond the client to build complete apps: Next.js, authentication, databases, tests, and performance.",
  metaTags: [
    "6 modules",
    "~8 weeks",
    "2 portfolio projects",
    "Next.js 14",
    "Fullstack",
  ],
  modules: [module22, module23, module24, module25, module26, module27],
};
