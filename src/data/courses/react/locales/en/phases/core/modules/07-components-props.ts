import type { Module } from "@/types";
import { coreQuizzes } from "../quizzes";
import { coreExercises } from "../exercises";

export const module12: Module = {
  id: "react-core-m07",
  index: "07",
  title: "Components & Props",
  subtitle: "The art of splitting a UI into reusable pieces and making them talk",
  duration: "1 week",
  content: [
    {
      kind: "paragraph",
      html: "Components are React's LEGO bricks. Each component is a JavaScript function that returns JSX. <strong>Props</strong> are the data a parent passes to its child: they always flow from parent to child (unidirectional data flow).",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "12.1",
          title: "2.1: Creating and naming components",
          desc: "Convention: always start with a capital letter (<code>Button</code>, not <code>button</code>). One component per file.",
        },
        {
          id: "12.2",
          title: "2.2: Props, passing data",
          desc: "Props are read-only. A component must never mutate its own props. You can pass any type: string, number, object, array, function, JSX component.",
          tags: ["props", "defaultProps", "PropTypes", "destructuring"],
        },
        {
          id: "12.3",
          title: "2.3: The children prop",
          desc: "Lets you build flexible container components like Layouts, Cards, Modals. One of React's most powerful patterns.",
        },
        {
          id: "12.4",
          title: "2.4: Composition vs inheritance",
          desc: "React strongly favors composition. You never inherit components. Composition is more flexible and readable.",
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Props & Children",
        html: `<span class="cm">// Reusable Card component with children</span>
<span class="kw">const</span> <span class="fn">Card</span> = ({ <span class="prop">title</span>, <span class="prop">badge</span>, <span class="prop">children</span>, <span class="prop">onClick</span> }) => (
  <span class="jsx">&lt;div</span> <span class="prop">className</span>=<span class="str">"card"</span> <span class="prop">onClick</span>={onClick}<span class="jsx">&gt;</span>
    <span class="jsx">&lt;div</span> <span class="prop">className</span>=<span class="str">"card-header"</span><span class="jsx">&gt;</span>
      <span class="jsx">&lt;h3&gt;</span>{title}<span class="jsx">&lt;/h3&gt;</span>
      {badge &amp;&amp; <span class="jsx">&lt;span</span> <span class="prop">className</span>=<span class="str">"badge"</span><span class="jsx">&gt;</span>{badge}<span class="jsx">&lt;/span&gt;</span>}
    <span class="jsx">&lt;/div&gt;</span>
    <span class="jsx">&lt;div</span> <span class="prop">className</span>=<span class="str">"card-body"</span><span class="jsx">&gt;</span>{children}<span class="jsx">&lt;/div&gt;</span>
  <span class="jsx">&lt;/div&gt;</span>
)

<span class="cm">// Usage</span>
<span class="jsx">&lt;Card</span> <span class="prop">title</span>=<span class="str">"Profile"</span> <span class="prop">badge</span>=<span class="str">"Admin"</span><span class="jsx">&gt;</span>
  <span class="jsx">&lt;p&gt;</span>Any content here<span class="jsx">&lt;/p&gt;</span>
<span class="jsx">&lt;/Card&gt;</span>`,
      },
    },
  ],
  quiz: coreQuizzes.m12,
  exercises: [coreExercises.m12_1],
};
