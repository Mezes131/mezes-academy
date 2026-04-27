import type { Course } from "@/types";
import { reactCourse } from "./react";

/**
 * Registry of all courses available in the Academy.
 *
 * To add a new course (e.g. TypeScript, Next.js), create
 * `src/data/courses/<courseId>/` mirroring the React structure:
 *   - `meta.ts` — catalog entry (title, tagline, status…)
 *   - `program.ts` — back-office ready syllabus and authoring priorities
 *   - `phases/<phaseSlug>/` — one folder per phase
 *   - `index.ts` — exports a `Course` object
 *
 * Then import it here and append it to the array below.
 */
export const courses: Course[] = [reactCourse];
