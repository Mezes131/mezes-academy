import type { Course, CourseProgram, Phase, Module } from "@/types";
import type { Locale } from "@/i18n/types";
import { courses, getCourses } from "./courses";

/* ═══════════════════════════════════════════════════════════════════
   DATA-LAYER HELPERS
   Single source of truth for course / phase / module lookups.
   ═══════════════════════════════════════════════════════════════════ */

export { courses, getCourses };

/** All modules of all courses, flattened : used by progress lookups. */
export const allModules: Array<{ course: Course; phase: Phase; module: Module }> =
  courses.flatMap((course) =>
    course.phases.flatMap((phase) =>
      phase.modules.map((module) => ({ course, phase, module })),
    ),
  );

export function findCourse(
  courseId: string,
  locale: Locale = "fr",
): Course | undefined {
  return getCourses(locale).find((c) => c.id === courseId);
}

export function findCourseProgram(
  courseId: string,
  locale: Locale = "fr",
): CourseProgram | undefined {
  return findCourse(courseId, locale)?.program;
}

export function findModule(
  moduleId: string,
): { course: Course; phase: Phase; module: Module } | undefined {
  for (const course of courses) {
    for (const phase of course.phases) {
      const mod = phase.modules.find((m) => m.id === moduleId);
      if (mod) return { course, phase, module: mod };
    }
  }
  return undefined;
}

/**
 * Number of "items" used to compute global progress.
 * Counts: each read module + each passed quiz (>= 70%) + each completed exercise.
 * When `courseId` is provided, only that course is counted.
 */
export function totalProgressItems(courseId?: string) {
  let total = 0;
  const scope = courseId ? courses.filter((c) => c.id === courseId) : courses;
  for (const course of scope) {
    for (const phase of course.phases) {
      for (const mod of phase.modules) {
        total += 1;
        if (mod.quiz) total += 1;
        if (mod.exercises) total += mod.exercises.length;
      }
    }
  }
  return total;
}
