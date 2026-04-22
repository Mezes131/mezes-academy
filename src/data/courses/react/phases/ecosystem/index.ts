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
  label: "Écosystème",
  title: "Écosystème & Fullstack",
  summary:
    "Dépasser le client pour construire des applications complètes : Next.js, authentification, bases de données, tests et performance.",
  metaTags: [
    "6 modules",
    "~8 semaines",
    "2 projets portfolio",
    "Next.js 14",
    "Fullstack",
  ],
  modules: [module22, module23, module24, module25, module26, module27],
};
