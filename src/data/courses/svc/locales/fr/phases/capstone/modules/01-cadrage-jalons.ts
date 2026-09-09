import type { Module } from "@/types";
import { capstoneQuizzes } from "../quizzes";
import { capstoneExercises } from "../exercises";

export const capstoneModule01: Module = {
  id: "svc-capstone-m01",
  index: "01",
  title: "Cadrage et jalons du capstone",
  subtitle: "Choisir son brief (énoncé du projet), comprendre la rubrique, planifier le cycle",
  duration: "40 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Choisir un brief parmi les trois proposés",
    "Comprendre chaque critère de la rubrique et les échecs automatiques",
    "Planifier les jalons Prompt → Audit → Livraison",
  ],
  content: [
    { kind: "title", text: "Capstone : le terrain de jeu" },
    {
      kind: "paragraph",
      html: "Le capstone valide le parcours Secure Vibe Coding : un <strong>produit commercialisable</strong> de bout en bout, déployé, audité et livré. Trois briefs (<strong>énoncés du projet</strong>), <strong>une seule rubrique</strong>. Choisis le terrain qui te motive : les critères de réussite restent identiques.",
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-briefcase'></i> Les trois briefs",
        body: "<strong>svc-capstone-saas</strong> : SaaS B2B avec auth, abonnement et tableau de bord.<br/><strong>svc-capstone-commerce</strong> : e-commerce léger avec catalogue, paiement et notifications de commande.<br/><strong>svc-capstone-service</strong> : produit service avec réservation / prospect, paiement et emails transactionnels.",
      },
    },
    {
      kind: "paragraph",
      html: "Compare charge technique et domaine : SaaS pousse abonnement et zones protégées ; commerce pousse catalogue et parcours de paiement ; service pousse réservation / prospect et emails. Dans tous les cas : <strong>auth tiers</strong>, au moins un service paiement ou notification (idéalement les deux), et webhooks (notifications HTTP du prestataire) + idempotence si paiement.",
    },
    { kind: "title", text: "Cycle imposé : Prompt → Audit → Livraison" },
    {
      kind: "paragraph",
      html: "<strong>Prompt</strong> : brief figé + journal de prompts + architecture cible. <strong>Audit</strong> : Security baseline + Qualité (Perf / Design / A11y) avec <strong>preuves</strong>. <strong>Livraison</strong> : prod publique en HTTPS + dossier de livraison complet. Il n'y a pas de raccourci : chaque temps produit un livrable vérifiable.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ban'></i> Échecs automatiques",
        body: "Secrets en clair (dépôt ou logs) · Paiement sans activation via webhook (redirection seule) · Prod sans HTTPS · Autorisation uniquement côté client. Un seul de ces pièges = échec, quelle que soit la qualité du reste.",
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-clipboard-check'></i> Rubrique (extrait)",
        body: "HTTPS public · auth via service tiers · paiement ou notifications tiers · Security pass sans critique ouverte · Perf / Design / A11y selon seuils · webhooks + idempotence si paiement · déploiement documenté (CI ou procédure) · dossier de livraison complet.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-award'></i> <strong>Règle</strong> : brief choisi + cycle jalonné + zéro échec auto ; sinon pas de certificat (<code>svc-cert-&lt;learnerId&gt;-&lt;yyyy-mm&gt;</code>).",
    },
  ],
  quiz: capstoneQuizzes.m01,
  exercises: [capstoneExercises.m01_projet],
};
