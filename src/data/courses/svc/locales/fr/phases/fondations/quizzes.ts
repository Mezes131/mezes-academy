import type { Quiz } from "@/types";

export const fondationsQuizzes: Record<"m01" | "m02" | "m03", Quiz> = {
  m01: {
    id: "svc-fondations-quiz-m01",
    title: "Vibe coding : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Sur le spectre des outils IA, qu'est-ce qu'un agent ?",
        options: [
          { id: "a", label: "Une simple suggestion de mot dans l'éditeur" },
          { id: "b", label: "Un système qui enchaîne des actions (lire, écrire, exécuter) avec peu de supervision" },
          { id: "c", label: "Un framework React concurrent" },
          { id: "d", label: "Un serveur de base de données" },
        ],
        correct: ["b"],
        explanation:
          "L'agent agit : il peut modifier plusieurs fichiers, lancer des commandes, itérer. D'où un besoin d'audit plus strict qu'avec un autocomplete.",
      },
      {
        id: "q2",
        question: "Quel échec est typique du code généré par IA ?",
        options: [
          { id: "a", label: "Il ne compile jamais" },
          { id: "b", label: "Il est plausible, passe un coup d'œil rapide, mais cache des failles ou des absurdités" },
          { id: "c", label: "Il refuse d'utiliser TypeScript" },
          { id: "d", label: "Il ne produit que du HTML" },
        ],
        correct: ["b"],
        explanation:
          "Le danger n'est pas le code illisible : c'est le code qui a l'air correct. D'où l'audit systématique.",
      },
      {
        id: "q3",
        question: "Qui porte la responsabilité finale du code livré ?",
        options: [
          { id: "a", label: "Le fournisseur du modèle IA" },
          { id: "b", label: "Le développeur (ou l'équipe) qui signe et déploie" },
          { id: "c", label: "Personne, c'est expérimental" },
          { id: "d", label: "Le client uniquement" },
        ],
        correct: ["b"],
        explanation:
          "L'IA propose. Toi tu livres. En prod, c'est ta signature qui compte.",
      },
      {
        id: "q4",
        question: "Quel piège évite-t-on en lisant réellement l'aperçu des changements générés ?",
        options: [
          { id: "a", label: "La confiance aveugle" },
          { id: "b", label: "Les timeouts réseau" },
          { id: "c", label: "Le CSS cassé uniquement" },
          { id: "d", label: "Les conflits Git" },
        ],
        correct: ["a"],
        explanation:
          "Accepter sans lire, c'est déléguer la responsabilité à une boîte noire. L'aperçu des changements est ton premier filet.",
      },
      {
        id: "q5",
        question: "Pourquoi une demande floue (prompt vague) est-elle dangereuse ?",
        options: [
          { id: "a", label: "L'IA refuse de répondre" },
          { id: "b", label: "Elle invente des contraintes, sur-ingénierie ou oublie des exigences critiques" },
          { id: "c", label: "Elle ne sait générer que du Python" },
          { id: "d", label: "Elle désactive Git" },
        ],
        correct: ["b"],
        explanation:
          "Un brief flou produit du code flou. Spécifier (Prompt) avant de générer réduit l'espace d'erreur.",
      },
    ],
  },

  m02: {
    id: "svc-fondations-quiz-m02",
    title: "Prompt → Audit → Ship : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "À quoi sert le temps « Prompt » dans le cycle ?",
        options: [
          { id: "a", label: "Déployer en production" },
          { id: "b", label: "Spécifier le besoin et générer une proposition" },
          { id: "c", label: "Mesurer le Lighthouse uniquement" },
          { id: "d", label: "Configurer le DNS" },
        ],
        correct: ["b"],
        explanation:
          "Prompt = cadrer + obtenir une proposition. Sans spec, l'audit n'a pas de référentiel.",
      },
      {
        id: "q2",
        question: "Que produit un bon Audit ?",
        options: [
          { id: "a", label: "Plus de lignes de code" },
          { id: "b", label: "Des preuves (checklists, scans, tests) que le livrable est acceptable" },
          { id: "c", label: "Un nouveau modèle de fondation" },
          { id: "d", label: "Une page marketing" },
        ],
        correct: ["b"],
        explanation:
          "Audit = vérifier avec des preuves, pas « ça a l'air ok ».",
      },
      {
        id: "q3",
        question: "Que signifie « Ship » ici ?",
        options: [
          { id: "a", label: "Livrer avec les preuves d'audit, pas seulement pousser du code" },
          { id: "b", label: "Supprimer le dépôt" },
          { id: "c", label: "Changer de framework" },
          { id: "d", label: "Écrire un tweet" },
        ],
        correct: ["a"],
        explanation:
          "Ship = mise à disposition contrôlée (preview/prod) avec un dossier de preuves.",
      },
      {
        id: "q4",
        question: "Pourquoi préférer des boucles courtes au « tunnel » ?",
        options: [
          { id: "a", label: "Parce que Git n'accepte que de petits enregistrements" },
          { id: "b", label: "On détecte tôt les dérives ; un tunnel de 2000 lignes est presque impossible à vérifier" },
          { id: "c", label: "L'IA facture moins" },
          { id: "d", label: "Les navigateurs limitent la taille des fichiers" },
        ],
        correct: ["b"],
        explanation:
          "Petite feature → audit → ship partiel. Puis on recommence. C'est le rythme de toute la formation.",
      },
      {
        id: "q5",
        question: "Quel anti-pattern du tunnel faut-il éviter ?",
        options: [
          { id: "a", label: "Générer une grosse livraison d'un coup, auditer seulement à la fin" },
          { id: "b", label: "Lire l'aperçu des changements après chaque génération" },
          { id: "c", label: "Écrire un brief avant de générer" },
          { id: "d", label: "Lancer un scan de secrets" },
        ],
        correct: ["a"],
        explanation:
          "Auditer trop tard coûte cher. Le cycle impose un audit à chaque incrément.",
      },
    ],
  },

  m03: {
    id: "svc-fondations-quiz-m03",
    title: "Boîte à outils : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "À quoi servent les « règles projet » pour un assistant IA ?",
        options: [
          { id: "a", label: "À décorer le README" },
          { id: "b", label: "À encadrer la génération (stack, conventions, interdits) avant qu'elle parte dans le décor" },
          { id: "c", label: "À remplacer les contrôles automatiques de qualité" },
          { id: "d", label: "À désactiver Git" },
        ],
        correct: ["b"],
        explanation:
          "Les règles projet (ex. fichiers d'instructions dans l'éditeur) réduisent les erreurs de stack et de style.",
      },
      {
        id: "q2",
        question: "Quel contrôle est déterministe (pas une opinion d'IA) ?",
        options: [
          { id: "a", label: "Un résumé ChatGPT du dépôt" },
          { id: "b", label: "Un scan de secrets / contrôle qualité / revue des dépendances" },
          { id: "c", label: "Un like sur un enregistrement Git" },
          { id: "d", label: "Une capture d'écran" },
        ],
        correct: ["b"],
        explanation:
          "Les contrôles automatiques donnent des preuves reproductibles. Ils complètent (et ne remplacent pas) la revue humaine.",
      },
      {
        id: "q3",
        question: "Dans quel cas vaut-il mieux NE PAS laisser l'IA générer ?",
        options: [
          { id: "a", label: "Un composant d'interface banal" },
          { id: "b", label: "Crypto, connexion maison fragile, logique métier critique non spécifiée" },
          { id: "c", label: "Un fichier README" },
          { id: "d", label: "Du CSS de mise en page" },
        ],
        correct: ["b"],
        explanation:
          "Les zones à fort risque (sécurité fine, argent, données personnelles) exigent spec humaine + revue serrée, pas de vibe solo.",
      },
      {
        id: "q4",
        question: "Pourquoi combiner assistant dans l'éditeur et contrôles automatiques ?",
        options: [
          { id: "a", label: "Parce que l'un écrit vite et l'autre vérifie sans opinion" },
          { id: "b", label: "Parce que les contrôles génèrent le code" },
          { id: "c", label: "Ce n'est jamais utile" },
          { id: "d", label: "Pour remplacer les tests" },
        ],
        correct: ["a"],
        explanation:
          "Vitesse (IA) + filet automatique (qualité, secrets, dépendances) + revue humaine = cycle Prompt → Audit → Ship.",
      },
      {
        id: "q5",
        question: "Que doit contenir un rapport d'audit minimal d'un dépôt généré ?",
        options: [
          { id: "a", label: "Uniquement « ça marche sur ma machine »" },
          { id: "b", label: "Constats avec preuves, gravité, recommandations priorisées" },
          { id: "c", label: "La liste des emojis du README" },
          { id: "d", label: "Le prix du modèle IA" },
        ],
        correct: ["b"],
        explanation:
          "C'est exactement le livrable du projet P1 et le réflexe des phases Audit plus loin.",
      },
    ],
  },
};
