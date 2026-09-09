import type { AuditExercise } from "@/types";

export const paiementsExercises: Record<
  "m01_1" | "m02_1" | "m03_1" | "m04_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-paiements-ex-m01-1",
    format: "audit",
    title: "Choisir le modèle pour trois produits",
    instructions:
      "Coche seulement les affirmations justes sur paiement unique, abonnement et usage. Repère les mauvaises correspondances offre → technique.",
    hints: [
      "Pars du cas produit, plutôt que du logo du prestataire.",
      "Chaque modèle a des objets techniques différents (paiement unique vs abonnement vs métriques).",
    ],
    scenario: `<p><strong>Trois produits :</strong> (A) pack de modèles vendu une fois ; (B) logiciel en ligne (SaaS) Free/Pro mensuel ; (C) API facturée au million de requêtes.</p>
<p>Une IA propose le même « paiement unique via Checkout » pour les trois, active Pro sur la redirection, et invente 8 plans « Enterprise Platinum » sans brief.</p>
<p>Tu dois relier chaque offre au bon modèle et à la correspondance technique minimale.</p>`,
    findings: [
      {
        id: "f1",
        label:
          "Le pack de modèles (A) correspond bien à un modèle paiement unique (un paiement → droit / livraison)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f2",
        label:
          "Le logiciel Free/Pro (B) correspond à un abonnement : client + plan/prix + cycle de vie d'accès",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label:
          "L'API au volume (C) exige des métriques / compteurs à l'usage, pas seulement un paiement ponctuel",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label:
          "La correspondance offre ↔ objets techniques doit être documentée avant d'intégrer le prestataire",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label:
          "Le même paiement unique via Checkout suffit pour A, B et C sans autre modèle",
        correct: false,
      },
      {
        id: "f6",
        label:
          "Inventer des plans « au cas où » sans besoin produit est une bonne pratique",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>A → paiement unique ; B → abonnement (client + plan + états) ; C → usage (métriques). Documente la correspondance. Refuse les plans inventés et l'activation sur redirection.</p>`,
  },

  m02_1: {
    id: "svc-paiements-ex-m02-1",
    format: "audit",
    title: "Parcours Free → Pro",
    instructions:
      "Audite le parcours d'upgrade généré. Coche ce qui doit être vrai (prestataire = exemple du marché type Stripe).",
    hints: [
      "Secrets et création de session = serveur.",
      "Créer une session, ce n'est pas encore un paiement réussi.",
    ],
    scenario: `<p>Objectif : passer Free → Pro en <strong>mode test</strong>, de la page tarifaire au retour de la page de paiement, via un <strong>prestataire de paiement tel que Stripe</strong> (exemple du marché).</p>
<p>L'IA livre : clé secrète dans le navigateur, pas de lien utilisateur ↔ client, activation Pro dès <code>createCheckoutSession</code>, et pas de lien vers le portail client.</p>`,
    findings: [
      {
        id: "f1",
        label:
          "La session de paiement se crée côté serveur avec la clé secrète (jamais dans le navigateur)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label:
          "Chaque utilisateur / organisation payant a un client (Customer ou équivalent) relié en base",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label:
          "Le parcours s'exerce en mode test avant la production (cartes / événements de test)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label:
          "Un portail client (ou équivalent) permet de gérer abonnement / moyen de paiement sans interface PCI maison",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Mettre la clé secrète dans React accélère et reste sûr",
        correct: false,
      },
      {
        id: "f6",
        label:
          "Activer Pro dès la création de session (avant webhook) est correct",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Serveur + secrets, lien vers le client, mode test, portail pour la gestion. Créer une session, ce n'est pas encore l'accès Pro : le webhook signé (module suivant) active vraiment.</p>`,
  },

  m03_1: {
    id: "svc-paiements-ex-m03-1",
    format: "audit",
    title: "Webhook dupliqué",
    instructions:
      "Coche les constats justes : signature, jamais d'activation sur la redirection seule, idempotence sur rejeu.",
    hints: [
      "La redirection de succès n'est pas une source de vérité.",
      "Les prestataires rejouent les événements : ton traitement doit donc absorber les doublons.",
    ],
    scenario: `<p>Traitement généré : active Pro sur <code>/success?session_id=…</code>, accepte les webhooks sans vérifier la signature, et à chaque rejeu de <code>checkout.session.completed</code> incrémente un crédit « bonus ».</p>
<p>Tu simules un webhook duplié (même <code>event_id</code>) et tu dois prouver la cohérence.</p>`,
    findings: [
      {
        id: "f1",
        label: "Vérifier la signature du webhook avant tout effet métier",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label:
          "Ne jamais activer l'accès payant uniquement sur la redirection de succès",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label:
          "Traiter deux fois le même event_id ne doit pas double-activer ni double-créditer (idempotence)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label:
          "Des états de commande clairs (en attente / payé / échoué) aident à réconcilier produit et prestataire",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label:
          "Accepter un webhook non signé « en dev » et le laisser en production, ça va",
        correct: false,
      },
      {
        id: "f6",
        label: "La redirection seule est une preuve de paiement suffisante",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Signature obligatoire, activation via événement signé, idempotence sur event_id, états de commande. Redirection = expérience, pas preuve.</p>`,
  },

  m04_projet: {
    id: "svc-paiements-ex-m04-projet",
    format: "audit",
    title: "Projet P6 : Free/Pro avec webhook",
    instructions:
      "Avant de déclarer la monétisation « prête » sur le projet final, coche ce qui doit être vrai.",
    hints: [
      "Activation = webhook signé + idempotent.",
      "Échecs visibles + logs sans données carte.",
    ],
    scenario: `<p>Objectif P6 : plan Free/Pro, page de paiement via un <strong>prestataire tel que Stripe</strong> (exemple du marché), webhook qui active réellement l'accès.</p>
<p>Un agent a « terminé » : Pro s'active sur redirection, webhook non signé, rejeu = double crédit, carte refusée laisse l'interface en « succès », logs contiennent des fragments de PAN, aucune mention prix/renouvellement.</p>`,
    findings: [
      {
        id: "f1",
        label:
          "L'accès Pro s'active via webhook signé, jamais via la redirection seule",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label:
          "Idempotence prouvée : un webhook dupliqué ne double pas l'activation",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label:
          "Parcours d'échec (carte refusée / en retard) géré avec état et message utilisateur visibles",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label:
          "Mentions minimales (prix, renouvellement, annulation / qui traite le paiement) présentes",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label:
          "Les logs n'exposent ni PAN/CVV ni secrets : ids et statuts seulement",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f6",
        label:
          "Activer Pro sur redirection et logger le PAN est acceptable pour mettre en production",
        correct: false,
      },
      {
        id: "f7",
        label:
          "Un webhook non signé qui crédite à chaque rejeu est un design valide",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>Liste de contrôle P6 : webhook signé, idempotence, échecs visibles, mentions minimales, logs sans données sensibles. Redirection et PAN en log = non.</p>`,
  },
};
