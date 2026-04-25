import type { Module } from "@/types";
import { ecosystemQuizzes } from "../quizzes";

export const module25: Module = {
  id: "react-ecosystem-m25",
  index: "04",
  title: "Bases de données & ORM",
  subtitle: "Prisma, Drizzle, PostgreSQL",
  duration: "1.5 semaines",
  content: [
    {
      kind: "paragraph",
      html: "Un développeur React moderne manipule fréquemment la base de données via un ORM type-safe. Bien choisir son outil et comprendre ce qu'il fait <em>en dessous</em> évite des catastrophes de performance et de migration.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "25.1",
          title: "25.1 : PostgreSQL pour les développeurs front-end",
          desc: "Notions essentielles à maîtriser : schéma, clés primaires/étrangères, index, jointures, transactions. Savoir lire un <code>EXPLAIN</code> et reconnaître un index manquant.",
          tags: ["PostgreSQL", "indexes", "EXPLAIN", "transactions"],
        },
        {
          id: "25.2",
          title: "25.2 : Prisma : l'ORM moderne",
          desc: "Schéma déclaratif (<code>schema.prisma</code>), migrations versionnées, client TypeScript auto-généré avec un typage parfait. Idéal pour les projets qui démarrent.",
          tags: ["schema.prisma", "prisma migrate", "prisma generate"],
        },
        {
          id: "25.3",
          title: "25.3 : Drizzle : l'alternative type-safe",
          desc: "Plus proche du SQL, sans runtime abstrait lourd, fantastique en Edge. Pour ceux qui veulent garder un contrôle fin sur les requêtes générées.",
          tags: ["drizzle-orm", "drizzle-kit", "sql-like"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Prisma : schéma et query typée",
        html: `<span class="cm">// prisma/schema.prisma</span>
<span class="kw">model</span> <span class="ty">User</span> {
  id        <span class="ty">Int</span>      <span class="prop">@id @default(autoincrement())</span>
  email     <span class="ty">String</span>   <span class="prop">@unique</span>
  name      <span class="ty">String</span>?
  posts     <span class="ty">Post[]</span>
}

<span class="kw">model</span> <span class="ty">Post</span> {
  id       <span class="ty">Int</span>    <span class="prop">@id @default(autoincrement())</span>
  title    <span class="ty">String</span>
  author   <span class="ty">User</span>   <span class="prop">@relation(fields: [authorId], references: [id])</span>
  authorId <span class="ty">Int</span>
}

<span class="cm">// Usage côté code</span>
<span class="kw">const</span> authors = <span class="kw">await</span> prisma.user.<span class="fn">findMany</span>({
  include: { posts: <span class="kw">true</span> },
  where: { posts: { some: {} } },  <span class="cm">// users with at least one post</span>
})
<span class="cm">// authors is fully typed: User & { posts: Post[] }</span>`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-gauge-high'></i> Piège perf n°1",
        body: "Le <strong>problème N+1</strong> : tu itères sur une liste et fais une requête par élément. Résultat : 1 + N requêtes au lieu d'une seule. Solution avec Prisma : <code>include</code> ou <code>select</code> pour pré-charger les relations. Toujours vérifier la requête SQL générée dans les logs en dev.",
      },
    },
  ],
  quiz: ecosystemQuizzes.m25,
};
