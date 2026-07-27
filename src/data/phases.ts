/* ═══════════════════════════════════════════════════════════════════
   LEGACY COMPAT LAYER
   Older code imports `phases`, `getPhase`, `findModule`,
   `totalProgressItems` from this file. They now proxy to the new
   course registry under `@/data/courses/`.

   Prefer importing from `@/data` in new code.
   ═══════════════════════════════════════════════════════════════════ */

import type { Phase } from "@/types";
import {
  findCourse,
  findModule as findModuleImpl,
  totalProgressItems as totalProgressItemsImpl,
} from "./index";

/**
 * Legacy consumers (React learning area, useProgress) expect the React
 * course only : keep them scoped so other courses' scaffold phases
 * don't leak into the sidebar or progress totals.
 */
export const phases: Phase[] = findCourse("react")?.phases ?? [];

export function getPhase(id: string): Phase | undefined {
  return phases.find((p) => p.id === id);
}

/** Legacy shape: `{ phase, module }` (course field dropped). */
export function findModule(moduleId: string) {
  const found = findModuleImpl(moduleId);
  if (!found) return undefined;
  return { phase: found.phase, module: found.module };
}

export function totalProgressItems() {
  return totalProgressItemsImpl("react");
}
