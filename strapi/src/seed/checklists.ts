/**
 * Seed reusable Security / Performance / Design / Accessibility checklists.
 */
import type { Core } from "@strapi/strapi";

type ItemSeed = {
  key: string;
  label: string;
  description: string;
  order: number;
  severity: "info" | "low" | "medium" | "high" | "critical";
  verification: "manual" | "automated" | "mixed";
  evidenceRequired: boolean;
};

type ChecklistSeed = {
  title: string;
  slug: string;
  description: string;
  domain: "security" | "performance" | "design" | "accessibility";
  version: string;
  items: ItemSeed[];
};

const SEEDS: ChecklistSeed[] = [
  {
    title: "Security baseline",
    slug: "security-baseline",
    description: "Secrets, auth boundaries, and unsafe defaults.",
    domain: "security",
    version: "1.0.0",
    items: [
      {
        key: "no-secrets-in-repo",
        label: "No secrets committed",
        description: "API keys, private keys, and tokens must not appear in source.",
        order: 1,
        severity: "critical",
        verification: "automated",
        evidenceRequired: true,
      },
      {
        key: "auth-on-writes",
        label: "Authenticated writes",
        description: "Mutating endpoints require auth and authorization checks.",
        order: 2,
        severity: "high",
        verification: "manual",
        evidenceRequired: true,
      },
    ],
  },
  {
    title: "Performance baseline",
    slug: "performance-baseline",
    description: "Core web vitals and payload discipline.",
    domain: "performance",
    version: "1.0.0",
    items: [
      {
        key: "lighthouse-perf",
        label: "Lighthouse performance ≥ 0.5",
        description: "Attach a Lighthouse summary for the deployed URL.",
        order: 1,
        severity: "high",
        verification: "automated",
        evidenceRequired: true,
      },
      {
        key: "image-budget",
        label: "Image weight budget",
        description: "Hero and content images are compressed and sized.",
        order: 2,
        severity: "medium",
        verification: "manual",
        evidenceRequired: false,
      },
    ],
  },
  {
    title: "Design baseline",
    slug: "design-baseline",
    description: "Visual hierarchy, spacing, and brand consistency.",
    domain: "design",
    version: "1.0.0",
    items: [
      {
        key: "spacing-rhythm",
        label: "Consistent spacing rhythm",
        description: "Layout follows an 8px spacing system.",
        order: 1,
        severity: "medium",
        verification: "manual",
        evidenceRequired: false,
      },
      {
        key: "one-primary-cta",
        label: "One primary CTA per view",
        description: "Avoid competing primary actions on the same screen.",
        order: 2,
        severity: "low",
        verification: "manual",
        evidenceRequired: false,
      },
    ],
  },
  {
    title: "Accessibility baseline",
    slug: "accessibility-baseline",
    description: "WCAG AA contrast, labels, and keyboard access.",
    domain: "accessibility",
    version: "1.0.0",
    items: [
      {
        key: "contrast-aa",
        label: "WCAG AA contrast",
        description: "Text and interactive elements meet AA contrast.",
        order: 1,
        severity: "high",
        verification: "mixed",
        evidenceRequired: true,
      },
      {
        key: "keyboard-nav",
        label: "Keyboard navigable",
        description: "All interactive controls are reachable and operable by keyboard.",
        order: 2,
        severity: "high",
        verification: "manual",
        evidenceRequired: true,
      },
    ],
  },
];

export async function seedChecklists(strapi: Core.Strapi) {
  for (const seed of SEEDS) {
    let checklist = await strapi.db.query("api::checklist.checklist").findOne({
      where: { slug: seed.slug },
    });
    if (!checklist) {
      checklist = await strapi.db.query("api::checklist.checklist").create({
        data: {
          title: seed.title,
          slug: seed.slug,
          description: seed.description,
          domain: seed.domain,
          version: seed.version,
          workflowStatus: "draft",
        },
      });
    }

    for (const item of seed.items) {
      const existing = await strapi.db.query("api::checklist-item.checklist-item").findOne({
        where: { key: item.key, checklist: checklist.id },
      });
      if (existing) continue;
      await strapi.db.query("api::checklist-item.checklist-item").create({
        data: { ...item, checklist: checklist.id },
      });
    }
  }
  strapi.log.info("Seeded baseline checklists");
}

export default { seedChecklists };
