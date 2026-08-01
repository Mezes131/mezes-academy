import { createContext, useContext } from "react";
import type { Phase } from "@/types";
import type { Locale } from "@/i18n/types";
import { localePath } from "@/i18n/localePath";
import { findCourse } from "@/data";

/**
 * Everything the course layout (top nav, sidebar, course bar) and the
 * learning pages need to know about the course they are scoped to.
 */
export interface CourseArea {
  courseId: string;
  /** Route prefix of the learning area, e.g. "/react" or "/en/react". */
  basePath: string;
  navTitle: string;
  navIcon: string;
  navAccent: { text: string; chip: string };
  phases: Phase[];
  /**
   * Whether the cross-cutting learner tools (search, progress, bookmarks,
   * final project) are wired for this course.
   */
  learnerTools: boolean;
  /** Capstone / final-project shortcut in CourseBar (React only for now). */
  showFinalProject?: boolean;
}

/** Branding + route without locale-resolved phases. */
export type CourseAreaBase = Omit<CourseArea, "phases">;

export const reactCourseArea: CourseAreaBase = {
  courseId: "react",
  basePath: "/react",
  navTitle: "React de zéro à expert",
  navIcon: "fa-atom",
  navAccent: {
    text: "text-brand-core",
    chip: "bg-brand-core/10 text-brand-core border-brand-core/20",
  },
  learnerTools: true,
  showFinalProject: true,
};

export const svcCourseArea: CourseAreaBase = {
  courseId: "svc",
  basePath: "/secure-vibe-coding",
  navTitle: "Secure Vibe Coding",
  navIcon: "fa-shield-halved",
  navAccent: {
    text: "text-violet-400",
    chip: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
  learnerTools: true,
  showFinalProject: false,
};

const navTitleEn: Record<string, string> = {
  react: "React from zero to expert",
  svc: "Secure Vibe Coding",
};

export function resolveCourseArea(
  base: CourseAreaBase,
  locale: Locale,
): CourseArea {
  return {
    ...base,
    basePath: localePath(base.basePath, locale),
    navTitle:
      locale === "en"
        ? (navTitleEn[base.courseId] ?? base.navTitle)
        : base.navTitle,
    phases: findCourse(base.courseId, locale)?.phases ?? [],
  };
}

export const CourseAreaContext = createContext<CourseArea | null>(null);

export function useCourseArea(): CourseArea {
  const area = useContext(CourseAreaContext);
  if (!area) {
    throw new Error("useCourseArea doit être appelé sous un <CourseLayout>");
  }
  return area;
}

/** Find a module and its phase within a course area. */
export function findAreaModule(area: CourseArea, moduleId: string) {
  for (const phase of area.phases) {
    const module = phase.modules.find((mod) => mod.id === moduleId);
    if (module) return { phase, module };
  }
  return undefined;
}
