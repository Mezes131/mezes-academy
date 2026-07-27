import type { Quiz } from "@/types";

export const promptQuizzes: Record<"m01" | "m02" | "m03", Quiz> = {
  m01: {
    id: "svc-prompt-quiz-m01",
    title: "Du besoin au premier livrable : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "À quoi sert une règle de réussite (critère d'acceptation) ?",
        options: [
          { id: "a", label: "Décrire le design du logo" },
          { id: "b", label: "Dire clairement quand le besoin est satisfait (on peut dire oui ou non)" },
          { id: "c", label: "Remplacer les tests automatiques" },
          { id: "d", label: "Lister les paquets npm" },
        ],
        correct: ["b"],
        explanation:
          "Une règle de réussite est une condition observable : oui ou non. Sans ça, l'IA (et toi) inventez la fin.",
      },
      {
        id: "q2",
        question: "Qu'est-ce que le hors périmètre dans un premier livrable ?",
        options: [
          { id: "a", label: "Une fonctionnalité qu'on ne construit pas dans cette version" },
          { id: "b", label: "Un bug connu en production" },
          { id: "c", label: "Un secret d'API" },
          { id: "d", label: "Un fichier .gitignore" },
        ],
        correct: ["a"],
        explanation:
          "Le hors périmètre protège le projet : on dit explicitement ce qu'on ne construit pas maintenant.",
      },
      {
        id: "q3",
        question: "Pourquoi écrire sécurité, rapidité et accessibilité avant de générer ?",
        options: [
          { id: "a", label: "Pour remplir le README" },
          { id: "b", label: "Pour que l'IA ne les oublie pas" },
          { id: "c", label: "Parce que TypeScript l'exige" },
          { id: "d", label: "Pour bloquer Git" },
        ],
        correct: ["b"],
        explanation:
          "L'IA optimise ce que tu demandes. Si tu ne demandes pas la sécurité ou l'accessibilité, elle les saute souvent.",
      },
      {
        id: "q4",
        question: "Que signifie « tâche vérifiable » ?",
        options: [
          { id: "a", label: "Une tâche qu'on peut contrôler seule, avec une règle de fin claire" },
          { id: "b", label: "Une tâche réservée à un auditeur externe" },
          { id: "c", label: "Une tâche sans livraison" },
          { id: "d", label: "Une tâche qui génère 50 fichiers" },
        ],
        correct: ["a"],
        explanation:
          "Petit incrément + preuve de fin = tu peux vérifier. Un monolithe de 50 fichiers, non.",
      },
      {
        id: "q5",
        question: "Quel cahier des charges est le plus dangereux avant une demande à l'IA ?",
        options: [
          { id: "a", label: "« App de notes : créer / lister / archiver, comptes équipe, pas de partage public au premier livrable »" },
          { id: "b", label: "« Fais quelque chose de cool avec de l'IA, livrez vite »" },
          { id: "c", label: "Histoires utilisateur + règles de réussite + hors périmètre écrits" },
          { id: "d", label: "Liste de tâches avec une règle de fin chacune" },
        ],
        correct: ["b"],
        explanation:
          "Vague + « vite » = invention, trop de fonctionnalités, oublis critiques. Les autres options cadrent.",
      },
    ],
  },

  m02: {
    id: "svc-prompt-quiz-m02",
    title: "Techniques de demande à l'IA : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Qu'est-ce que le « juste assez de contexte » ?",
        options: [
          { id: "a", label: "Coller tout le dépôt dans le chat" },
          { id: "b", label: "Donner assez d'info utile (fichiers, règles), sans bruit" },
          { id: "c", label: "Ne jamais mentionner les outils du projet" },
          { id: "d", label: "Demander uniquement « fais au mieux »" },
        ],
        correct: ["b"],
        explanation:
          "Trop peu : l'IA invente. Trop : elle se perd. Vise le minimum qui ancre la réponse.",
      },
      {
        id: "q2",
        question: "Pourquoi cadrer la sortie (outils, conventions, tests) ?",
        options: [
          { id: "a", label: "Pour ralentir l'IA" },
          { id: "b", label: "Pour obtenir une proposition alignée et vérifiable" },
          { id: "c", label: "Parce que les modèles refusent sinon" },
          { id: "d", label: "Uniquement pour le CSS" },
        ],
        correct: ["b"],
        explanation:
          "Sans règles, tu reçois « quelque chose ». Avec règles, tu reçois quelque chose de vérifiable.",
      },
      {
        id: "q3",
        question: "Quelle correction est saine après une erreur ?",
        options: [
          { id: "a", label: "Relancer « refais tout le projet »" },
          { id: "b", label: "Corriger la zone fautive, demander une critique ciblée" },
          { id: "c", label: "Accepter la première réponse toujours" },
          { id: "d", label: "Supprimer les tests pour que ça passe" },
        ],
        correct: ["b"],
        explanation:
          "Correction ciblée + critique IA sur l'aperçu des changements. Tout recommencer fait sortir du périmètre.",
      },
      {
        id: "q4",
        question: "Quel signe indique une demande dangereuse ?",
        options: [
          { id: "a", label: "Elle demande vérification, secrets en variables d'environnement, tests" },
          { id: "b", label: "Elle demande d'ignorer la vérification ou de coller des secrets" },
          { id: "c", label: "Elle limite les fichiers touchés" },
          { id: "d", label: "Elle précise TypeScript" },
        ],
        correct: ["b"],
        explanation:
          "Si la demande pousse des raccourcis dangereux, le code suivra. Corrige la demande d'abord.",
      },
      {
        id: "q5",
        question: "Pourquoi faire critiquer le code par l'IA après génération ?",
        options: [
          { id: "a", label: "Pour remplacer entièrement la relecture humaine" },
          { id: "b", label: "Pour faire apparaître des oublis avant ton audit humain" },
          { id: "c", label: "Parce que c'est obligatoire légalement" },
          { id: "d", label: "Pour désactiver Git" },
        ],
        correct: ["b"],
        explanation:
          "L'IA comme relectrice aide. Toi tu signes toujours l'audit final.",
      },
    ],
  },

  m03: {
    id: "svc-prompt-quiz-m03",
    title: "Contraintes business : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Pourquoi prévoir connexion / paiement / notifications dès le cahier des charges ?",
        options: [
          { id: "a", label: "Pour gonfler le devis" },
          { id: "b", label: "Pour éviter un prototype jetable sans chemin vers un produit vendable" },
          { id: "c", label: "Parce que React l'impose" },
          { id: "d", label: "Uniquement pour le référencement" },
        ],
        correct: ["b"],
        explanation:
          "Ces services changent l'architecture. Les coller après coup coûte cher.",
      },
      {
        id: "q2",
        question: "Que vérifie une liste « prêt produit » ?",
        options: [
          { id: "a", label: "Que le cahier des charges couvre ce qui rend le produit vendable" },
          { id: "b", label: "Que le CSS utilise du violet" },
          { id: "c", label: "Que le README a des emojis" },
          { id: "d", label: "Que personne n'écrit de tests" },
        ],
        correct: ["a"],
        explanation:
          "Prêt produit = connexion, environnements, secrets, parcours critiques, pas seulement une démo CRUD.",
      },
      {
        id: "q3",
        question: "Quelle mauvaise pratique décrit « démo sans chemin vers la production » ?",
        options: [
          { id: "a", label: "Prototype jetable" },
          { id: "b", label: "Premier livrable bien limité" },
          { id: "c", label: "Audit réussi" },
          { id: "d", label: "Juste assez de contexte" },
        ],
        correct: ["a"],
        explanation:
          "Une démo locale sans connexion, secrets propres ni environnements ne se « produitise » pas magiquement.",
      },
      {
        id: "q4",
        question: "Où doivent vivre les secrets (clés API, adresse de base de données) ?",
        options: [
          { id: "a", label: "Dans la demande à l'IA et le dépôt Git" },
          { id: "b", label: "Dans des variables d'environnement, une par environnement" },
          { id: "c", label: "Dans le CSS" },
          { id: "d", label: "Dans le navigateur en clair" },
        ],
        correct: ["b"],
        explanation:
          "Local / aperçu en ligne / prod ont leurs secrets. Jamais en dur dans le code ou le chat collé au dépôt.",
      },
      {
        id: "q5",
        question: "Enrichir une demande CRUD « nue », c'est surtout…",
        options: [
          { id: "a", label: "Ajouter des animations avant la connexion" },
          { id: "b", label: "Ajouter connexion, frontières, environnements et parcours business manquants" },
          { id: "c", label: "Supprimer toute vérification" },
          { id: "d", label: "Demander CORS * (tous les sites)" },
        ],
        correct: ["b"],
        explanation:
          "Le CRUD nu livre une coquille. Le cahier des charges produit ajoute ce qui rend la coquille vendable et sûre.",
      },
    ],
  },
};
