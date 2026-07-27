import type { AuditExercise } from "@/types";

export const architectureExercises: Record<"m02_1" | "m03_1", AuditExercise> = {
  m02_1: {
    id: "svc-architecture-ex-m02-1",
    format: "audit",
    title: "Matrice d'environnements",
    instructions:
      "Produit avec connexion utilisateur et paiement. Coche uniquement les règles saines pour local, aperçu en ligne et production. Ignore les raccourcis dangereux.",
    hints: [
      "Ce qui part dans le navigateur peut être lu par n'importe qui. Les secrets de production n'y ont pas leur place.",
      "Local, aperçu en ligne et production ont des jeux de secrets différents.",
    ],
    scenario: `<p>Tu prépares la config d'un petit produit : comptes utilisateurs + paiement Stripe. Trois environnements : local (ton ordinateur), aperçu en ligne (démo temporaire), production.</p>
<p>Un collègue propose : « On met la clé Stripe live dans l'interface, comme ça ça marche partout. »</p>`,
    findings: [
      {
        id: "f1",
        label: "Secrets de production uniquement en variables d'environnement côté serveur (jamais dans le code)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Jeux distincts local / aperçu en ligne / production (pas la même clé partout)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Aucune clé secrète de paiement dans le paquet envoyé au navigateur",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label: "Variables figées au build : seulement ce qui peut être public (ex. URL publique de l'API)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Mettre la clé Stripe live dans le front « pour que ça marche partout »",
        correct: false,
      },
      {
        id: "f6",
        label: "Réutiliser les secrets de production sur la machine de chaque développeur",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Règles saines : secrets serveur en variables d'environnement, jeux séparés par environnement, rien de secret dans le navigateur, construction limitée au public. La clé live dans l'interface et les secrets de production sur chaque ordinateur portable sont de mauvaises pratiques.</p>`,
  },

  m03_1: {
    id: "svc-architecture-ex-m03-1",
    format: "audit",
    title: "Notification de paiement",
    instructions:
      "Tu spécifies le traitement d'une notification de paiement (message envoyé automatiquement par le prestataire). Coche ce qui doit figurer dans un contrat sûr.",
    hints: [
      "Sans vérification de signature, n'importe qui peut inventer un « paiement réussi ».",
      "Le même événement peut arriver deux fois : ton système ne doit pas créditer deux fois.",
    ],
    scenario: `<p>Prestataire de paiement : envoie une notification HTTP quand un paiement change d'état. Ton API doit la recevoir, la vérifier, mettre à jour la commande, puis répondre.</p>
<p>Un prompt IA a proposé : « Accepte le corps JSON tel quel et marque la commande payée. Pas besoin de signature. »</p>`,
    findings: [
      {
        id: "f1",
        label: "Vérifier la signature (ou preuve d'authenticité) avant de faire confiance au message",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Ne pas appliquer deux fois le même événement (identifiant d'événement unique)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Définir les états attendus (ex. en attente, payé, échoué) et les erreurs renvoyées",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Limiter les nouvelles tentatives (retries) et les délais (timeouts) pour éviter les boucles folles",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Faire confiance au corps JSON sans vérifier la signature",
        correct: false,
      },
      {
        id: "f6",
        label: "Ignorer les doublons et créditer à chaque réception",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Contrat sûr : signature, pas de double traitement, états et erreurs clairs, retries / timeouts bornés. Accepter le JSON aveuglément ou créditer à chaque doublon = incident.</p>`,
  },
};
