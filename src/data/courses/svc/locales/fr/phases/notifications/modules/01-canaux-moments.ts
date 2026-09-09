import type { Module } from "@/types";
import { notificationsQuizzes } from "../quizzes";
import { notificationsExercises } from "../exercises";

export const notificationsModule01: Module = {
  id: "svc-notifications-m01",
  index: "01",
  title: "Canaux & moments",
  subtitle: "Transactionnel vs marketing, moments métier",
  duration: "30 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Distinguer transactionnel et marketing",
    "Relier événements métier et canaux",
  ],
  content: [
    { kind: "title", text: "Canaux et moments métier" },
    {
      kind: "paragraph",
      html: "Une <strong>notification</strong>, ce n'est pas « un email parce que le tutoriel le dit ». Elle répond à un <strong>moment métier</strong> : réinitialisation du mot de passe, reçu de paiement, invitation d'équipe, alerte critique. Le <strong>transactionnel</strong> suit une action attendue ; le <strong>marketing</strong> (digest, promo) exige consentement et désinscription. Les confondre brûle la réputation et la confiance.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-table'></i> Matrice événements → canal",
        body: "Pour chaque événement : type (transactionnel / marketing), canal (email, push, SMS), urgence. Email reste le socle. Push/SMS restent optionnels si consentement explicite et moment le justifient. Autrement dit, pas d'envoi sur les trois canaux par défaut.",
      },
    },
    {
      kind: "paragraph",
      html: "Choisis le canal selon <strong>urgence</strong>, <strong>contexte</strong> et <strong>consentement</strong> disponible. Une réinitialisation = email sécurisé. Une promo hebdomadaire = marketing avec consentement explicite. Une alerte d'astreinte peut justifier push/SMS, mais seulement pour les bons destinataires.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Piège IA",
        body: "L'IA colle souvent une lettre d'info sur chaque webhook et oublie les messages critiques. Force la matrice avant d'intégrer un prestataire d'email.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-envelope'></i> <strong>Règle</strong> : moment métier d'abord, type clair, canal minimal. Évite le pourriel multi-canal.",
    },
  ],
  quiz: notificationsQuizzes.m01,
  exercises: [notificationsExercises.m01_1],
};
