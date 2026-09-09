import type { AuditExercise } from "@/types";

export const shipExercises: Record<"m01_1" | "m02_1" | "m03_projet", AuditExercise> =
  {
    m01_1: {
      id: "svc-ship-ex-m01-1",
      format: "audit",
      title: "Page d'offre « pourquoi payer »",
      instructions:
        "Coche ce qui doit être vrai pour une page d'offre / page des tarifs centrée sur la raison de payer.",
      hints: [
        "Proposition de valeur + plans Free/Pro lisibles.",
        "Un seul appel à l'action clair, plutôt qu'un inventaire de fonctionnalités.",
      ],
      scenario: `<p>Produit déployé : la « page d'accueil commerciale » est un README technique (stack, libs, architecture). Aucune proposition de valeur. Les plans Free/Pro n'existent pas ou sont flous. Trois boutons concurrents (« Docs », « GitHub », « Essayez ») sans appel à l'action commercial unique. L'équipe dit « les fonctionnalités parlent d'elles-mêmes ».</p>`,
      findings: [
        {
          id: "f1",
          label:
            "Formuler une proposition de valeur claire (bénéfice pour un public cible)",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f2",
          label: "Distinguer clairement les plans Free et Pro (pourquoi passer à Pro)",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f3",
          label: "Un appel à l'action unique orienté conversion (essai / passage à Pro / achat)",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f4",
          label:
            "Centrer la page sur la raison de payer, plutôt que sur un inventaire de fonctionnalités techniques",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f5",
          label: "Un README technique suffit comme page d'accueil commerciale",
          correct: false,
        },
        {
          id: "f6",
          label: "Plusieurs appels à l'action concurrents sans hiérarchie sont une bonne pratique",
          correct: false,
        },
      ],
      requireEvidence: false,
      passingScore: 0.7,
      attemptsBeforeSolution: 2,
      challengeEligible: false,
      solution: `<p>Page d'offre « pourquoi payer » : valeur + Free/Pro + appel à l'action unique. Indépendant du fournisseur : le message compte plus que l'outil de construction de page.</p>`,
    },

    m02_1: {
      id: "svc-ship-ex-m02-1",
      format: "audit",
      title: "Checklist conformité mini",
      instructions:
        "Coche ce qui doit être vrai pour le socle légal et le support d'un produit payant.",
      hints: [
        "CGU, confidentialité, mentions accessibles.",
        "Canal support annoncé et joignable.",
      ],
      scenario: `<p>Offre payante en ligne : pas de CGU, confidentialité en 404, mentions absentes. Le « support » est un message privé non annoncé. L'IA a collé un texte légal générique non relu, ou rien. La checklist conformité mini n'a jamais été passée. Les clients paient sans savoir qui contacter ni comment les données sont traitées.</p>`,
      findings: [
        {
          id: "f1",
          label: "Pages CGU / conditions d'usage accessibles et crédibles",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f2",
          label: "Politique de confidentialité accessible",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f3",
          label: "Mentions légales minimales (éditeur / contact) présentes",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f4",
          label: "Canal support joignable et annoncé sur le produit",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f5",
          label: "Un lien 404 « bientôt » suffit pour confidentialité et CGU",
          correct: false,
        },
        {
          id: "f6",
          label: "Le support peut rester un message privé non annoncé",
          correct: false,
        },
      ],
      requireEvidence: false,
      passingScore: 0.7,
      attemptsBeforeSolution: 2,
      challengeEligible: false,
      solution: `<p>Checklist conformité mini : CGU + confidentialité + mentions + support visible. Combler les manques avant de clamer « livraison commerciale ».</p>`,
    },

    m03_projet: {
      id: "svc-ship-ex-m03-projet",
      format: "audit",
      title: "Projet P12 : Dossier de livraison",
      instructions:
        "Avant de clôturer P12, coche ce qui doit être vrai pour le dossier de livraison complet.",
      hints: [
        "URL, plans / offre tarifaire, preuves d'audit, fiche d'incident.",
        "Page des tarifs en ligne avec appel à l'action ; légal + support en place.",
      ],
      scenario: `<p>Objectif P12 : dossier de livraison (URL publique, plans et offre tarifaire, preuves d'audit, fiche d'incident). État actuel : URL « ça marche chez moi », pas de page des tarifs en ligne, pas de preuves d'audit jointes, fiche d'incident P11 oubliée, journal des changements vide, aucun test de santé après déploiement. L'équipe dit « c'est déployé = c'est livré ».</p>`,
      findings: [
        {
          id: "f1",
          label: "Dossier complet et vérifiable (URL, plans, audits, fiche d'incident)",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f2",
          label: "Page des tarifs en ligne avec appel à l'action",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f3",
          label: "Socle légal et canal support en place",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f4",
          label:
            "Preuves de livraison : journal des changements et/ou tests de santé documentés",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f5",
          label: "« C'est déployé » sans dossier ni offre tarifaire suffit pour P12",
          correct: false,
        },
        {
          id: "f6",
          label: "Omettre fiche d'incident et preuves d'audit est acceptable",
          correct: false,
        },
      ],
      requireEvidence: false,
      passingScore: 0.7,
      attemptsBeforeSolution: 3,
      challengeEligible: false,
      solution: `<p>P12 = dossier vérifiable + page des tarifs avec appel à l'action en ligne + légal/support + preuves (journal des changements / tests de santé). Déployé, ce n'est pas encore commercialement livré.</p>`,
    },
  };
