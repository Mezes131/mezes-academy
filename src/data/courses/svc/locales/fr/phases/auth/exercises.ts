import type { AuditExercise } from "@/types";

export const authExercises: Record<
  "m01_1" | "m02_1" | "m03_1" | "m04_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-auth-ex-m01-1",
    format: "audit",
    title: "Choisir un modèle pour trois cas",
    instructions:
      "Pour chaque affirmation, coche seulement si elle est juste. Ignore les raccourcis dangereux proposés par l'IA.",
    hints: [
      "Un outil interne d'équipe n'a pas les mêmes besoins qu'une appli grand public.",
      "Réinventer la connexion soi-même est presque toujours un piège.",
    ],
    scenario: `<p><strong>Cas A :</strong> Logiciel en ligne pour entreprises : plusieurs comptes par organisation, souvent déjà sur Google Workspace.</p>
<p><strong>Cas B :</strong> Appli grand public pensée mobile : inscription rapide, peu d'obstacles.</p>
<p><strong>Cas C :</strong> Outil interne d'une PME (20 personnes) : déjà sur Microsoft 365.</p>
<p>Un prompt IA propose pour les trois : « Connexion maison avec un jeton collé dans le stockage du navigateur, c'est plus simple. »</p>`,
    findings: [
      {
        id: "f1",
        label: "Cas A : se connecter via un compte existant (Google, etc.) + rôles par organisation est un bon choix",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f2",
        label: "Cas B : lien magique par email ou un service de connexion tiers peut réduire les obstacles",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f3",
        label: "Cas C : s'appuyer sur le compte entreprise déjà utilisé (ex. Microsoft) évite une connexion maison",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Connexion maison + jeton dans le stockage du navigateur pour les trois cas = mauvaise pratique",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Mettre le jeton dans le stockage du navigateur sans y réfléchir est toujours la meilleure option",
        correct: false,
      },
      {
        id: "f6",
        label: "Réinventer le stockage des mots de passe « pour apprendre » en production est acceptable",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Adapte le modèle au cas (compte existant pour les entreprises, lien magique / service tiers pour le grand public, annuaire déjà en place en interne). Connexion maison + jeton navigateur pour tout = non.</p>`,
  },

  m02_1: {
    id: "svc-auth-ex-m02-1",
    format: "audit",
    title: "Bibliothèque navigateur vs vérification serveur",
    instructions:
      "Tu branches un service de connexion (prestataire tiers). Coche ce qui est vrai pour une intégration saine.",
    hints: [
      "Le navigateur peut mentir. Le serveur décide qui est connecté pour les actions sensibles.",
      "La bibliothèque côté navigateur facilite l'écran ; elle ne remplace pas le contrôle serveur.",
    ],
    scenario: `<p>Parcours : inscription → connexion → rester reconnu. Service de connexion : un prestataire courant (exemples du marché : Supabase Auth, Clerk, Auth.js).</p>
<p>Un junior a mis : afficher l'administration seulement dans React si « utilisateur présent », sans contrôle sur l'adresse d'API <code>GET /api/admin/users</code>.</p>`,
    findings: [
      {
        id: "f1",
        label: "La bibliothèque côté navigateur peut gérer formulaires et affichage",
        correct: true,
        minSeverity: "low",
      },
      {
        id: "f2",
        label: "Chaque adresse d'API sensible doit vérifier la connexion / le jeton côté serveur",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Masquer un bouton d'administration dans l'interface ne protège pas l'API",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Les secrets du service de connexion restent hors du paquet envoyé au navigateur",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f5",
        label: "Si la bibliothèque dit que l'utilisateur est connecté, l'API peut faire confiance sans vérifier",
        correct: false,
      },
      {
        id: "f6",
        label: "Coller la clé secrète du service dans l'interface « pour aller vite »",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Bibliothèque navigateur = confort d'écran. Serveur = vérité pour les droits. Secrets hors navigateur. Masquer un bouton ≠ sécuriser une adresse d'API.</p>`,
  },

  m03_1: {
    id: "svc-auth-ex-m03-1",
    format: "audit",
    title: "Accès illégitime en changeant l'identifiant",
    instructions:
      "Lis le scénario. Coche les constats justes sur la faille et les correctifs.",
    hints: [
      "En changeant le numéro dans l'adresse / l'API, tu ne dois pas pouvoir lire la ressource d'un autre.",
      "Le correctif est côté serveur (et éventuellement règles en base), pas seulement dans l'écran.",
    ],
    scenario: `<p>Appli de notes. Connecté en tant qu'Alice. L'API <code>GET /api/notes/101</code> renvoie la note 101. Alice essaie <code>GET /api/notes/102</code> (note de Bob) : le serveur renvoie la note de Bob sans vérifier le propriétaire.</p>
<p>L'écran cache le lien vers 102, mais l'API répond quand même.</p>`,
    findings: [
      {
        id: "f1",
        label: "C'est un accès illégitime : ressource d'autrui via un identifiant manipulé",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Le serveur doit vérifier que l'utilisateur connecté a le droit sur cette note",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Masquer le lien dans l'écran ne suffit pas",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Des règles d'accès en base (qui peut lire quelles lignes) aident à bloquer la fuite",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Le problème vient uniquement d'une police d'écriture trop petite",
        correct: false,
      },
      {
        id: "f6",
        label: "Si les numéros sont « difficiles à deviner », on peut se passer de contrôle d'accès",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Faille = droits non vérifiés sur l'objet. Correctif serveur (et règles en base si besoin). L'écran et l'obscurité des numéros ne protègent pas.</p>`,
  },

  m04_projet: {
    id: "svc-auth-ex-m04-projet",
    format: "audit",
    title: "Projet P4 : liste de contrôle connexion + espace admin",
    instructions:
      "Avant de considérer la connexion « prête pour la production » sur le produit final, coche ce qui doit être vrai.",
    hints: [
      "Service de connexion tiers > connexion maison fragile.",
      "Espace admin = adresses d'API et données protégées serveur, pas seulement une page cachée.",
    ],
    scenario: `<p>Objectif projet P4 : connexion via un service tiers, espace d'administration protégé, règles d'accès écrites.</p>
<p>Un agent a « fini » : page /admin visible si le stockage du navigateur dit <code>role === 'admin'</code>, réinitialisation du mot de passe avec le même lien réutilisable 30 jours, pas de moyen de couper une connexion sur un autre appareil.</p>`,
    findings: [
      {
        id: "f1",
        label: "Connexion via un service tiers (pas de connexion maison fragile)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Espace admin protégé côté serveur (connexion / rôle vérifiés sur les API)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Réinitialisation / vérification email : jetons à usage unique, durée de vie courte",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Connexions : déconnexion et coupure possibles (plusieurs appareils)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Règles d'accès écrites (qui peut quoi) alignées avec le code",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f6",
        label: "Se fier au rôle stocké dans le navigateur pour l'admin est suffisant",
        correct: false,
      },
      {
        id: "f7",
        label: "Un lien de réinitialisation réutilisable pendant des semaines est une bonne idée",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>Liste de contrôle : service tiers, admin serveur, jetons sensibles à usage unique, coupure de connexion, règles écrites. Rôle dans le navigateur et liens de réinitialisation longue durée = non.</p>`,
  },
};
