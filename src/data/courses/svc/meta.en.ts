import type { CourseMeta } from "@/types";

/** English catalog meta for Secure Vibe Coding. */
export const svcMetaEn: CourseMeta = {
  title: "Secure Vibe Coding: ship commercial software with AI",
  tagline: "From prompt to production product.",
  description:
    "Want to build with AI without ending up with debt or a security hole in the middle? We guide you from framing to go-live: auth, data, payments, hosting. A real project at the end.",
  icon: "fa-shield-halved",
  accent: {
    text: "text-violet-700 dark:text-violet-300",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
  },
  tags: ["Prompt → Audit → Ship", "Security", "Payments", "Deployment"],
  level: "Intermediate",
  duration: "≈16–20 weeks",
  status: "active",
};
