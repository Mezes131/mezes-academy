import type { Quiz } from "@/types";

export const shipQuizzes: Record<"m01" | "m02" | "m03", Quiz> = {
  m01: {
    id: "svc-ship-quiz-m01",
    title: "Offer & pricing: check your reading",
    questions: [
      {
        id: "q1",
        question: "A value proposition is mainly…",
        options: [
          {
            id: "a",
            label:
              "The clear benefit for a target audience, rather than a feature list",
          },
          { id: "b", label: "A technical dump of the architecture" },
          { id: "c", label: "The hosting provider name" },
          { id: "d", label: "An exhaustive changelog" },
        ],
        correct: ["a"],
        explanation:
          "From feature to offer: translate the product into a reason to pay rather than an inventory.",
      },
      {
        id: "q2",
        question: "Well-designed Free / Pro plans…",
        options: [
          {
            id: "a",
            label:
              "Clearly separate what is free from what justifies paying",
          },
          { id: "b", label: "Hide the price until checkout" },
          { id: "c", label: "List ten competing CTAs" },
          { id: "d", label: "Replace ToS and privacy" },
        ],
        correct: ["a"],
        explanation:
          "Free/Pro = readable contrast. Paid must answer « why upgrade ».",
      },
      {
        id: "q3",
        question: "A clear CTA on the pricing page…",
        options: [
          {
            id: "a",
            label: "Points to a single action (trial, upgrade, purchase)",
          },
          { id: "b", label: "Sends users to five « learn more » links" },
          { id: "c", label: "Is optional if the product is « obvious »" },
          { id: "d", label: "Must paste the Stripe logo" },
        ],
        correct: ["a"],
        explanation:
          "Single CTA = conversion. Competing CTAs dilute the offer.",
      },
      {
        id: "q4",
        question: "A « why pay » landing fails if…",
        options: [
          {
            id: "a",
            label:
              "It centers technical features with no reason to pay and no CTA",
          },
          { id: "b", label: "It has a value proposition and a CTA" },
          { id: "c", label: "It distinguishes Free and Pro" },
          { id: "d", label: "It is live on a public URL" },
        ],
        correct: ["a"],
        explanation:
          "m01 exercise: reason to pay + single CTA. Avoid turning it into a technical README.",
      },
      {
        id: "q5",
        question: "The P12 pricing page deliverable must…",
        options: [
          {
            id: "a",
            label: "Be live with a CTA as commercial proof rather than a mock",
          },
          { id: "b", label: "Stay in a private Figma" },
          { id: "c", label: "Ignore Free/Pro plans" },
          { id: "d", label: "Replace the release package" },
        ],
        correct: ["a"],
        explanation:
          "P12 criterion: pricing page live with CTA. Provider-agnostic.",
      },
    ],
  },

  m02: {
    id: "svc-ship-quiz-m02",
    title: "Trust & legal: check your reading",
    questions: [
      {
        id: "q1",
        question: "Light ToS / privacy for a paid product…",
        options: [
          {
            id: "a",
            label:
              "Cover the credible minimum (usage, data, contact), rather than leave a legal void",
          },
          { id: "b", label: "Are useless until 10k users" },
          { id: "c", label: "Can be a 404 « coming soon » link" },
          { id: "d", label: "Replace support" },
        ],
        correct: ["a"],
        explanation:
          "Trust foundation: reachable pages. Unread AI paste does not count.",
      },
      {
        id: "q2",
        question: "Minimal legal notices…",
        options: [
          {
            id: "a",
            label:
              "Identify the publisher / contact and make the product traceable",
          },
          { id: "b", label: "Are optional on a Free offer" },
          { id: "c", label: "Must list every infra secret" },
          { id: "d", label: "Replace the changelog" },
        ],
        correct: ["a"],
        explanation:
          "Notices = identity and accountability. Jurisdiction varies; traceability is the principle.",
      },
      {
        id: "q3",
        question: "A credible support channel…",
        options: [
          {
            id: "a",
            label:
              "Is reachable (email, form, ticket) and announced on the product",
          },
          { id: "b", label: "Is only the founder's Twitter DM" },
          { id: "c", label: "Is unnecessary before Series A" },
          { id: "d", label: "Must publish DB dumps" },
        ],
        correct: ["a"],
        explanation:
          "If customers pay and do not know who to contact, trust breaks. Use a visible, tested channel.",
      },
      {
        id: "q4",
        question: "The mini compliance checklist…",
        options: [
          {
            id: "a",
            label:
              "Checks ToS, privacy, notices, and support, then fills the gaps",
          },
          { id: "b", label: "Is limited to the favicon" },
          { id: "c", label: "Ignores legal pages « to ship faster »" },
          { id: "d", label: "Replaces smoke tests" },
        ],
        correct: ["a"],
        explanation:
          "m02 exercise: run the checklist and fix gaps. Do not tick boxes with no proof.",
      },
      {
        id: "q5",
        question: "Project P12 requires for legal / support…",
        options: [
          {
            id: "a",
            label: "Legal foundation and support channel in place on the product",
          },
          { id: "b", label: "Only a README « TODO legal »" },
          { id: "c", label: "No privacy page" },
          { id: "d", label: "Support hidden in an unannounced private Discord" },
        ],
        correct: ["a"],
        explanation:
          "Assessment: legal foundation and support in place, and both must be verifiable.",
      },
    ],
  },

  m03: {
    id: "svc-ship-quiz-m03",
    title: "Delivery proof: check your reading",
    questions: [
      {
        id: "q1",
        question: "A useful changelog…",
        options: [
          {
            id: "a",
            label:
              "Documents what changed for users / ops, rather than dump a raw git log",
          },
          { id: "b", label: "Is optional if the pricing page exists" },
          { id: "c", label: "Contains rotation secrets" },
          { id: "d", label: "Replaces the ToS" },
        ],
        correct: ["a"],
        explanation:
          "Changelog = continuous delivery proof. Format free, intent clear.",
      },
      {
        id: "q2",
        question: "Release smoke tests…",
        options: [
          {
            id: "a",
            label:
              "Quickly verify that critical paths work after deployment",
          },
          { id: "b", label: "Replace all unit coverage" },
          { id: "c", label: "Never run in CI « to save time »" },
          { id: "d", label: "Must be manual only" },
        ],
        correct: ["a"],
        explanation:
          "Smoke = minimal post-deploy safety net. Automatable, provider-agnostic.",
      },
      {
        id: "q3",
        question: "The release / delivery package gathers…",
        options: [
          {
            id: "a",
            label:
              "Public URL, plans/pricing, audit evidence, and runbook as verifiable artifacts",
          },
          { id: "b", label: "Only a homepage screenshot" },
          { id: "c", label: "API keys in cleartext « for the investor »" },
          { id: "d", label: "Nothing: « deployed = delivered »" },
        ],
        correct: ["a"],
        explanation:
          "Ship with proof: the package proves the product is marketable.",
      },
      {
        id: "q4",
        question: "Assembling the package with no runbook or audit evidence…",
        options: [
          {
            id: "a",
            label: "Is incomplete against the P12 deliverable",
          },
          { id: "b", label: "Is enough if the URL returns 200" },
          { id: "c", label: "Is OK even if the pricing page is missing" },
          { id: "d", label: "Replaces the legal foundation" },
        ],
        correct: ["a"],
        explanation:
          "Exercise / project: URL + plans + audits + runbook make a complete package.",
      },
      {
        id: "q5",
        question: "Project P12 notably validates…",
        options: [
          {
            id: "a",
            label:
              "Verifiable package, live pricing with CTA, legal + support in place",
          },
          { id: "b", label: "Only a deployment with no offer" },
          { id: "c", label: "No audit evidence" },
          { id: "d", label: "Empty changelog and missing smoke tests" },
        ],
        correct: ["a"],
        explanation:
          "P12 assessment: complete package, pricing CTA, trust foundation.",
      },
    ],
  },
};
