import type { Module } from "@/types";
import { hebergementQuizzes } from "../quizzes";
import { hebergementExercises } from "../exercises";

export const hebergementModule04: Module = {
  id: "svc-hebergement-m04",
  index: "04",
  title: "Domaines, TLS, DNS",
  subtitle: "Domaine personnalisé, HTTPS, redirections, DNS email",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Brancher un domaine personnalisé en HTTPS",
    "Configurer les redirections et DNS email",
  ],
  content: [
    { kind: "title", text: "Mise en ligne DNS" },
    {
      kind: "paragraph",
      html: "La mise en ligne, ce n'est pas seulement « une URL d'aperçu ». Tu branches un <strong>domaine personnalisé</strong>, tu actives <strong>HTTPS/TLS</strong>, tu poses les <strong>redirections</strong> (www ↔ apex, HTTP → HTTPS). Si tu envoies des emails transactionnels, tu configures au minimum <strong>SPF/DKIM</strong> sur le domaine d'envoi.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-globe'></i> Liste de contrôle de mise en ligne",
        body: "DNS vers la plateforme, certificat valide, redirections canoniques, email DNS si besoin. Ensuite, fais un test rapide de santé depuis l'extérieur.",
      },
    },
    {
      kind: "paragraph",
      html: "Le <strong>projet P10</strong> clôture la phase : produit capstone déployé en <strong>aperçu + prod</strong>, URL publique <strong>HTTPS</strong>, chaîne de déploiement ou procédure documentée. Aperçu distinct de la prod. Autrement dit, pas un seul environnement « presque en ligne ».",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-link'></i> Presque en ligne ≠ en ligne",
        body: "HTTP seul, secrets partagés aperçu/prod, ou aucune doc de déploiement : ce n'est pas le livrable P10.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-rocket'></i> <strong>Projet P10</strong> : aperçu + prod HTTPS, DNS/TLS/redirections (+ email DNS), déploiement documenté.",
    },
  ],
  quiz: hebergementQuizzes.m04,
  exercises: [hebergementExercises.m04_projet],
};
