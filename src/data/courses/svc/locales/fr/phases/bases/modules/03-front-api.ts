import type { Module } from "@/types";
import { basesQuizzes } from "../quizzes";
import { basesExercises } from "../exercises";

export const basesModule03: Module = {
  id: "svc-bases-m03",
  index: "03",
  title: "Front ↔ API",
  subtitle: "Comprendre le dialogue entre interface et serveur",
  duration: "40 min",
  difficulty: "beginner",
  objectives: [
    "Consommer une API JSON depuis le front",
    "Gérer les erreurs HTTP et le CORS basique",
    "Modéliser les états loading / error / success",
  ],
  content: [
    { kind: "title", text: "JSON : la langue commune" },
    {
      kind: "paragraph",
      html: "Le front et le serveur ne partagent ni langage ni mémoire : ils échangent du <strong>texte structuré</strong>, presque toujours du <strong>JSON</strong>. Objets entre accolades, tableaux entre crochets, chaînes, nombres, booléens, <code>null</code> : c'est tout le vocabulaire. Côté JavaScript, <code>response.json()</code> transforme ce texte en objet manipulable, et <code>JSON.stringify()</code> fait l'inverse pour envoyer des données.",
    },
    {
      kind: "code",
      sample: {
        label: "Une réponse d'API typique",
        html: `{
  <span class="str">"id"</span>: <span class="num">17</span>,
  <span class="str">"name"</span>: <span class="str">"Awa Diop"</span>,
  <span class="str">"email"</span>: <span class="str">"awa@example.com"</span>,
  <span class="str">"plan"</span>: <span class="str">"pro"</span>,
  <span class="str">"tags"</span>: [<span class="str">"beta"</span>, <span class="str">"newsletter"</span>],
  <span class="str">"deletedAt"</span>: <span class="kw">null</span>
}`,
      },
    },

    { kind: "title", text: "Les erreurs HTTP, côté front" },
    {
      kind: "paragraph",
      html: "Un appel d'API peut échouer de <strong>trois façons différentes</strong>, et chacune se détecte autrement. 1) Le serveur répond une erreur (<code>4xx</code>/<code>5xx</code>) : <code>fetch</code> « réussit » quand même, c'est <code>response.ok</code> qu'il faut tester. 2) Le réseau tombe (pas de connexion, DNS, timeout) : là, la promesse <em>rejette</em>, d'où le <code>try/catch</code>. 3) Le corps n'est pas le JSON attendu : <code>response.json()</code> lève une exception. Un code robuste couvre les trois. Un code généré à la va-vite n'en couvre souvent aucune.",
    },
    {
      kind: "code",
      sample: {
        label: "Les trois familles d'échec",
        html: `<span class="kw">try</span> {
  <span class="kw">const</span> response = <span class="kw">await</span> <span class="fn">fetch</span>(url);

  <span class="kw">if</span> (!response.<span class="prop">ok</span>) {
    <span class="cm">// ① le serveur a répondu, mais en erreur (404, 500…)</span>
    <span class="fn">showError</span>(<span class="str">\`Erreur \${response.status}\`</span>);
    <span class="kw">return</span>;
  }

  <span class="kw">const</span> data = <span class="kw">await</span> response.<span class="fn">json</span>(); <span class="cm">// ③ peut lever si corps invalide</span>
  <span class="fn">showData</span>(data);
} <span class="kw">catch</span> (error) {
  <span class="cm">// ② panne réseau, ou JSON invalide (③)</span>
  <span class="fn">showError</span>(<span class="str">"Impossible de joindre le serveur."</span>);
}`,
      },
    },

    { kind: "title", text: "CORS : pourquoi le navigateur bloque" },
    {
      kind: "paragraph",
      html: "Ton front tourne sur <code>localhost:5173</code>, l'API sur un autre domaine. Par défaut, le navigateur <strong>interdit</strong> à une page de lire la réponse d'une autre <em>origine</em> (domaine + port + protocole) : c'est la <em>same-origin policy</em>, une protection fondamentale. Le <strong>CORS</strong> est le mécanisme par lequel le <em>serveur</em> déclare « ces origines ont le droit de m'appeler », via des headers <code>Access-Control-Allow-*</code>. Retiens l'essentiel : une erreur CORS se corrige <strong>côté serveur</strong> (ou via un proxy que tu contrôles), jamais en bricolant la requête côté front.",
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-shield-halved'></i> CORS n'est pas ton ennemi",
        body: "Quand l'IA propose de « désactiver CORS » avec <code>Access-Control-Allow-Origin: *</code> sur une API privée, c'est un signal d'alerte : elle ouvre ton API au monde entier pour faire disparaître une erreur. La bonne réponse est de lister explicitement les origines autorisées.",
      },
    },

    { kind: "title", text: "Loading / erreur / succès : le contrat de toute UI" },
    {
      kind: "paragraph",
      html: "Entre le clic et la réponse, il se passe du temps. Une interface honnête raconte ce temps : <strong>loading</strong> (« ça travaille »), puis <strong>succès</strong> (les données) ou <strong>erreur</strong> (un message actionnable, pas un écran figé). Ces trois états ne sont pas un détail cosmétique : c'est le premier critère de la checklist Design que tu appliqueras en phase 9, et l'oubli le plus fréquent du code généré, qui suppose toujours que tout marche du premier coup.",
    },
    { kind: "highlight", html: "<i class='fa-solid fa-spinner'></i> <strong>Loading</strong> : visible dès le départ de la requête, jamais un écran blanc." },
    { kind: "highlight", html: "<i class='fa-solid fa-circle-xmark'></i> <strong>Erreur</strong> : un message compréhensible + un moyen de réessayer." },
    { kind: "highlight", html: "<i class='fa-solid fa-circle-check'></i> <strong>Succès</strong> : les données, et un état « vide » prévu si la liste ne contient rien." },
    {
      kind: "paragraph",
      html: "L'exercice ci-dessous te fait implémenter ce contrat complet sur une vraie API publique. C'est exactement le squelette que tu retrouveras (généré puis audité) dans toutes les features réseau du produit que tu construiras à partir de la phase 4.",
    },
  ],
  quiz: basesQuizzes.m03,
  exercises: [basesExercises.m03_1],
};
