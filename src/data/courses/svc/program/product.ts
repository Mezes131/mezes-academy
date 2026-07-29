import type { ProgramPhase } from "@/types";
import { lesson, module, phase } from "./helpers";

/* ── P4 : Connexion & identité (services tiers) ─────────────────── */

export const authPhase: ProgramPhase = phase({
  slug: "auth",
  title: "Connexion & identité",
  objective:
    "Brancher un vrai service de connexion : ne jamais réinventer l'authentification. À partir d'ici, les projets de phase alimentent le produit final.",
  modules: [
    module({
      id: "svc-auth-m01",
      index: "01",
      title: "Modèles de connexion modernes",
      subtitle: "Sessions, jetons signés, lien magique, compte existant",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Comparer sessions, jetons signés, lien magique et compte existant",
        "Choisir un modèle selon le cas produit",
        "Repérer les erreurs classiques du code de connexion généré",
      ],
      lessons: [
        lesson({
          id: "svc-auth-m01-l1",
          title: "Panorama des modèles",
          objective: "Comprendre sessions, jetons signés, lien magique, compte existant et leurs compromis.",
          concepts: ["sessions", "jeton signé", "lien magique", "compte existant"],
        }),
        lesson({
          id: "svc-auth-m01-l2",
          title: "Erreurs du code généré",
          objective: "Identifier les failles typiques de la connexion écrite par l'IA.",
          concepts: ["stockage de jetons", "expiration", "connexion maison fragile"],
          pitfalls: ["jeton dans le stockage navigateur sans réflexion", "connexion maison au lieu d'un service tiers"],
        }),
      ],
      exercises: [
        {
          title: "Choisir un modèle pour trois cas",
          kind: "synthesis",
          brief:
            "Choisir et justifier un modèle de connexion pour trois cas produit (logiciel entreprises, appli grand public, outil interne).",
        },
      ],
    }),
    module({
      id: "svc-auth-m02",
      index: "02",
      title: "Brancher un service de connexion",
      subtitle: "Exemples du marché : parcours guidé + variantes",
      duration: "50 min",
      difficulty: "intermediate",
      objectives: [
        "Intégrer un service de connexion de bout en bout",
        "Comprendre le parcours inscription → rester reconnu",
        "Distinguer bibliothèque navigateur et vérification serveur",
      ],
      lessons: [
        lesson({
          id: "svc-auth-m02-l1",
          title: "Parcours guidé",
          objective: "Brancher un service de connexion (exemples du marché en guidé).",
          concepts: ["service de connexion", "inscription", "session"],
        }),
        lesson({
          id: "svc-auth-m02-l2",
          title: "Navigateur vs serveur",
          objective: "Savoir ce qui se vérifie côté navigateur et ce qui DOIT l'être côté serveur.",
          concepts: ["bibliothèque navigateur", "vérification serveur", "jetons"],
        }),
      ],
      exercises: [
        {
          title: "Parcours inscription → connexion",
          kind: "guided",
          brief:
            "Implémenter le parcours complet inscription → connexion → session sur une appli de départ avec un service tiers.",
        },
      ],
    }),
    module({
      id: "svc-auth-m03",
      index: "03",
      title: "Autorisation réelle",
      subtitle: "Rôles, règles en base, accès illégitime : protéger côté serveur",
      duration: "50 min",
      difficulty: "intermediate",
      objectives: [
        "Modéliser rôles et permissions",
        "Écrire des règles d'accès en base",
        "Détecter et corriger un accès illégitime via un identifiant",
      ],
      lessons: [
        lesson({
          id: "svc-auth-m03-l1",
          title: "Rôles et règles",
          objective: "Structurer l'autorisation avec rôles et règles d'accès en base.",
          concepts: ["rôles", "règles d'accès en base"],
        }),
        lesson({
          id: "svc-auth-m03-l2",
          title: "Accès illégitime et protection serveur",
          objective: "Comprendre l'accès via identifiant manipulé et pourquoi le navigateur ne suffit jamais.",
          concepts: ["accès illégitime", "contrôle d'accès serveur"],
          pitfalls: ["masquer un bouton au lieu de protéger la route", "identifiants devinables sans contrôle"],
        }),
      ],
      exercises: [
        {
          title: "Casser puis réparer un accès illégitime",
          kind: "audit",
          brief:
            "Exploiter un accès illégitime sur une appli volontairement vulnérable, puis le corriger côté serveur avec preuve.",
        },
      ],
    }),
    module({
      id: "svc-auth-m04",
      index: "04",
      title: "Parcours sensibles",
      subtitle: "Réinitialisation, vérification email, plusieurs appareils",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Sécuriser réinitialisation et vérification email",
        "Gérer plusieurs appareils et la coupure de connexion",
        "Construire une liste de contrôle connexion production",
      ],
      lessons: [
        lesson({
          id: "svc-auth-m04-l1",
          title: "Réinitialisation et vérification email",
          objective: "Implémenter des parcours sensibles sans failles classiques.",
          concepts: ["réinitialisation mot de passe", "vérification email", "jetons à usage unique"],
        }),
        lesson({
          id: "svc-auth-m04-l2",
          title: "Sessions et coupure",
          objective: "Gérer plusieurs appareils, déconnexion et coupure de session.",
          concepts: ["plusieurs appareils", "coupure", "expiration"],
        }),
      ],
      exercises: [
        {
          title: "Liste de contrôle connexion production",
          kind: "synthesis",
          brief:
            "Rédiger la liste de contrôle connexion production du produit en cours et la vérifier point par point.",
        },
      ],
    }),
  ],
  project: {
    title: "Projet P4 : Connexion tiers + espace admin",
    deliverable:
      "Le produit final avec connexion via service tiers, espace admin protégé et règles d'accès documentées.",
    assessment: [
      "Service de connexion fonctionnel de bout en bout",
      "Espace admin réellement protégé côté serveur",
      "Règles d'accès écrites et cohérentes avec le code",
    ],
  },
});

/* ── P5 : Données & backend ──────────────────────────────────────── */

export const dataPhase: ProgramPhase = phase({
  slug: "data",
  title: "Données & backend",
  objective: "Persistance, API et traitements async solides pour le produit.",
  modules: [
    module({
      id: "svc-data-m01",
      index: "01",
      title: "Modèle de données utile",
      subtitle: "Entités, relations, migrations : sans schéma halluciné",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Modéliser entités et relations depuis le besoin",
        "Gérer les migrations proprement",
        "Repérer un schéma halluciné par l'IA",
      ],
      lessons: [
        lesson({
          id: "svc-data-m01-l1",
          title: "Entités et relations",
          objective: "Traduire le domaine en schéma relationnel minimal.",
          concepts: ["entités", "relations", "clés étrangères"],
        }),
        lesson({
          id: "svc-data-m01-l2",
          title: "Migrations et schéma halluciné",
          objective: "Versionner le schéma et auditer ce que l'IA propose.",
          concepts: ["migrations", "schéma halluciné", "revue de schéma"],
          pitfalls: ["tables inutiles générées", "champs redondants"],
        }),
      ],
      exercises: [
        {
          title: "Schéma d'un SaaS simple",
          kind: "synthesis",
          brief:
            "Concevoir le schéma users / orgs / resources d'un SaaS simple, avec justification des relations.",
        },
      ],
    }),
    module({
      id: "svc-data-m02",
      index: "02",
      title: "API et validation aux frontières",
      subtitle: "Never trust the client",
      duration: "45 min",
      difficulty: "intermediate",
      objectives: [
        "Valider toutes les entrées côté serveur",
        "Retourner des erreurs typées",
        "Paginer les listes",
      ],
      lessons: [
        lesson({
          id: "svc-data-m02-l1",
          title: "Validation des entrées",
          objective: "Valider systématiquement aux frontières du système.",
          concepts: ["validation input", "schémas de validation", "frontières"],
          pitfalls: ["valider seulement côté client", "trust du payload"],
        }),
        lesson({
          id: "svc-data-m02-l2",
          title: "Erreurs typées et pagination",
          objective: "Structurer les réponses d'erreur et paginer les collections.",
          concepts: ["erreurs typées", "pagination", "codes HTTP"],
        }),
      ],
      exercises: [
        {
          title: "Sécuriser un endpoint généré",
          kind: "audit",
          brief:
            "Auditer un endpoint généré par IA et le sécuriser : validation, erreurs, autorisation.",
        },
      ],
    }),
    module({
      id: "svc-data-m03",
      index: "03",
      title: "Storage & fichiers",
      subtitle: "Uploads, URLs signées, quotas, ACL",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Gérer des uploads sûrs",
        "Servir des fichiers via URLs signées",
        "Appliquer quotas et contrôle d'accès",
      ],
      lessons: [
        lesson({
          id: "svc-data-m03-l1",
          title: "Uploads sûrs",
          objective: "Accepter des fichiers sans ouvrir de faille.",
          concepts: ["validation de fichiers", "taille et type", "stockage objet"],
        }),
        lesson({
          id: "svc-data-m03-l2",
          title: "URLs signées et ACL",
          objective: "Contrôler qui accède à quoi et pour combien de temps.",
          concepts: ["URLs signées", "ACL", "quotas"],
        }),
      ],
      exercises: [
        {
          title: "Upload avec contrôle d'accès",
          kind: "guided",
          brief:
            "Implémenter un upload avec URL signée et vérification d'accès à la lecture.",
        },
      ],
    }),
    module({
      id: "svc-data-m04",
      index: "04",
      title: "Jobs & traitements async",
      subtitle: "Files légères, retries, idempotence",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Découpler les traitements lents de la requête HTTP",
        "Concevoir des jobs idempotents",
        "Gérer retries et échecs",
      ],
      lessons: [
        lesson({
          id: "svc-data-m04-l1",
          title: "Files légères",
          objective: "Choisir une solution de queue adaptée à un produit early-stage.",
          concepts: ["queues", "workers", "découplage"],
        }),
        lesson({
          id: "svc-data-m04-l2",
          title: "Idempotence des jobs",
          objective: "Écrire des jobs rejouables sans effets doubles.",
          concepts: ["idempotence", "retries", "dead letter"],
        }),
      ],
      exercises: [
        {
          title: "Job « envoyer email »",
          kind: "guided",
          brief:
            "Implémenter un job d'envoi d'email découplé de la requête HTTP, avec retry sûr.",
        },
      ],
    }),
  ],
  project: {
    title: "Projet P5 : CRUD métier + upload + job async",
    deliverable:
      "Le produit capstone enrichi : CRUD métier, upload de fichiers et un job async, générés puis audités.",
    assessment: [
      "Validation serveur systématique",
      "Upload avec contrôle d'accès prouvé",
      "Job async idempotent et rejouable",
    ],
  },
});

/* ── P6 : Paiements & services tiers ────────────────────────────── */

export const paiementsPhase: ProgramPhase = phase({
  slug: "paiements",
  title: "Paiements & services tiers",
  objective: "Rendre le produit monétisable correctement : webhook compris.",
  modules: [
    module({
      id: "svc-paiements-m01",
      index: "01",
      title: "Modèles économiques",
      subtitle: "One-shot, abonnement, usage : mapping offre ↔ technique",
      duration: "30 min",
      difficulty: "intermediate",
      objectives: [
        "Comparer one-shot, abonnement et usage",
        "Traduire une offre en objets techniques",
      ],
      lessons: [
        lesson({
          id: "svc-paiements-m01-l1",
          title: "Modèles et implications",
          objective: "Relier chaque modèle économique à sa mécanique technique.",
          concepts: ["one-shot", "abonnement", "usage-based", "mapping offre/technique"],
        }),
      ],
      exercises: [
        {
          title: "Choisir le modèle pour trois produits",
          kind: "synthesis",
          brief:
            "Choisir et justifier un modèle économique pour trois produits types.",
        },
      ],
    }),
    module({
      id: "svc-paiements-m02",
      index: "02",
      title: "Stripe bout-en-bout",
      subtitle: "Checkout, Customer Portal, test mode",
      duration: "55 min",
      difficulty: "intermediate",
      objectives: [
        "Mettre en place Stripe Checkout et le Customer Portal",
        "Manipuler Customer et Subscription",
        "Travailler en test mode",
      ],
      lessons: [
        lesson({
          id: "svc-paiements-m02-l1",
          title: "Checkout et Portal",
          objective: "Intégrer le parcours de paiement hébergé par Stripe.",
          concepts: ["Checkout", "Customer Portal", "test mode"],
        }),
        lesson({
          id: "svc-paiements-m02-l2",
          title: "Customer et Subscription",
          objective: "Relier les objets Stripe aux comptes du produit.",
          concepts: ["Customer", "Subscription", "mapping user ↔ customer"],
        }),
      ],
      exercises: [
        {
          title: "Parcours Free → Pro",
          kind: "guided",
          brief:
            "Implémenter le parcours d'upgrade Free → Pro en test mode, de la pricing page au retour de Checkout.",
        },
      ],
    }),
    module({
      id: "svc-paiements-m03",
      index: "03",
      title: "Webhooks & idempotence",
      subtitle: "Jamais activer l'accès seulement sur redirect",
      duration: "50 min",
      difficulty: "advanced",
      objectives: [
        "Vérifier la signature des webhooks",
        "Traiter les replays sans double effet",
        "Modéliser les états de commande",
      ],
      lessons: [
        lesson({
          id: "svc-paiements-m03-l1",
          title: "Signature et replay",
          objective: "Authentifier chaque webhook et absorber les doublons.",
          concepts: ["signature webhook", "replay", "idempotence"],
          pitfalls: ["activer l'accès sur le redirect", "traiter un webhook non signé"],
        }),
        lesson({
          id: "svc-paiements-m03-l2",
          title: "États de commande",
          objective: "Modéliser le cycle de vie d'un paiement côté produit.",
          concepts: ["états de commande", "machine à états", "réconciliation"],
        }),
      ],
      exercises: [
        {
          title: "Webhook dupliqué",
          kind: "audit",
          brief:
            "Simuler un webhook dupliqué et prouver que le système reste cohérent (pas de double activation).",
        },
      ],
    }),
    module({
      id: "svc-paiements-m04",
      index: "04",
      title: "Échecs & conformité minimale",
      subtitle: "Cartes refusées, mentions, logs sans fuite",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Gérer les échecs de paiement côté produit",
        "Couvrir les mentions minimales",
        "Logger sans exposer de données sensibles",
      ],
      lessons: [
        lesson({
          id: "svc-paiements-m04-l1",
          title: "Échecs de carte",
          objective: "Réagir proprement aux paiements refusés ou expirés.",
          concepts: ["échecs carte", "dunning basique", "communication client"],
        }),
        lesson({
          id: "svc-paiements-m04-l2",
          title: "Conformité et logs",
          objective: "Mentions minimales et logs sans données de paiement.",
          concepts: ["mentions légales paiement", "logs sans PAN/PII"],
        }),
      ],
      exercises: [
        {
          title: "Matrice d'erreurs paiement",
          kind: "synthesis",
          brief:
            "Construire la matrice erreurs de paiement → réaction produit → message utilisateur.",
        },
      ],
    }),
  ],
  project: {
    title: "Projet P6 : Plan Free/Pro avec webhook",
    deliverable:
      "Le produit capstone monétisé : plan Free/Pro, checkout Stripe et webhook qui active réellement l'accès.",
    assessment: [
      "Activation via webhook signé, jamais via redirect seul",
      "Idempotence prouvée (webhook dupliqué)",
      "Parcours d'échec géré et visible",
    ],
  },
});

/* ── P7 : Notifications ─────────────────────────────────────────── */

export const notificationsPhase: ProgramPhase = phase({
  slug: "notifications",
  title: "Notifications",
  objective: "Faire de l'email (et des canaux associés) une partie du produit.",
  modules: [
    module({
      id: "svc-notifications-m01",
      index: "01",
      title: "Canaux & moments",
      subtitle: "Transactionnel vs marketing, moments métier",
      duration: "30 min",
      difficulty: "intermediate",
      objectives: [
        "Distinguer transactionnel et marketing",
        "Relier événements métier et canaux",
      ],
      lessons: [
        lesson({
          id: "svc-notifications-m01-l1",
          title: "Canaux et moments métier",
          objective: "Choisir le bon canal (email, push, SMS) au bon moment.",
          concepts: ["transactionnel vs marketing", "push/SMS optionnels", "moments métier"],
        }),
      ],
      exercises: [
        {
          title: "Matrice événements → canal",
          kind: "synthesis",
          brief:
            "Construire la matrice des événements métier du produit et du canal de notification associé.",
        },
      ],
    }),
    module({
      id: "svc-notifications-m02",
      index: "02",
      title: "Provider email",
      subtitle: "Resend / Postmark : templates, domaines, deliverability",
      duration: "45 min",
      difficulty: "intermediate",
      objectives: [
        "Brancher un provider email",
        "Créer des templates propres",
        "Comprendre la deliverability de base",
      ],
      lessons: [
        lesson({
          id: "svc-notifications-m02-l1",
          title: "Brancher un provider",
          objective: "Envoyer un email transactionnel via Resend/Postmark.",
          concepts: ["provider email", "API d'envoi", "templates"],
        }),
        lesson({
          id: "svc-notifications-m02-l2",
          title: "Domaines et deliverability",
          objective: "Configurer le domaine d'envoi pour arriver en inbox.",
          concepts: ["domaine d'envoi", "SPF/DKIM basique", "deliverability"],
        }),
      ],
      exercises: [
        {
          title: "Emails welcome + receipt",
          kind: "guided",
          brief:
            "Implémenter les emails welcome et reçu de paiement avec templates.",
        },
      ],
    }),
    module({
      id: "svc-notifications-m03",
      index: "03",
      title: "Opt-in, préférences, abuse",
      subtitle: "Consentement, unsubscribe, rate limits",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Respecter le consentement et l'unsubscribe",
        "Protéger l'envoi contre les abus",
      ],
      lessons: [
        lesson({
          id: "svc-notifications-m03-l1",
          title: "Consentement et préférences",
          objective: "Gérer opt-in, préférences et désinscription.",
          concepts: ["opt-in", "unsubscribe", "préférences utilisateur"],
        }),
        lesson({
          id: "svc-notifications-m03-l2",
          title: "Anti-abus",
          objective: "Limiter le débit et prévenir l'usage malveillant.",
          concepts: ["rate limits", "abuse", "quotas d'envoi"],
        }),
      ],
      exercises: [
        {
          title: "Préférences utilisateur",
          kind: "guided",
          brief:
            "Implémenter un écran de préférences de notifications respecté par l'envoi.",
        },
      ],
    }),
    module({
      id: "svc-notifications-m04",
      index: "04",
      title: "Orchestration",
      subtitle: "Déclencheurs métier → queue → notification",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Chaîner événements métier, queue et envoi",
        "Corréler notifications, paiement et auth",
      ],
      lessons: [
        lesson({
          id: "svc-notifications-m04-l1",
          title: "Du déclencheur à l'envoi",
          objective: "Orchestrer événement → job → notification de façon fiable.",
          concepts: ["déclencheurs métier", "queue", "corrélation paiement/auth"],
        }),
      ],
      exercises: [
        {
          title: "Chaîne paiement → email",
          kind: "guided",
          brief:
            "Implémenter la chaîne complète : webhook de paiement → job → email de confirmation.",
        },
      ],
    }),
  ],
  project: {
    title: "Projet P7 : Emails transactionnels + préférences",
    deliverable:
      "Le produit capstone avec trois emails transactionnels (auth + paiement) et des préférences utilisateur respectées.",
    assessment: [
      "Trois emails branchés sur de vrais événements",
      "Préférences et unsubscribe respectés",
      "Envoi découplé (queue/job), pas dans la requête HTTP",
    ],
  },
});
