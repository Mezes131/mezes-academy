/* ═══════════════════════════════════════════════════════════════════
   LANDING CATALOG
   Derived from `@/data/courses/` so the landing stays in sync.
   Locale-aware for active courses; upcoming placeholders stay FR for now.
   ═══════════════════════════════════════════════════════════════════ */

import type { CourseMeta } from "@/types";
import type { Locale } from "@/i18n/types";
import { FLAGSHIP_SLUG, REACT_SLUG } from "@/lib/flagshipContinue";
import { courses, getCourses } from "./courses";

export interface CatalogCourse extends CourseMeta {
  slug: string;
  modules: number;
  href?: string;
  featured?: boolean;
}

const upcomingCatalogFr: CatalogCourse[] = [
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

const upcomingCatalogEn: CatalogCourse[] = [
  {
    slug: "devops",
    title: "DevOps for developers",
    tagline: "Git, CI/CD, Docker, deployment",
    description:
      "The ops basics you actually need day to day: GitHub Actions, Docker, logs, deploys. Without turning you into an SRE.",
    icon: "fa-gears",
    accent: {
      text: "text-pink-700 dark:text-pink-300",
      bg: "bg-pink-500/10",
      border: "border-pink-500/30",
    },
    tags: ["Git", "GitHub Actions", "Docker", "Vercel"],
    level: "All levels",
    duration: "≈4 weeks",
    modules: 8,
    status: "planned",
    eta: "Coming soon",
  },
];

function toCatalogCourse(
  course: ReturnType<typeof getCourses>[number],
): CatalogCourse {
  return {
    slug: course.slug,
    ...course.meta,
    modules: course.phases.reduce((acc, phase) => acc + phase.modules.length, 0),
    href: course.meta.status === "active" ? `/${course.slug}` : undefined,
  };
}

/** Locale-aware catalog for the landing grid. Flagship first, then React. */
export function getCatalog(locale: Locale = "fr"): CatalogCourse[] {
  const bySlug = new Map(
    getCourses(locale).map(toCatalogCourse).map((course) => [course.slug, course]),
  );
  const orderedSlugs = [FLAGSHIP_SLUG, REACT_SLUG];
  const ordered = orderedSlugs
    .map((slug) => bySlug.get(slug))
    .filter((course): course is CatalogCourse => Boolean(course))
    .map((course) =>
      course.slug === FLAGSHIP_SLUG ? { ...course, featured: true } : course,
    );
  const rest = [...bySlug.values()].filter(
    (course) => !orderedSlugs.includes(course.slug),
  );
  const upcoming = locale === "en" ? upcomingCatalogEn : upcomingCatalogFr;
  return [...ordered, ...rest, ...upcoming];
}

/** Default FR catalog (stats + static imports). */
export const catalog: CatalogCourse[] = getCatalog("fr");

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
