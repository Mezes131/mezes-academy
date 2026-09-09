import type { Module } from "@/types";
import { notificationsQuizzes } from "../quizzes";
import { notificationsExercises } from "../exercises";

export const notificationsModule02: Module = {
  id: "svc-notifications-m02",
  index: "02",
  title: "Prestataire email",
  subtitle:
    "Resend / Postmark : modèles, domaines, chance d'arriver en boîte",
  duration: "45 min",
  difficulty: "intermediate",
  objectives: [
    "Brancher un prestataire email",
    "Créer des modèles propres",
    "Comprendre la chance d'arriver en boîte de réception",
  ],
  content: [
    { kind: "title", text: "Brancher un prestataire" },
    {
      kind: "paragraph",
      html: "<strong>Resend</strong> et <strong>Postmark</strong> sont des <strong>exemples du marché</strong> : un prestataire email parmi d'autres. Les mêmes idées existent ailleurs : <strong>API d'envoi</strong>, <strong>modèles</strong>, domaine, webhooks de livraison (notifications HTTP du prestataire). Tu envoies depuis un <strong>serveur ou un processus de fond</strong> avec une clé secrète <strong>jamais</strong> dans le navigateur. Email de bienvenue et reçu de paiement = premiers modèles transactionnels du produit.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-code'></i> Modèles",
        body: "Versionne les modèles, contrôle les variables, échappe le HTML utilisateur. Contenu prévisible vaut mieux qu'un collage généré à la volée non revu.",
      },
    },

    { kind: "title", text: "Domaines et arrivée en boîte" },
    {
      kind: "paragraph",
      html: "Configurer le <strong>domaine d'envoi</strong> (SPF / DKIM basique) authentifie tes mails auprès des boîtes de réception. Sans ça, même un bon prestataire finit en pourriel. La <strong>chance d'arriver en boîte</strong> suit aussi le volume, les emails rejetés (rebonds), les plaintes et le fait d'envoyer du contenu <em>attendu</em>.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-key'></i> Secrets",
        body: "Clé API dans React ou dans le dépôt = pourriel depuis ton compte / quota brûlé. Serveur uniquement. Reste indépendant : un autre prestataire aura le même schéma.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-inbox'></i> <strong>Réflexe</strong> : prestataire = exemple du marché ; secret serveur ; domaine + modèles. Arriver en boîte de réception compte plus que « ça compile ».",
    },
  ],
  quiz: notificationsQuizzes.m02,
  exercises: [notificationsExercises.m02_1],
};
