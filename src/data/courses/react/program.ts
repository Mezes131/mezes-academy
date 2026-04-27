import type {
  CourseProgram,
  DifficultyLevel,
  ProgramLesson,
  ProgramModule,
  ProgramPhase,
  ProjectBrief,
} from "@/types";

type LessonSpec = {
  id: string;
  title: string;
  objective: string;
  concepts: string[];
  pitfalls?: string[];
  tags?: string[];
  duration?: string;
};

function lesson(spec: LessonSpec): ProgramLesson {
  return {
    id: spec.id,
    title: spec.title,
    objective: spec.objective,
    duration: spec.duration,
    tags: spec.tags,
    courseOutline: {
      context: spec.objective,
      concepts: spec.concepts,
      pitfalls: spec.pitfalls,
      guidedExample: `Exemple guide autour de : ${spec.title}.`,
      recap: "Synthese des decisions, des erreurs frequentes et des criteres de reussite.",
    },
    quiz: {
      questionCount: 5,
      focus: spec.concepts,
    },
    exercises: [
      {
        title: `Synthese - ${spec.title}`,
        kind: "synthesis",
        brief: `Mettre en pratique la lecon "${spec.title}" dans une situation proche d'un projet reel.`,
      },
    ],
  };
}

function moduleAssessment(title: string, focus: string[]): ProgramModule["assessment"] {
  return {
    quiz: {
      questionCount: 8,
      focus,
    },
    exercises: [
      {
        title: `Challenge module - ${title}`,
        kind: "guided",
        brief: `Assembler les notions du module "${title}" dans un exercice corrige et testable.`,
      },
      {
        title: `Synthese module - ${title}`,
        kind: "synthesis",
        brief: "Produire un livrable court qui prouve la comprehension du module sans suivre un pas-a-pas.",
      },
    ],
  };
}

function module(
  id: string,
  moduleId: string,
  index: string,
  title: string,
  subtitle: string,
  duration: string,
  difficulty: DifficultyLevel,
  objectives: string[],
  lessons: ProgramLesson[],
): ProgramModule {
  return {
    id,
    moduleId,
    index,
    title,
    subtitle,
    duration,
    difficulty,
    objectives,
    lessons,
    assessment: moduleAssessment(
      title,
      lessons.flatMap((item) => item.quiz.focus).slice(0, 8),
    ),
  };
}

const reactSpaProject: ProjectBrief = {
  title: "Application React SPA",
  deliverable:
    "Une SPA complete avec routing, formulaires, state local, composants reutilisables et design responsive.",
  assessment: [
    "Composants lisibles et correctement separes",
    "Gestion d'etat locale coherente",
    "Parcours utilisateur testable manuellement",
    "UX responsive et accessible au minimum",
  ],
};

const migrationTsProject: ProjectBrief = {
  title: "Migration TypeScript",
  deliverable: "Migrer une mini-application React JavaScript vers React TypeScript en mode strict.",
  assessment: [
    "Typage utile des props, events, state et donnees",
    "Absence de any evitable",
    "Erreurs gerees explicitement",
    "Types lisibles et maintenables",
  ],
};

const fullstackProject: ProjectBrief = {
  title: "Application fullstack Next.js",
  deliverable: "Une app Next.js avec auth, donnees persistantes, tests et deploiement preview.",
  assessment: [
    "Frontiere serveur/client bien comprise",
    "Securite auth basique respectee",
    "Mutations et invalidations coherentes",
    "Tests et performance minimaux verifies",
  ],
};

const seniorRefactorProject: ProjectBrief = {
  title: "Audit et refonte senior",
  deliverable:
    "Reprendre une app volontairement imparfaite et produire refactor, tests, CI, audit perf et documentation.",
  assessment: [
    "Diagnostic priorise",
    "Architecture plus maintenable",
    "Preuves par tests ou mesures",
    "Documentation de handoff claire",
  ],
};

const capstoneProject: ProjectBrief = {
  title: "Capstone React/Next.js",
  deliverable: "Application portfolio complete, deployee, testee et documentee.",
  options: ["SaaS dashboard", "LMS miniature", "Marketplace", "CRM leger", "App IA documentaire"],
  assessment: [
    "Architecture et lisibilite du repository",
    "UX, accessibilite et responsive design",
    "Securite, tests et performance",
    "Qualite de la demonstration produit",
  ],
};

const phases: ProgramPhase[] = [
  {
    id: "react-program-orientation",
    phaseId: "react-intro",
    slug: "intro",
    title: "Orientation et culture React",
    objective:
      "Donner du sens avant la technique, clarifier le role de React et installer une methode d'apprentissage durable.",
    modules: [
      module(
        "orientation-m01",
        "react-intro-m01",
        "01",
        "Comprendre React sans jargon",
        "Identifier le probleme que React resout et le vocabulaire minimal.",
        "3 min",
        "intro",
        ["Expliquer React simplement", "Distinguer DOM imperatif et UI declarative"],
        [
          lesson({
            id: "01.1",
            title: "Definition simple de React",
            objective: "Formuler une definition claire de React et de son perimetre.",
            concepts: ["bibliotheque UI", "interface utilisateur", "JavaScript"],
          }),
          lesson({
            id: "01.2",
            title: "Le probleme du DOM imperatif",
            objective: "Comprendre pourquoi les interfaces complexes deviennent fragiles sans abstraction.",
            concepts: ["DOM", "imperatif", "synchronisation UI"],
          }),
          lesson({
            id: "01.3",
            title: "UI declarative et composants",
            objective: "Relier la pensee declarative au decoupage en composants.",
            concepts: ["declaratif", "composants", "reutilisation"],
          }),
        ],
      ),
      module(
        "orientation-m02",
        "react-intro-m02",
        "02",
        "React dans l'ecosysteme web",
        "Situer React par rapport aux frameworks, meta-frameworks et alternatives.",
        "4 min",
        "intro",
        ["Identifier le bon perimetre de React", "Choisir React pour de bonnes raisons"],
        [
          lesson({
            id: "02.1",
            title: "Bibliotheque vs framework",
            objective: "Comparer React avec Angular, Vue, Svelte et Next.js.",
            concepts: ["bibliotheque", "framework", "meta-framework"],
          }),
          lesson({
            id: "02.2",
            title: "Ce que React ne fournit pas seul",
            objective: "Lister les briques a ajouter pour une application complete.",
            concepts: ["routing", "data fetching", "auth", "build tooling"],
          }),
          lesson({
            id: "02.3",
            title: "Choisir une stack selon le projet",
            objective: "Adapter la stack a la taille et aux contraintes du produit.",
            concepts: ["SPA", "SSR", "SSG", "fullstack"],
          }),
        ],
      ),
      module(
        "orientation-m03",
        "react-intro-m03",
        "03",
        "Les trois piliers de React",
        "Construire le modele mental de base avant de coder.",
        "5 min",
        "intro",
        ["Nommer les trois idees centrales", "Relier composants, state et rendu"],
        [
          lesson({
            id: "03.1",
            title: "Composants comme briques d'interface",
            objective: "Decouper une interface en composants coherents.",
            concepts: ["component tree", "responsabilite", "composition"],
          }),
          lesson({
            id: "03.2",
            title: "State comme memoire de l'interface",
            objective: "Identifier les donnees qui doivent faire reagir l'UI.",
            concepts: ["state", "evenements", "re-render"],
          }),
          lesson({
            id: "03.3",
            title: "Rendu declaratif",
            objective: "Decrire l'UI attendue pour un etat donne.",
            concepts: ["declaratif", "conditions", "listes"],
          }),
        ],
      ),
      module(
        "orientation-m04",
        "react-intro-m04",
        "04",
        "Pourquoi apprendre React en 2026",
        "Relier l'apprentissage de React aux usages professionnels modernes.",
        "3 min",
        "intro",
        ["Comprendre la valeur marche de React", "Eviter les promesses exagerees"],
        [
          lesson({
            id: "04.1",
            title: "Ecosysteme et marche",
            objective: "Identifier les raisons objectives de la popularite de React.",
            concepts: ["ecosysteme", "emploi", "communautes"],
          }),
          lesson({
            id: "04.2",
            title: "React moderne",
            objective: "Situer hooks, Server Components, frameworks et IA dans le paysage actuel.",
            concepts: ["hooks", "Server Components", "Next.js", "IA"],
          }),
          lesson({
            id: "04.3",
            title: "Ce que React n'est pas",
            objective: "Eviter de confondre React avec une solution universelle.",
            concepts: ["limites", "trade-offs", "choix technique"],
          }),
        ],
      ),
      module(
        "orientation-m05",
        "react-intro-m05",
        "05",
        "Methode de progression",
        "Installer les routines qui rendent l'apprentissage actionnable.",
        "2 min",
        "intro",
        ["Lire les erreurs", "Apprendre par mini-projets", "Construire un portfolio"],
        [
          lesson({
            id: "05.1",
            title: "Apprendre par iterations",
            objective: "Decouper la progression en cycles courts de theorie, pratique et retour.",
            concepts: ["iteration", "feedback", "mini-projet"],
          }),
          lesson({
            id: "05.2",
            title: "Lire les erreurs et warnings",
            objective: "Utiliser les messages d'erreur comme support d'apprentissage.",
            concepts: ["debugging", "warnings", "diagnostics"],
          }),
          lesson({
            id: "05.3",
            title: "Organiser son portfolio",
            objective: "Transformer les exercices en preuves visibles de competence.",
            concepts: ["portfolio", "README", "demo"],
          }),
        ],
      ),
    ],
  },
  {
    id: "react-program-core",
    phaseId: "react-core",
    slug: "core",
    title: "React Core en JavaScript",
    objective:
      "Maitriser les fondations indispensables avant TypeScript, Next.js ou l'architecture avancee.",
    project: reactSpaProject,
    modules: [
      module(
        "core-m11",
        "react-core-m11",
        "11",
        "React, Vite et JSX",
        "Creer un projet et ecrire les premiers rendus declaratifs.",
        "1 semaine",
        "beginner",
        ["Initialiser un projet Vite", "Ecrire du JSX correct", "Afficher conditions et listes"],
        [
          lesson({
            id: "11.1",
            title: "Creer un projet React avec Vite",
            objective: "Installer et lancer un environnement React moderne.",
            concepts: ["Vite", "npm scripts", "HMR"],
          }),
          lesson({
            id: "11.2",
            title: "Structure d'un projet React",
            objective: "Comprendre le role de index.html, main.jsx, App.jsx, src et public.",
            concepts: ["root DOM", "createRoot", "src", "public"],
          }),
          lesson({
            id: "11.3",
            title: "JSX : JavaScript et balisage",
            objective: "Ecrire du JSX avec expressions, attributs et fragments.",
            concepts: ["JSX", "className", "fragments", "expressions"],
            pitfalls: ["Confondre expressions et instructions", "Oublier de fermer les balises"],
          }),
          lesson({
            id: "11.4",
            title: "Rendu conditionnel et listes",
            objective: "Afficher des branches et des collections avec des keys stables.",
            concepts: ["condition &&", "ternaire", "map", "key"],
            pitfalls: ["Utiliser key={index} sur une liste dynamique"],
          }),
        ],
      ),
      module(
        "core-m12",
        "react-core-m12",
        "12",
        "Composants et props",
        "Decouper une UI en pieces reutilisables et les faire communiquer.",
        "1 semaine",
        "beginner",
        ["Creer des composants reutilisables", "Passer et composer des props"],
        [
          lesson({
            id: "12.1",
            title: "Creer et nommer des composants",
            objective: "Appliquer les conventions de fichiers et de PascalCase.",
            concepts: ["PascalCase", "fichier composant", "export"],
          }),
          lesson({
            id: "12.2",
            title: "Props : passer des donnees",
            objective: "Transmettre des donnees et callbacks du parent vers l'enfant.",
            concepts: ["props", "destructuring", "callback", "immutabilite"],
          }),
          lesson({
            id: "12.3",
            title: "La prop children",
            objective: "Construire des composants conteneurs flexibles.",
            concepts: ["children", "layout", "slots React"],
          }),
          lesson({
            id: "12.4",
            title: "Composition vs heritage",
            objective: "Utiliser la composition comme pattern principal de reutilisation.",
            concepts: ["composition", "specialisation", "containment"],
          }),
        ],
      ),
      module(
        "core-m13",
        "react-core-m13",
        "13",
        "useState et etat local",
        "Rendre les composants interactifs et synchroniser donnees et UI.",
        "1 semaine",
        "beginner",
        ["Manipuler le state local", "Respecter l'immutabilite", "Controler des inputs"],
        [
          lesson({
            id: "13.1",
            title: "Declarer et modifier le state",
            objective: "Utiliser useState et son setter correctement.",
            concepts: ["useState", "setter", "re-render"],
          }),
          lesson({
            id: "13.2",
            title: "Mises a jour fonctionnelles",
            objective: "Eviter les valeurs obsoletes lors de mises a jour successives.",
            concepts: ["functional update", "batching", "state precedent"],
          }),
          lesson({
            id: "13.3",
            title: "Inputs controles",
            objective: "Relier la valeur d'un formulaire au state React.",
            concepts: ["value", "onChange", "controlled component"],
          }),
          lesson({
            id: "13.4",
            title: "Objets, tableaux et lifting state up",
            objective: "Mettre a jour des structures sans mutation et partager le state utile.",
            concepts: ["immutabilite", "spread", "lifting state up"],
          }),
        ],
      ),
      module(
        "core-m14",
        "react-core-m14",
        "14",
        "useEffect et effets de bord",
        "Synchroniser un composant avec le monde exterieur.",
        "1 semaine",
        "intermediate",
        ["Utiliser useEffect au bon moment", "Nettoyer les effets", "Charger des donnees"],
        [
          lesson({
            id: "14.1",
            title: "Role et structure de useEffect",
            objective: "Comprendre quand un effet est necessaire.",
            concepts: ["effet", "render", "dependances"],
          }),
          lesson({
            id: "14.2",
            title: "Fetch de donnees",
            objective: "Gerer loading, error et donnees asynchrones.",
            concepts: ["fetch", "loading", "error", "async"],
          }),
          lesson({
            id: "14.3",
            title: "Cleanup et annulation",
            objective: "Eviter les fuites et effets concurrents.",
            concepts: ["cleanup", "AbortController", "unmount"],
          }),
          lesson({
            id: "14.4",
            title: "Anti-patterns d'effets",
            objective: "Distinguer calcul derive et effet de bord reel.",
            concepts: ["derived state", "infinite loop", "deps"],
            pitfalls: ["Mettre un setState non garde dans un effet sans dependances"],
          }),
        ],
      ),
      module(
        "core-m15",
        "react-core-m15",
        "15",
        "Hooks avances et custom hooks",
        "Composer des patterns de state, references, contexte et optimisation.",
        "1.5 semaines",
        "intermediate",
        ["Choisir le bon hook", "Extraire de la logique reutilisable", "Optimiser avec discernement"],
        [
          lesson({
            id: "15.1",
            title: "useRef et valeurs persistantes",
            objective: "Stocker une valeur ou acceder au DOM sans declencher de rendu.",
            concepts: ["useRef", "DOM ref", "valeur mutable"],
          }),
          lesson({
            id: "15.2",
            title: "useReducer pour state complexe",
            objective: "Modeliser des transitions explicites avec reducer et actions.",
            concepts: ["useReducer", "action", "transition"],
          }),
          lesson({
            id: "15.3",
            title: "useContext et partage de donnees",
            objective: "Partager un contexte sans prop drilling excessif.",
            concepts: ["context", "provider", "consumer"],
          }),
          lesson({
            id: "15.4",
            title: "useMemo et useCallback",
            objective: "Optimiser uniquement quand il existe un cout ou une reference stable utile.",
            concepts: ["memoization", "reference equality", "performance"],
            pitfalls: ["Optimiser avant d'avoir mesure"],
          }),
          lesson({
            id: "15.5",
            title: "Custom hooks",
            objective: "Extraire de la logique React reutilisable et testable.",
            concepts: ["custom hook", "rules of hooks", "reuse"],
          }),
        ],
      ),
      module(
        "core-m16",
        "react-core-m16",
        "16",
        "React Router",
        "Construire une navigation SPA robuste.",
        "1 semaine",
        "intermediate",
        ["Declarer des routes", "Utiliser params et layouts", "Simuler une protection de route"],
        [
          lesson({
            id: "16.1",
            title: "Routes et pages",
            objective: "Mapper des URLs vers des composants de page.",
            concepts: ["BrowserRouter", "Routes", "Route"],
          }),
          lesson({
            id: "16.2",
            title: "Layouts et routes imbriquees",
            objective: "Partager une structure d'ecran entre plusieurs pages.",
            concepts: ["layout", "Outlet", "nested routes"],
          }),
          lesson({
            id: "16.3",
            title: "Params et query params",
            objective: "Lire une URL dynamique et filtrer l'affichage.",
            concepts: ["useParams", "search params", "URL state"],
          }),
          lesson({
            id: "16.4",
            title: "Navigation et routes protegees",
            objective: "Naviguer par code et bloquer un acces selon un etat utilisateur.",
            concepts: ["useNavigate", "Navigate", "protected route"],
          }),
        ],
      ),
      module(
        "core-m17",
        "react-core-m17",
        "17",
        "Formulaires modernes",
        "Construire des formulaires robustes, valides et agreables.",
        "0.5 semaine",
        "intermediate",
        ["Choisir controle ou librairie", "Valider avec schema", "Afficher des erreurs utiles"],
        [
          lesson({
            id: "17.1",
            title: "Controle vs non controle",
            objective: "Choisir la strategie adaptee au formulaire.",
            concepts: ["controlled", "uncontrolled", "refs"],
          }),
          lesson({
            id: "17.2",
            title: "React Hook Form",
            objective: "Gerer un formulaire performant avec une API declarative.",
            concepts: ["register", "handleSubmit", "form state"],
          }),
          lesson({
            id: "17.3",
            title: "Validation Zod",
            objective: "Centraliser les regles de validation dans un schema.",
            concepts: ["schema", "resolver", "messages d'erreur"],
          }),
          lesson({
            id: "17.4",
            title: "UX et accessibilite formulaire",
            objective: "Rendre les erreurs visibles, comprehensibles et accessibles.",
            concepts: ["label", "aria", "focus", "feedback"],
          }),
        ],
      ),
      module(
        "core-m18",
        "react-core-m18",
        "18",
        "Styling et UI polish",
        "Styliser des composants coherents, responsives et accessibles.",
        "1 semaine",
        "intermediate",
        ["Comparer les strategies de style", "Construire une UI responsive", "Ajouter des animations utiles"],
        [
          lesson({
            id: "18.1",
            title: "CSS classique et CSS Modules",
            objective: "Gerer la portee des styles et eviter les collisions.",
            concepts: ["CSS", "CSS Modules", "scope"],
          }),
          lesson({
            id: "18.2",
            title: "Tailwind CSS avec React",
            objective: "Composer rapidement des interfaces avec des classes utilitaires.",
            concepts: ["utility classes", "responsive", "design tokens"],
          }),
          lesson({
            id: "18.3",
            title: "Responsive et accessibilite visuelle",
            objective: "Adapter l'UI aux tailles d'ecran et aux etats d'interaction.",
            concepts: ["breakpoints", "focus states", "contrast"],
          }),
          lesson({
            id: "18.4",
            title: "Animations sobres",
            objective: "Ajouter du feedback sans nuire a la lisibilite.",
            concepts: ["Framer Motion", "transition", "reduced motion"],
          }),
        ],
      ),
    ],
  },
  {
    id: "react-program-typescript",
    phaseId: "react-typescript",
    slug: "typescript",
    title: "TypeScript pour React",
    objective: "Securiser le code React avec un typage progressif, utile et maintenable.",
    project: migrationTsProject,
    modules: [
      module(
        "typescript-m19",
        "react-typescript-m19",
        "19",
        "Bases TypeScript",
        "Acquerir les types essentiels avant de les appliquer a React.",
        "1 semaine",
        "beginner",
        ["Lire une annotation", "Modeliser des donnees", "Utiliser generiques simples"],
        [
          lesson({
            id: "19.1",
            title: "Types primitifs et annotations",
            objective: "Annoter des valeurs et comprendre l'inference.",
            concepts: ["string", "number", "boolean", "inference"],
          }),
          lesson({
            id: "19.2",
            title: "Interfaces et type aliases",
            objective: "Modeliser des objets avec les deux syntaxes principales.",
            concepts: ["interface", "type alias", "objet"],
          }),
          lesson({
            id: "19.3",
            title: "Unions, intersections et literal types",
            objective: "Limiter les valeurs possibles et composer des types.",
            concepts: ["union", "intersection", "literal type"],
          }),
          lesson({
            id: "19.4",
            title: "Generiques",
            objective: "Creer des fonctions reutilisables sans perdre le type.",
            concepts: ["generic", "type parameter", "array"],
          }),
        ],
      ),
      module(
        "typescript-m20",
        "react-typescript-m20",
        "20",
        "TypeScript avance pragmatique",
        "Utiliser les outils avances qui apportent une vraie valeur au quotidien.",
        "1 semaine",
        "intermediate",
        ["Narrower les types", "Utiliser les utility types", "Eviter les abus"],
        [
          lesson({
            id: "20.1",
            title: "Utility types",
            objective: "Employer Pick, Omit, Partial et Record dans des cas concrets.",
            concepts: ["Pick", "Omit", "Partial", "Record"],
          }),
          lesson({
            id: "20.2",
            title: "Type guards et narrowing",
            objective: "Passer de unknown a un type fiable.",
            concepts: ["unknown", "type guard", "narrowing"],
          }),
          lesson({
            id: "20.3",
            title: "Conditional et mapped types utiles",
            objective: "Comprendre les patterns avances sans complexifier inutilement.",
            concepts: ["conditional type", "mapped type", "infer"],
          }),
        ],
      ),
      module(
        "typescript-m21",
        "react-typescript-m21",
        "21",
        "React avec TypeScript",
        "Typer les composants, hooks, events et contexts React.",
        "2 semaines",
        "intermediate",
        ["Typer une UI React", "Modeliser des props variantes", "Typer les hooks"],
        [
          lesson({
            id: "21.1",
            title: "Props et composants types",
            objective: "Typer les props, children et callbacks d'un composant.",
            concepts: ["props", "ReactNode", "callback"],
          }),
          lesson({
            id: "21.2",
            title: "useState, useReducer et useRef types",
            objective: "Eviter les states jamais[], null mal types et reducers flous.",
            concepts: ["useState generic", "Reducer", "RefObject"],
          }),
          lesson({
            id: "21.3",
            title: "Evenements DOM types",
            objective: "Typer correctement les handlers d'inputs, forms et boutons.",
            concepts: ["ChangeEvent", "FormEvent", "MouseEvent"],
          }),
          lesson({
            id: "21.4",
            title: "Custom hooks et contexts types",
            objective: "Exposer des APIs de hooks fiables et ergonomiques.",
            concepts: ["custom hook generic", "context", "discriminated union"],
          }),
        ],
      ),
    ],
  },
  {
    id: "react-program-ecosystem",
    phaseId: "react-ecosystem",
    slug: "ecosystem",
    title: "Ecosysteme production et fullstack",
    objective: "Passer d'une SPA React a une application production moderne.",
    project: fullstackProject,
    modules: [
      module(
        "ecosystem-m22",
        "react-ecosystem-m22",
        "22",
        "Next.js App Router",
        "Construire des applications React serveur/client modernes.",
        "2 semaines",
        "advanced",
        ["Comprendre App Router", "Distinguer Server et Client Components", "Muter avec Server Actions"],
        [
          lesson({
            id: "22.1",
            title: "App Router et layouts imbriques",
            objective: "Structurer les routes avec app, page, layout, loading et error.",
            concepts: ["app directory", "layout", "page", "segment"],
          }),
          lesson({
            id: "22.2",
            title: "Server Components vs Client Components",
            objective: "Decider ou execute un composant et pourquoi.",
            concepts: ["RSC", "use client", "hydration"],
          }),
          lesson({
            id: "22.3",
            title: "Server Actions",
            objective: "Declencher une mutation serveur depuis l'UI.",
            concepts: ["use server", "form action", "revalidatePath"],
          }),
          lesson({
            id: "22.4",
            title: "Streaming, Suspense et loading.tsx",
            objective: "Afficher progressivement une interface pendant les chargements.",
            concepts: ["Suspense", "streaming", "loading.tsx"],
          }),
        ],
      ),
      module(
        "ecosystem-m23",
        "react-ecosystem-m23",
        "23",
        "State global et state serveur",
        "Choisir entre state local, global et cache serveur.",
        "1 semaine",
        "advanced",
        ["Eviter le state global inutile", "Gerer un cache distant", "Invalider proprement"],
        [
          lesson({
            id: "23.1",
            title: "Quand utiliser du state global",
            objective: "Identifier les donnees qui meritent un store partage.",
            concepts: ["local state", "global state", "prop drilling"],
          }),
          lesson({
            id: "23.2",
            title: "Zustand et Redux Toolkit",
            objective: "Comparer deux approches de store client.",
            concepts: ["Zustand", "Redux Toolkit", "actions"],
          }),
          lesson({
            id: "23.3",
            title: "TanStack Query",
            objective: "Traiter les donnees serveur comme un cache synchronise.",
            concepts: ["server state", "cache", "invalidation", "optimistic update"],
          }),
        ],
      ),
      module(
        "ecosystem-m24",
        "react-ecosystem-m24",
        "24",
        "Authentification et autorisation",
        "Proteger les parcours et afficher l'UI selon l'utilisateur.",
        "1 semaine",
        "advanced",
        ["Comprendre sessions et tokens", "Proteger des routes", "Gerer des roles"],
        [
          lesson({
            id: "24.1",
            title: "Sessions, JWT et OAuth",
            objective: "Distinguer les modeles d'auth modernes.",
            concepts: ["session", "JWT", "OAuth"],
          }),
          lesson({
            id: "24.2",
            title: "Auth.js",
            objective: "Comprendre le role d'un provider d'auth dans Next.js.",
            concepts: ["Auth.js", "provider", "callbacks"],
          }),
          lesson({
            id: "24.3",
            title: "Routes protegees et middleware",
            objective: "Bloquer l'acces aux pages et actions sensibles.",
            concepts: ["middleware", "protected route", "role"],
          }),
          lesson({
            id: "24.4",
            title: "Erreurs de securite frequentes",
            objective: "Eviter les fuites de secrets et les controles uniquement visuels.",
            concepts: ["secrets", "server-side check", "CSRF"],
          }),
        ],
      ),
      module(
        "ecosystem-m25",
        "react-ecosystem-m25",
        "25",
        "Donnees, API et base de donnees",
        "Modeliser et persister les donnees d'une application fullstack.",
        "1.5 semaines",
        "advanced",
        ["Lire un modele relationnel", "Utiliser un ORM", "Eviter les erreurs de requetage"],
        [
          lesson({
            id: "25.1",
            title: "PostgreSQL pour front-end",
            objective: "Comprendre tables, relations et index utiles aux apps web.",
            concepts: ["table", "relation", "index"],
          }),
          lesson({
            id: "25.2",
            title: "Prisma",
            objective: "Creer un schema, migrer et requeter avec Prisma.",
            concepts: ["schema", "migration", "client"],
          }),
          lesson({
            id: "25.3",
            title: "Drizzle",
            objective: "Comparer une approche ORM type-safe plus proche du SQL.",
            concepts: ["Drizzle", "SQL-like", "type-safe"],
          }),
          lesson({
            id: "25.4",
            title: "Pagination et erreurs N+1",
            objective: "Construire des listes performantes et previsibles.",
            concepts: ["pagination", "N+1", "select"],
          }),
        ],
      ),
      module(
        "ecosystem-m26",
        "react-ecosystem-m26",
        "26",
        "Tests React",
        "Verifier les comportements critiques sans tester l'implementation.",
        "1 semaine",
        "advanced",
        ["Tester des composants", "Tester des hooks", "Automatiser un parcours critique"],
        [
          lesson({
            id: "26.1",
            title: "Pyramide de tests",
            objective: "Choisir le bon niveau de test selon le risque.",
            concepts: ["unit", "integration", "e2e"],
          }),
          lesson({
            id: "26.2",
            title: "Vitest et Testing Library",
            objective: "Tester une interaction utilisateur visible.",
            concepts: ["Vitest", "Testing Library", "user-event"],
          }),
          lesson({
            id: "26.3",
            title: "Mocks et tests de hooks",
            objective: "Isoler une dependance sans figer l'implementation.",
            concepts: ["mock", "custom hook", "fixture"],
          }),
          lesson({
            id: "26.4",
            title: "Playwright et parcours critiques",
            objective: "Automatiser une verification bout-en-bout.",
            concepts: ["Playwright", "e2e", "critical path"],
          }),
        ],
      ),
      module(
        "ecosystem-m27",
        "react-ecosystem-m27",
        "27",
        "Performance et SEO",
        "Mesurer puis ameliorer l'experience percue et l'indexabilite.",
        "1 semaine",
        "advanced",
        ["Lire les Core Web Vitals", "Optimiser images et bundle", "Produire des metadata"],
        [
          lesson({
            id: "27.1",
            title: "Core Web Vitals",
            objective: "Comprendre LCP, CLS, INP et leurs causes frequentes.",
            concepts: ["LCP", "CLS", "INP"],
          }),
          lesson({
            id: "27.2",
            title: "Images et lazy loading",
            objective: "Reduire le cout des medias sans degrader l'UX.",
            concepts: ["next/image", "lazy loading", "sizes"],
          }),
          lesson({
            id: "27.3",
            title: "Bundle splitting et memoization",
            objective: "Limiter le JavaScript inutile et les re-renders couteux.",
            concepts: ["code splitting", "memo", "profiling"],
          }),
          lesson({
            id: "27.4",
            title: "Metadata et SEO technique",
            objective: "Rendre les pages comprehensibles pour moteurs et reseaux sociaux.",
            concepts: ["metadata", "Open Graph", "canonical"],
          }),
        ],
      ),
    ],
  },
  {
    id: "react-program-expert",
    phaseId: "react-expert",
    slug: "expert",
    title: "Architecture, qualite et niveau senior",
    objective: "Concevoir, maintenir et faire evoluer des applications React a grande echelle.",
    project: seniorRefactorProject,
    modules: [
      module(
        "expert-m28",
        "react-expert-m28",
        "28",
        "Architecture front-end avancee",
        "Structurer une codebase pour limiter le couplage et accelerer les equipes.",
        "1.5 semaines",
        "expert",
        ["Decouper par feature", "Definir des boundaries", "Organiser un monorepo"],
        [
          lesson({
            id: "28.1",
            title: "Feature folders",
            objective: "Regrouper UI, hooks, domaine et API par capacite produit.",
            concepts: ["feature folder", "cohesion", "coupling"],
          }),
          lesson({
            id: "28.2",
            title: "DDD applique au front",
            objective: "Identifier domaines, boundaries et langage metier.",
            concepts: ["bounded context", "domain", "ubiquitous language"],
          }),
          lesson({
            id: "28.3",
            title: "Clean Architecture front-end",
            objective: "Separer domaine, application et infrastructure.",
            concepts: ["dependency rule", "domain", "infrastructure"],
          }),
          lesson({
            id: "28.4",
            title: "Monorepos et design systems",
            objective: "Partager packages, UI et config dans plusieurs apps.",
            concepts: ["Turborepo", "Nx", "design system"],
          }),
        ],
      ),
      module(
        "expert-m29",
        "react-expert-m29",
        "29",
        "DevOps et delivery",
        "Livrer plus surement avec CI, previews et conventions d'equipe.",
        "1.5 semaines",
        "expert",
        ["Automatiser les checks", "Gerer les secrets", "Preparer un rollback"],
        [
          lesson({
            id: "29.1",
            title: "GitHub Actions",
            objective: "Executer lint, type-check, tests et build a chaque PR.",
            concepts: ["CI", "workflow", "matrix"],
          }),
          lesson({
            id: "29.2",
            title: "Docker pour apps Next.js",
            objective: "Comprendre image, build et runtime.",
            concepts: ["Dockerfile", "image", "runtime"],
          }),
          lesson({
            id: "29.3",
            title: "Deploiement et previews",
            objective: "Comparer Vercel, Fly.io et self-hosting selon les contraintes.",
            concepts: ["preview", "environment", "rollback"],
          }),
          lesson({
            id: "29.4",
            title: "Release strategy",
            objective: "Formaliser version, changelog et validation avant production.",
            concepts: ["release", "semver", "checklist"],
          }),
        ],
      ),
      module(
        "expert-m30",
        "react-expert-m30",
        "30",
        "React Internals",
        "Comprendre ce que React fait pendant render, commit et hydration.",
        "1 semaine",
        "expert",
        ["Expliquer reconciliation", "Diagnostiquer re-renders", "Comprendre hydration"],
        [
          lesson({
            id: "30.1",
            title: "Reconciliation et Fiber",
            objective: "Relier keys, tree diffing et unite de travail Fiber.",
            concepts: ["reconciliation", "Fiber", "keys"],
          }),
          lesson({
            id: "30.2",
            title: "Render phase et commit phase",
            objective: "Distinguer calcul d'UI et application au DOM.",
            concepts: ["render phase", "commit phase", "side effects"],
          }),
          lesson({
            id: "30.3",
            title: "Concurrent rendering",
            objective: "Comprendre interruption, priorites et transitions.",
            concepts: ["concurrency", "transition", "scheduler"],
          }),
          lesson({
            id: "30.4",
            title: "Hydration et Server Components",
            objective: "Diagnostiquer les mismatches et limites serveur/client.",
            concepts: ["hydration", "mismatch", "RSC"],
          }),
        ],
      ),
      module(
        "expert-m31",
        "react-expert-m31",
        "31",
        "Open source et librairies",
        "Concevoir, publier et maintenir une API publique.",
        "1 semaine",
        "expert",
        ["Publier un package", "Documenter une API", "Contribuer proprement"],
        [
          lesson({
            id: "31.1",
            title: "Package npm type",
            objective: "Configurer build, exports et declarations de types.",
            concepts: ["npm", "exports", "types"],
          }),
          lesson({
            id: "31.2",
            title: "API publique et semver",
            objective: "Stabiliser une API et communiquer les changements.",
            concepts: ["API design", "semver", "breaking change"],
          }),
          lesson({
            id: "31.3",
            title: "Documentation et exemples",
            objective: "Rendre une librairie adoptable sans support direct.",
            concepts: ["README", "examples", "DX"],
          }),
          lesson({
            id: "31.4",
            title: "Contribution open source",
            objective: "Trouver, comprendre et soumettre une PR utile.",
            concepts: ["issue", "fork", "pull request"],
          }),
        ],
      ),
      module(
        "expert-m32",
        "react-expert-m32",
        "32",
        "React et IA",
        "Integrer des fonctionnalites IA utiles dans une interface React.",
        "2 semaines",
        "expert",
        ["Streamer une reponse", "Construire une UX IA", "Gerer la securite des cles"],
        [
          lesson({
            id: "32.1",
            title: "Vercel AI SDK",
            objective: "Afficher une reponse LLM en streaming dans une UI React.",
            concepts: ["AI SDK", "streaming", "messages"],
          }),
          lesson({
            id: "32.2",
            title: "RAG cote produit",
            objective: "Relier recherche documentaire, contexte et generation.",
            concepts: ["RAG", "embeddings", "retrieval"],
          }),
          lesson({
            id: "32.3",
            title: "UX des interfaces IA",
            objective: "Concevoir feedback, etats incertains et controle utilisateur.",
            concepts: ["latency", "feedback", "human-in-the-loop"],
          }),
          lesson({
            id: "32.4",
            title: "Securite et evaluation",
            objective: "Proteger les cles et evaluer la qualite des reponses.",
            concepts: ["API keys", "prompt injection", "evaluation"],
          }),
        ],
      ),
    ],
  },
  {
    id: "react-program-tooling",
    phaseId: "react-tooling",
    slug: "tooling",
    title: "Transition pro et projet final",
    objective: "Preparer les apprenants a livrer dans des conditions proches d'une equipe produit.",
    project: capstoneProject,
    modules: [
      module(
        "tooling-m33",
        "react-tooling-m33",
        "33",
        "Environnement de developpement professionnel",
        "Configurer un poste stable pour coder, diagnostiquer et livrer.",
        "30 min",
        "beginner",
        ["Configurer l'editeur", "Utiliser lint et format", "Lire les diagnostics"],
        [
          lesson({
            id: "33.1",
            title: "VS Code/Cursor et extensions utiles",
            objective: "Installer un environnement leger et productif.",
            concepts: ["editor", "extensions", "settings"],
          }),
          lesson({
            id: "33.2",
            title: "ESLint, Prettier et scripts npm",
            objective: "Automatiser les checks de qualite quotidiens.",
            concepts: ["lint", "format", "npm scripts"],
          }),
          lesson({
            id: "33.3",
            title: "Debugging et diagnostics",
            objective: "Exploiter terminal, console et erreurs TypeScript.",
            concepts: ["debugging", "terminal", "diagnostics"],
          }),
        ],
      ),
      module(
        "tooling-m34",
        "react-tooling-m34",
        "34",
        "Git, GitHub et collaboration",
        "Produire un historique lisible et des PR faciles a reviewer.",
        "40 min",
        "beginner",
        ["Travailler par branches", "Ecrire des commits utiles", "Presenter une PR"],
        [
          lesson({
            id: "34.1",
            title: "Branches et commits",
            objective: "Isoler une intention de changement dans un historique propre.",
            concepts: ["branch", "commit", "history"],
          }),
          lesson({
            id: "34.2",
            title: "Pull requests et revue",
            objective: "Expliquer le changement et guider la validation.",
            concepts: ["pull request", "review", "test plan"],
          }),
          lesson({
            id: "34.3",
            title: "Conflits et conventions",
            objective: "Resoudre un conflit simple et appliquer une convention de message.",
            concepts: ["merge conflict", "conventional commits", "workflow"],
          }),
        ],
      ),
      module(
        "tooling-m35",
        "react-tooling-m35",
        "35",
        "Deploiement et handoff",
        "Publier une demo et transmettre un projet exploitable.",
        "35 min",
        "beginner",
        ["Deployer une app", "Gerer les variables d'environnement", "Documenter le lancement"],
        [
          lesson({
            id: "35.1",
            title: "Deploiement continu",
            objective: "Connecter un repository a un provider de preview.",
            concepts: ["Vercel", "preview", "CI/CD"],
          }),
          lesson({
            id: "35.2",
            title: "Variables d'environnement",
            objective: "Separer configuration locale, preview et production.",
            concepts: ["env vars", "secrets", "runtime config"],
          }),
          lesson({
            id: "35.3",
            title: "README et demo finale",
            objective: "Permettre a un reviewer de lancer, tester et comprendre le projet.",
            concepts: ["README", "handoff", "demo"],
          }),
        ],
      ),
    ],
  },
];

export const reactProgram = {
  courseId: "react",
  version: "2026.1",
  reusableStructure: [
    "Course > Phase > Module > Lesson",
    "Lesson > courseOutline > quiz > exercises",
    "Module > assessment",
    "Phase > project",
    "Course > authoringPriorities",
  ],
  phases,
  authoringPriorities: [
    {
      order: 1,
      target: "react-core",
      rationale:
        "La phase React Core porte les fondations reutilisees dans TypeScript, Next.js, tests, performance et architecture.",
    },
    {
      order: 2,
      target: "react-typescript",
      rationale:
        "Le typage doit etre introduit avant les modules production pour stabiliser les exemples fullstack.",
    },
    {
      order: 3,
      target: "react-ecosystem",
      rationale:
        "L'ecosysteme transforme les acquis en application deployable avec auth, donnees, tests et performance.",
    },
    {
      order: 4,
      target: "react-expert",
      rationale:
        "Les contenus senior demandent des cas d'etude plus riches et peuvent s'appuyer sur les projets precedents.",
    },
    {
      order: 5,
      target: "react-tooling",
      rationale:
        "La transition pro finalise le parcours et doit rester synchronisee avec le capstone.",
    },
  ],
} satisfies CourseProgram;

export type ReactProgram = typeof reactProgram;
