import type { Quiz } from "@/types";

export const shipQuizzes: Record<"m01" | "m02" | "m03", Quiz> = {
  m01: {
    id: "svc-ship-quiz-m01",
    title: "Offre & tarifs : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Une proposition de valeur, c'est surtout…",
        options: [
          {
            id: "a",
            label:
              "Le bénéfice clair pour un public cible, et non la liste des fonctionnalités",
          },
          { id: "b", label: "Un inventaire technique de l'architecture" },
          { id: "c", label: "Le nom du fournisseur d'hébergement" },
          { id: "d", label: "Un journal des changements exhaustif" },
        ],
        correct: ["a"],
        explanation:
          "De la fonctionnalité à l'offre : tu traduis le produit en raison de payer, plutôt qu'en inventaire de fonctionnalités.",
      },
      {
        id: "q2",
        question: "Des plans Free / Pro bien conçus…",
        options: [
          {
            id: "a",
            label:
              "Séparant clairement ce qui est gratuit et ce qui justifie de payer",
          },
          { id: "b", label: "Cachent le prix jusqu'au parcours de paiement" },
          { id: "c", label: "Listent dix appels à l'action concurrents" },
          { id: "d", label: "Remplacent CGU et confidentialité" },
        ],
        correct: ["a"],
        explanation:
          "Free/Pro = contraste lisible. Le payant doit répondre à « pourquoi passer à Pro ».",
      },
      {
        id: "q3",
        question: "Un appel à l'action clair sur la page des tarifs…",
        options: [
          {
            id: "a",
            label: "Oriente vers une action unique (essai, passage à Pro, achat)",
          },
          { id: "b", label: "Renvoie vers cinq liens « en savoir plus »" },
          { id: "c", label: "Est optionnel si le produit est « évident »" },
          { id: "d", label: "Doit coller le logo Stripe" },
        ],
        correct: ["a"],
        explanation:
          "Appel à l'action unique = conversion. Plusieurs appels en concurrence diluent l'offre.",
      },
      {
        id: "q4",
        question: "Une page d'offre « pourquoi payer » échoue si…",
        options: [
          {
            id: "a",
            label:
              "Elle centre les fonctionnalités techniques sans raison de payer ni appel à l'action",
          },
          { id: "b", label: "Elle a une proposition de valeur et un appel à l'action" },
          { id: "c", label: "Elle distingue Free et Pro" },
          { id: "d", label: "Elle est en ligne sur une URL publique" },
        ],
        correct: ["a"],
        explanation:
          "Exercice m01 : une raison de payer et un appel à l'action unique, plutôt qu'un README technique.",
      },
      {
        id: "q5",
        question: "La page des tarifs du livrable P12 doit…",
        options: [
          {
            id: "a",
            label: "Être en ligne avec un appel à l'action : c'est une preuve commerciale, et non une maquette",
          },
          { id: "b", label: "Rester dans un Figma privé" },
          { id: "c", label: "Ignorer les plans Free/Pro" },
          { id: "d", label: "Remplacer le dossier de livraison" },
        ],
        correct: ["a"],
        explanation:
          "Critère P12 : page des tarifs en ligne avec appel à l'action. Indépendant du fournisseur.",
      },
    ],
  },

  m02: {
    id: "svc-ship-quiz-m02",
    title: "Confiance & légal : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "CGU / confidentialité « légères » pour un produit payant…",
        options: [
          {
            id: "a",
            label:
              "Couvrent le minimum crédible (usage, données, contact), plutôt qu'un vide juridique",
          },
          { id: "b", label: "Sont inutiles tant qu'il n'y a pas 10k utilisateurs" },
          { id: "c", label: "Peuvent être un lien 404 « bientôt »" },
          { id: "d", label: "Remplacent le support" },
        ],
        correct: ["a"],
        explanation:
          "Socle de confiance : des pages accessibles et relues, pas du collage IA laissé tel quel.",
      },
      {
        id: "q2",
        question: "Les mentions légales minimales…",
        options: [
          {
            id: "a",
            label:
              "Identifient l'éditeur / contact et rendent le produit traçable",
          },
          { id: "b", label: "Sont optionnelles sur une offre Free" },
          { id: "c", label: "Doivent lister tous les secrets d'infra" },
          { id: "d", label: "Remplacent le journal des changements" },
        ],
        correct: ["a"],
        explanation:
          "Mentions = identité et responsabilité. Indépendant du pays : le principe de traçabilité compte.",
      },
      {
        id: "q3",
        question: "Un canal support crédible…",
        options: [
          {
            id: "a",
            label:
              "Est joignable (email, formulaire, ticket) et annoncé sur le produit",
          },
          { id: "b", label: "Est uniquement le message privé Twitter du fondateur" },
          { id: "c", label: "N'est pas nécessaire avant une grosse levée de fonds" },
          { id: "d", label: "Doit publier les exports BDD" },
        ],
        correct: ["a"],
        explanation:
          "Payer sans savoir qui contacter, c'est de la confiance cassée. Le canal doit être visible et testé.",
      },
      {
        id: "q4",
        question: "La checklist conformité mini…",
        options: [
          {
            id: "a",
            label:
              "Vérifie CGU, confidentialité, mentions et support, puis comble les manques",
          },
          { id: "b", label: "Se limite au favicon" },
          { id: "c", label: "Ignore les pages légales « pour livrer vite »" },
          { id: "d", label: "Remplace les tests de santé" },
        ],
        correct: ["a"],
        explanation:
          "Exercice m02 : passer la checklist et corriger, plutôt que de cocher sans preuve.",
      },
      {
        id: "q5",
        question: "Le projet P12 exige pour le légal / support…",
        options: [
          {
            id: "a",
            label: "Socle légal et canal support en place sur le produit",
          },
          { id: "b", label: "Uniquement un README « à faire : légal »" },
          { id: "c", label: "Aucune page de confidentialité" },
          { id: "d", label: "Support caché dans un Discord privé non annoncé" },
        ],
        correct: ["a"],
        explanation:
          "Évaluation : le socle légal et le support sont en place, et c'est vérifiable.",
      },
    ],
  },

  m03: {
    id: "svc-ship-quiz-m03",
    title: "Preuves de livraison : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Un journal des changements utile…",
        options: [
          {
            id: "a",
            label:
              "Documente ce qui a changé pour les utilisateurs / l'exploitation, plutôt qu'un log git brut",
          },
          { id: "b", label: "Est optionnel si la page des tarifs existe" },
          { id: "c", label: "Contient les secrets de rotation" },
          { id: "d", label: "Remplace les CGU" },
        ],
        correct: ["a"],
        explanation:
          "Journal des changements = preuve de livraison continue. Format libre, intention claire.",
      },
      {
        id: "q2",
        question: "Des tests de fumée (tests rapides de santé) après livraison…",
        options: [
          {
            id: "a",
            label:
              "Vérifient rapidement que les parcours critiques marchent après déploiement",
          },
          { id: "b", label: "Remplacent toute couverture unitaire" },
          { id: "c", label: "Ne tournent jamais en CI « pour gagner du temps »" },
          { id: "d", label: "Doivent être manuels uniquement" },
        ],
        correct: ["a"],
        explanation:
          "Tests de santé = filet minimal après déploiement. Automatisables, indépendants du fournisseur.",
      },
      {
        id: "q3",
        question: "Le dossier de livraison rassemble…",
        options: [
          {
            id: "a",
            label:
              "URL publique, plans / offre tarifaire, preuves d'audit, fiche d'incident : des artefacts vérifiables",
          },
          { id: "b", label: "Uniquement une capture d'écran de la page d'accueil" },
          { id: "c", label: "Les clés API en clair « pour l'investisseur »" },
          { id: "d", label: "Rien : « c'est déployé = c'est livré »" },
        ],
        correct: ["a"],
        explanation:
          "Livrer avec preuves : le dossier prouve que le produit est commercialisable.",
      },
      {
        id: "q4",
        question: "Assembler le dossier sans fiche d'incident ni preuves d'audit…",
        options: [
          {
            id: "a",
            label: "Est incomplet au regard du livrable P12",
          },
          { id: "b", label: "Suffit si l'URL répond 200" },
          { id: "c", label: "Est OK sans page des tarifs" },
          { id: "d", label: "Remplace le socle légal" },
        ],
        correct: ["a"],
        explanation:
          "Exercice / projet : URL + plans + audits + fiche d'incident pour un dossier complet.",
      },
      {
        id: "q5",
        question: "Le projet P12 valide notamment…",
        options: [
          {
            id: "a",
            label:
              "Dossier vérifiable, page des tarifs en ligne avec appel à l'action, légal + support en place",
          },
          { id: "b", label: "Uniquement un déploiement sans offre" },
          { id: "c", label: "Aucune preuve d'audit" },
          { id: "d", label: "Journal des changements vide et tests de santé absents" },
        ],
        correct: ["a"],
        explanation:
          "Évaluation P12 : dossier complet, page des tarifs avec appel à l'action, socle confiance.",
      },
    ],
  },
};
