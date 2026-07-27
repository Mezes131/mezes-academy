import { createContext, useContext } from "react";
import type { Phase } from "@/types";
import { findCourse } from "@/data";

/**
 * Everything the course layout (top nav, sidebar, course bar) and the
 * learning pages need to know about the course they are scoped to.
 */
export interface CourseArea {
  courseId: string;
  /** Route prefix of the learning area, e.g. "/react". */
  basePath: string;
  navTitle: string;
  navIcon: string;
  navAccent: { text: string; chip: string };
  phases: Phase[];
  /**
   * Whether the cross-cutting learner tools (search, progress, bookmarks,
   * final project) are wired for this course. ponytail: SVC will get them
   * once its dedicated pages exist; until then the CourseBar hides them.
   */
  learnerTools: boolean;
}

export const reactCourseArea: CourseArea = {
  courseId: "react",
  basePath: "/react",
  navTitle: "React de zéro à expert",
  navIcon: "fa-atom",
  navAccent: {
    text: "text-brand-core",
    chip: "bg-brand-core/10 text-brand-core border-brand-core/20",
  },
  phases: findCourse("react")?.phases ?? [],
  learnerTools: true,
};

export const svcCourseArea: CourseArea = {
  courseId: "svc",
  basePath: "/secure-vibe-coding",
  navTitle: "Secure Vibe Coding",
  navIcon: "fa-shield-halved",
  navAccent: {
    text: "text-violet-400",
    chip: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
  phases: findCourse("svc")?.phases ?? [],
  learnerTools: false,
};

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
