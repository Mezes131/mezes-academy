import type { Quiz } from "@/types";

export const promptQuizzes: Record<"m01" | "m02" | "m03", Quiz> = {
  m01: {
    id: "svc-prompt-quiz-m01",
    title: "Du besoin au MVP : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "À quoi sert un critère d'acceptation ?",
        options: [
          { id: "a", label: "Décrire le design du logo" },
          { id: "b", label: "Dire clairement quand le besoin est satisfait (testable)" },
          { id: "c", label: "Remplacer les tests automatiques" },
          { id: "d", label: "Lister les dépendances npm" },
        ],
        correct: ["b"],
        explanation:
          "Un critère d'acceptation est une condition observable : on peut dire oui ou non. Sans ça, l'IA (et toi) inventez la fin.",
      },
      {
        id: "q2",
        question: "Qu'est-ce qu'un non-goal dans un brief MVP ?",
        options: [
          { id: "a", label: "Une fonctionnalité hors scope pour cette version" },
          { id: "b", label: "Un bug connu en production" },
          { id: "c", label: "Un secret d'API" },
          { id: "d", label: "Un fichier .gitignore" },
        ],
        correct: ["a"],
        explanation:
          "Les non-goals protègent le scope : on dit explicitement ce qu'on ne construit pas maintenant.",
      },
      {
        id: "q3",
        question: "Pourquoi écrire les contraintes non fonctionnelles avant de générer ?",
        options: [
          { id: "a", label: "Pour remplir le README" },
          { id: "b", label: "Pour que sécu, perf et accessibilité ne soient pas oubliées par l'IA" },
          { id: "c", label: "Parce que TypeScript l'exige" },
          { id: "d", label: "Pour bloquer Git" },
        ],
        correct: ["b"],
        explanation:
          "L'IA optimise ce que tu demandes. Si tu ne demandes pas la sécu ou l'a11y, elle les saute souvent.",
      },
      {
        id: "q4",
        question: "Que signifie « tâche auditable » ?",
        options: [
          { id: "a", label: "Une tâche qu'on peut vérifier seule, avec un critère de done" },
          { id: "b", label: "Une tâche réservée à un auditeur externe" },
          { id: "c", label: "Une tâche sans livraison" },
          { id: "d", label: "Une tâche qui génère 50 fichiers" },
        ],
        correct: ["a"],
        explanation:
          "Petit incrément + preuve de done = tu peux auditer. Un monolithe de 50 fichiers, non.",
      },
      {
        id: "q5",
        question: "Quel brief est le plus dangereux avant un prompt ?",
        options: [
          { id: "a", label: "« App de notes : créer / lister / archiver, comptes équipe, pas de partage public au MVP »" },
          { id: "b", label: "« Fais quelque chose de cool avec de l'IA, livrez vite »" },
          { id: "c", label: "Stories + critères + non-goals écrits" },
          { id: "d", label: "Liste de tâches avec critère de done chacun" },
        ],
        correct: ["b"],
        explanation:
          "Vague + « vite » = invention, sur-scope, oublis critiques. Les autres options cadrent.",
      },
    ],
  },

  m02: {
    id: "svc-prompt-quiz-m02",
    title: "Techniques de prompt : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Qu'est-ce que le « contexte minimal suffisant » ?",
        options: [
          { id: "a", label: "Coller tout le dépôt dans le chat" },
          { id: "b", label: "Donner assez d'info utile (fichiers, contrats), sans bruit" },
          { id: "c", label: "Ne jamais mentionner la stack" },
          { id: "d", label: "Demander uniquement « fais au mieux »" },
        ],
        correct: ["b"],
        explanation:
          "Trop peu : l'IA invente. Trop : elle se perd. Vise le minimum qui ancre la réponse.",
      },
      {
        id: "q2",
        question: "Pourquoi contraindre la sortie (stack, conventions, tests) ?",
        options: [
          { id: "a", label: "Pour ralentir l'IA" },
          { id: "b", label: "Pour obtenir une proposition alignée et vérifiable" },
          { id: "c", label: "Parce que les modèles refusent sinon" },
          { id: "d", label: "Uniquement pour le CSS" },
        ],
        correct: ["b"],
        explanation:
          "Sans contraintes, tu reçois « quelque chose ». Avec contraintes, tu reçois quelque chose d'auditable.",
      },
      {
        id: "q3",
        question: "Quelle itération est saine après une erreur ?",
        options: [
          { id: "a", label: "Reprompt complet « refais tout le projet »" },
          { id: "b", label: "Corriger la zone fautive, demander une critique ciblée" },
          { id: "c", label: "Accepter la première réponse toujours" },
          { id: "d", label: "Supprimer les tests pour que ça passe" },
        ],
        correct: ["b"],
        explanation:
          "Itération ciblée + self-review IA sur le diff. Le reprompt total dérive le scope.",
      },
      {
        id: "q4",
        question: "Quel signe indique un prompt vulnérable ?",
        options: [
          { id: "a", label: "Il demande validation, secrets en env, tests" },
          { id: "b", label: "Il demande d'ignorer la validation ou de coller des secrets" },
          { id: "c", label: "Il borne les fichiers touchés" },
          { id: "d", label: "Il précise TypeScript" },
        ],
        correct: ["b"],
        explanation:
          "Si le prompt pousse des raccourcis dangereux, le code suivra. Corrige le prompt d'abord.",
      },
      {
        id: "q5",
        question: "Pourquoi faire critiquer le code par l'IA après génération ?",
        options: [
          { id: "a", label: "Pour remplacer entièrement la revue humaine" },
          { id: "b", label: "Pour surface des oublis avant ton audit humain" },
          { id: "c", label: "Parce que c'est obligatoire légalement" },
          { id: "d", label: "Pour désactiver Git" },
        ],
        correct: ["b"],
        explanation:
          "L'IA comme reviewer aide. Toi tu signes toujours l'audit final.",
      },
    ],
  },

  m03: {
    id: "svc-prompt-quiz-m03",
    title: "Contraintes business : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Pourquoi anticiper auth / paiement / notifs dès le brief ?",
        options: [
          { id: "a", label: "Pour gonfler le devis" },
          { id: "b", label: "Pour éviter un prototype jetable sans chemin vers un produit vendable" },
          { id: "c", label: "Parce que React l'impose" },
          { id: "d", label: "Uniquement pour le SEO" },
        ],
        correct: ["b"],
        explanation:
          "Les services tiers changent l'architecture. Les coller après coup coûte cher.",
      },
      {
        id: "q2",
        question: "Que vérifie une checklist « prêt produit » ?",
        options: [
          { id: "a", label: "Que le brief couvre ce qui rend le produit commercialisable" },
          { id: "b", label: "Que le CSS utilise du violet" },
          { id: "c", label: "Que le README a des emojis" },
          { id: "d", label: "Que personne n'écrit de tests" },
        ],
        correct: ["a"],
        explanation:
          "Prêt produit = auth, envs, secrets, parcours critiques, pas seulement un CRUD démo.",
      },
      {
        id: "q3",
        question: "Quel anti-pattern décrit « démo sans chemin vers la prod » ?",
        options: [
          { id: "a", label: "Prototype jetable" },
          { id: "b", label: "MVP bien borné" },
          { id: "c", label: "Audit réussi" },
          { id: "d", label: "Contexte minimal suffisant" },
        ],
        correct: ["a"],
        explanation:
          "Une démo locale sans envs, auth ni secrets propres ne se « produitise » pas magiquement.",
      },
      {
        id: "q4",
        question: "Où doivent vivre les secrets (clés API, URL base de données) ?",
        options: [
          { id: "a", label: "Dans le prompt et le dépôt Git" },
          { id: "b", label: "Dans des variables d'environnement par environnement" },
          { id: "c", label: "Dans le CSS" },
          { id: "d", label: "Dans le navigateur en clair" },
        ],
        correct: ["b"],
        explanation:
          "Local / preview / prod ont leurs secrets. Jamais en dur dans le code ou le chat collé au repo.",
      },
      {
        id: "q5",
        question: "Enrichir un prompt CRUD « nu », c'est surtout…",
        options: [
          { id: "a", label: "Ajouter des animations avant l'auth" },
          { id: "b", label: "Ajouter auth, frontières, envs et parcours business manquants" },
          { id: "c", label: "Supprimer toute validation" },
          { id: "d", label: "Demander CORS *" },
        ],
        correct: ["b"],
        explanation:
          "Le CRUD nu livre une coquille. Le brief produit ajoute ce qui rend la coquille vendable et sûre.",
      },
    ],
  },
};
