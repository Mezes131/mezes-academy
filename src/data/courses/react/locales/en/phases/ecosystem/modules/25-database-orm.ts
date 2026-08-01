import type { Module } from "@/types";
import { ecosystemQuizzes } from "../quizzes";

export const module25: Module = {
  id: "react-ecosystem-m25",
  index: "25",
  title: "Databases & ORM",
  subtitle: "Prisma, Drizzle, PostgreSQL",
  duration: "1.5 weeks",
  content: [
    {
      kind: "paragraph",
      html: "A modern React developer frequently works with the database through a type-safe ORM. Choosing the right tool and understanding what it does <em>under the hood</em> avoids performance and migration disasters.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "25.1",
          title: "25.1: PostgreSQL for front-end developers",
          desc: "Essential concepts to master: schema, primary/foreign keys, indexes, joins, transactions. Know how to read an <code>EXPLAIN</code> and spot a missing index.",
          tags: ["PostgreSQL", "indexes", "EXPLAIN", "transactions"],
        },
        {
          id: "25.2",
          title: "25.2: Prisma — the modern ORM",
          desc: "Declarative schema (<code>schema.prisma</code>), versioned migrations, auto-generated TypeScript client with perfect typing. Ideal for projects getting started.",
          tags: ["schema.prisma", "prisma migrate", "prisma generate"],
        },
        {
          id: "25.3",
          title: "25.3: Drizzle — the type-safe alternative",
          desc: "Closer to SQL, without a heavy abstract runtime, fantastic on the Edge. For those who want fine control over generated queries.",
          tags: ["drizzle-orm", "drizzle-kit", "sql-like"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Prisma: schema and typed query",
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

<span class="cm">// Usage in code</span>
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
        title: "<i class='fa-solid fa-gauge-high'></i> Performance pitfall #1",
        body: "The <strong>N+1 problem</strong>: you iterate over a list and run a query per item. Result: 1 + N queries instead of one. Solution with Prisma: use <code>include</code> or <code>select</code> to preload relations. Always check the generated SQL in dev logs.",
      },
    },
  ],
  quiz: ecosystemQuizzes.m25,
};
