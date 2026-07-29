import type { Course } from "@/types";
import type { Locale } from "@/i18n/types";
import { reactCourse } from "./react";
import { buildSvcCourse, svcCourse } from "./svc";

/**
 * Registry of all courses available in the Academy.
 * SVC content is locale-aware; React stays FR in V1.
 */
export function getCourses(locale: Locale = "fr"): Course[] {
  return [reactCourse, buildSvcCourse(locale)];
}

/** Default FR registry (progress math, tests). */
export const courses: Course[] = getCourses("fr");

export { svcCourse, buildSvcCourse };
