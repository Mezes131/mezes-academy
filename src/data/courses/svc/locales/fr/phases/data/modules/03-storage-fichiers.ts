import type { Module } from "@/types";
import { dataQuizzes } from "../quizzes";
import { dataExercises } from "../exercises";

export const dataModule03: Module = {
  id: "svc-data-m03",
  index: "03",
  title: "Stockage & fichiers",
  subtitle: "Envois de fichiers, URLs signées, quotas, contrôle d'accès",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Gérer des envois de fichiers sûrs",
    "Servir des fichiers via URLs signées",
    "Appliquer quotas et contrôle d'accès",
  ],
  content: [
    { kind: "title", text: "Envois de fichiers sûrs" },
    {
      kind: "paragraph",
      html: "Les fichiers sont des blobs non fiables. Un <strong>envoi de fichier sûr</strong> vérifie la <strong>taille</strong>, les <strong>types autorisés</strong>, et qui peut envoyer. Ensuite tu stockes l'objet dans un <strong>stockage objet</strong> dédié (services style S3 = exemples courants du marché) avec les métadonnées dans ta base. Ne verse pas des binaires arbitraires dans un dossier public « pour aller plus vite ».",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-hard-drive'></i> Séparer les responsabilités",
        body: "Base pour les faits structurés ; stockage objet pour les fichiers. Garde les identifiants du prestataire côté serveur, comme pour tout service tiers.",
      },
    },

    { kind: "title", text: "URLs signées et contrôle d'accès" },
    {
      kind: "paragraph",
      html: "Une <strong>URL signée</strong> donne un accès limité dans le temps à un objet sans ouvrir tout l'<strong>espace de stockage</strong> (bucket). Le <strong>contrôle d'accès</strong> (ACL) décide qui peut demander cette URL : en général le propriétaire ou les membres de l'organisation. Les <strong>quotas</strong> plafonnent ce que chaque utilisateur ou organisation peut stocker pour qu'un seul compte ne remplisse pas la facture.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Une clé n'est pas une permission",
        body: "Des clés d'objet devinables ou fuitées sans contrôle d'accès, c'est l'équivalent fichier de l'accès par ID volé. L'obscurité ne remplace pas un vrai contrôle d'accès.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-lock'></i> <strong>Réflexe</strong> : valider l'envoi, stocker en privé, autoriser, délivrer une URL signée courte, puis appliquer les quotas.",
    },
  ],
  quiz: dataQuizzes.m03,
  exercises: [dataExercises.m03_1],
};
