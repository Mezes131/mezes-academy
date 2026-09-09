import type { AuditExercise } from "@/types";

export const notificationsExercises: Record<
  "m01_1" | "m02_1" | "m03_1" | "m04_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-notifications-ex-m01-1",
    format: "audit",
    title: "Matrice événements → canal",
    instructions:
      "Coche seulement les affirmations justes sur transactionnel vs marketing et le choix de canal.",
    hints: [
      "Pars du moment métier, plutôt que du tutoriel push.",
      "Évite l'envoi multi-canal par défaut.",
    ],
    scenario: `<p><strong>Événements :</strong> (A) réinitialisation du mot de passe ; (B) reçu de paiement ; (C) lettre d'info promo hebdo ; (D) alerte « serveur down » pour l'admin d'astreinte.</p>
<p>Une IA envoie un SMS + push + email marketing pour chaque événement, mélange promo et réinitialisation, et ignore le consentement.</p>
<p>Tu dois relier chaque cas au bon type et canal raisonnable.</p>`,
    findings: [
      {
        id: "f1",
        label:
          "Réinitialisation du mot de passe (A) est transactionnel : email (ou canal sécurisé) attendu, pas une promo",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label:
          "Reçu de paiement (B) est transactionnel : confirmation liée à un événement métier",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label:
          "Lettre d'info promo (C) est marketing : consentement explicite / désinscription obligatoires",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label:
          "Une matrice événements → canal (et type) doit exister avant d'intégrer le prestataire",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label:
          "Envoyer SMS + push + email marketing sur chaque événement est une bonne pratique",
        correct: false,
      },
      {
        id: "f6",
        label:
          "Confondre reçu de paiement et lettre d'info est sans conséquence",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>A/B → transactionnel (email typique) ; C → marketing + consentement ; D → canal urgent seulement si consentement / astreinte. Matrice avant code. Pas d'envoi multi-canal.</p>`,
  },

  m02_1: {
    id: "svc-notifications-ex-m02-1",
    format: "audit",
    title: "Emails de bienvenue + reçu",
    instructions:
      "Audite l'intégration prestataire. Coche ce qui doit être vrai (Resend/Postmark = exemples du marché).",
    hints: [
      "Clé secrète = serveur / processus de fond.",
      "Domaine + modèles versionnés valent mieux qu'un HTML collé dans le navigateur.",
    ],
    scenario: `<p>Objectif : emails de <strong>bienvenue</strong> et <strong>reçu de paiement</strong> via un <strong>prestataire email tel que Resend ou Postmark</strong> (exemples du marché).</p>
<p>L'IA livre : clé API dans React, envoi depuis <code>@gmail.com</code> sans SPF/DKIM, modèles avec variables non échappées, et « arriver en boîte = ignorer les emails rejetés ».</p>`,
    findings: [
      {
        id: "f1",
        label:
          "L'API d'envoi s'appelle côté serveur avec la clé secrète (jamais dans le navigateur)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label:
          "Un domaine d'envoi configuré (SPF/DKIM basique) améliore la chance d'arriver en boîte de réception",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label:
          "Modèles versionnés avec variables contrôlées / échappées pour bienvenue et reçu",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label:
          "Resend / Postmark sont des exemples : les mêmes concepts existent chez d'autres prestataires",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Mettre la clé prestataire dans React accélère et reste sûr",
        correct: false,
      },
      {
        id: "f6",
        label:
          "Ignorer domaine, emails rejetés et plaintes n'impacte pas la boîte de réception",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Serveur + secret, domaine authentifié, modèles propres, prestataire = exemple du marché. Pas de clé navigateur, pas d'envoi « from gmail » improvisé.</p>`,
  },

  m03_1: {
    id: "svc-notifications-ex-m03-1",
    format: "audit",
    title: "Préférences utilisateur",
    instructions:
      "Coche les constats justes : consentement, désinscription respectée à l'envoi, anti-abus.",
    hints: [
      "L'interface de préférences sans contrôle serveur = théâtre.",
      "Les limites de débit protègent quota et réputation.",
    ],
    scenario: `<p>Écran de préférences généré : cases décoratives. Le processus de fond envoie quand même la promo hebdo. Pas de désinscription effective. Route <code>/api/send</code> publique sans limite de débit : un robot inonde les réinitialisations.</p>
<p>Tu audites avant la production.</p>`,
    findings: [
      {
        id: "f1",
        label:
          "Les préférences / désinscription doivent être vérifiés côté serveur avant l'envoi marketing",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label:
          "Consentement explicite requis pour les messages marketing / non essentiels",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label:
          "Limites de débit / quotas par utilisateur ou type d'email limitent les abus",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label:
          "Une route d'envoi publique sans auth est une faille d'abus",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f5",
        label: "Ignorer la désinscription pour « engager » est acceptable",
        correct: false,
      },
      {
        id: "f6",
        label:
          "Des cases d'interface sans contrôle à l'envoi suffisent pour la conformité",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Préférences + désinscription appliquées à l'envoi, consentement marketing, quotas/auth sur l'envoi. Interface seule = non.</p>`,
  },

  m04_projet: {
    id: "svc-notifications-ex-m04-projet",
    format: "audit",
    title: "Projet P7 : Emails transactionnels + préférences",
    instructions:
      "Avant de déclarer les notifications « prêtes » sur le projet final, coche ce qui doit être vrai.",
    hints: [
      "Trois emails sur de vrais événements (connexion + paiement).",
      "Envoi découplé (file d'attente / tâche), préférences respectées.",
    ],
    scenario: `<p>Objectif P7 : trois emails transactionnels (connexion + paiement), préférences respectées, envoi via file d'attente. Prestataire email = <strong>exemple du marché</strong> (Resend/Postmark ou équivalent).</p>
<p>Un agent a « terminé » : email synchrone dans la route HTTP, clé dans le navigateur, email de bienvenue jamais branché, reçu envoyé sur redirection seule, promo malgré désinscription, tâche non idempotente (doublons).</p>`,
    findings: [
      {
        id: "f1",
        label:
          "Au moins trois emails transactionnels branchés sur de vrais événements (connexion + paiement)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label:
          "Préférences et désinscription respectées à l'envoi (surtout marketing)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label:
          "Envoi découplé via file d'attente / tâche, pas uniquement dans la requête HTTP",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label:
          "Chaîne fiable : événement métier (ex. webhook signé) → tâche → notification, avec idempotence",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label:
          "Clé prestataire côté serveur uniquement ; domaine / modèles soignés",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f6",
        label:
          "Email synchrone + clé navigateur + ignorer la désinscription est un design valide pour mettre en production",
        correct: false,
      },
      {
        id: "f7",
        label:
          "Envoyer le reçu uniquement sur redirection (sans événement métier) suffit",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>Liste de contrôle P7 : 3 emails sur de vrais événements, préférences/désinscription, file d'attente / tâche idempotente, secret serveur. Redirection seule et clé navigateur = non.</p>`,
  },
};
