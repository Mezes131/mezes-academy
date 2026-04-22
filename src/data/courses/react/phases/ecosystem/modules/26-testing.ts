import type { Module } from "@/types";
import { ecosystemQuizzes } from "../quizzes";
import { ecosystemExercises } from "../exercises";

export const module26: Module = {
  id: "react-ecosystem-m26",
  index: "M26",
  title: "Tests : Vitest, Testing Library, Playwright",
  subtitle: "Tests unitaires, d'intégration et e2e",
  duration: "1 semaine",
  content: [
    {
      kind: "paragraph",
      html: "Tester n'est pas une option quand on veut livrer en production avec sérénité. L'écosystème JS moderne est particulièrement bien fourni : Vitest pour l'unitaire, React Testing Library pour l'intégration composant, Playwright pour le e2e.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "26.1",
          title: "26.1 : Pyramide des tests",
          desc: "Beaucoup de tests unitaires et d'intégration <em>rapides</em>, quelques tests e2e sur les parcours critiques. Éviter l'anti-pattern « tout e2e » : lent, flaky et coûteux à maintenir.",
          tags: ["unit", "integration", "e2e", "pyramid"],
        },
        {
          id: "26.2",
          title: "26.2 : Vitest + React Testing Library",
          desc: "Tester un composant <strong>comme un utilisateur l'utiliserait</strong> : rechercher par rôle/texte, cliquer, taper, vérifier ce qui s'affiche. Ne <em>jamais</em> tester le state interne ou les méthodes privées.",
          tags: ["render", "screen", "userEvent", "findByRole"],
        },
        {
          id: "26.3",
          title: "26.3 : Playwright pour les tests e2e",
          desc: "Simuler des parcours complets dans un vrai navigateur (Chromium, Firefox, WebKit). Excellent pour le smoke-test avant déploiement et pour valider les flows critiques (paiement, inscription).",
          tags: ["playwright", "expect().toBeVisible()", "trace viewer"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "RTL : test d'un formulaire",
        html: `<span class="kw">import</span> { render, screen } <span class="kw">from</span> <span class="str">"@testing-library/react"</span>
<span class="kw">import</span> userEvent <span class="kw">from</span> <span class="str">"@testing-library/user-event"</span>
<span class="kw">import</span> { <span class="fn">SignupForm</span> } <span class="kw">from</span> <span class="str">"./SignupForm"</span>

<span class="fn">test</span>(<span class="str">"shows an error when email is invalid"</span>, <span class="kw">async</span> () =&gt; {
  <span class="kw">const</span> user = userEvent.<span class="fn">setup</span>()
  <span class="fn">render</span>(<span class="jsx">&lt;SignupForm /&gt;</span>)

  <span class="kw">await</span> user.<span class="fn">type</span>(screen.<span class="fn">getByLabelText</span>(/email/i), <span class="str">"not-an-email"</span>)
  <span class="kw">await</span> user.<span class="fn">click</span>(screen.<span class="fn">getByRole</span>(<span class="str">"button"</span>, { name: /inscription/i }))

  <span class="kw">expect</span>(<span class="kw">await</span> screen.<span class="fn">findByText</span>(/email invalide/i)).<span class="fn">toBeInTheDocument</span>()
})`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-circle-check'></i> Règle d'or",
        body: "Si le changement de ton implémentation casse tes tests sans que le comportement ne change, c'est que tes tests sont <strong>couplés à l'implémentation</strong>. Refactore-les pour tester via l'UI publique (rôles, textes, interactions), pas via le state ou les détails internes.",
      },
    },
  ],
  quiz: ecosystemQuizzes.m26,
  exercises: [ecosystemExercises.m26_1],
};
