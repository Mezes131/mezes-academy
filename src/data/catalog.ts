/* ═══════════════════════════════════════════════════════════════════
   LANDING CATALOG
   Auto-derived from the course registry (`@/data/courses/`) so the
   landing stays in sync with the actual content — no more duplicate
   source of truth.

   Courses that are not yet registered (TypeScript, Next.js, Node.js,
   DevOps…) are listed here as placeholders until their data folder
   is implemented.
   ═══════════════════════════════════════════════════════════════════ */

import type { CourseMeta } from "@/types";
import { courses } from "./courses";

export interface CatalogCourse extends CourseMeta {
  slug: string;
  modules: number;
  href?: string;
}

/** Courses that are fully implemented in `@/data/courses/`. */
const activeCatalog: CatalogCourse[] = courses.map((course) => ({
  slug: course.slug,
  ...course.meta,
  modules: course.phases.reduce((acc, phase) => acc + phase.modules.length, 0),
  href: course.meta.status === "active" ? `/${course.slug}` : undefined,
}));

/** Courses that are announced but not yet implemented. */
const upcomingCatalog: CatalogCourse[] = [
  {
    slug: "typescript",
    title: "TypeScript en profondeur",
    tagline: "Le typage qui élève ton code",
    description:
      "Types primitifs, génériques, utility types, conditional types et patterns avancés. De l'initiation à la programmation au niveau des types.",
    icon: "fa-gem",
    accent: {
      text: "text-brand-ts",
      bg: "bg-brand-ts/10",
      border: "border-brand-ts/30",
    },
    tags: ["TypeScript 5", "Generics", "Type-level programming"],
    level: "Intermédiaire",
    duration: "≈6 semaines",
    modules: 12,
    status: "soon",
    eta: "",
  },
  {
    slug: "nextjs",
    title: "Next.js 14 & Fullstack",
    tagline: "Du front au back, sans couture",
    description:
      "App Router, Server Components, Server Actions, authentification, bases de données, déploiement. Construis et expose de vraies applications fullstack.",
    icon: "fa-bolt",
    accent: {
      text: "text-brand-eco",
      bg: "bg-brand-eco/10",
      border: "border-brand-eco/30",
    },
    tags: ["Next.js", "Server Components", "Prisma", "Auth"],
    level: "Intermédiaire",
    duration: "≈8 semaines",
    modules: 16,
    status: "soon",
    eta: "",
  },
  {
    slug: "node",
    title: "Node.js & APIs robustes",
    tagline: "Construire des back-ends production-ready",
    description:
      "Express, Fastify, bases de données relationnelles, tests, sécurité, déploiement. Tout ce qu'il faut pour poser des API solides en production.",
    icon: "fa-server",
    accent: {
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    },
    tags: ["Node.js", "Express", "PostgreSQL", "Tests"],
    level: "Intermédiaire",
    duration: "≈8 semaines",
    modules: 14,
    status: "soon",
    eta: "",
  },
  {
    slug: "devops",
    title: "DevOps pour développeurs",
    tagline: "Git, CI/CD, Docker, déploiement",
    description:
      "Les compétences ops d'un développeur moderne : GitHub Actions, Docker, monitoring, logs, déploiements Vercel & auto-hébergé. Sans devenir SRE.",
    icon: "fa-gears",
    accent: {
      text: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/30",
    },
    tags: ["Git", "GitHub Actions", "Docker", "Vercel"],
    level: "Tous niveaux",
    duration: "≈4 semaines",
    modules: 8,
    status: "planned",
    eta: "Bientôt disponible",
  },
];

export const catalog: CatalogCourse[] = [...activeCatalog, ...upcomingCatalog];

/** Global stats displayed on the landing page, computed from actual data. */
export const academyStats = {
  coursesActive: catalog.filter((c) => c.status === "active").length,
  coursesPlanned: catalog.filter((c) => c.status !== "active").length,
  lessonsCount: courses.reduce(
    (total, course) =>
      total +
      course.phases.reduce((acc, p) => acc + p.modules.length, 0),
    0,
  ),
  exercisesCount: courses.reduce(
    (total, course) =>
      total +
      course.phases.reduce(
        (acc, phase) =>
          acc +
          phase.modules.reduce((a, m) => a + (m.exercises?.length ?? 0), 0),
        0,
      ),
    0,
  ),
  quizzesCount: courses.reduce(
    (total, course) =>
      total +
      course.phases.reduce(
        (acc, phase) => acc + phase.modules.filter((m) => m.quiz).length,
        0,
      ),
    0,
  ),
};
