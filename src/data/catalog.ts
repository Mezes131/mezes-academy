/* ═══════════════════════════════════════════════════════════════════
   LANDING CATALOG
   Auto-derived from the course registry (`@/data/courses/`) so the
   landing stays in sync with the actual content : no more duplicate
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
    slug: "devops",
    title: "DevOps pour développeurs",
    tagline: "Git, CI/CD, Docker, déploiement",
    description:
      "Les bases ops dont tu as vraiment besoin au quotidien : GitHub Actions, Docker, logs, déploiement. Sans te transformer en SRE.",
    icon: "fa-gears",
    accent: {
      text: "text-pink-700 dark:text-pink-300",
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
