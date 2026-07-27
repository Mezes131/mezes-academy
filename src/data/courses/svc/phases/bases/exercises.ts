import type { CodeExercise } from "@/types";

/** Code exercises for the `svc › bases` phase. */
export const basesExercises: Record<"m02_1" | "m03_1", CodeExercise> = {
  m02_1: {
    id: "svc-bases-ex-m02-1",
    title: "Initialiser un projet propre",
    instructions:
      "Ce projet fuit : une clé d'API est en dur dans <code>index.js</code> et rien n'est ignoré par Git. Complète le <code>.gitignore</code> (ignorer <code>node_modules</code> et <code>.env</code>), documente la variable dans <code>.env.example</code> (sans vraie valeur), et retire la clé du code.",
    hints: [
      "Dans .gitignore, une ligne par motif : node_modules/ puis .env",
      ".env.example liste les clés attendues avec une valeur factice : API_KEY=changeme",
      "Dans index.js, la clé ne doit plus apparaître : lis-la depuis la config (ici, le placeholder CONFIG.API_KEY).",
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
  { name: ".gitignore ignore node_modules", pass: /node_modules/.test(gitignore) },
  { name: ".gitignore ignore .env", pass: /^\\.env\\s*$/m.test(gitignore) },
  { name: ".env.example documente API_KEY sans vraie valeur", pass: /API_KEY\\s*=/.test(envExample) && !/sk_live_/.test(envExample) },
  { name: "plus de clé en dur dans index.js", pass: !/sk_live_/.test(code) },
];
const failures = checks.filter((c) => !c.pass).map((c) => c.name);
return { passed: checks.length - failures.length, total: checks.length, failures };`,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
  },

  m03_1: {
    id: "svc-bases-ex-m03-1",
    title: "Consommer une API avec les trois états",
    instructions:
      "Complète <code>loadUser()</code> pour appeler l'API et gérer les trois états : afficher « Chargement… » pendant la requête, un message d'erreur si <code>response.ok</code> est faux ou si le réseau échoue, et le nom de l'utilisateur en cas de succès.",
    hints: [
      "Affiche l'état loading AVANT le await fetch(...).",
      "fetch ne rejette pas sur un 404/500 : teste response.ok toi-même.",
      "Entoure l'appel d'un try/catch pour les erreurs réseau et le JSON invalide.",
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
  { name: "état loading affiché avant l'appel", pass: /Chargement/i.test(code) },
  { name: "appel fetch(API_URL) avec await", pass: /await\\s+fetch\\s*\\(\\s*API_URL\\s*\\)/.test(code) },
  { name: "vérification de response.ok (ou response.status)", pass: /response\\.(ok|status)/.test(code) },
  { name: "erreurs réseau attrapées (try/catch ou .catch)", pass: /try\\s*\\{[\\s\\S]*catch|\\.catch\\s*\\(/.test(code) },
  { name: "données affichées en cas de succès", pass: /data\\.name|data\\.email/.test(code) },
];
const failures = checks.filter((c) => !c.pass).map((c) => c.name);
return { passed: checks.length - failures.length, total: checks.length, failures };`,
    attemptsBeforeSolution: 3,
  },
};
