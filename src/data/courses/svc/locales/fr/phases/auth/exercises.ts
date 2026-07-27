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
      "Un outil interne d'équipe n'a pas les mêmes besoins qu'une app grand public.",
      "Réinventer l'auth maison est presque toujours un piège.",
    ],
    scenario: `<p><strong>Cas A :</strong> SaaS B2B (entreprises) : plusieurs comptes par organisation, souvent Google Workspace.</p>
<p><strong>Cas B :</strong> App grand public mobile-first : inscription rapide, peu de friction.</p>
<p><strong>Cas C :</strong> Outil interne d'une PME (20 personnes) : déjà sur Microsoft 365.</p>
<p>Un prompt IA propose pour les trois : « Auth maison avec JWT en localStorage, c'est plus simple. »</p>`,
    findings: [
      {
        id: "f1",
        label: "Cas A : OAuth / connexion via compte existant (Google, etc.) + rôles org est un bon choix",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f2",
        label: "Cas B : lien magique (email) ou provider tiers peut réduire la friction",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f3",
        label: "Cas C : s'appuyer sur le fournisseur déjà utilisé (ex. Microsoft) évite une auth maison",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Auth maison + JWT dans le stockage navigateur pour les trois cas = anti-pattern",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Mettre le JWT en localStorage sans réflexion est toujours la meilleure option",
        correct: false,
      },
      {
        id: "f6",
        label: "Réinventer hashage de mots de passe « pour apprendre » en prod est acceptable",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Adapte le modèle au cas (OAuth B2B, lien magique / provider grand public, IdP déjà en place en interne). Auth maison + JWT navigateur pour tout = non.</p>`,
  },

  m02_1: {
    id: "svc-auth-ex-m02-1",
    format: "audit",
    title: "SDK client vs vérification serveur",
    instructions:
      "Tu branches un provider de connexion (service tiers). Coche ce qui est vrai pour une intégration saine.",
    hints: [
      "Le navigateur peut mentir. Le serveur décide qui est connecté pour les actions sensibles.",
      "Le SDK client facilite l'UI ; il ne remplace pas le contrôle serveur.",
    ],
    scenario: `<p>Parcours : inscription → connexion → session. Provider : Supabase Auth (variantes Clerk / Auth.js similaires).</p>
<p>Un junior a mis : « if (user) showAdmin » uniquement dans React, sans contrôle sur <code>GET /api/admin/users</code>.</p>`,
    findings: [
      {
        id: "f1",
        label: "Le SDK client peut gérer formulaires et état d'affichage",
        correct: true,
        minSeverity: "low",
      },
      {
        id: "f2",
        label: "Chaque route API sensible doit vérifier la session / le jeton côté serveur",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Masquer un bouton admin dans l'UI ne protège pas l'API",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Les secrets du provider restent hors du paquet navigateur",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f5",
        label: "Si le SDK dit que l'utilisateur est connecté, l'API peut faire confiance sans vérifier",
        correct: false,
      },
      {
        id: "f6",
        label: "Coller la clé secrète du provider dans le front « pour aller vite »",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>SDK = confort UI. Serveur = vérité pour les droits. Secrets hors navigateur. Masquer un bouton ≠ sécuriser une route.</p>`,
  },

  m03_1: {
    id: "svc-auth-ex-m03-1",
    format: "audit",
    title: "Casser puis réparer un IDOR",
    instructions:
      "Lis le scénario. Coche les constats justes sur la faille et les correctifs.",
    hints: [
      "IDOR : en changeant l'identifiant dans l'URL / l'API, tu accèdes à la ressource d'un autre.",
      "Le correctif est côté serveur (et éventuellement règles en base), pas seulement dans l'UI.",
    ],
    scenario: `<p>App de notes. Connecté en tant qu'Alice. L'API <code>GET /api/notes/101</code> renvoie la note 101. Alice essaie <code>GET /api/notes/102</code> (note de Bob) : le serveur renvoie la note de Bob sans vérifier le propriétaire.</p>
<p>L'UI cache le lien vers 102, mais l'API répond quand même.</p>`,
    findings: [
      {
        id: "f1",
        label: "C'est un IDOR : accès à la ressource d'autrui via un identifiant manipulé",
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
        label: "Masquer le lien dans l'UI ne suffit pas",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Des règles d'accès en base (RLS / policies) ou un contrôle équivalent aident à bloquer la fuite",
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
        label: "Si les ids sont « difficiles à deviner », on peut se passer de contrôle d'accès",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>IDOR = droits non vérifiés sur l'objet. Correctif serveur (et policies si besoin). L'UI et l'obscurité des ids ne protègent pas.</p>`,
  },

  m04_projet: {
    id: "svc-auth-ex-m04-projet",
    format: "audit",
    title: "Projet P4 : checklist auth + zone admin",
    instructions:
      "Avant de considérer l'auth « prête pour la prod » sur le produit capstone, coche ce qui doit être vrai.",
    hints: [
      "Provider tiers > auth maison fragile.",
      "Zone admin = routes et données protégées serveur, pas seulement une page cachée.",
    ],
    scenario: `<p>Objectif projet P4 : auth via provider tiers, zone admin protégée, politique d'accès écrite.</p>
<p>Un agent a « fini » : page /admin visible si <code>localStorage.role === 'admin'</code>, reset password avec le même lien réutilisable 30 jours, pas de révocation de session.</p>`,
    findings: [
      {
        id: "f1",
        label: "Connexion via provider tiers (pas d'auth maison fragile)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Zone admin protégée côté serveur (session / rôle vérifiés sur les API)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Reset / vérification email : jetons à usage unique, durée de vie courte",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Sessions : déconnexion et révocation possibles (multi-appareil)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Politique d'accès écrite (qui peut quoi) alignée avec le code",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f6",
        label: "Se fier à localStorage.role pour l'admin est suffisant",
        correct: false,
      },
      {
        id: "f7",
        label: "Un lien de reset réutilisable pendant des semaines est une bonne idée",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>Checklist : provider tiers, admin serveur, jetons sensibles à usage unique, révocation de session, politique écrite. localStorage.role et liens de reset longue durée = non.</p>`,
  },
};
