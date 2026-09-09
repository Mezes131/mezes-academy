import type { Quiz } from "@/types";

export const paiementsQuizzes: Record<"m01" | "m02" | "m03" | "m04", Quiz> = {
  m01: {
    id: "svc-paiements-quiz-m01",
    title: "Modèles économiques : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Un paiement unique, c'est surtout…",
        options: [
          {
            id: "a",
            label:
              "Un achat ponctuel (licence, pack) : un paiement, un droit d'accès ou une livraison",
          },
          { id: "b", label: "Toujours une facturation mensuelle automatique" },
          {
            id: "c",
            label: "Compter chaque appel API et facturer à la minute",
          },
          {
            id: "d",
            label: "Activer Pro dès la redirection sans webhook",
          },
        ],
        correct: ["a"],
        explanation:
          "Paiement unique = transaction ponctuelle. Abonnement et usage ont d'autres cycles de vie (renouvellement, compteurs).",
      },
      {
        id: "q2",
        question: "Un abonnement implique techniquement…",
        options: [
          {
            id: "a",
            label:
              "Un client, un plan / prix, et un cycle de vie (actif, en retard, annulé…)",
          },
          {
            id: "b",
            label: "Uniquement un bouton « Payer » sans objet côté prestataire",
          },
          {
            id: "c",
            label: "Stocker le numéro de carte dans localStorage",
          },
          {
            id: "d",
            label: "Facturer sans jamais vérifier les webhooks",
          },
        ],
        correct: ["a"],
        explanation:
          "L'offre Free/Pro se relie à un client (Customer) + abonnement (Subscription), ou équivalent chez un autre prestataire.",
      },
      {
        id: "q3",
        question: "La tarification à l'usage repose surtout sur…",
        options: [
          {
            id: "a",
            label:
              "Compteurs / métriques mesurés côté produit, puis facturés selon l'usage",
          },
          { id: "b", label: "Un seul paiement fixe à vie sans mesure" },
          { id: "c", label: "Le logo du prestataire de paiement" },
          { id: "d", label: "Cacher le prix dans le CSS" },
        ],
        correct: ["a"],
        explanation:
          "Sans métrique fiable (appels, sièges, Go…), tu ne peux pas facturer l'usage correctement.",
      },
      {
        id: "q4",
        question: "Relier une offre produit à la technique, c'est…",
        options: [
          {
            id: "a",
            label:
              "Relier plan / prix / droits d'accès aux objets du prestataire et à ta base",
          },
          {
            id: "b",
            label: "Copier le tableau de bord Stripe sans modèle métier",
          },
          {
            id: "c",
            label: "Mettre le prix uniquement dans le texte marketing",
          },
          {
            id: "d",
            label: "Laisser l'IA inventer 12 plans « au cas où »",
          },
        ],
        correct: ["a"],
        explanation:
          "Chaque offre a des objets techniques (prix, abonnement, droit d'accès). Documente la correspondance avant de coder.",
      },
      {
        id: "q5",
        question: "Choisir le modèle économique, ça dépend surtout…",
        options: [
          {
            id: "a",
            label:
              "Du cas produit (outil ponctuel, logiciel en ligne récurrent, API à la conso…)",
          },
          { id: "b", label: "Du prestataire imposé par le cours" },
          { id: "c", label: "Du nombre de couleurs du site" },
          {
            id: "d",
            label: "De l'activation sur la redirection seule",
          },
        ],
        correct: ["a"],
        explanation:
          "Le modèle suit le produit. Le prestataire (Stripe ou autre) est un outil, pas la stratégie.",
      },
    ],
  },

  m02: {
    id: "svc-paiements-quiz-m02",
    title: "Parcours paiement : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Dans ce cours, Stripe Checkout / portail client…",
        options: [
          {
            id: "a",
            label:
              "Sont un exemple du marché : un prestataire de paiement parmi d'autres",
          },
          {
            id: "b",
            label: "Sont la seule marque légalement autorisée",
          },
          {
            id: "c",
            label:
              "Doivent être appelés uniquement depuis le navigateur avec la clé secrète",
          },
          { id: "d", label: "Remplacent les webhooks" },
        ],
        correct: ["a"],
        explanation:
          "Reste indépendant : les concepts (page de paiement hébergée, portail client, mode test) existent chez plusieurs prestataires.",
      },
      {
        id: "q2",
        question: "Le mode test sert à…",
        options: [
          {
            id: "a",
            label:
              "Exercer le parcours Free → Pro sans vrai argent, avec cartes / événements de test",
          },
          { id: "b", label: "Activer la production sans webhook" },
          {
            id: "c",
            label: "Publier la clé secrète dans le navigateur",
          },
          {
            id: "d",
            label: "Sauter le lien utilisateur ↔ client",
          },
        ],
        correct: ["a"],
        explanation:
          "Mode test = parcours réel, argent fictif. Valide page de paiement, retour, et plus tard les webhooks avant la production.",
      },
      {
        id: "q3",
        question: "Le client (Customer ou équivalent) doit être relié…",
        options: [
          {
            id: "a",
            label:
              "Au compte utilisateur / organisation de ton produit (lien durable en base)",
          },
          { id: "b", label: "Uniquement au localStorage" },
          { id: "c", label: "À rien : la redirection suffit" },
          { id: "d", label: "Au CSS du bouton Payer" },
        ],
        correct: ["a"],
        explanation:
          "Sans lien utilisateur ↔ client, tu ne sais pas qui a payé ni quel plan activer.",
      },
      {
        id: "q4",
        question: "Le portail client (ou équivalent) sert surtout à…",
        options: [
          {
            id: "a",
            label:
              "Laisser le client gérer abonnement, moyens de paiement et factures chez le prestataire",
          },
          {
            id: "b",
            label: "Remplacer l'authentification de ton appli",
          },
          {
            id: "c",
            label: "Activer Pro sans signature de webhook",
          },
          { id: "d", label: "Stocker le PAN dans tes logs" },
        ],
        correct: ["a"],
        explanation:
          "Portail hébergé = moins de PCI et d'interface maison pour annuler / changer de carte.",
      },
      {
        id: "q5",
        question: "Créer une session de paiement doit…",
        options: [
          {
            id: "a",
            label:
              "Se faire côté serveur avec la clé secrète, jamais exposée au navigateur",
          },
          { id: "b", label: "Utiliser la clé secrète dans React" },
          {
            id: "c",
            label: "Ignorer le mode test en développement",
          },
          {
            id: "d",
            label: "Activer l'accès dès la création de session",
          },
        ],
        correct: ["a"],
        explanation:
          "Secrets côté serveur. Créer une session, ce n'est pas un paiement réussi : attends le webhook signé.",
      },
    ],
  },

  m03: {
    id: "svc-paiements-quiz-m03",
    title: "Webhooks & idempotence : valide ta lecture",
    questions: [
      {
        id: "q1",
        question:
          "Activer l'accès Pro uniquement sur la redirection de succès…",
        options: [
          {
            id: "a",
            label:
              "Est une erreur : la redirection n'est pas une preuve de paiement fiable",
          },
          {
            id: "b",
            label: "Est la méthode recommandée en production",
          },
          {
            id: "c",
            label: "Remplace la vérification de signature",
          },
          { id: "d", label: "Garantit l'idempotence" },
        ],
        correct: ["a"],
        explanation:
          "L'utilisateur peut rejouer l'URL, abandonner, ou manipuler le retour. La source de vérité = événement signé du prestataire.",
      },
      {
        id: "q2",
        question: "Vérifier la signature d'un webhook sert à…",
        options: [
          {
            id: "a",
            label:
              "Prouver que l'événement vient vraiment du prestataire, pas d'un faux POST",
          },
          { id: "b", label: "Styliser la page tarifaire" },
          { id: "c", label: "Remplacer le lien vers le client" },
          { id: "d", label: "Autoriser n'importe quel corps JSON" },
        ],
        correct: ["a"],
        explanation:
          "Sans signature, n'importe qui peut POST « payment succeeded » sur ton adresse d'API.",
      },
      {
        id: "q3",
        question: "L'idempotence sur les webhooks signifie…",
        options: [
          {
            id: "a",
            label:
              "Traiter deux fois le même event_id ne double pas l'activation / la facturation",
          },
          {
            id: "b",
            label: "Ignorer tous les webhooks après le premier",
          },
          {
            id: "c",
            label: "Activer Pro à chaque rejeu volontairement",
          },
          {
            id: "d",
            label: "Désactiver les nouvelles tentatives du prestataire",
          },
        ],
        correct: ["a"],
        explanation:
          "Les prestataires rejouent. Enregistre les event ids traités ou utilise des contraintes d'unicité.",
      },
      {
        id: "q4",
        question:
          "Les états de commande (en attente → payé → échoué…) aident à…",
        options: [
          {
            id: "a",
            label:
              "Modéliser le cycle de vie et réconcilier produit ↔ prestataire",
          },
          { id: "b", label: "Remplacer les webhooks" },
          { id: "c", label: "Cacher les échecs aux utilisateurs" },
          { id: "d", label: "Éviter le mode test" },
        ],
        correct: ["a"],
        explanation:
          "Une machine à états claire évite « déjà Pro » alors que le paiement est encore en attente.",
      },
      {
        id: "q5",
        question: "Un webhook non signé doit être…",
        options: [
          {
            id: "a",
            label: "Rejeté (4xx) : ne jamais appliquer d'effet métier",
          },
          { id: "b", label: "Accepté « pour aller plus vite »" },
          {
            id: "c",
            label: "Utilisé pour activer Pro immédiatement",
          },
          {
            id: "d",
            label: "Loggé avec le numéro de carte complet",
          },
        ],
        correct: ["a"],
        explanation:
          "Piège classique de l'IA : traitement qui parse le JSON sans vérifier la signature.",
      },
    ],
  },

  m04: {
    id: "svc-paiements-quiz-m04",
    title: "Échecs & conformité : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Une carte refusée côté produit, tu dois…",
        options: [
          {
            id: "a",
            label:
              "Garder un état d'échec visible et un message utilisateur actionnable",
          },
          {
            id: "b",
            label: "Activer Pro quand même « pour la conversion »",
          },
          { id: "c", label: "Logger le PAN complet" },
          { id: "d", label: "Ignorer le webhook d'échec" },
        ],
        correct: ["a"],
        explanation:
          "Échec = état + expérience claire (réessayer, mettre à jour le moyen de paiement). Pas d'accès payant fantôme.",
      },
      {
        id: "q2",
        question: "La relance de paiement basique, c'est…",
        options: [
          {
            id: "a",
            label:
              "Relancer / informer quand un renouvellement échoue, avant de couper l'accès",
          },
          { id: "b", label: "Supprimer le compte sans prévenir" },
          {
            id: "c",
            label: "Afficher le numéro de carte dans l'email",
          },
          {
            id: "d",
            label: "Activer sur la redirection seule",
          },
        ],
        correct: ["a"],
        explanation:
          "En retard → communication → nouvelle tentative / portail → puis révocation si besoin. Documente la politique.",
      },
      {
        id: "q3",
        question: "Les mentions minimales autour du paiement couvrent surtout…",
        options: [
          {
            id: "a",
            label:
              "Prix, renouvellement, annulation, et qui traite le paiement (transparence)",
          },
          { id: "b", label: "Uniquement la couleur du bouton" },
          { id: "c", label: "Le code source du prestataire" },
          {
            id: "d",
            label: "Rien : la page de paiement suffit légalement partout",
          },
        ],
        correct: ["a"],
        explanation:
          "Conformité minimale, ce n'est pas un cabinet d'avocats : affiche clairement ce que le client paie et comment arrêter.",
      },
      {
        id: "q4",
        question: "Dans les logs de paiement, tu ne dois pas…",
        options: [
          {
            id: "a",
            label:
              "Écrire PAN, CVV, ou données carte complètes (ni les coller dans Sentry)",
          },
          { id: "b", label: "Logger un event_id ou un payment_intent id" },
          {
            id: "c",
            label: "Logger un statut d'échec (refusé, expiré)",
          },
          { id: "d", label: "Logger l'id utilisateur interne" },
        ],
        correct: ["a"],
        explanation:
          "Logs utiles = ids et statuts. Jamais de données de carte / secrets.",
      },
      {
        id: "q5",
        question: "Une matrice erreurs → réaction → message sert à…",
        options: [
          {
            id: "a",
            label:
              "Décider à l'avance quoi faire et quoi dire pour chaque échec courant",
          },
          { id: "b", label: "Remplacer les webhooks signés" },
          { id: "c", label: "Autoriser la double activation" },
          { id: "d", label: "Publier la clé secrète" },
        ],
        correct: ["a"],
        explanation:
          "Sans matrice, l'IA invente des messages flous et laisse des états incohérents.",
      },
    ],
  },
};
