import type { Phase, PhaseId } from "@/types";
import { introPhase } from "./intro";
import { phase3 } from "./phase3";
import { phase4, phase5, phase6 } from "./scaffolds";

export const phases: Phase[] = [introPhase, phase3, phase4, phase5, phase6];

export function getPhase(id: PhaseId): Phase | undefined {
  return phases.find((p) => p.id === id);
}

export function findModule(moduleId: string) {
  for (const phase of phases) {
    const mod = phase.modules.find((m) => m.id === moduleId);
    if (mod) return { phase, module: mod };
  }
  return undefined;
}

/**
 * Total number of "items" used to compute global progress.
 * Counts: each read module + each passed quiz (>= 70%) + each completed exercise.
 */
export function totalProgressItems() {
  let total = 0;
  for (const phase of phases) {
    for (const mod of phase.modules) {
      total += 1; // read module
      if (mod.quiz) total += 1;
      if (mod.exercises) total += mod.exercises.length;
    }
  }
  return total;
}
