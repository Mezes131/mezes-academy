import type { Module } from "@/types";
import { coreQuizzes } from "../quizzes";
import { coreExercises } from "../exercises";

export const module12: Module = {
  id: "react-core-m12",
  index: "02",
  title: "Composants & Props",
  subtitle: "L'art de décomposer une UI en pièces réutilisables et de les faire communiquer",
  duration: "1 semaine",
  content: [
    {
      kind: "paragraph",
      html: "Les composants sont les LEGO de React. Chaque composant est une fonction JavaScript qui retourne du JSX. Les <strong>props</strong> sont les données qu'un parent transmet à son enfant : elles circulent toujours du parent vers l'enfant (flux unidirectionnel).",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "12.1",
          title: "2.1 : Créer et nommer des composants",
          desc: "Convention : toujours commencer par une majuscule (<code>Button</code> et non <code>button</code>). Chaque composant dans son propre fichier.",
        },
        {
          id: "12.2",
          title: "2.2 : Props : passer des données",
          desc: "Les props sont en lecture seule. Un composant ne peut jamais modifier ses propres props. On peut passer n'importe quel type : string, number, objet, tableau, fonction, composant JSX.",
          tags: ["props", "defaultProps", "PropTypes", "destructuring"],
        },
        {
          id: "12.3",
          title: "2.3 : La prop children",
          desc: "Permet de créer des composants conteneurs flexibles comme des Layouts, Cards, Modals. L'un des patterns les plus puissants de React.",
        },
        {
          id: "12.4",
          title: "2.4 : Composition vs Héritage",
          desc: "React favorise fortement la composition. On ne fait jamais d'héritage de composants. La composition est plus flexible et lisible.",
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

<span class="cm">// Utilisation</span>
<span class="jsx">&lt;Card</span> <span class="prop">title</span>=<span class="str">"Profil"</span> <span class="prop">badge</span>=<span class="str">"Admin"</span><span class="jsx">&gt;</span>
  <span class="jsx">&lt;p&gt;</span>Contenu quelconque ici<span class="jsx">&lt;/p&gt;</span>
<span class="jsx">&lt;/Card&gt;</span>`,
      },
    },
  ],
  quiz: coreQuizzes.m12,
  exercises: [coreExercises.m12_1],
};
