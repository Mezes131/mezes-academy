import type { Course } from "@/types";
import { svcMeta } from "./meta";

/**
 * Secure Vibe Coding. Blueprint-level for now: the syllabus lives in
 * `program/` (added task by task); lesson content will be authored in Strapi.
 */
export const svcCourse: Course = {
  id: "svc",
  slug: "secure-vibe-coding",
  meta: svcMeta,
  phases: [],
};
