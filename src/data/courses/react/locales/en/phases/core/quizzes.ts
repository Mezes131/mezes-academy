import type { Quiz } from "@/types";

/** All quizzes of the `react › core` phase, keyed by module slug. */
export const coreQuizzes = {
  m11: {
    id: "react-core-quiz-m11",
    title: "Quiz: JSX & Basics",
    questions: [
      {
        id: "q1",
        question: "In JSX, which attribute do you use to apply a CSS class?",
        options: [
          { id: "a", label: "class" },
          { id: "b", label: "className" },
          { id: "c", label: "css" },
          { id: "d", label: "styleClass" },
        ],
        correct: ["b"],
        explanation:
          "In JSX, class is a reserved JavaScript keyword. We use className instead. Similarly, for becomes htmlFor.",
      },
      {
        id: "q2",
        question: "Why is the `key` prop required in a list?",
        options: [
          { id: "a", label: "To secure the application against injections" },
          { id: "b", label: "To let React identify each item and optimize re-rendering" },
          { id: "c", label: "Because the W3C requires it by law" },
        ],
        correct: ["b"],
      },
      {
        id: "q3",
        question: "JSX is…",
        options: [
          { id: "a", label: "HTML interpreted directly by the browser" },
          { id: "b", label: "Syntactic sugar compiled into React.createElement()" },
          { id: "c", label: "A standalone language invented by Facebook" },
        ],
        correct: ["b"],
      },
      {
        id: "q4",
        question: "What expressions can you put inside curly braces {} in JSX?",
        options: [
          { id: "a", label: "Variables only" },
          { id: "b", label: "Any JavaScript expression (variables, calculations, function calls, ternaries)" },
          { id: "c", label: "Statements (if, for, while)" },
        ],
        correct: ["b"],
        explanation:
          "You use expressions (that produce a value), not statements. An if/else won't work—you need a ternary or && instead.",
      },
    ],
  },

  m12: {
    id: "react-core-quiz-m12",
    title: "Quiz: Components & Props",
    questions: [
      {
        id: "q1",
        question: "In which direction do props flow?",
        options: [
          { id: "a", label: "From parent to child (top-down, one-way)" },
          { id: "b", label: "From child to parent" },
          { id: "c", label: "Both ways (two-way binding)" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "Can a component modify its own props?",
        options: [
          { id: "a", label: "Yes, freely" },
          { id: "b", label: "Yes, but only inside useEffect" },
          { id: "c", label: "No, props are read-only (immutable)" },
        ],
        correct: ["c"],
        explanation:
          "Props are immutable by design. If a child needs to communicate with a parent, it does so through a callback passed as a prop.",
      },
      {
        id: "q3",
        question: "What is the special `children` prop for?",
        options: [
          { id: "a", label: "To list the child components a component must render" },
          { id: "b", label: "To receive everything placed between a component's opening and closing tags" },
          { id: "c", label: "To pass state down to sub-components" },
        ],
        correct: ["b"],
      },
      {
        id: "q4",
        question: "What naming convention should you follow for a component?",
        options: [
          { id: "a", label: "Always start with a lowercase letter" },
          { id: "b", label: "Always start with an uppercase letter (PascalCase)" },
          { id: "c", label: "Use kebab-case like in HTML" },
        ],
        correct: ["b"],
        explanation:
          "React tells components apart from HTML elements by casing. <button> is an HTML element; <Button> is a component.",
      },
    ],
  },

  m13: {
    id: "react-core-quiz-m13",
    title: "Quiz: useState & Immutability",
    questions: [
      {
        id: "q1",
        question: "What does useState return?",
        options: [
          { id: "a", label: "An object { value, setValue }" },
          { id: "b", label: "An array [value, setter]" },
          { id: "c", label: "The value directly" },
        ],
        correct: ["b"],
      },
      {
        id: "q2",
        question: "To add an item to an array state `items`, what is the correct approach?",
        options: [
          { id: "a", label: "items.push(newItem) then setItems(items)" },
          { id: "b", label: "setItems([...items, newItem])" },
          { id: "c", label: "items = [...items, newItem]" },
        ],
        correct: ["b"],
        explanation:
          "items.push mutates the existing array: React won't detect a reference change and won't re-render. You need to create a new array.",
      },
      {
        id: "q3",
        question: "What is a controlled component?",
        options: [
          { id: "a", label: "A component that uses a ref to read the input value" },
          { id: "b", label: "An input whose value is driven by React state via value + onChange" },
          { id: "c", label: "A component protected by an authentication system" },
        ],
        correct: ["b"],
      },
      {
        id: "q4",
        question: "What does `setCount(c => c + 1)` do compared to `setCount(count + 1)`?",
        options: [
          { id: "a", label: "They are strictly identical" },
          { id: "b", label: "The functional form is safer when updating multiple times in a row, because it uses the latest value" },
          { id: "c", label: "The functional form is slower" },
        ],
        correct: ["b"],
      },
    ],
  },

  m14: {
    id: "react-core-quiz-m14",
    title: "Quiz: useEffect",
    questions: [
      {
        id: "q1",
        question: "What happens if you pass `[]` as the second argument to useEffect?",
        options: [
          { id: "a", label: "The effect never runs" },
          { id: "b", label: "The effect runs on every render" },
          { id: "c", label: "The effect runs once, when the component mounts" },
        ],
        correct: ["c"],
      },
      {
        id: "q2",
        question: "What is the function returned from useEffect for?",
        options: [
          { id: "a", label: "To provide the effect's return value" },
          { id: "b", label: "It's the cleanup: it runs before the next effect or on unmount" },
          { id: "c", label: "It has no effect—it's optional and useless" },
        ],
        correct: ["b"],
      },
      {
        id: "q3",
        question: "Which mistake typically causes an infinite loop in useEffect?",
        options: [
          { id: "a", label: "Calling setState inside without a dependency array" },
          { id: "b", label: "Using fetch inside" },
          { id: "c", label: "Returning a cleanup function" },
        ],
        correct: ["a"],
        explanation:
          "Without a deps array, useEffect runs on every render. If you call setState, that triggers a new render, which re-triggers the effect, and so on.",
      },
    ],
  },

  m15: {
    id: "react-core-quiz-m15",
    title: "Quiz: Advanced Hooks",
    questions: [
      {
        id: "q1",
        question: "Which hook should you use to share data with all sub-components without passing props?",
        options: [
          { id: "a", label: "useRef" },
          { id: "b", label: "useContext" },
          { id: "c", label: "useMemo" },
        ],
        correct: ["b"],
      },
      {
        id: "q2",
        question: "What rule governs the name of a custom hook?",
        options: [
          { id: "a", label: "It must start with `use`" },
          { id: "b", label: "It must end with `Hook`" },
          { id: "c", label: "It must be in UPPER_CASE" },
        ],
        correct: ["a"],
        explanation:
          "The convention (and ESLint rule): a hook is named useSomething. That's how React knows you're following the Rules of Hooks.",
      },
      {
        id: "q3",
        question: "What is useRef for?",
        options: [
          { id: "a", label: "To access the DOM or store a mutable value without triggering a re-render" },
          { id: "b", label: "To reference child components so you can remove them" },
          { id: "c", label: "To memoize heavy functions" },
        ],
        correct: ["a"],
      },
      {
        id: "q4",
        question: "True or false: you should use useMemo/useCallback everywhere by default.",
        options: [
          { id: "a", label: "True, it's always faster" },
          { id: "b", label: "False: premature optimization adds complexity and rarely helps" },
        ],
        correct: ["b"],
      },
    ],
  },

  m16: {
    id: "react-core-quiz-m16",
    title: "Quiz: React Router",
    questions: [
      {
        id: "q1",
        question: "Why use <Link> instead of a regular <a> tag?",
        options: [
          { id: "a", label: "<Link> doesn't reload the page; it uses the History API to keep the SPA responsive" },
          { id: "b", label: "<a> doesn't work in React" },
          { id: "c", label: "<Link> is legally required" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "How do you get the :id parameter from a /users/:id route?",
        options: [
          { id: "a", label: "useLocation().id" },
          { id: "b", label: "const { id } = useParams()" },
          { id: "c", label: "window.location.params.id" },
        ],
        correct: ["b"],
      },
      {
        id: "q3",
        question: "What does <Navigate to=\"/login\" /> do?",
        options: [
          { id: "a", label: "It displays a clickable link to /login" },
          { id: "b", label: "It immediately redirects to /login when the component renders" },
          { id: "c", label: "It records the route in history without navigating" },
        ],
        correct: ["b"],
      },
      {
        id: "q4",
        question:
          "Classic gotcha: you render <UserProfile /> on /users/:id. When you go from /users/1 to /users/2, the previous profile data stays on screen. What's the idiomatic fix?",
        options: [
          { id: "a", label: "Add a useEffect that calls window.location.reload()" },
          { id: "b", label: "Pass the `key={id}` prop to the component to force a remount when id changes" },
          { id: "c", label: "Wrap the component in React.memo" },
        ],
        correct: ["b"],
        explanation:
          "React Router doesn't unmount the component when only a URL param changes: internal state persists. A `key` based on id forces React to remount with fresh state.",
      },
    ],
  },

  m17: {
    id: "react-core-quiz-m17",
    title: "Quiz: Forms",
    questions: [
      {
        id: "q1",
        question: "Why is React Hook Form usually preferred over manually managing each field with useState?",
        options: [
          { id: "a", label: "It avoids unnecessary re-renders on every keystroke" },
          { id: "b", label: "It's required to use Zod" },
          { id: "c", label: "It automatically replaces TypeScript" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "What does `zodResolver(schema)` do in React Hook Form?",
        options: [
          { id: "a", label: "It connects the Zod validation schema to the form to validate data before submit" },
          { id: "b", label: "It sends the data to the server" },
          { id: "c", label: "It converts the data to JSON" },
        ],
        correct: ["a"],
      },
    ],
  },

  m18: {
    id: "react-core-quiz-m18",
    title: "Quiz: Styling",
    questions: [
      {
        id: "q1",
        question: "What is the main advantage of CSS Modules?",
        options: [
          { id: "a", label: "They are faster than regular CSS" },
          { id: "b", label: "Automatic class scoping prevents naming conflicts" },
          { id: "c", label: "They replace JavaScript" },
        ],
        correct: ["b"],
      },
      {
        id: "q2",
        question: "What does \"utility-first\" mean in Tailwind CSS?",
        options: [
          { id: "a", label: "You compose utility classes (p-4, flex, text-blue-500) directly in JSX" },
          { id: "b", label: "You must always start by writing custom utilities" },
          { id: "c", label: "Tailwind replaces Bootstrap" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "What is Framer Motion's <AnimatePresence> for?",
        options: [
          { id: "a", label: "To animate components as they unmount (exit animation)" },
          { id: "b", label: "To detect whether the user is online" },
          { id: "c", label: "To list all animations currently running" },
        ],
        correct: ["a"],
        explanation:
          "Without AnimatePresence, components leaving the DOM disappear instantly. With it, the `exit` animation can play before unmount.",
      },
    ],
  },
} satisfies Record<string, Quiz>;
