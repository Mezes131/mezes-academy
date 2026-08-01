import type { Course } from "@/types";
import type { Locale } from "@/i18n/types";
import { buildReactCourse, reactCourse } from "./react";
import { buildSvcCourse, svcCourse } from "./svc";

/**
 * Registry of all courses available in the Academy.
 * Both React and SVC content are locale-aware (EN falls back to FR).
 */
export function getCourses(locale: Locale = "fr"): Course[] {
  return [buildReactCourse(locale), buildSvcCourse(locale)];
}

/** Default FR registry (progress math, tests). */
export const courses: Course[] = getCourses("fr");

export { reactCourse, buildReactCourse, svcCourse, buildSvcCourse };
