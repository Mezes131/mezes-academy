import type { Module } from "@/types";
import { coreQuizzes } from "../quizzes";
import { coreExercises } from "../exercises";

export const module17: Module = {
  id: "react-core-m17",
  index: "M17",
  title: "Gestion des formulaires",
  subtitle: "React Hook Form + validation Zod pour des formulaires robustes",
  duration: "0.5 semaine",
  content: [
    {
      kind: "paragraph",
      html: "React Hook Form est la bibliothèque standard pour gérer les formulaires en React. Elle est performante (peu de re-renders), facile à utiliser et s'intègre parfaitement avec <strong>Zod</strong> pour la validation.",
    },
    {
      kind: "code",
      sample: {
        label: "React Hook Form + Zod",
        html: `<span class="kw">import</span> { useForm } <span class="kw">from</span> <span class="str">'react-hook-form'</span>
<span class="kw">import</span> { zodResolver } <span class="kw">from</span> <span class="str">'@hookform/resolvers/zod'</span>
<span class="kw">import</span> { z } <span class="kw">from</span> <span class="str">'zod'</span>

<span class="kw">const</span> schema = z.<span class="fn">object</span>({
  email: z.<span class="fn">string</span>().<span class="fn">email</span>(<span class="str">'Email invalide'</span>),
  password: z.<span class="fn">string</span>().<span class="fn">min</span>(<span class="num">8</span>, <span class="str">'8 caractères minimum'</span>),
})

<span class="kw">const</span> <span class="fn">LoginForm</span> = () =&gt; {
  <span class="kw">const</span> { register, handleSubmit, formState: { errors } } =
    <span class="fn">useForm</span>({ resolver: <span class="fn">zodResolver</span>(schema) })

  <span class="kw">return</span> (
    <span class="jsx">&lt;form</span> <span class="prop">onSubmit</span>={<span class="fn">handleSubmit</span>(data =&gt; console.log(data))}<span class="jsx">&gt;</span>
      <span class="jsx">&lt;input</span> {...<span class="fn">register</span>(<span class="str">'email'</span>)} <span class="jsx">/&gt;</span>
      {errors.email &amp;&amp; <span class="jsx">&lt;span&gt;</span>{errors.email.message}<span class="jsx">&lt;/span&gt;</span>}
      <span class="jsx">&lt;button</span> <span class="prop">type</span>=<span class="str">"submit"</span><span class="jsx">&gt;</span>Se connecter<span class="jsx">&lt;/button&gt;</span>
    <span class="jsx">&lt;/form&gt;</span>
  )
}`,
      },
    },
  ],
  quiz: coreQuizzes.m17,
  exercises: [coreExercises.m17_1],
};
