/* ═══════════════════════════════════════════════════════════════════
   LEGACY COMPAT LAYER
   Older code imports `phases`, `getPhase`, `findModule`,
   `totalProgressItems` from this file. They now proxy to the new
   course registry under `@/data/courses/`.

   Prefer importing from `@/data` in new code.
   ═══════════════════════════════════════════════════════════════════ */

import type { Phase } from "@/types";
import {
  allPhases,
  findModule as findModuleImpl,
  totalProgressItems as totalProgressItemsImpl,
} from "./index";

/** Flat list of all phases across all courses. */
export const phases: Phase[] = allPhases;

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
  return totalProgressItemsImpl();
}
