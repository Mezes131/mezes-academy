import { clsx, type ClassValue } from "clsx";
import type { PhaseColor } from "@/types";

/** Helper concise pour combiner classes conditionnelles. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Retourne les classes Tailwind pour chaque accent de phase.
 * Cela concentre toute la logique de couleur en un seul endroit.
 */
export function phaseAccent(color: PhaseColor) {
  switch (color) {
    case "intro":
      return {
        text: "text-brand-intro",
        bg: "bg-brand-intro/10",
        border: "border-brand-intro/30",
        ring: "ring-brand-intro/40",
        dot: "bg-brand-intro",
      };
    case "core":
      return {
        text: "text-brand-core",
        bg: "bg-brand-core/10",
        border: "border-brand-core/30",
        ring: "ring-brand-core/40",
        dot: "bg-brand-core",
      };
    case "ts":
      return {
        text: "text-brand-ts",
        bg: "bg-brand-ts/10",
        border: "border-brand-ts/30",
        ring: "ring-brand-ts/40",
        dot: "bg-brand-ts",
      };
    case "eco":
      return {
        text: "text-brand-eco",
        bg: "bg-brand-eco/10",
        border: "border-brand-eco/30",
        ring: "ring-brand-eco/40",
        dot: "bg-brand-eco",
      };
    case "expert":
      return {
        text: "text-brand-expert",
        bg: "bg-brand-expert/10",
        border: "border-brand-expert/30",
        ring: "ring-brand-expert/40",
        dot: "bg-brand-expert",
      };
  }
}
