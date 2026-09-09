import type { Module } from "@/types";
import { notificationsQuizzes } from "../quizzes";
import { notificationsExercises } from "../exercises";

export const notificationsModule03: Module = {
  id: "svc-notifications-m03",
  index: "03",
  title: "Opt-in, preferences, abuse",
  subtitle: "Consent, unsubscribe, rate limits",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Respect consent and unsubscribe",
    "Protect sending against abuse",
  ],
  content: [
    { kind: "title", text: "Consent and preferences" },
    {
      kind: "paragraph",
      html: "Marketing <strong>opt-in</strong> is explicit; critical transactional mail (reset, receipt) is scoped separately. A <strong>preferences</strong> screen (digest, product, marketing) is useless unless it is <strong>checked at send time</strong>. <strong>Unsubscribe</strong> must be effective rather than a cosmetic link the worker ignores.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-sliders'></i> Enforcement",
        body: "The job reads prefs / unsubscribe status before calling the provider. UI alone = compliance theater.",
      },
    },

    { kind: "title", text: "Anti-abuse" },
    {
      kind: "paragraph",
      html: "If you skip <strong>rate limits</strong> and quotas, an open send endpoint or a bot floods resets / invites and burns your domain. Auth on send routes, limits per user / IP / email type, log refusals. Abuse is not the same as an « engaged user ».",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ban'></i> Classic pitfall",
        body: "AI often exposes a public <code>/api/send</code> and ignores unsubscribe « for conversion ». Both are production bugs.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-user-shield'></i> <strong>Rule</strong>: stored consent, enforced prefs, quotas. No flood and no forced promo.",
    },
  ],
  quiz: notificationsQuizzes.m03,
  exercises: [notificationsExercises.m03_1],
};
