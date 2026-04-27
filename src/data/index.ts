import type { Course, CourseProgram, Phase, Module } from "@/types";
import { courses } from "./courses";

/* ═══════════════════════════════════════════════════════════════════
   DATA-LAYER HELPERS
   Single source of truth for course / phase / module lookups.
   UI code should import from here (or from @/data/phases for the
   legacy `phases` array) rather than touching course files directly.
   ═══════════════════════════════════════════════════════════════════ */

export { courses };

/** Back-office ready syllabi, when a course exposes one. */
export const allPrograms: CourseProgram[] = courses
  .map((course) => course.program)
  .filter((program): program is CourseProgram => Boolean(program));

/** All phases of all courses, flattened — used by the router. */
export const allPhases: Phase[] = courses.flatMap((c) => c.phases);

/** All modules of all courses, flattened — used by the router. */
export const allModules: Array<{ course: Course; phase: Phase; module: Module }> =
  courses.flatMap((course) =>
    course.phases.flatMap((phase) =>
      phase.modules.map((module) => ({ course, phase, module })),
    ),
  );

export function findCourse(courseId: string): Course | undefined {
  return courses.find((c) => c.id === courseId);
}

export function findCourseProgram(courseId: string): CourseProgram | undefined {
  return findCourse(courseId)?.program;
}

export function findPhase(phaseId: string): { course: Course; phase: Phase } | undefined {
  for (const course of courses) {
    const phase = course.phases.find((p) => p.id === phaseId);
    if (phase) return { course, phase };
  }
  return undefined;
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
