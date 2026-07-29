import type { Quiz } from "@/types";

/**
 * All quizzes of the `svc › bases` phase (5 questions per module,
 * per the syllabus), keyed by module slug.
 */
export const basesQuizzes: Record<"m01" | "m02" | "m03", Quiz> = {
  m01: {
    id: "svc-bases-quiz-m01",
    title: "HTTP, HTML, JS: check your basics",
    questions: [
      {
        id: "q1",
        question: "What happens when your browser loads a web page?",
        options: [
          { id: "a", label: "It downloads the entire server locally" },
          { id: "b", label: "It sends an HTTP request and receives a response (status + headers + body)" },
          { id: "c", label: "It opens a permanent connection that never closes" },
          { id: "d", label: "It runs the server's code inside the page" },
        ],
        correct: ["b"],
        explanation:
          "The web works in a request → response cycle: the browser asks for a resource, the server answers with a status, headers, and a body (HTML, JSON, image…).",
      },
      {
        id: "q2",
        question: "A server responds with « 404 ». What does that mean?",
        options: [
          { id: "a", label: "The server crashed" },
          { id: "b", label: "The request succeeded" },
          { id: "c", label: "The requested resource does not exist" },
          { id: "d", label: "You must sign in first" },
        ],
        correct: ["c"],
        explanation:
          "4xx = client-side error. 404 specifically: the requested URL matches no resource. A server crash would be 5xx; denied access would be 401/403.",
      },
      {
        id: "q3",
        question: "Which HTTP method is conventionally used to create a resource?",
        options: [
          { id: "a", label: "GET" },
          { id: "b", label: "POST" },
          { id: "c", label: "DELETE" },
          { id: "d", label: "PATCH" },
        ],
        correct: ["b"],
        explanation:
          "GET reads, POST creates, PATCH/PUT updates, DELETE removes. These conventions let you understand an API without reading its docs line by line.",
      },
      {
        id: "q4",
        question: "Why prefer <code>&lt;button&gt;</code> over a <code>&lt;div onclick&gt;</code>?",
        options: [
          { id: "a", label: "It runs faster" },
          { id: "b", label: "The button is keyboard accessible and announced correctly to screen readers" },
          { id: "c", label: "Divs cannot receive clicks" },
          { id: "d", label: "No difference, it is only a style choice" },
        ],
        correct: ["b"],
        explanation:
          "Semantic HTML gives you accessibility for free: keyboard focus, announced role, native behavior. A clickable div must reimplement all of that by hand.",
      },
      {
        id: "q5",
        question: "What does <code>fetch(url)</code> return in JavaScript?",
        options: [
          { id: "a", label: "The JSON data directly" },
          { id: "b", label: "A promise that resolves to a Response object" },
          { id: "c", label: "The HTML of the current page" },
          { id: "d", label: "Nothing, fetch is synchronous" },
        ],
        correct: ["b"],
        explanation:
          "fetch is async: it returns a promise of Response. You then call response.json() (another promise) to get the data.",
      },
    ],
  },

  m02: {
    id: "svc-bases-quiz-m02",
    title: "Git & local project: check your basics",
    questions: [
      {
        id: "q1",
        question: "What is a Git commit for?",
        options: [
          { id: "a", label: "Sending code to production" },
          { id: "b", label: "Saving a named snapshot of the project you can return to" },
          { id: "c", label: "Compressing project files" },
          { id: "d", label: "Deleting previous history" },
        ],
        correct: ["b"],
        explanation:
          "A commit is a save point of the project state with a message. Commit history lets you understand and undo changes.",
      },
      {
        id: "q2",
        question: "Why should the <code>.env</code> file NEVER be committed?",
        options: [
          { id: "a", label: "It is too large" },
          { id: "b", label: "It contains secrets (API keys, passwords) that would be exposed in history" },
          { id: "c", label: "Git does not support this format" },
          { id: "d", label: "It changes too often" },
        ],
        correct: ["b"],
        explanation:
          "A committed secret stays in Git history even after you delete the file. It is one of the most common leaks, especially with AI-generated code.",
      },
      {
        id: "q3",
        question: "What is the role of the <code>.env.example</code> file?",
        options: [
          { id: "a", label: "It is a backup of the real .env" },
          { id: "b", label: "It documents expected variables without real values, and it is committed" },
          { id: "c", label: "It is used in production instead of .env" },
          { id: "d", label: "It disables environment variables" },
        ],
        correct: ["b"],
        explanation:
          ".env.example lists the keys needed (with fake values) so a new developer knows what to configure. Real values stay outside the repo.",
      },
      {
        id: "q4",
        question: "What must a Node project <code>.gitignore</code> contain at minimum?",
        options: [
          { id: "a", label: "node_modules and .env" },
          { id: "b", label: "package.json and src/" },
          { id: "c", label: "All .js files" },
          { id: "d", label: "The README" },
        ],
        correct: ["a"],
        explanation:
          "node_modules reinstalls with npm install (useless and huge in the repo); .env holds secrets. package.json and src/ are instead the heart of the versioned project.",
      },
      {
        id: "q5",
        question: "What does <code>npm run dev</code> do?",
        options: [
          { id: "a", label: "It is a magic command identical in every project" },
          { id: "b", label: "It runs the « dev » script defined in the scripts section of package.json" },
          { id: "c", label: "It deploys the project" },
          { id: "d", label: "It installs dependencies" },
        ],
        correct: ["b"],
        explanation:
          "npm run <name> runs the matching script from package.json. « dev » usually starts the development server, but the project defines that.",
      },
    ],
  },

  m03: {
    id: "svc-bases-quiz-m03",
    title: "Front ↔ API: check your basics",
    questions: [
      {
        id: "q1",
        question: "An API responds in JSON. What is JSON?",
        options: [
          { id: "a", label: "A programming language" },
          { id: "b", label: "A structured text format (objects, arrays, values) for exchanging data" },
          { id: "c", label: "A network protocol competing with HTTP" },
          { id: "d", label: "A database" },
        ],
        correct: ["b"],
        explanation:
          "JSON (JavaScript Object Notation) is an exchange format: structured text that any language can produce and read.",
      },
      {
        id: "q2",
        question: "<code>fetch</code> does NOT reject its promise on a 500 status. How do you detect the error?",
        options: [
          { id: "a", label: "It is impossible, you must use another library" },
          { id: "b", label: "By checking response.ok (or response.status) before reading the body" },
          { id: "c", label: "By waiting 5 seconds" },
          { id: "d", label: "fetch always rejects on a server error" },
        ],
        correct: ["b"],
        explanation:
          "Classic trap: fetch only rejects on network error. A 404 or 500 « succeeds » technically; you must test response.ok yourself.",
      },
      {
        id: "q3",
        question: "Your front end on localhost:5173 calls an API on another domain and the browser blocks with a CORS error. Who must allow access?",
        options: [
          { id: "a", label: "The API server, via Access-Control-Allow-* headers" },
          { id: "b", label: "The front end, by adding a special header to the request" },
          { id: "c", label: "The browser, in its settings" },
          { id: "d", label: "Nobody, you must change domain" },
        ],
        correct: ["a"],
        explanation:
          "CORS is permission granted by the server: it declares which origins may call it. No front-end header can bypass that (fortunately).",
      },
      {
        id: "q4",
        question: "What are the three states a UI must handle for every network call?",
        options: [
          { id: "a", label: "Open, closed, paused" },
          { id: "b", label: "Loading, error, success" },
          { id: "c", label: "GET, POST, DELETE" },
          { id: "d", label: "Fast, medium, slow" },
        ],
        correct: ["b"],
        explanation:
          "Every request goes through « in progress » then « succeeded » or « failed ». A UI that does not show these three states looks broken as soon as the network slows down.",
      },
      {
        id: "q5",
        question: "Why wrap <code>await response.json()</code> in error handling?",
        options: [
          { id: "a", label: "Superstition, it cannot fail" },
          { id: "b", label: "The body may not be valid JSON (HTML error page, empty response…)" },
          { id: "c", label: "json() is synchronous so it is dangerous" },
          { id: "d", label: "To speed up parsing" },
        ],
        correct: ["b"],
        explanation:
          "An erroring server often returns HTML or an empty body: response.json() then throws an exception you must catch to show a clean message.",
      },
    ],
  },
};
