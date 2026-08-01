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
      guidedExample: `Guided example around: ${spec.title}.`,
      recap: "Recap of decisions, common mistakes, and success criteria.",
    },
    quiz: {
      questionCount: 5,
      focus: spec.concepts,
    },
    exercises: [
      {
        title: `Synthesis - ${spec.title}`,
        kind: "synthesis",
        brief: `Apply the lesson "${spec.title}" in a situation close to a real project.`,
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
        title: `Module challenge - ${title}`,
        kind: "guided",
        brief: `Combine the ideas from module "${title}" in a corrected, testable exercise.`,
      },
      {
        title: `Module synthesis - ${title}`,
        kind: "synthesis",
        brief: "Produce a short deliverable that proves module understanding without a step-by-step walkthrough.",
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
  title: "React SPA Application",
  deliverable:
    "A complete SPA with routing, forms, local state, reusable components, and responsive design.",
  assessment: [
    "Readable, well-separated components",
    "Consistent local state management",
    "Manually testable user flows",
    "Responsive UX with baseline accessibility",
  ],
};

const migrationTsProject: ProjectBrief = {
  title: "TypeScript Migration",
  deliverable: "Migrate a mini React JavaScript app to React TypeScript in strict mode.",
  assessment: [
    "Useful typing of props, events, state, and data",
    "No avoidable any",
    "Errors handled explicitly",
    "Readable and maintainable types",
  ],
};

const fullstackProject: ProjectBrief = {
  title: "Fullstack Next.js Application",
  deliverable: "A Next.js app with auth, persistent data, tests, and preview deployment.",
  assessment: [
    "Clear server/client boundary",
    "Basic auth security in place",
    "Consistent mutations and invalidations",
    "Minimal tests and performance verified",
  ],
};

const seniorRefactorProject: ProjectBrief = {
  title: "Senior audit and refactor",
  deliverable:
    "Take a deliberately imperfect app and deliver a refactor, tests, CI, perf audit, and documentation.",
  assessment: [
    "Prioritized diagnosis",
    "More maintainable architecture",
    "Evidence via tests or measurements",
    "Clear handoff documentation",
  ],
};

const capstoneProject: ProjectBrief = {
  title: "React/Next.js Capstone",
  deliverable: "Complete portfolio application, deployed, tested, and documented.",
  options: ["SaaS dashboard", "Miniature LMS", "Marketplace", "Lightweight CRM", "Document AI app"],
  assessment: [
    "Architecture and repository readability",
    "UX, accessibility, and responsive design",
    "Security, tests, and performance",
    "Product demo quality",
  ],
};

const phases: ProgramPhase[] = [
  {
    id: "react-program-orientation",
    phaseId: "react-intro",
    slug: "intro",
    title: "React Orientation and Culture",
    objective:
      "Build context before diving into technique, clarify React's role, and establish a sustainable learning approach.",
    modules: [
      module(
        "orientation-m01",
        "react-intro-m01",
        "01",
        "Understanding React Without Jargon",
        "Identify the problem React solves and the minimum vocabulary.",
        "3 min",
        "intro",
        ["Explain React simply", "Distinguish imperative DOM from declarative UI"],
        [
          lesson({
            id: "01.1",
            title: "A Simple Definition of React",
            objective: "State a clear definition of React and its scope.",
            concepts: ["UI library", "user interface", "JavaScript"],
          }),
          lesson({
            id: "01.2",
            title: "The Imperative DOM Problem",
            objective: "Understand why complex UIs become fragile without abstraction.",
            concepts: ["DOM", "imperative", "UI synchronization"],
          }),
          lesson({
            id: "01.3",
            title: "Declarative UI and Components",
            objective: "Connect declarative thinking to component decomposition.",
            concepts: ["declarative", "components", "reuse"],
          }),
        ],
      ),
      module(
        "orientation-m02",
        "react-intro-m02",
        "02",
        "React in the Web Ecosystem",
        "Situate React among frameworks, meta-frameworks, and alternatives.",
        "4 min",
        "intro",
        ["Identify React's proper scope", "Choose React for the right reasons"],
        [
          lesson({
            id: "02.1",
            title: "Library vs Framework",
            objective: "Compare React with Angular, Vue, Svelte, and Next.js.",
            concepts: ["library", "framework", "meta-framework"],
          }),
          lesson({
            id: "02.2",
            title: "What React Does Not Provide Out of the Box",
            objective: "List the pieces to add for a complete application.",
            concepts: ["routing", "data fetching", "auth", "build tooling"],
          }),
          lesson({
            id: "02.3",
            title: "Choosing a Stack for the Project",
            objective: "Match the stack to product size and constraints.",
            concepts: ["SPA", "SSR", "SSG", "fullstack"],
          }),
        ],
      ),
      module(
        "orientation-m03",
        "react-intro-m03",
        "03",
        "The Three Pillars of React",
        "Build the core mental model before writing code.",
        "5 min",
        "intro",
        ["Name the three central ideas", "Connect components, state, and rendering"],
        [
          lesson({
            id: "03.1",
            title: "Components as UI Building Blocks",
            objective: "Break an interface into coherent components.",
            concepts: ["component tree", "responsibility", "composition"],
          }),
          lesson({
            id: "03.2",
            title: "State as the UI's Memory",
            objective: "Identify data that should drive UI updates.",
            concepts: ["state", "events", "re-render"],
          }),
          lesson({
            id: "03.3",
            title: "Declarative Rendering",
            objective: "Describe the expected UI for a given state.",
            concepts: ["declarative", "conditions", "lists"],
          }),
        ],
      ),
      module(
        "orientation-m04",
        "react-intro-m04",
        "04",
        "Why Learn React in 2026",
        "Connect learning React to modern professional use cases.",
        "3 min",
        "intro",
        ["Understand React's market value", "Avoid exaggerated promises"],
        [
          lesson({
            id: "04.1",
            title: "Ecosystem and Job Market",
            objective: "Identify objective reasons for React's popularity.",
            concepts: ["ecosystem", "jobs", "communities"],
          }),
          lesson({
            id: "04.2",
            title: "Modern React",
            objective: "Situate hooks, Server Components, frameworks, and AI in today's landscape.",
            concepts: ["hooks", "Server Components", "Next.js", "AI"],
          }),
          lesson({
            id: "04.3",
            title: "What React Is Not",
            objective: "Avoid treating React as a universal solution.",
            concepts: ["limits", "trade-offs", "technical choice"],
          }),
        ],
      ),
      module(
        "orientation-m05",
        "react-intro-m05",
        "05",
        "Learning Progression Method",
        "Establish routines that make learning actionable.",
        "2 min",
        "intro",
        ["Read errors", "Learn through mini-projects", "Build a portfolio"],
        [
          lesson({
            id: "05.1",
            title: "Learning Through Iteration",
            objective: "Break progress into short cycles of theory, practice, and feedback.",
            concepts: ["iteration", "feedback", "mini-project"],
          }),
          lesson({
            id: "05.2",
            title: "Reading Errors and Warnings",
            objective: "Use error messages as a learning tool.",
            concepts: ["debugging", "warnings", "diagnostics"],
          }),
          lesson({
            id: "05.3",
            title: "Organizing Your Portfolio",
            objective: "Turn exercises into visible proof of skill.",
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
    title: "React Core in JavaScript",
    objective:
      "Master essential foundations before TypeScript, Next.js, or advanced architecture.",
    project: reactSpaProject,
    modules: [
      module(
        "core-m06",
        "react-core-m06",
        "06",
        "React, Vite, and JSX",
        "Create a project and write your first declarative renders.",
        "1 week",
        "beginner",
        ["Initialize a Vite project", "Write correct JSX", "Render conditions and lists"],
        [
          lesson({
            id: "06.1",
            title: "Create a React Project with Vite",
            objective: "Install and run a modern React environment.",
            concepts: ["Vite", "npm scripts", "HMR"],
          }),
          lesson({
            id: "06.2",
            title: "React Project Structure",
            objective: "Understand the role of index.html, main.jsx, App.jsx, src, and public.",
            concepts: ["root DOM", "createRoot", "src", "public"],
          }),
          lesson({
            id: "06.3",
            title: "JSX: JavaScript and Markup",
            objective: "Write JSX with expressions, attributes, and fragments.",
            concepts: ["JSX", "className", "fragments", "expressions"],
            pitfalls: ["Confusing expressions with statements", "Forgetting to close tags"],
          }),
          lesson({
            id: "06.4",
            title: "Conditional Rendering and Lists",
            objective: "Render branches and collections with stable keys.",
            concepts: ["condition &&", "ternary", "map", "key"],
            pitfalls: ["Using key={index} on a dynamic list"],
          }),
        ],
      ),
      module(
        "core-m07",
        "react-core-m07",
        "07",
        "Components and Props",
        "Split a UI into reusable pieces and make them communicate.",
        "1 week",
        "beginner",
        ["Create reusable components", "Pass and compose props"],
        [
          lesson({
            id: "07.1",
            title: "Create and Name Components",
            objective: "Apply file and PascalCase conventions.",
            concepts: ["PascalCase", "component file", "export"],
          }),
          lesson({
            id: "07.2",
            title: "Props: Passing Data",
            objective: "Pass data and callbacks from parent to child.",
            concepts: ["props", "destructuring", "callback", "immutability"],
          }),
          lesson({
            id: "07.3",
            title: "The children Prop",
            objective: "Build flexible container components.",
            concepts: ["children", "layout", "React slots"],
          }),
          lesson({
            id: "07.4",
            title: "Composition vs Inheritance",
            objective: "Use composition as the primary reuse pattern.",
            concepts: ["composition", "specialization", "containment"],
          }),
        ],
      ),
      module(
        "core-m08",
        "react-core-m08",
        "08",
        "useState and Local State",
        "Make components interactive and keep data and UI in sync.",
        "1 week",
        "beginner",
        ["Work with local state", "Respect immutability", "Control inputs"],
        [
          lesson({
            id: "08.1",
            title: "Declaring and Updating State",
            objective: "Use useState and its setter correctly.",
            concepts: ["useState", "setter", "re-render"],
          }),
          lesson({
            id: "08.2",
            title: "Functional Updates",
            objective: "Avoid stale values during successive updates.",
            concepts: ["functional update", "batching", "previous state"],
          }),
          lesson({
            id: "08.3",
            title: "Controlled Inputs",
            objective: "Bind form values to React state.",
            concepts: ["value", "onChange", "controlled component"],
          }),
          lesson({
            id: "08.4",
            title: "Objects, Arrays, and Lifting State Up",
            objective: "Update structures without mutation and share state where needed.",
            concepts: ["immutability", "spread", "lifting state up"],
          }),
        ],
      ),
      module(
        "core-m09",
        "react-core-m09",
        "14",
        "useEffect and Side Effects",
        "Synchronize a component with the outside world.",
        "1 week",
        "intermediate",
        ["Use useEffect at the right time", "Clean up effects", "Load data"],
        [
          lesson({
            id: "09.1",
            title: "Role and Structure of useEffect",
            objective: "Understand when an effect is necessary.",
            concepts: ["effect", "render", "dependencies"],
          }),
          lesson({
            id: "09.2",
            title: "Fetching Data",
            objective: "Handle loading, error, and async data.",
            concepts: ["fetch", "loading", "error", "async"],
          }),
          lesson({
            id: "09.3",
            title: "Cleanup and Cancellation",
            objective: "Avoid leaks and competing effects.",
            concepts: ["cleanup", "AbortController", "unmount"],
          }),
          lesson({
            id: "09.4",
            title: "Effect Anti-patterns",
            objective: "Distinguish derived computation from a real side effect.",
            concepts: ["derived state", "infinite loop", "deps"],
            pitfalls: ["Putting an unguarded setState in an effect with no dependencies"],
          }),
        ],
      ),
      module(
        "core-m10",
        "react-core-m10",
        "10",
        "Advanced Hooks and Custom Hooks",
        "Compose state patterns, refs, context, and optimization.",
        "1.5 weeks",
        "intermediate",
        ["Choose the right hook", "Extract reusable logic", "Optimize judiciously"],
        [
          lesson({
            id: "10.1",
            title: "useRef and Persistent Values",
            objective: "Store a value or access the DOM without triggering a render.",
            concepts: ["useRef", "DOM ref", "mutable value"],
          }),
          lesson({
            id: "10.2",
            title: "useReducer for Complex State",
            objective: "Model explicit transitions with reducer and actions.",
            concepts: ["useReducer", "action", "transition"],
          }),
          lesson({
            id: "10.3",
            title: "useContext and Data Sharing",
            objective: "Share context without excessive prop drilling.",
            concepts: ["context", "provider", "consumer"],
          }),
          lesson({
            id: "10.4",
            title: "useMemo and useCallback",
            objective: "Optimize only when there is a cost or a stable reference worth preserving.",
            concepts: ["memoization", "reference equality", "performance"],
            pitfalls: ["Optimizing before measuring"],
          }),
          lesson({
            id: "10.5",
            title: "Custom Hooks",
            objective: "Extract reusable, testable React logic.",
            concepts: ["custom hook", "rules of hooks", "reuse"],
          }),
        ],
      ),
      module(
        "core-m11",
        "react-core-m11",
        "11",
        "React Router",
        "Build robust SPA navigation.",
        "1 week",
        "intermediate",
        ["Declare routes", "Use params and layouts", "Simulate route protection"],
        [
          lesson({
            id: "11.1",
            title: "Routes and Pages",
            objective: "Map URLs to page components.",
            concepts: ["BrowserRouter", "Routes", "Route"],
          }),
          lesson({
            id: "11.2",
            title: "Layouts and Nested Routes",
            objective: "Share screen structure across multiple pages.",
            concepts: ["layout", "Outlet", "nested routes"],
          }),
          lesson({
            id: "11.3",
            title: "Params and Query Params",
            objective: "Read dynamic URLs and filter the display.",
            concepts: ["useParams", "search params", "URL state"],
          }),
          lesson({
            id: "11.4",
            title: "Navigation and Protected Routes",
            objective: "Navigate programmatically and block access based on user state.",
            concepts: ["useNavigate", "Navigate", "protected route"],
          }),
        ],
      ),
      module(
        "core-m12",
        "react-core-m12",
        "17",
        "Modern Forms",
        "Build robust, validated, user-friendly forms.",
        "0.5 week",
        "intermediate",
        ["Choose controlled vs library approach", "Validate with a schema", "Show useful errors"],
        [
          lesson({
            id: "12.1",
            title: "Controlled vs Uncontrolled",
            objective: "Pick the strategy suited to the form.",
            concepts: ["controlled", "uncontrolled", "refs"],
          }),
          lesson({
            id: "12.2",
            title: "React Hook Form",
            objective: "Manage a performant form with a declarative API.",
            concepts: ["register", "handleSubmit", "form state"],
          }),
          lesson({
            id: "12.3",
            title: "Zod Validation",
            objective: "Centralize validation rules in a schema.",
            concepts: ["schema", "resolver", "error messages"],
          }),
          lesson({
            id: "12.4",
            title: "Form UX and Accessibility",
            objective: "Make errors visible, understandable, and accessible.",
            concepts: ["label", "aria", "focus", "feedback"],
          }),
        ],
      ),
      module(
        "core-m13",
        "react-core-m13",
        "18",
        "Styling and UI Polish",
        "Style coherent, responsive, accessible components.",
        "1 week",
        "intermediate",
        ["Compare styling strategies", "Build a responsive UI", "Add purposeful animations"],
        [
          lesson({
            id: "13.1",
            title: "Plain CSS and CSS Modules",
            objective: "Scope styles and avoid collisions.",
            concepts: ["CSS", "CSS Modules", "scope"],
          }),
          lesson({
            id: "13.2",
            title: "Tailwind CSS with React",
            objective: "Compose interfaces quickly with utility classes.",
            concepts: ["utility classes", "responsive", "design tokens"],
          }),
          lesson({
            id: "13.3",
            title: "Responsive Design and Visual Accessibility",
            objective: "Adapt the UI to screen sizes and interaction states.",
            concepts: ["breakpoints", "focus states", "contrast"],
          }),
          lesson({
            id: "13.4",
            title: "Restrained Animations",
            objective: "Add feedback without hurting readability.",
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
    title: "TypeScript for React",
    objective: "Secure React code with progressive, useful, and maintainable typing.",
    project: migrationTsProject,
    modules: [
      module(
        "typescript-m14",
        "react-typescript-m14",
        "14",
        "TypeScript Basics",
        "Learn essential types before applying them to React.",
        "1 week",
        "beginner",
        ["Read a type annotation", "Model data", "Use simple generics"],
        [
          lesson({
            id: "14.1",
            title: "Primitive types and annotations",
            objective: "Annotate values and understand inference.",
            concepts: ["string", "number", "boolean", "inference"],
          }),
          lesson({
            id: "14.2",
            title: "Interfaces and type aliases",
            objective: "Model objects with the two main syntaxes.",
            concepts: ["interface", "type alias", "object"],
          }),
          lesson({
            id: "14.3",
            title: "Unions, intersections, and literal types",
            objective: "Limit possible values and compose types.",
            concepts: ["union", "intersection", "literal type"],
          }),
          lesson({
            id: "14.4",
            title: "Generics",
            objective: "Build reusable functions without losing type information.",
            concepts: ["generic", "type parameter", "array"],
          }),
        ],
      ),
      module(
        "typescript-m15",
        "react-typescript-m15",
        "15",
        "Pragmatic Advanced TypeScript",
        "Use advanced tools that deliver real everyday value.",
        "1 week",
        "intermediate",
        ["Narrow types", "Use utility types", "Avoid overuse"],
        [
          lesson({
            id: "15.1",
            title: "Utility types",
            objective: "Use Pick, Omit, Partial, and Record in concrete cases.",
            concepts: ["Pick", "Omit", "Partial", "Record"],
          }),
          lesson({
            id: "15.2",
            title: "Type guards and narrowing",
            objective: "Go from unknown to a reliable type.",
            concepts: ["unknown", "type guard", "narrowing"],
          }),
          lesson({
            id: "15.3",
            title: "Useful conditional and mapped types",
            objective: "Understand advanced patterns without unnecessary complexity.",
            concepts: ["conditional type", "mapped type", "infer"],
          }),
        ],
      ),
      module(
        "typescript-m16",
        "react-typescript-m16",
        "16",
        "React with TypeScript",
        "Type React components, hooks, events, and contexts.",
        "2 weeks",
        "intermediate",
        ["Type a React UI", "Model variant props", "Type hooks"],
        [
          lesson({
            id: "16.1",
            title: "Typed props and components",
            objective: "Type a component's props, children, and callbacks.",
            concepts: ["props", "ReactNode", "callback"],
          }),
          lesson({
            id: "16.2",
            title: "Typed useState, useReducer, and useRef",
            objective: "Avoid never[] states, poorly typed null, and vague reducers.",
            concepts: ["useState generic", "Reducer", "RefObject"],
          }),
          lesson({
            id: "16.3",
            title: "Typed DOM events",
            objective: "Correctly type input, form, and button handlers.",
            concepts: ["ChangeEvent", "FormEvent", "MouseEvent"],
          }),
          lesson({
            id: "16.4",
            title: "Typed custom hooks and contexts",
            objective: "Expose reliable, ergonomic hook APIs.",
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
    title: "Production and Fullstack Ecosystem",
    objective: "Move from a React SPA to a modern production application.",
    project: fullstackProject,
    modules: [
      module(
        "ecosystem-m17",
        "react-ecosystem-m17",
        "17",
        "Next.js App Router",
        "Build modern server/client React applications.",
        "2 weeks",
        "advanced",
        ["Understand App Router", "Distinguish Server and Client Components", "Mutate with Server Actions"],
        [
          lesson({
            id: "17.1",
            title: "App Router and nested layouts",
            objective: "Structure routes with app, page, layout, loading, and error.",
            concepts: ["app directory", "layout", "page", "segment"],
          }),
          lesson({
            id: "17.2",
            title: "Server Components vs Client Components",
            objective: "Decide where a component runs and why.",
            concepts: ["RSC", "use client", "hydration"],
          }),
          lesson({
            id: "17.3",
            title: "Server Actions",
            objective: "Trigger a server mutation from the UI.",
            concepts: ["use server", "form action", "revalidatePath"],
          }),
          lesson({
            id: "17.4",
            title: "Streaming, Suspense, and loading.tsx",
            objective: "Progressively render the UI while data loads.",
            concepts: ["Suspense", "streaming", "loading.tsx"],
          }),
        ],
      ),
      module(
        "ecosystem-m18",
        "react-ecosystem-m18",
        "18",
        "Global and server state",
        "Choose between local state, global state, and server cache.",
        "1 week",
        "advanced",
        ["Avoid unnecessary global state", "Manage remote cache", "Invalidate cleanly"],
        [
          lesson({
            id: "18.1",
            title: "When to use global state",
            objective: "Identify data that deserves a shared store.",
            concepts: ["local state", "global state", "prop drilling"],
          }),
          lesson({
            id: "18.2",
            title: "Zustand and Redux Toolkit",
            objective: "Compare two client store approaches.",
            concepts: ["Zustand", "Redux Toolkit", "actions"],
          }),
          lesson({
            id: "18.3",
            title: "TanStack Query",
            objective: "Treat server data as a synchronized cache.",
            concepts: ["server state", "cache", "invalidation", "optimistic update"],
          }),
        ],
      ),
      module(
        "ecosystem-m19",
        "react-ecosystem-m19",
        "19",
        "Authentication and authorization",
        "Protect routes and render UI based on the user.",
        "1 week",
        "advanced",
        ["Understand sessions and tokens", "Protect routes", "Manage roles"],
        [
          lesson({
            id: "19.1",
            title: "Sessions, JWT, and OAuth",
            objective: "Distinguish modern auth models.",
            concepts: ["session", "JWT", "OAuth"],
          }),
          lesson({
            id: "19.2",
            title: "Auth.js",
            objective: "Understand the role of an auth provider in Next.js.",
            concepts: ["Auth.js", "provider", "callbacks"],
          }),
          lesson({
            id: "19.3",
            title: "Protected routes and middleware",
            objective: "Block access to sensitive pages and actions.",
            concepts: ["middleware", "protected route", "role"],
          }),
          lesson({
            id: "19.4",
            title: "Common security mistakes",
            objective: "Avoid secret leaks and UI-only access checks.",
            concepts: ["secrets", "server-side check", "CSRF"],
          }),
        ],
      ),
      module(
        "ecosystem-m20",
        "react-ecosystem-m20",
        "20",
        "Data, API, and database",
        "Model and persist data in a fullstack application.",
        "1.5 weeks",
        "advanced",
        ["Read a relational model", "Use an ORM", "Avoid query mistakes"],
        [
          lesson({
            id: "20.1",
            title: "PostgreSQL for front-end developers",
            objective: "Understand tables, relations, and indexes useful for web apps.",
            concepts: ["table", "relation", "index"],
          }),
          lesson({
            id: "20.2",
            title: "Prisma",
            objective: "Create a schema, migrate, and query with Prisma.",
            concepts: ["schema", "migration", "client"],
          }),
          lesson({
            id: "20.3",
            title: "Drizzle",
            objective: "Compare a type-safe ORM approach closer to SQL.",
            concepts: ["Drizzle", "SQL-like", "type-safe"],
          }),
          lesson({
            id: "20.4",
            title: "Pagination and N+1 queries",
            objective: "Build performant, predictable lists.",
            concepts: ["pagination", "N+1", "select"],
          }),
        ],
      ),
      module(
        "ecosystem-m21",
        "react-ecosystem-m21",
        "21",
        "React Testing",
        "Verify critical behavior without testing implementation details.",
        "1 week",
        "advanced",
        ["Test components", "Test hooks", "Automate a critical path"],
        [
          lesson({
            id: "21.1",
            title: "Testing pyramid",
            objective: "Choose the right test level based on risk.",
            concepts: ["unit", "integration", "e2e"],
          }),
          lesson({
            id: "21.2",
            title: "Vitest and Testing Library",
            objective: "Test a visible user interaction.",
            concepts: ["Vitest", "Testing Library", "user-event"],
          }),
          lesson({
            id: "21.3",
            title: "Mocks and hook tests",
            objective: "Isolate a dependency without locking in implementation.",
            concepts: ["mock", "custom hook", "fixture"],
          }),
          lesson({
            id: "21.4",
            title: "Playwright and critical paths",
            objective: "Automate end-to-end verification.",
            concepts: ["Playwright", "e2e", "critical path"],
          }),
        ],
      ),
      module(
        "ecosystem-m22",
        "react-ecosystem-m22",
        "22",
        "Performance and SEO",
        "Measure and improve perceived experience and indexability.",
        "1 week",
        "advanced",
        ["Read Core Web Vitals", "Optimize images and bundle", "Produce metadata"],
        [
          lesson({
            id: "22.1",
            title: "Core Web Vitals",
            objective: "Understand LCP, CLS, INP, and their common causes.",
            concepts: ["LCP", "CLS", "INP"],
          }),
          lesson({
            id: "22.2",
            title: "Images and lazy loading",
            objective: "Reduce media cost without hurting UX.",
            concepts: ["next/image", "lazy loading", "sizes"],
          }),
          lesson({
            id: "22.3",
            title: "Bundle splitting and memoization",
            objective: "Limit unnecessary JavaScript and costly re-renders.",
            concepts: ["code splitting", "memo", "profiling"],
          }),
          lesson({
            id: "22.4",
            title: "Metadata and technical SEO",
            objective: "Make pages understandable to search engines and social networks.",
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
    title: "Architecture, quality, and senior level",
    objective: "Design, maintain, and evolve React applications at scale.",
    project: seniorRefactorProject,
    modules: [
      module(
        "expert-m23",
        "react-expert-m23",
        "23",
        "Advanced front-end architecture",
        "Structure a codebase to reduce coupling and help teams move faster.",
        "1.5 weeks",
        "expert",
        ["Split by feature", "Define boundaries", "Organize a monorepo"],
        [
          lesson({
            id: "23.1",
            title: "Feature folders",
            objective: "Group UI, hooks, domain, and API by product capability.",
            concepts: ["feature folder", "cohesion", "coupling"],
          }),
          lesson({
            id: "23.2",
            title: "DDD applied to the front end",
            objective: "Identify domains, boundaries, and business language.",
            concepts: ["bounded context", "domain", "ubiquitous language"],
          }),
          lesson({
            id: "23.3",
            title: "Clean Architecture front-end",
            objective: "Separate domain, application, and infrastructure.",
            concepts: ["dependency rule", "domain", "infrastructure"],
          }),
          lesson({
            id: "23.4",
            title: "Monorepos and design systems",
            objective: "Share packages, UI, and config across multiple apps.",
            concepts: ["Turborepo", "Nx", "design system"],
          }),
        ],
      ),
      module(
        "expert-m24",
        "react-expert-m24",
        "29",
        "DevOps and delivery",
        "Ship more confidently with CI, previews, and team conventions.",
        "1.5 weeks",
        "expert",
        ["Automate checks", "Manage secrets", "Prepare a rollback"],
        [
          lesson({
            id: "24.1",
            title: "GitHub Actions",
            objective: "Run lint, type-check, tests, and build on every PR.",
            concepts: ["CI", "workflow", "matrix"],
          }),
          lesson({
            id: "24.2",
            title: "Docker for Next.js apps",
            objective: "Understand image, build, and runtime.",
            concepts: ["Dockerfile", "image", "runtime"],
          }),
          lesson({
            id: "24.3",
            title: "Deployment and previews",
            objective: "Compare Vercel, Fly.io, and self-hosting based on constraints.",
            concepts: ["preview", "environment", "rollback"],
          }),
          lesson({
            id: "24.4",
            title: "Release strategy",
            objective: "Formalize versioning, changelog, and validation before production.",
            concepts: ["release", "semver", "checklist"],
          }),
        ],
      ),
      module(
        "expert-m25",
        "react-expert-m25",
        "30",
        "React Internals",
        "Understand what React does during render, commit, and hydration.",
        "1 week",
        "expert",
        ["Explain reconciliation", "Diagnose re-renders", "Understand hydration"],
        [
          lesson({
            id: "25.1",
            title: "Reconciliation and Fiber",
            objective: "Connect keys, tree diffing, and the Fiber work unit.",
            concepts: ["reconciliation", "Fiber", "keys"],
          }),
          lesson({
            id: "25.2",
            title: "Render phase and commit phase",
            objective: "Distinguish UI computation from DOM application.",
            concepts: ["render phase", "commit phase", "side effects"],
          }),
          lesson({
            id: "25.3",
            title: "Concurrent rendering",
            objective: "Understand interruption, priorities, and transitions.",
            concepts: ["concurrency", "transition", "scheduler"],
          }),
          lesson({
            id: "25.4",
            title: "Hydration and Server Components",
            objective: "Diagnose mismatches and server/client boundaries.",
            concepts: ["hydration", "mismatch", "RSC"],
          }),
        ],
      ),
      module(
        "expert-m26",
        "react-expert-m26",
        "26",
        "Open source and libraries",
        "Design, publish, and maintain a public API.",
        "1 week",
        "expert",
        ["Publish a package", "Document an API", "Contribute effectively"],
        [
          lesson({
            id: "26.1",
            title: "Typed npm package",
            objective: "Configure build, exports, and type declarations.",
            concepts: ["npm", "exports", "types"],
          }),
          lesson({
            id: "26.2",
            title: "Public API and semver",
            objective: "Stabilize an API and communicate changes.",
            concepts: ["API design", "semver", "breaking change"],
          }),
          lesson({
            id: "26.3",
            title: "Documentation and examples",
            objective: "Make a library easy to adopt without direct support.",
            concepts: ["README", "examples", "DX"],
          }),
          lesson({
            id: "26.4",
            title: "Open source contribution",
            objective: "Find, understand, and submit a useful PR.",
            concepts: ["issue", "fork", "pull request"],
          }),
        ],
      ),
      module(
        "expert-m27",
        "react-expert-m27",
        "27",
        "React and AI",
        "Integrate useful AI features into a React interface.",
        "2 weeks",
        "expert",
        ["Stream a response", "Build an AI UX", "Manage API key security"],
        [
          lesson({
            id: "27.1",
            title: "Vercel AI SDK",
            objective: "Display a streaming LLM response in a React UI.",
            concepts: ["AI SDK", "streaming", "messages"],
          }),
          lesson({
            id: "27.2",
            title: "Product-side RAG",
            objective: "Connect document search, context, and generation.",
            concepts: ["RAG", "embeddings", "retrieval"],
          }),
          lesson({
            id: "27.3",
            title: "AI interface UX",
            objective: "Design feedback, uncertain states, and user control.",
            concepts: ["latency", "feedback", "human-in-the-loop"],
          }),
          lesson({
            id: "27.4",
            title: "Security and evaluation",
            objective: "Protect keys and evaluate response quality.",
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
    title: "Pro transition and capstone project",
    objective: "Prepare learners to ship in conditions close to a product team.",
    project: capstoneProject,
    modules: [
      module(
        "tooling-m28",
        "react-tooling-m28",
        "28",
        "Professional development environment",
        "Set up a stable workstation for coding, debugging, and shipping.",
        "30 min",
        "beginner",
        ["Configure the editor", "Use lint and format", "Read diagnostics"],
        [
          lesson({
            id: "28.1",
            title: "VS Code/Cursor and useful extensions",
            objective: "Set up a lightweight, productive environment.",
            concepts: ["editor", "extensions", "settings"],
          }),
          lesson({
            id: "28.2",
            title: "ESLint, Prettier, and npm scripts",
            objective: "Automate daily quality checks.",
            concepts: ["lint", "format", "npm scripts"],
          }),
          lesson({
            id: "28.3",
            title: "Debugging and diagnostics",
            objective: "Use the terminal, console, and TypeScript errors effectively.",
            concepts: ["debugging", "terminal", "diagnostics"],
          }),
        ],
      ),
      module(
        "tooling-m29",
        "react-tooling-m29",
        "29",
        "Git, GitHub, and collaboration",
        "Produce a readable history and PRs that are easy to review.",
        "40 min",
        "beginner",
        ["Work with branches", "Write useful commits", "Present a PR"],
        [
          lesson({
            id: "29.1",
            title: "Branches and commits",
            objective: "Isolate a change intent in a clean history.",
            concepts: ["branch", "commit", "history"],
          }),
          lesson({
            id: "29.2",
            title: "Pull requests and review",
            objective: "Explain the change and guide validation.",
            concepts: ["pull request", "review", "test plan"],
          }),
          lesson({
            id: "29.3",
            title: "Conflicts and conventions",
            objective: "Resolve a simple conflict and apply a commit message convention.",
            concepts: ["merge conflict", "conventional commits", "workflow"],
          }),
        ],
      ),
      module(
        "tooling-m30",
        "react-tooling-m30",
        "30",
        "Deployment and handoff",
        "Publish a demo and hand off a usable project.",
        "35 min",
        "beginner",
        ["Deploy an app", "Manage environment variables", "Document the launch"],
        [
          lesson({
            id: "30.1",
            title: "Continuous deployment",
            objective: "Connect a repository to a preview provider.",
            concepts: ["Vercel", "preview", "CI/CD"],
          }),
          lesson({
            id: "30.2",
            title: "Environment variables",
            objective: "Separate local, preview, and production configuration.",
            concepts: ["env vars", "secrets", "runtime config"],
          }),
          lesson({
            id: "30.3",
            title: "README and final demo",
            objective: "Let a reviewer run, test, and understand the project.",
            concepts: ["README", "handoff", "demo"],
          }),
        ],
      ),
    ],
  },
];

export const reactProgramEn: CourseProgram = {
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
        "The React Core phase carries the foundations reused across TypeScript, Next.js, tests, performance, and architecture.",
    },
    {
      order: 2,
      target: "react-typescript",
      rationale:
        "Typing should be introduced before production modules to stabilize fullstack examples.",
    },
    {
      order: 3,
      target: "react-ecosystem",
      rationale:
        "The ecosystem phase turns prior learning into a deployable app with auth, data, tests, and performance.",
    },
    {
      order: 4,
      target: "react-expert",
      rationale:
        "Senior content needs richer case studies and can build on earlier projects.",
    },
    {
      order: 5,
      target: "react-tooling",
      rationale:
        "The pro transition wraps up the path and should stay aligned with the capstone.",
    },
  ],
} satisfies CourseProgram;

export type ReactProgramEn = typeof reactProgramEn;
