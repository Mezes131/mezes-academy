/**
 * Mezes Academy track catalog.
 * Only one track is active for now (React). Others are in preparation.
 */

export interface CatalogCourse {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string; // FontAwesome class (without "fa-solid" / "fa-brands")
  iconFamily?: "fa-solid" | "fa-brands";
  /** Tailwind accent colors for this track (used for border/background). */
  accent: {
    text: string;
    bg: string;
    border: string;
  };
  tags: string[];
  level: "D\u00e9butant" | "Interm\u00e9diaire" | "Avanc\u00e9" | "Tous niveaux";
  duration: string;
  modules: number;
  status: "active" | "soon" | "planned";
  href?: string;
  /** Optional ETA used to display "Available in ...". */
  eta?: string;
}

export const catalog: CatalogCourse[] = [
  {
    slug: "react",
    title: "React : de z\u00e9ro \u00e0 expert",
    tagline: "Le parcours front-end complet",
    description:
      "Apprends React \u00e0 fond en 5 phases progressives : JSX, hooks, routing, TypeScript, Next.js, architecture et bien plus. Quiz valid\u00e9s et exercices live dans le navigateur.",
    icon: "fa-atom",
    accent: {
      text: "text-brand-core",
      bg: "bg-brand-core/10",
      border: "border-brand-core/30",
    },
    tags: ["React 18", "TypeScript", "Next.js", "Tests", "Architecture"],
    level: "Tous niveaux",
    duration: "\u224810 mois",
    modules: 27,
    status: "active",
    href: "/react",
  },
  {
    slug: "typescript",
    title: "TypeScript en profondeur",
    tagline: "Le typage qui \u00e9l\u00e8ve ton code",
    description:
      "Types primitifs, g\u00e9n\u00e9riques, utility types, conditional types et patterns avanc\u00e9s. De l'initiation \u00e0 la programmation au niveau des types.",
    icon: "fa-gem",
    accent: {
      text: "text-brand-ts",
      bg: "bg-brand-ts/10",
      border: "border-brand-ts/30",
    },
    tags: ["TypeScript 5", "Generics", "Type-level programming"],
    level: "Interm\u00e9diaire",
    duration: "\u22486 semaines",
    modules: 12,
    status: "soon",
    eta: "",
  },
  {
    slug: "nextjs",
    title: "Next.js 14 & Fullstack",
    tagline: "Du front au back, sans couture",
    description:
      "App Router, Server Components, Server Actions, authentification, bases de donn\u00e9es, d\u00e9ploiement. Construis et expose de vraies applications fullstack.",
    icon: "fa-bolt",
    accent: {
      text: "text-brand-eco",
      bg: "bg-brand-eco/10",
      border: "border-brand-eco/30",
    },
    tags: ["Next.js", "Server Components", "Prisma", "Auth"],
    level: "Interm\u00e9diaire",
    duration: "\u22488 semaines",
    modules: 16,
    status: "soon",
    eta: "",
  },
  {
    slug: "node",
    title: "Node.js & APIs robustes",
    tagline: "Construire des back-ends production-ready",
    description:
      "Express, Fastify, bases de donn\u00e9es relationnelles, tests, s\u00e9curit\u00e9, d\u00e9ploiement. Tout ce qu'il faut pour poser des API solides en production.",
    icon: "fa-server",
    accent: {
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    },
    tags: ["Node.js", "Express", "PostgreSQL", "Tests"],
    level: "Interm\u00e9diaire",
    duration: "\u22488 semaines",
    modules: 14,
    status: "soon",
    eta: "",
  },
  {
    slug: "devops",
    title: "DevOps pour d\u00e9veloppeurs",
    tagline: "Git, CI/CD, Docker, d\u00e9ploiement",
    description:
      "Les comp\u00e9tences ops d'un d\u00e9veloppeur moderne : GitHub Actions, Docker, monitoring, logs, d\u00e9ploiements Vercel & auto-h\u00e9berg\u00e9. Sans devenir SRE.",
    icon: "fa-gears",
    accent: {
      text: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/30",
    },
    tags: ["Git", "GitHub Actions", "Docker", "Vercel"],
    level: "Tous niveaux",
    duration: "\u22484 semaines",
    modules: 8,
    status: "planned",
    eta: "Bientôt disponible",
  },
];

/** Global stats displayed on the landing page. */
export const academyStats = {
  coursesActive: catalog.filter((c) => c.status === "active").length,
  coursesPlanned: catalog.filter((c) => c.status !== "active").length,
  lessonsCount: 160,
  exercisesCount: 45,
  quizzesCount: 32,
};
