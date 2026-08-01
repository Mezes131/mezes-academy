import type { Module } from "@/types";
import { ecosystemQuizzes } from "../quizzes";

export const module27: Module = {
  id: "react-ecosystem-m27",
  index: "27",
  title: "Performance & SEO",
  subtitle: "Core Web Vitals, images, lazy loading, metadata",
  duration: "1 week",
  content: [
    {
      kind: "paragraph",
      html: "Performance is not optional in 2026: Google penalizes slow sites and users leave below 3 s. Good news: Next.js provides excellent optimization tools by default, you just need to know how to use them.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "27.1",
          title: "27.1: Core Web Vitals",
          desc: "<strong>LCP</strong> (Largest Contentful Paint) < 2.5s ; <strong>INP</strong> (Interaction to Next Paint) < 200ms ; <strong>CLS</strong> (Cumulative Layout Shift) < 0.1. The 3 metrics that define a good experience (and your SEO).",
          tags: ["LCP", "INP", "CLS", "FCP"],
        },
        {
          id: "27.2",
          title: "27.2: next/image & lazy loading",
          desc: "Automatic optimization: modern formats (AVIF/WebP), responsive with <code>sizes</code>, fixed dimensions to avoid CLS, native lazy-loading. One of the highest-ROI optimizations available for free.",
          tags: ["next/image", "sizes", "priority", "AVIF"],
        },
        {
          id: "27.3",
          title: "27.3: Metadata API and technical SEO",
          desc: "In App Router, export a <code>metadata</code> object (title, description, OpenGraph, robots) from <code>page.tsx</code>/<code>layout.tsx</code>. Sitemap and robots.txt can also be generated in code.",
          tags: ["metadata export", "generateMetadata", "openGraph", "sitemap.ts"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Dynamic metadata + next/image",
        html: `<span class="cm">// app/products/[slug]/page.tsx</span>
<span class="kw">import</span> Image <span class="kw">from</span> <span class="str">"next/image"</span>
<span class="kw">import</span> { getProduct } <span class="kw">from</span> <span class="str">"@/lib/products"</span>

<span class="kw">export async function</span> <span class="fn">generateMetadata</span>({ params }) {
  <span class="kw">const</span> p = <span class="kw">await</span> <span class="fn">getProduct</span>(params.slug)
  <span class="kw">return</span> {
    title: <span class="str">\`\${p.name} : MyShop\`</span>,
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
        title: "<i class='fa-solid fa-gauge-high'></i> Minimal perf checklist",
        body: "1) <code>next/image</code> for ALL images with <code>width</code>/<code>height</code>. 2) <code>priority</code> on the LCP image. 3) <code>next/font</code> for fonts (preload, no FOUT). 4) Minimize client JS with as many Server Components as possible. 5) Test with Lighthouse CI in your CI/CD pipeline.",
      },
    },
  ],
  quiz: ecosystemQuizzes.m27,
};
