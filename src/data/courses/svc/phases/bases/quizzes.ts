import type { Quiz } from "@/types";

/**
 * All quizzes of the `svc › bases` phase (5 questions per module,
 * per the syllabus), keyed by module slug.
 */
export const basesQuizzes: Record<"m01" | "m02" | "m03", Quiz> = {
  m01: {
    id: "svc-bases-quiz-m01",
    title: "HTTP, HTML, JS : valide tes bases",
    questions: [
      {
        id: "q1",
        question: "Que se passe-t-il quand ton navigateur charge une page web ?",
        options: [
          { id: "a", label: "Il télécharge tout le serveur en local" },
          { id: "b", label: "Il envoie une requête HTTP et reçoit une réponse (statut + headers + corps)" },
          { id: "c", label: "Il ouvre une connexion permanente qui ne se ferme jamais" },
          { id: "d", label: "Il exécute le code du serveur dans la page" },
        ],
        correct: ["b"],
        explanation:
          "Le web fonctionne en cycle requête → réponse : le navigateur demande une ressource, le serveur répond avec un statut, des headers et un corps (HTML, JSON, image…).",
      },
      {
        id: "q2",
        question: "Un serveur répond « 404 ». Qu'est-ce que ça signifie ?",
        options: [
          { id: "a", label: "Le serveur a planté" },
          { id: "b", label: "La requête a réussi" },
          { id: "c", label: "La ressource demandée n'existe pas" },
          { id: "d", label: "Il faut se connecter d'abord" },
        ],
        correct: ["c"],
        explanation:
          "4xx = erreur côté client. 404 précisément : l'URL demandée ne correspond à aucune ressource. Un plantage serveur serait un 5xx, un accès refusé un 401/403.",
      },
      {
        id: "q3",
        question: "Quelle méthode HTTP utilise-t-on par convention pour créer une ressource ?",
        options: [
          { id: "a", label: "GET" },
          { id: "b", label: "POST" },
          { id: "c", label: "DELETE" },
          { id: "d", label: "PATCH" },
        ],
        correct: ["b"],
        explanation:
          "GET lit, POST crée, PATCH/PUT modifient, DELETE supprime. Ces conventions permettent de comprendre une API sans lire sa doc ligne par ligne.",
      },
      {
        id: "q4",
        question: "Pourquoi préférer <code>&lt;button&gt;</code> à un <code>&lt;div onclick&gt;</code> ?",
        options: [
          { id: "a", label: "C'est plus rapide à exécuter" },
          { id: "b", label: "Le bouton est accessible au clavier et annoncé correctement aux lecteurs d'écran" },
          { id: "c", label: "Les div ne peuvent pas recevoir de clic" },
          { id: "d", label: "Aucune différence, c'est une question de style" },
        ],
        correct: ["b"],
        explanation:
          "Le HTML sémantique donne gratuitement l'accessibilité : focus clavier, rôle annoncé, comportement natif. Un div cliquable doit tout réimplémenter à la main.",
      },
      {
        id: "q5",
        question: "Que renvoie <code>fetch(url)</code> en JavaScript ?",
        options: [
          { id: "a", label: "Directement les données JSON" },
          { id: "b", label: "Une promesse qui se résout en objet Response" },
          { id: "c", label: "Le HTML de la page courante" },
          { id: "d", label: "Rien, fetch est synchrone" },
        ],
        correct: ["b"],
        explanation:
          "fetch est asynchrone : il renvoie une promesse de Response. Il faut ensuite appeler response.json() (autre promesse) pour obtenir les données.",
      },
    ],
  },

  m02: {
    id: "svc-bases-quiz-m02",
    title: "Git & projet local : valide tes bases",
    questions: [
      {
        id: "q1",
        question: "À quoi sert un commit Git ?",
        options: [
          { id: "a", label: "À envoyer le code en production" },
          { id: "b", label: "À enregistrer un instantané nommé du projet, auquel on peut revenir" },
          { id: "c", label: "À compresser les fichiers du projet" },
          { id: "d", label: "À supprimer l'historique précédent" },
        ],
        correct: ["b"],
        explanation:
          "Un commit est un point de sauvegarde de l'état du projet avec un message. L'historique des commits permet de comprendre et d'annuler des changements.",
      },
      {
        id: "q2",
        question: "Pourquoi le fichier <code>.env</code> ne doit-il JAMAIS être commité ?",
        options: [
          { id: "a", label: "Il est trop volumineux" },
          { id: "b", label: "Il contient des secrets (clés API, mots de passe) qui seraient exposés dans l'historique" },
          { id: "c", label: "Git ne supporte pas ce format" },
          { id: "d", label: "Il change trop souvent" },
        ],
        correct: ["b"],
        explanation:
          "Un secret commité reste dans l'historique Git même après suppression du fichier. C'est l'une des fuites les plus fréquentes, surtout avec du code généré par IA.",
      },
      {
        id: "q3",
        question: "Quel est le rôle du fichier <code>.env.example</code> ?",
        options: [
          { id: "a", label: "C'est une sauvegarde du vrai .env" },
          { id: "b", label: "Il documente les variables attendues, sans leurs valeurs réelles, et lui se commit" },
          { id: "c", label: "Il est utilisé en production à la place du .env" },
          { id: "d", label: "Il désactive les variables d'environnement" },
        ],
        correct: ["b"],
        explanation:
          "Le .env.example liste les clés nécessaires (avec des valeurs factices) pour qu'un nouveau développeur sache quoi configurer. Les vraies valeurs restent hors du repo.",
      },
      {
        id: "q4",
        question: "Que doit contenir au minimum le <code>.gitignore</code> d'un projet Node ?",
        options: [
          { id: "a", label: "node_modules et .env" },
          { id: "b", label: "package.json et src/" },
          { id: "c", label: "Tous les fichiers .js" },
          { id: "d", label: "Le README" },
        ],
        correct: ["a"],
        explanation:
          "node_modules se réinstalle avec npm install (inutile et énorme dans le repo) ; .env contient les secrets. package.json et src/ sont au contraire le cœur du projet versionné.",
      },
      {
        id: "q5",
        question: "Que fait <code>npm run dev</code> ?",
        options: [
          { id: "a", label: "C'est une commande magique identique dans tous les projets" },
          { id: "b", label: "Il exécute le script « dev » défini dans la section scripts du package.json" },
          { id: "c", label: "Il déploie le projet" },
          { id: "d", label: "Il installe les dépendances" },
        ],
        correct: ["b"],
        explanation:
          "npm run <nom> exécute le script correspondant du package.json. « dev » lance en général le serveur de développement, mais c'est le projet qui le définit.",
      },
    ],
  },

  m03: {
    id: "svc-bases-quiz-m03",
    title: "Front ↔ API : valide tes bases",
    questions: [
      {
        id: "q1",
        question: "Une API répond en JSON. Qu'est-ce que le JSON ?",
        options: [
          { id: "a", label: "Un langage de programmation" },
          { id: "b", label: "Un format texte structuré (objets, tableaux, valeurs) pour échanger des données" },
          { id: "c", label: "Un protocole réseau concurrent de HTTP" },
          { id: "d", label: "Une base de données" },
        ],
        correct: ["b"],
        explanation:
          "JSON (JavaScript Object Notation) est un format d'échange : du texte structuré que n'importe quel langage sait produire et lire.",
      },
      {
        id: "q2",
        question: "<code>fetch</code> ne rejette PAS sa promesse sur un statut 500. Comment détecter l'erreur ?",
        options: [
          { id: "a", label: "C'est impossible, il faut utiliser une autre bibliothèque" },
          { id: "b", label: "En vérifiant response.ok (ou response.status) avant de lire le corps" },
          { id: "c", label: "En attendant 5 secondes" },
          { id: "d", label: "fetch rejette toujours sur une erreur serveur" },
        ],
        correct: ["b"],
        explanation:
          "Piège classique : fetch ne rejette que sur erreur réseau. Un 404 ou un 500 « réussit » techniquement ; il faut tester response.ok soi-même.",
      },
      {
        id: "q3",
        question: "Ton front sur localhost:5173 appelle une API sur un autre domaine et le navigateur bloque avec une erreur CORS. Qui doit autoriser l'accès ?",
        options: [
          { id: "a", label: "Le serveur de l'API, via les headers Access-Control-Allow-*" },
          { id: "b", label: "Le front, en ajoutant un header spécial à la requête" },
          { id: "c", label: "Le navigateur, dans ses réglages" },
          { id: "d", label: "Personne, il faut changer de domaine" },
        ],
        correct: ["a"],
        explanation:
          "CORS est une permission accordée par le serveur : c'est lui qui déclare quelles origines peuvent l'appeler. Aucun header côté front ne peut contourner ça (heureusement).",
      },
      {
        id: "q4",
        question: "Quels sont les trois états qu'une UI doit gérer pour tout appel réseau ?",
        options: [
          { id: "a", label: "Ouvert, fermé, en pause" },
          { id: "b", label: "Loading, erreur, succès" },
          { id: "c", label: "GET, POST, DELETE" },
          { id: "d", label: "Rapide, moyen, lent" },
        ],
        correct: ["b"],
        explanation:
          "Chaque requête passe par « en cours » puis « réussie » ou « échouée ». Une UI qui n'affiche pas ces trois états paraît cassée dès que le réseau ralentit.",
      },
      {
        id: "q5",
        question: "Pourquoi entourer <code>await response.json()</code> d'une gestion d'erreur ?",
        options: [
          { id: "a", label: "Par superstition, ça ne peut pas échouer" },
          { id: "b", label: "Le corps peut ne pas être du JSON valide (page d'erreur HTML, réponse vide…)" },
          { id: "c", label: "json() est synchrone donc dangereux" },
          { id: "d", label: "Pour accélérer le parsing" },
        ],
        correct: ["b"],
        explanation:
          "Un serveur en erreur renvoie souvent du HTML ou un corps vide : response.json() lève alors une exception qu'il faut attraper pour afficher un message propre.",
      },
    ],
  },
};
