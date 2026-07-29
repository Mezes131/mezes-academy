import type { Module } from "@/types";
import { basesQuizzes } from "../quizzes";
import { basesExercises } from "../exercises";

export const basesModule02: Module = {
  id: "svc-bases-m02",
  index: "02",
  title: "Git & projet local",
  subtitle: "Versionner proprement dès le premier commit",
  duration: "35 min",
  difficulty: "intro",
  objectives: [
    "Utiliser repo, commits et branches au quotidien",
    "Séparer `.env` du code versionné",
    "Lancer les scripts npm d'un projet",
  ],
  content: [
    { kind: "title", text: "Git : ton filet de sécurité" },
    {
      kind: "paragraph",
      html: "Quand une IA modifie dix fichiers d'un coup, une seule chose te permet de dire « qu'est-ce qui a changé, exactement ? » et « reviens en arrière » : <strong>Git</strong>. Un <em>repo</em> (dépôt) est l'historique complet de ton projet. Un <strong>commit</strong> est un instantané nommé : l'état du projet à un moment donné, avec un message qui explique le <em>pourquoi</em>. Une <strong>branche</strong> est une ligne de travail parallèle, qu'on fusionne quand elle est prête.",
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
        title: "<i class='fa-solid fa-robot'></i> Règle d'or du vibe coding",
        body: "<strong>Un commit avant chaque génération, un commit après chaque itération validée.</strong> Si l'IA part dans le décor, <code>git diff</code> te montre les dégâts et <code>git restore</code> les annule. Sans Git, tu ne fais pas du vibe coding, tu joues à la roulette.",
      },
    },

    { kind: "title", text: ".env : les secrets hors du code" },
    {
      kind: "paragraph",
      html: "Tout projet réel a des <strong>secrets</strong> : clés d'API, mots de passe de base de données, tokens de paiement. La règle est absolue : <strong>un secret ne va jamais dans le code, ni dans Git</strong>. Il vit dans un fichier <code>.env</code> local, que le <code>.gitignore</code> exclut du dépôt. Pourquoi « jamais » ? Parce qu'un secret commité reste dans l'<em>historique</em> même si tu supprimes le fichier ensuite, et les robots qui scannent GitHub trouvent une clé exposée en quelques minutes.",
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
        title: "<i class='fa-solid fa-key'></i> L'IA colle des clés en dur",
        body: "Les exemples de doc que l'IA a appris contiennent souvent <code>const apiKey = \"sk_live_...\"</code>. Elle reproduit ce motif tel quel. C'est la fuite n°1 des projets vibe-codés. La phase 8 (Audit Sécurité) y consacre un module entier, avec scanner automatique.",
      },
    },

    { kind: "title", text: "npm : les scripts du projet" },
    {
      kind: "paragraph",
      html: "Le fichier <code>package.json</code> est la carte d'identité d'un projet JavaScript : ses <strong>dépendances</strong> (installées dans <code>node_modules/</code> via <code>npm install</code> ; voilà pourquoi on ne le versionne pas, il se reconstruit) et ses <strong>scripts</strong>. <code>npm run dev</code> n'a rien de magique : il exécute la commande définie sous <code>\"dev\"</code>. Ouvre toujours le <code>package.json</code> d'un projet inconnu : ses scripts te disent comment le lancer, le tester et le construire.",
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
    { kind: "highlight", html: "<i class='fa-solid fa-list-check'></i> <strong>Checklist projet propre</strong> : <code>git init</code> fait · <code>.gitignore</code> couvre <code>node_modules/</code> et <code>.env</code> · <code>.env.example</code> documente les variables · premier commit lisible. C'est l'objet de l'exercice ci-dessous." },
  ],
  quiz: basesQuizzes.m02,
  exercises: [basesExercises.m02_1],
};
