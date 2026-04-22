import type { Module } from "@/types";
import { ecosystemQuizzes } from "../quizzes";

export const module27: Module = {
  id: "react-ecosystem-m27",
  index: "M27",
  title: "Performance & SEO",
  subtitle: "Core Web Vitals, images, lazy loading, metadata",
  duration: "1 semaine",
  content: [
    {
      kind: "paragraph",
      html: "La performance n'est pas une option en 2026 : Google pénalise les sites lents et les utilisateurs abandonnent en dessous de 3 s. Bonne nouvelle : Next.js offre par défaut d'excellents outils d'optimisation, encore faut-il savoir les utiliser.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "27.1",
          title: "27.1 : Core Web Vitals",
          desc: "<strong>LCP</strong> (Largest Contentful Paint) < 2.5s ; <strong>INP</strong> (Interaction to Next Paint) < 200ms ; <strong>CLS</strong> (Cumulative Layout Shift) < 0.1. Les 3 mesures qui définissent une bonne expérience (et ton SEO).",
          tags: ["LCP", "INP", "CLS", "FCP"],
        },
        {
          id: "27.2",
          title: "27.2 : next/image & lazy loading",
          desc: "Optimisation automatique : formats modernes (AVIF/WebP), responsive avec <code>sizes</code>, dimensions fixes pour éviter le CLS, lazy-loading natif. L'une des optimisations à plus gros ROI disponible gratuitement.",
          tags: ["next/image", "sizes", "priority", "AVIF"],
        },
        {
          id: "27.3",
          title: "27.3 : Metadata API et SEO technique",
          desc: "En App Router, on exporte un objet <code>metadata</code> (titre, description, OpenGraph, robots) depuis <code>page.tsx</code>/<code>layout.tsx</code>. Sitemap et robots.txt aussi générables en code.",
          tags: ["metadata export", "generateMetadata", "openGraph", "sitemap.ts"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Metadata dynamique + next/image",
        html: `<span class="cm">// app/products/[slug]/page.tsx</span>
<span class="kw">import</span> Image <span class="kw">from</span> <span class="str">"next/image"</span>
<span class="kw">import</span> { getProduct } <span class="kw">from</span> <span class="str">"@/lib/products"</span>

<span class="kw">export async function</span> <span class="fn">generateMetadata</span>({ params }) {
  <span class="kw">const</span> p = <span class="kw">await</span> <span class="fn">getProduct</span>(params.slug)
  <span class="kw">return</span> {
    title: <span class="str">\`\${p.name} — MyShop\`</span>,
    description: p.summary,
    openGraph: { images: [p.image] },
  }
}

<span class="kw">export default async function</span> <span class="fn">Page</span>({ params }) {
  <span class="kw">const</span> p = <span class="kw">await</span> <span class="fn">getProduct</span>(params.slug)
  <span class="kw">return</span> (
    <span class="jsx">&lt;Image</span>
      <span class="prop">src</span>={p.image}
      <span class="prop">alt</span>={p.name}
      <span class="prop">width</span>={<span class="num">800</span>} <span class="prop">height</span>={<span class="num">600</span>}
      <span class="prop">priority</span>  <span class="cm">// LCP image, preload it</span>
    <span class="jsx">/&gt;</span>
  )
}`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-gauge-high'></i> Checklist perf minimale",
        body: "1) <code>next/image</code> pour TOUTES les images avec <code>width</code>/<code>height</code>. 2) <code>priority</code> sur l'image LCP. 3) <code>next/font</code> pour les polices (préchargement, pas de FOUT). 4) Minimiser le JS client avec un maximum de Server Components. 5) Tester avec Lighthouse CI dans le pipeline CI/CD.",
      },
    },
  ],
  quiz: ecosystemQuizzes.m27,
};
