import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocale } from "@/i18n/LocaleProvider";
import { useT } from "@/i18n/useT";
import type { MessageKey } from "@/i18n/useT";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_LOGO_URL,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  normalizeSeoPath,
} from "@/lib/site";

type SeoEntry = {
  title: MessageKey;
  description: MessageKey;
  /** 0–1 sitemap-style hint for robots meta. */
  robots?: string;
};

const ROUTE_SEO: { match: RegExp | string; seo: SeoEntry }[] = [
  {
    match: /^\/$/,
    seo: {
      title: "seo.homeTitle",
      description: "seo.homeDesc",
    },
  },
  {
    match: /^\/about$/,
    seo: {
      title: "academy.about.seoTitle",
      description: "academy.about.seoDesc",
    },
  },
  {
    match: /^\/contact$/,
    seo: {
      title: "academy.contact.seoTitle",
      description: "academy.contact.seoDesc",
    },
  },
  {
    match: /^\/terms$/,
    seo: {
      title: "academy.terms.seoTitle",
      description: "academy.terms.seoDesc",
    },
  },
  {
    match: /^\/privacy$/,
    seo: {
      title: "academy.privacy.seoTitle",
      description: "academy.privacy.seoDesc",
    },
  },
  {
    match: /^\/legal$/,
    seo: {
      title: "academy.legal.seoTitle",
      description: "academy.legal.seoDesc",
    },
  },
  {
    match: /^\/react(\/|$)/,
    seo: {
      title: "seo.reactTitle",
      description: "seo.reactDesc",
    },
  },
  {
    match: /^\/secure-vibe-coding(\/|$)/,
    seo: {
      title: "seo.svcTitle",
      description: "seo.svcDesc",
    },
  },
  {
    match: /^\/auth$/,
    seo: {
      title: "seo.authTitle",
      description: "seo.authDesc",
      robots: "noindex, nofollow",
    },
  },
  {
    match: /^\/reset-password$/,
    seo: {
      title: "seo.resetTitle",
      description: "seo.resetDesc",
      robots: "noindex, nofollow",
    },
  },
  {
    match: /^\/account/,
    seo: {
      title: "seo.accountTitle",
      description: "seo.accountDesc",
      robots: "noindex, nofollow",
    },
  },
];

const DEFAULT_SEO: SeoEntry = {
  title: "seo.homeTitle",
  description: "seo.homeDesc",
};

function resolveSeo(path: string): SeoEntry {
  for (const row of ROUTE_SEO) {
    if (typeof row.match === "string") {
      if (row.match === path) return row.seo;
    } else if (row.match.test(path)) {
      return row.seo;
    }
  }
  return DEFAULT_SEO;
}

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string,
): void {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, hreflang?: string): void {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Keeps title, description, canonical, hreflang and Open Graph in sync
 * with the current route (SPA SEO / GEO).
 */
export function DocumentSeo() {
  const { pathname } = useLocation();
  const { locale } = useLocale();
  const t = useT();

  useEffect(() => {
    const path = normalizeSeoPath(pathname);
    const entry = resolveSeo(path);
    const title = t(entry.title);
    const description = t(entry.description);
    const url = absoluteUrl(path, locale);
    const frUrl = absoluteUrl(path, "fr");
    const enUrl = absoluteUrl(path, "en");

    document.title = title;
    document.documentElement.lang = locale;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", entry.robots ?? "index, follow");
    upsertMeta("name", "author", SITE_NAME);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", DEFAULT_OG_IMAGE);
    upsertMeta("property", "og:image:width", String(DEFAULT_OG_IMAGE_WIDTH));
    upsertMeta("property", "og:image:height", String(DEFAULT_OG_IMAGE_HEIGHT));
    upsertMeta("property", "og:image:type", "image/png");
    upsertMeta("property", "og:locale", locale === "en" ? "en_US" : "fr_FR");
    upsertMeta(
      "property",
      "og:locale:alternate",
      locale === "en" ? "fr_FR" : "en_US",
    );
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", DEFAULT_OG_IMAGE);

    upsertLink("canonical", url);
    upsertLink("alternate", frUrl, "fr");
    upsertLink("alternate", enUrl, "en");
    upsertLink("alternate", frUrl, "x-default");
  }, [pathname, locale, t]);

  return null;
}

/** JSON-LD Organization + WebSite for the document head (once). */
export function SiteJsonLd() {
  useEffect(() => {
    const id = "mezes-site-jsonld";
    if (document.getElementById(id)) return;

    const data = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "Mezes Corporation",
          url: SITE_URL,
          email: "contact@mezescorp.com",
          logo: {
            "@type": "ImageObject",
            url: SITE_LOGO_URL,
          },
          sameAs: [
            "https://www.facebook.com/mezes35",
            "https://www.instagram.com/mezes131",
            "https://www.tiktok.com/@mezes131",
            "https://www.linkedin.com/company/mezes-corporation/",
          ],
        },
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          description:
            "Apprends à construire des solutions performantes : parcours React et Secure Vibe Coding, pratique dans le navigateur.",
          publisher: { "@id": `${SITE_URL}/#organization` },
          inLanguage: ["fr", "en"],
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_URL}/react/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        },
        {
          "@type": "EducationalOrganization",
          "@id": `${SITE_URL}/#academy`,
          name: SITE_NAME,
          url: SITE_URL,
          parentOrganization: { "@id": `${SITE_URL}/#organization` },
          description:
            "Plateforme d'apprentissage : leçons courtes, exercices live, quiz et progression synchronisée.",
        },
      ],
    };

    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);

  return null;
}
