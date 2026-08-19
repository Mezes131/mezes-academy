import { getCourses } from "@/data/courses";
import type { LessonProgress } from "@/types";
import { computeCourseStats } from "./courseProgress";

export const FLAGSHIP_SLUG = "secure-vibe-coding";
export const REACT_SLUG = "react";
export const FLAGSHIP_COURSE_PATH = `/${FLAGSHIP_SLUG}`;
export const REACT_COURSE_PATH = `/${REACT_SLUG}`;

export function courseHasProgress(
  slug: string,
  progress: LessonProgress,
): boolean {
  const course = getCourses("fr").find((c) => c.slug === slug);
  if (!course) return false;
  return computeCourseStats(course.phases, progress).done > 0;
}

/** Landing / nav continue target: SVC first, then React, else flagship. */
export function continuePathForProgress(progress: LessonProgress): string {
  if (courseHasProgress(FLAGSHIP_SLUG, progress)) return FLAGSHIP_COURSE_PATH;
  if (courseHasProgress(REACT_SLUG, progress)) return REACT_COURSE_PATH;
  return FLAGSHIP_COURSE_PATH;
}

/** True when `next` is the post-auth default (locale-prefixed or raw). */
export function isDefaultAuthNext(
  nextPath: string,
  localePath: (path: string) => string,
): boolean {
  return (
    nextPath === localePath(FLAGSHIP_COURSE_PATH) ||
    nextPath === FLAGSHIP_COURSE_PATH
  );
}
