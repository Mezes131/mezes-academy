import type { Module } from "@/types";
import { basesQuizzes } from "../quizzes";
import { basesExercises } from "../exercises";

export const basesModule02: Module = {
  id: "svc-bases-m02",
  index: "02",
  title: "Git & local project",
  subtitle: "Version cleanly from your first save to Git history",
  duration: "35 min",
  difficulty: "intro",
  objectives: [
    "Use repo, commits, and branches day to day",
    "Keep `.env` separate from versioned code",
    "Run a project's npm scripts",
  ],
  content: [
    { kind: "title", text: "Git: your safety net" },
    {
      kind: "paragraph",
      html: "When AI changes ten files at once, only one thing lets you ask « what changed, exactly? » and « go back »: <strong>Git</strong>. A <em>repo</em> (repository) is the full history of your project. A <strong>commit</strong> is a named snapshot: the state of the project at a moment in time, with a message that explains <em>why</em>. A <strong>branch</strong> is a parallel line of work that you combine when it is ready.",
    },
    {
      kind: "code",
      sample: {
        label: "Le cycle Git de base",
        html: `<span class="cm"># créer le dépôt (une fois)</span>
<span class="fn">git</span> init

<span class="cm"># voir ce qui a changé : TON outil de contrôle du code généré</span>
<span class="fn">git</span> status
<span class="fn">git</span> diff

<span class="cm"># enregistrer un instantané</span>
<span class="fn">git</span> add .
<span class="fn">git</span> commit -m <span class="str">"feat: formulaire de contact avec validation"</span>

<span class="cm"># travailler sur une branche, puis fusionner</span>
<span class="fn">git</span> switch -c feature/paiement
<span class="fn">git</span> switch main
<span class="fn">git</span> merge feature/paiement`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-robot'></i> Golden rule of vibe coding",
        body: "<strong>One commit before each generation, one commit after each validated iteration.</strong> If AI goes off the rails, reviewing the change preview shows the damage and <code>git restore</code> undoes it. Without Git, you are not doing vibe coding, you are playing roulette.",
      },
    },

    { kind: "title", text: ".env: secrets outside the code" },
    {
      kind: "paragraph",
      html: "Every real project has <strong>secrets</strong>: API keys, database passwords, payment tokens. The rule is absolute: <strong>a secret never goes in code, and never in Git</strong>. It lives in a local <code>.env</code> file that <code>.gitignore</code> excludes from the repo. Why « never »? Because a committed secret stays in <em>history</em> even if you delete the file later, and bots that scan GitHub find an exposed key within minutes.",
    },
    {
      kind: "code",
      sample: {
        label: "Le trio .env / .env.example / .gitignore",
        html: `<span class="cm"># .env : les VRAIES valeurs, jamais commité</span>
<span class="prop">STRIPE_SECRET_KEY</span>=<span class="str">sk_live_…vraie clé…</span>
<span class="prop">DATABASE_URL</span>=<span class="str">postgres://user:motdepasse@host/db</span>

<span class="cm"># .env.example : la DOC des variables, commité</span>
<span class="prop">STRIPE_SECRET_KEY</span>=<span class="str">changeme</span>
<span class="prop">DATABASE_URL</span>=<span class="str">postgres://user:password@localhost/db</span>

<span class="cm"># .gitignore : ce que Git doit ignorer</span>
node_modules/
.env`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-key'></i> AI hard-codes keys",
        body: "Documentation examples that AI learned often contain <code>const apiKey = \"sk_live_...\"</code>. It reproduces that pattern as-is. That is the #1 leak in vibe-coded projects. Phase 8 (Security Audit) dedicates a full module to it, with an automatic scanner.",
      },
    },

    { kind: "title", text: "npm: project scripts" },
    {
      kind: "paragraph",
      html: "The <code>package.json</code> file is a JavaScript project's ID card: its <strong>dependencies</strong> (installed in <code>node_modules/</code> via <code>npm install</code>; that is why we do not version it, it can be rebuilt) and its <strong>scripts</strong>. <code>npm run dev</code> is not magic: it runs the command defined under <code>\"dev\"</code>. Always open the <code>package.json</code> of an unknown project: its scripts tell you how to start it, test it, and build it.",
    },
    {
      kind: "code",
      sample: {
        label: "package.json : la section scripts",
        html: `{
  <span class="str">"scripts"</span>: {
    <span class="str">"dev"</span>: <span class="str">"vite"</span>,            <span class="cm">// serveur de développement</span>
    <span class="str">"build"</span>: <span class="str">"vite build"</span>,    <span class="cm">// version optimisée pour la prod</span>
    <span class="str">"lint"</span>: <span class="str">"eslint ."</span>,        <span class="cm">// vérification du code</span>
    <span class="str">"test"</span>: <span class="str">"vitest run"</span>      <span class="cm">// tests automatisés</span>
  }
}`,
      },
    },
    { kind: "highlight", html: "<i class='fa-solid fa-list-check'></i> <strong>Clean project checklist</strong>: <code>git init</code> done · <code>.gitignore</code> covers <code>node_modules/</code> and <code>.env</code> · <code>.env.example</code> documents variables · first commit is readable. That is the goal of the exercise below." },
  ],
  quiz: basesQuizzes.m02,
  exercises: [basesExercises.m02_1],
};
