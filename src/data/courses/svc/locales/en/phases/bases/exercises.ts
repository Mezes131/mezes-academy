import type { CodeExercise } from "@/types";

/** Code exercises for the `svc › bases` phase. */
export const basesExercises: Record<"m02_1" | "m03_1", CodeExercise> = {
  m02_1: {
    id: "svc-bases-ex-m02-1",
    title: "Set up a clean project",
    instructions:
      "This project leaks: an API key is hard-coded in <code>index.js</code> and nothing is ignored by Git. Complete <code>.gitignore</code> (ignore <code>node_modules</code> and <code>.env</code>), document the variable in <code>.env.example</code> (no real value), and remove the key from the code.",
    hints: [
      "In .gitignore, one pattern per line: node_modules/ then .env",
      ".env.example lists expected keys with a fake value: API_KEY=changeme",
      "In index.js, the key must no longer appear: read it from config (here, the placeholder CONFIG.API_KEY).",
    ],
    template: "vanilla",
    starterFiles: {
      "/index.js": `// Démo : appel d'API avec une clé… collée en dur (mauvaise idée).
const API_KEY = "sk_live_51JxF2eKm9zPqR7Ab";

document.getElementById("app").innerHTML = \`
  <h2>Config du projet</h2>
  <p>Clé utilisée : \${API_KEY ? "définie" : "manquante"}</p>
\`;
`,
      "/.gitignore": `# TODO: ignorer les dépendances installées
# TODO: ignorer le fichier de secrets
`,
      "/.env.example": `# TODO: documenter ici les variables attendues (sans vraie valeur)
`,
    },
    solutionFiles: {
      "/index.js": `// La clé vient de la configuration d'environnement, jamais du code.
// (Dans un vrai projet : process.env / import.meta.env chargé depuis .env)
const CONFIG = { API_KEY: "" }; // injecté au runtime, vide en démo
const API_KEY = CONFIG.API_KEY;

document.getElementById("app").innerHTML = \`
  <h2>Config du projet</h2>
  <p>Clé utilisée : \${API_KEY ? "définie" : "manquante"}</p>
\`;
`,
      "/.gitignore": `node_modules/
.env
`,
      "/.env.example": `# Clé d'API du service de paiement (test) : vraie valeur dans .env, jamais commitée
API_KEY=changeme
`,
    },
    validator: `const gitignore = files["/.gitignore"] ?? "";
const envExample = files["/.env.example"] ?? "";
const code = files["/index.js"] ?? "";

const checks = [
  { name: ".gitignore ignores node_modules", pass: /node_modules/.test(gitignore) },
  { name: ".gitignore ignores .env", pass: /^\\.env\\s*$/m.test(gitignore) },
  { name: ".env.example documents API_KEY without a real value", pass: /API_KEY\\s*=/.test(envExample) && !/sk_live_/.test(envExample) },
  { name: "no hard-coded key left in index.js", pass: !/sk_live_/.test(code) },
];
const failures = checks.filter((c) => !c.pass).map((c) => c.name);
return { passed: checks.length - failures.length, total: checks.length, failures };`,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
  },

  m03_1: {
    id: "svc-bases-ex-m03-1",
    title: "Consume an API with all three states",
    instructions:
      "Complete <code>loadUser()</code> to call the API and handle all three states: show « Chargement… » while the request runs, an error message if <code>response.ok</code> is false or the network fails, and the user's name on success.",
    hints: [
      "Show the loading state BEFORE await fetch(...).",
      "fetch does not reject on 404/500: test response.ok yourself.",
      "Wrap the call in try/catch for network errors and invalid JSON.",
    ],
    template: "vanilla",
    starterFiles: {
      "/index.js": `const API_URL = "https://jsonplaceholder.typicode.com/users/1";
const app = document.getElementById("app");

async function loadUser() {
  // TODO 1 : afficher l'état "Chargement…"
  // TODO 2 : appeler fetch(API_URL) et vérifier response.ok
  // TODO 3 : afficher le nom (data.name) en cas de succès
  // TODO 4 : afficher un message d'erreur sinon (statut ou panne réseau)
}

loadUser();
`,
    },
    solutionFiles: {
      "/index.js": `const API_URL = "https://jsonplaceholder.typicode.com/users/1";
const app = document.getElementById("app");

async function loadUser() {
  app.innerHTML = "<p>Chargement…</p>";
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      app.innerHTML = \`<p>Erreur \${response.status} : impossible de charger l'utilisateur.</p>\`;
      return;
    }
    const data = await response.json();
    app.innerHTML = \`<h2>\${data.name}</h2><p>\${data.email}</p>\`;
  } catch {
    app.innerHTML = "<p>Panne réseau ou réponse invalide. Réessaie.</p>";
  }
}

loadUser();
`,
    },
    validator: `const code = files["/index.js"] ?? "";

const checks = [
  { name: "loading state shown before the call", pass: /Chargement/i.test(code) },
  { name: "fetch(API_URL) called with await", pass: /await\\s+fetch\\s*\\(\\s*API_URL\\s*\\)/.test(code) },
  { name: "response.ok (or response.status) checked", pass: /response\\.(ok|status)/.test(code) },
  { name: "network errors caught (try/catch or .catch)", pass: /try\\s*\\{[\\s\\S]*catch|\\.catch\\s*\\(/.test(code) },
  { name: "data shown on success", pass: /data\\.name|data\\.email/.test(code) },
];
const failures = checks.filter((c) => !c.pass).map((c) => c.name);
return { passed: checks.length - failures.length, total: checks.length, failures };`,
    attemptsBeforeSolution: 3,
  },
};
