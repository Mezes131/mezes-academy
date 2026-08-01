import type { Module } from "@/types";
import { ecosystemQuizzes } from "../quizzes";
import { ecosystemExercises } from "../exercises";

export const module26: Module = {
  id: "react-ecosystem-m26",
  index: "26",
  title: "Testing: Vitest, Testing Library, Playwright",
  subtitle: "Unit, integration, and e2e tests",
  duration: "1 week",
  content: [
    {
      kind: "paragraph",
      html: "Testing is not optional when you want to ship to production with confidence. The modern JS ecosystem is particularly well stocked: Vitest for unit tests, React Testing Library for component integration, Playwright for e2e.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "26.1",
          title: "26.1: Test pyramid",
          desc: "Lots of <em>fast</em> unit and integration tests, a few e2e tests on critical paths. Avoid the « all e2e » anti-pattern: slow, flaky, and expensive to maintain.",
          tags: ["unit", "integration", "e2e", "pyramid"],
        },
        {
          id: "26.2",
          title: "26.2: Vitest + React Testing Library",
          desc: "Test a component <strong>the way a user would use it</strong>: find by role/text, click, type, verify what appears. <em>Never</em> test internal state or private methods.",
          tags: ["render", "screen", "userEvent", "findByRole"],
        },
        {
          id: "26.3",
          title: "26.3: Playwright for e2e tests",
          desc: "Simulate complete flows in a real browser (Chromium, Firefox, WebKit). Excellent for smoke tests before deployment and validating critical flows (payment, signup).",
          tags: ["playwright", "expect().toBeVisible()", "trace viewer"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "RTL: testing a form",
        html: `<span class="kw">import</span> { render, screen } <span class="kw">from</span> <span class="str">"@testing-library/react"</span>
<span class="kw">import</span> userEvent <span class="kw">from</span> <span class="str">"@testing-library/user-event"</span>
<span class="kw">import</span> { <span class="fn">SignupForm</span> } <span class="kw">from</span> <span class="str">"./SignupForm"</span>

<span class="fn">test</span>(<span class="str">"shows an error when email is invalid"</span>, <span class="kw">async</span> () =&gt; {
  <span class="kw">const</span> user = userEvent.<span class="fn">setup</span>()
  <span class="fn">render</span>(<span class="jsx">&lt;SignupForm /&gt;</span>)

  <span class="kw">await</span> user.<span class="fn">type</span>(screen.<span class="fn">getByLabelText</span>(/email/i), <span class="str">"not-an-email"</span>)
  <span class="kw">await</span> user.<span class="fn">click</span>(screen.<span class="fn">getByRole</span>(<span class="str">"button"</span>, { name: /sign up/i }))

  <span class="kw">expect</span>(<span class="kw">await</span> screen.<span class="fn">findByText</span>(/invalid email/i)).<span class="fn">toBeInTheDocument</span>()
})`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-circle-check'></i> Golden rule",
        body: "If changing your implementation breaks tests without changing behavior, your tests are <strong>coupled to the implementation</strong>. Refactor them to test via the public UI (roles, text, interactions), not state or internal details.",
      },
    },
  ],
  quiz: ecosystemQuizzes.m26,
  exercises: [ecosystemExercises.m26_1],
};
