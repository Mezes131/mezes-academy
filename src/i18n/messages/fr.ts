/** Chrome UI strings (FR). Keep keys stable; add EN twin in en.ts. */
export const messagesFr = {
  nav: {
    home: "Accueil",
    catalog: "Catalogue",
    howItWorks: "Comment ça marche",
    continue: "Continuer",
    signIn: "Connexion",
    signInShort: "Se connecter",
    pathBadge: "parcours",
  },
  bottomNav: {
    method: "Méthode",
    account: "Compte",
    course: "Parcours",
    myCourse: "Cours",
    modules: "Modules",
    progress: "Progrès",
    bookmarks: "Favoris",
    search: "Recherche",
  },
  courseBar: {
    search: "Rechercher…",
    openSidebar: "Ouvrir le menu latéral",
    closeSidebar: "Fermer le menu latéral",
  },
  language: {
    label: "Langue",
    fr: "FR",
    en: "EN",
  },
  translation: {
    inProgress: "Traduction en cours",
  },
  common: {
    loading: "Chargement…",
    modules: "modules",
    access: "Accéder",
  },
  landing: {
    heroEyebrow: "Mezes Academy",
    heroTitleLine1: "Apprends à construire",
    heroTitleLine2: "des solutions performantes.",
    heroBody:
      "Que tu veuilles solidifier ton React ou apprendre à construire avec l'IA sans te faire piéger, on t'accompagne pas à pas. Tu lis une notion, tu la pratiques dans le navigateur, tu valides, et tu reprends plus tard pile où tu t'étais arrêté.",
    ctaReact: "Parcours React",
    ctaReactContinue: "Continuer React",
    ctaSvc: "Secure Vibe Coding",
    ctaCatalog: "Voir les parcours",
    catalogEyebrow: "Catalogue",
    catalogTitle: "Choisis par où tu veux commencer.",
    catalogBody:
      "{count} parcours sont déjà ouverts, d'autres arrivent. Chacun te prend par la main : une idée claire, un exercice tout de suite, et tu vois où tu en es.",
    statusOnline: "En ligne",
    statusSoon: "Bientôt",
    statusPlanned: "Prévu",
    methodEyebrow: "Méthode",
    methodTitle: "Comment on avance, concrètement.",
    methodBody:
      "Pas de monologues interminables. Tu comprends une idée, tu la mets en pratique, tu vérifies que ça tient. Puis tu passes à la suite.",
    step1Title: "Comprends",
    step1Body:
      "Des leçons courtes, avec des exemples que tu peux relier à ton quotidien. Que tu codes à la main ou avec l'IA, tu sais pourquoi ça marche.",
    step2Title: "Construis",
    step2Body:
      "Tu pratiques dans le navigateur : un vrai exercice, un vrai rendu. React comme craft, vibe coding comme façon de livrer sans te perdre.",
    step3Title: "Valide",
    step3Body:
      "Un quiz pour ancrer, une progression qui se souvient de toi. Tu fermes l'onglet, tu reviens demain, tu reprends pile au bon endroit.",
    promise1Title: "Du vrai travail, pas du spectacle",
    promise1Body:
      "On t'aide à livrer quelque chose d'utile : un front solide, un produit IA que tu peux expliquer, des choix que tu assumes.",
    promise2Title: "Relu avant d'arriver jusqu'à toi",
    promise2Body:
      "Chaque leçon a été passée au peigne fin. On te dit pourquoi, pas seulement quoi cliquer.",
    promise3Title: "Agréable à lire, partout",
    promise3Body:
      "Clair ou sombre, téléphone ou grand écran : tu restes concentré sur le cours, pas sur l'interface.",
    promise4Title: "Ta progression, c'est la tienne",
    promise4Body:
      "Elle reste sur ton appareil, et se synchronise si tu te connectes. Tu peux l'exporter. Pas de pub, pas de pistage.",
    ctaTitle: "On y va ?",
    ctaBody:
      "React et Secure Vibe Coding t'attendent. Crée un compte si tu veux synchroniser ton avance, ou commence tout de suite en local : rien ne se perd dans le navigateur.",
    ctaOpenReact: "C'est parti pour React",
    ctaOpenSvc: "Essayer Secure Vibe Coding",
  },
  footer: {
    blurb:
      "On t'aide à construire des trucs qui tiennent : React solide, vibe coding sans mauvaises surprises, à ton rythme.",
    tracks: "Parcours",
    resources: "Ressources",
    academy: "Académie",
    reactTrack: "React de zéro à expert",
    howItWorks: "Comment ça marche",
    myProgress: "Ma progression",
    myBookmarks: "Mes favoris",
    search: "Recherche",
    about: "À propos",
    contact: "Contact",
    terms: "Conditions",
    privacy: "Confidentialité",
    soon: "Bientôt",
    planned: "Prévu",
  },
  auth: {
    welcomeBack: "Ravi de te revoir",
    onYourPath: "sur ton parcours.",
    createAccount: "Crée ton compte",
    buildForReal: "et construis pour de vrai.",
    syncBody:
      "Avec un compte, ton avance te suit partout : modules lus, quiz et exercices restent à jour, que tu sois sur l'ordi ou le téléphone.",
    benefitSaveTitle: "Rien ne se perd",
    benefitSaveBody:
      "Tu fermes la page, tu reviens plus tard : on te remet pile où tu t'étais arrêté.",
    benefitDataTitle: "Tes données restent à toi",
    benefitDataBody:
      "Connexion sécurisée. Tu ne vois que ta progression, personne d'autre.",
    benefitDevicesTitle: "Sur tous tes écrans",
    benefitDevicesBody:
      "Laptop, tablette ou téléphone : le même parcours, la même avance.",
    backHome: "Retour à l'accueil",
  },
};

type DeepString<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>;
};

export type MessageTree = DeepString<typeof messagesFr>;
