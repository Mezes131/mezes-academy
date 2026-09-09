import type { Module } from "@/types";
import { notificationsQuizzes } from "../quizzes";
import { notificationsExercises } from "../exercises";

export const notificationsModule01: Module = {
  id: "svc-notifications-m01",
  index: "01",
  title: "Channels & moments",
  subtitle: "Transactional vs marketing, business moments",
  duration: "30 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Distinguish transactional and marketing",
    "Link business events to channels",
  ],
  content: [
    { kind: "title", text: "Channels and business moments" },
    {
      kind: "paragraph",
      html: "A <strong>notification</strong> is not « an email because the tutorial said so ». It answers a <strong>business moment</strong>: password reset, payment receipt, team invite, critical alert. <strong>Transactional</strong> follows an expected action; <strong>marketing</strong> (digest, promo) needs consent and unsubscribe. Mixing them burns reputation and trust.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-table'></i> Event → channel matrix",
        body: "For each event: type (transactional / marketing), channel (email, push, SMS), urgency. Email remains the backbone. Push/SMS are optional when opt-in and the moment justify them, so do not spray all three by default.",
      },
    },
    {
      kind: "paragraph",
      html: "Pick the channel from <strong>urgency</strong>, <strong>context</strong>, and available <strong>consent</strong>. A reset = secure email. A weekly promo = marketing opt-in. An on-call alert may justify push/SMS, but only for the right recipients.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> AI pitfall",
        body: "AI often bolts a newsletter onto every webhook and skips critical messages. Force the matrix before integrating a provider.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-envelope'></i> <strong>Rule</strong>: business moment first, clear type, minimal channel. Avoid multi-channel spam.",
    },
  ],
  quiz: notificationsQuizzes.m01,
  exercises: [notificationsExercises.m01_1],
};
