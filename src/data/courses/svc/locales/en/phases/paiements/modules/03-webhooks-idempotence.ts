import type { Module } from "@/types";
import { paiementsQuizzes } from "../quizzes";
import { paiementsExercises } from "../exercises";

export const paiementsModule03: Module = {
  id: "svc-paiements-m03",
  index: "03",
  title: "Webhooks & idempotence",
  subtitle: "Never grant access on redirect alone",
  duration: "50 min",
  difficulty: "advanced",
  objectives: [
    "Verify webhook signatures",
    "Handle replays so duplicate events do not create duplicate effects",
    "Model order states",
  ],
  content: [
    { kind: "title", text: "Signature and replay" },
    {
      kind: "paragraph",
      html: "The <code>/success</code> page after checkout is <strong>UX</strong>. It is <strong>never</strong> proof that money moved. Grant access only after a <strong>signed webhook</strong> from the provider. Verify the <strong>signature</strong>: if you skip it, anyone can POST « payment succeeded ». Providers <strong>replay</strong>, so your handler must be <strong>idempotent</strong> (same <code>event_id</code> → one effect).",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ban'></i> Classic pitfall",
        body: "AI grants Pro on redirect and parses webhook JSON with no signature. Both are production bugs rather than shortcuts.",
      },
    },

    { kind: "title", text: "Order states" },
    {
      kind: "paragraph",
      html: "Model a <strong>state machine</strong> on the product side: pending → paid / failed / canceled… Reconcile with provider objects. A user « already Pro » while payment is still pending is a broken state mapping rather than a cosmetic detail.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-fingerprint'></i> Idempotence",
        body: "Store processed event ids, or a uniqueness constraint on activation. A replay must neither double-credit nor double-activate.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-shield-halved'></i> <strong>Golden rule</strong>: signature → state → idempotent business effect. Redirect alone = never grant access.",
    },
  ],
  quiz: paiementsQuizzes.m03,
  exercises: [paiementsExercises.m03_1],
};
