import type { Course } from "@/types";
import { svcMeta } from "./meta";
import { svcProgram } from "./program";

/**
 * Secure Vibe Coding. Blueprint-level for now: the syllabus lives in
 * `program/`; lesson content will be authored in Strapi.
 */
export const svcCourse: Course = {
  id: "svc",
  slug: "secure-vibe-coding",
  meta: svcMeta,
  program: svcProgram,
  phases: [],
};
