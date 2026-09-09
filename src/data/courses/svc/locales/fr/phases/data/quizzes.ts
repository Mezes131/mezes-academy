import type { Quiz } from "@/types";

export const dataQuizzes: Record<"m01" | "m02" | "m03" | "m04", Quiz> = {
  m01: {
    id: "svc-data-quiz-m01",
    title: "Modèle de données : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Un modèle de données utile part de…",
        options: [
          {
            id: "a",
            label:
              "Du besoin produit : les entités et relations dont tu as vraiment besoin",
          },
          { id: "b", label: "De toutes les tables que l'IA invente d'un coup" },
          { id: "c", label: "Des noms de classes CSS" },
          { id: "d", label: "Du logo de l'hébergeur" },
        ],
        correct: ["a"],
        explanation:
          "Traduis d'abord le domaine. Tables et champs en trop = bruit tant qu'un vrai besoin n'apparaît pas.",
      },
      {
        id: "q2",
        question: "Une clé étrangère sert surtout à…",
        options: [
          {
            id: "a",
            label:
              "Lier une ligne à une autre entité (ex. ressource → organisation)",
          },
          { id: "b", label: "Stocker un JWT dans le navigateur" },
          { id: "c", label: "Remplacer l'authentification" },
          { id: "d", label: "Choisir un thème de couleurs" },
        ],
        correct: ["a"],
        explanation:
          "Les relations (1–n, n–n…) vivent dans le schéma via des clés et, si besoin, des tables de jointure.",
      },
      {
        id: "q3",
        question: "Les migrations servent à…",
        options: [
          {
            id: "a",
            label:
              "Versionner les changements de schéma de façon contrôlée et revuable",
          },
          { id: "b", label: "Effacer l'historique Git" },
          { id: "c", label: "Sauter la validation serveur" },
          { id: "d", label: "Héberger uniquement des images statiques" },
        ],
        correct: ["a"],
        explanation:
          "Une migration est une étape volontaire : appliquer, revoir, avancer avec soin. Autrement dit, ce n'est pas « réécrire la prod à la main ».",
      },
      {
        id: "q4",
        question: "Un schéma inventé par l'IA contient souvent…",
        options: [
          {
            id: "a",
            label:
              "Des tables inutiles, des champs redondants, ou des relations sans besoin produit",
          },
          { id: "b", label: "Seulement les trois entités que tu as demandées" },
          { id: "c", label: "Le HTTPS obligatoire" },
          { id: "d", label: "Le contrôle d'accès automatique" },
        ],
        correct: ["a"],
        explanation:
          "Audite chaque table et colonne proposée face au brief avant de les livrer.",
      },
      {
        id: "q5",
        question: "Postgres (ou équivalent) dans ce cours, c'est…",
        options: [
          {
            id: "a",
            label:
              "Un exemple du marché de base relationnelle, pas une marque imposée",
          },
          { id: "b", label: "La seule base légale au monde" },
          { id: "c", label: "Un framework CSS" },
          { id: "d", label: "Un fournisseur de liens magiques" },
        ],
        correct: ["a"],
        explanation:
          "Reste indépendant du prestataire : choisis un stockage solide, modèle clairement, migre avec soin.",
      },
    ],
  },

  m02: {
    id: "svc-data-quiz-m02",
    title: "API & validation : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "« Ne jamais faire confiance au client » signifie…",
        options: [
          {
            id: "a",
            label:
              "Valider chaque entrée côté serveur, même si l'interface a déjà vérifié",
          },
          { id: "b", label: "Supprimer l'interface" },
          {
            id: "c",
            label: "Faire confiance au localStorage comme source de vérité",
          },
          {
            id: "d",
            label: "Sauter l'autorisation si les types ont l'air bons",
          },
        ],
        correct: ["a"],
        explanation:
          "Le navigateur peut être modifié ou contourné. La frontière API, c'est là que la confiance commence.",
      },
      {
        id: "q2",
        question: "Un schéma de validation à la frontière sert surtout à…",
        options: [
          {
            id: "a",
            label:
              "Rejeter les données reçues mal formées ou hors plage avant la logique métier",
          },
          { id: "b", label: "Styliser les formulaires" },
          { id: "c", label: "Choisir un CDN" },
          { id: "d", label: "Remplacer l'authentification" },
        ],
        correct: ["a"],
        explanation:
          "Types, champs obligatoires, longueurs, listes de valeurs : échoue vite avec une erreur claire.",
      },
      {
        id: "q3",
        question: "Les erreurs typées aident parce que…",
        options: [
          {
            id: "a",
            label:
              "Les clients distinguent validation, auth et introuvable avec des codes / formes stables",
          },
          { id: "b", label: "Elles remplacent les codes HTTP pour toujours" },
          { id: "c", label: "Elles cachent tous les échecs des logs" },
          { id: "d", label: "Elles rendent la pagination optionnelle" },
        ],
        correct: ["a"],
        explanation:
          "Un contrat d'erreur cohérent vaut mieux que des 500 flous et des messages en texte libre.",
      },
      {
        id: "q4",
        question: "La pagination sur les listes sert surtout à…",
        options: [
          {
            id: "a",
            label:
              "Limiter la quantité de données renvoyées par requête (taille de page + curseur ou décalage)",
          },
          { id: "b", label: "Supprimer le contrôle d'accès" },
          { id: "c", label: "Stocker des secrets dans la query string" },
          { id: "d", label: "Désactiver le HTTPS" },
        ],
        correct: ["a"],
        explanation:
          "Des listes sans borne écrasent mémoire, latence et coût, surtout avec des traitements IA « tout renvoyer ».",
      },
      {
        id: "q5",
        question: "Valider le corps de la requête seulement côté navigateur…",
        options: [
          {
            id: "a",
            label: "Ne suffit pas : le serveur doit valider à nouveau",
          },
          { id: "b", label: "Sécurise entièrement l'API" },
          { id: "c", label: "Remplace les rôles" },
          { id: "d", label: "Est exigé par chaque base de données" },
        ],
        correct: ["a"],
        explanation:
          "Les contrôles dans l'interface améliorent l'expérience. Les contrôles serveur protègent le système.",
      },
    ],
  },

  m03: {
    id: "svc-data-quiz-m03",
    title: "Stockage & fichiers : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Un envoi de fichier sûr doit au moins…",
        options: [
          {
            id: "a",
            label:
              "Vérifier la taille, les types autorisés, et qui a le droit d'envoyer",
          },
          { id: "b", label: "Accepter n'importe quel fichier sans limite" },
          {
            id: "c",
            label: "Stocker le fichier uniquement dans le bundle React",
          },
          {
            id: "d",
            label: "Sauter l'auth si le nom de fichier a l'air gentil",
          },
        ],
        correct: ["a"],
        explanation:
          "Des envois non validés sont un classique d'abus, d'hébergement de logiciels malveillants et d'explosion de coûts.",
      },
      {
        id: "q2",
        question: "Le stockage objet (ex. style S3) sert surtout à…",
        options: [
          {
            id: "a",
            label:
              "Stocker des blobs (fichiers) hors de la base applicative, avec clés et contrôles d'accès",
          },
          { id: "b", label: "Remplacer l'authentification" },
          { id: "c", label: "Lancer des animations CSS" },
          { id: "d", label: "Éditer des commits Git" },
        ],
        correct: ["a"],
        explanation:
          "S3 et services similaires sont des exemples du marché. Tu n'es pas obligé d'utiliser une marque précise.",
      },
      {
        id: "q3",
        question: "Une URL signée est utile parce que…",
        options: [
          {
            id: "a",
            label:
              "Elle donne un accès limité dans le temps à un objet précis sans rendre l'espace de stockage public",
          },
          {
            id: "b",
            label: "Elle rend le fichier lisible par le monde entier pour toujours",
          },
          {
            id: "c",
            label: "Elle remplace l'autorisation serveur pour toujours",
          },
          {
            id: "d",
            label:
              "Elle stocke le secret API dans le navigateur en toute sécurité",
          },
        ],
        correct: ["a"],
        explanation:
          "Durée courte + objet ciblé = chemins de téléchargement / envoi plus sûrs.",
      },
      {
        id: "q4",
        question: "Le contrôle d'accès (ACL) sur les fichiers, c'est…",
        options: [
          {
            id: "a",
            label:
              "Décider qui peut lire ou écrire quels objets (souvent lié à l'organisation / au propriétaire)",
          },
          { id: "b", label: "Choisir une police" },
          { id: "c", label: "Désactiver le HTTPS" },
          { id: "d", label: "Sauter les quotas" },
        ],
        correct: ["a"],
        explanation:
          "Même idée que l'accès par ID volé sur les lignes : changer une clé ne doit pas fuiter le fichier d'un autre.",
      },
      {
        id: "q5",
        question: "Les quotas aident parce que…",
        options: [
          {
            id: "a",
            label:
              "Ils plafonnent le volume de stockage / d'envoi par utilisateur ou organisation et limitent les abus",
          },
          { id: "b", label: "Ils remplacent les erreurs typées" },
          { id: "c", label: "Ils rendent les migrations inutiles" },
          { id: "d", label: "Ils corrigent les schémas inventés" },
        ],
        correct: ["a"],
        explanation:
          "Sans quotas, un seul compte peut remplir l'espace de stockage et ta facture.",
      },
    ],
  },

  m04: {
    id: "svc-data-quiz-m04",
    title: "Tâches & asynchrone : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Pourquoi découpler le travail lent de la requête HTTP ?",
        options: [
          {
            id: "a",
            label:
              "Pour que l'API réponde vite pendant qu'un processus de fond gère email, PDF, etc.",
          },
          { id: "b", label: "Pour pouvoir sauter la validation" },
          {
            id: "c",
            label: "Pour déplacer les secrets dans le navigateur",
          },
          { id: "d", label: "Pour interdire la pagination" },
        ],
        correct: ["a"],
        explanation:
          "Files d'attente + processus de fond gardent le chemin de requête léger et les échecs rejouables.",
      },
      {
        id: "q2",
        question: "Une file légère en début de produit, c'est…",
        options: [
          {
            id: "a",
            label:
              "Une liste de tâches durable / un processus de fond adaptés à un produit jeune, sans infra surdimensionnée",
          },
          {
            id: "b",
            label: "Toujours un cluster Kafka multi-région dès le jour 1",
          },
          { id: "c", label: "Appeler Stripe depuis React sans serveur" },
          {
            id: "d",
            label: "Stocker les tâches uniquement dans localStorage",
          },
        ],
        correct: ["a"],
        explanation:
          "Adapte la complexité au stade. Tu as quand même besoin de durabilité et d'un statut de tâche clair.",
      },
      {
        id: "q3",
        question: "L'idempotence d'une tâche signifie…",
        options: [
          {
            id: "a",
            label:
              "Rejouer la tâche ne crée pas d'effets de bord en double (double email, double charge…)",
          },
          { id: "b", label: "La tâche ne doit jamais retenter" },
          { id: "c", label: "Les erreurs doivent être silencieuses" },
          { id: "d", label: "Les codes HTTP sont interdits" },
        ],
        correct: ["a"],
        explanation:
          "Utilise des clés d'idempotence / des contraintes d'unicité pour que les nouvelles tentatives soient sûres.",
      },
      {
        id: "q4",
        question: "Les nouvelles tentatives sont utiles quand…",
        options: [
          {
            id: "a",
            label:
              "Des échecs passagers arrivent (délai dépassé, à-coup tiers), avec délai croissant et un maximum de tentatives",
          },
          {
            id: "b",
            label: "Tu veux des boucles silencieuses infinies pour toujours",
          },
          {
            id: "c",
            label:
              "La validation a échoué parce que les données reçues sont invalides",
          },
          { id: "d", label: "Tu as sauté l'autorisation exprès" },
        ],
        correct: ["a"],
        explanation:
          "Retente les erreurs passagères. Ne retente pas en aveugle les échecs permanents de validation / auth.",
      },
      {
        id: "q5",
        question: "Resend / Stripe (en exemples) dans les tâches asynchrones…",
        options: [
          {
            id: "a",
            label:
              "Sont des exemples du marché : appelle-les depuis le processus de fond avec les secrets côté serveur",
          },
          {
            id: "b",
            label: "Doivent être codés en dur dans chaque composant React",
          },
          { id: "c", label: "Remplacent le besoin d'idempotence" },
          { id: "d", label: "Interdisent les files d'attente" },
        ],
        correct: ["a"],
        explanation:
          "Règle indépendante du prestataire : identifiants côté serveur, intégration auditée, nouvelles tentatives sûres.",
      },
    ],
  },
};
