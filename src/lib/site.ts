/** Production origin for absolute SEO / Open Graph URLs. */
export const SITE_URL = "https://academy.mezescorp.com";

export const SITE_NAME = "Mezes Academy";

export const SITE_ORG = "Mezes Corporation";

/** Default Open Graph / Twitter image (1200×630). */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/academy.png`;

export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

/** Square mark for Organization JSON-LD / favicons. */
export const SITE_LOGO_URL = `${SITE_URL}/favicon.png`;

export const CONTACT_EMAIL = "contact@mezescorp.com";

/** Strip locale prefix and trailing slash for route matching. */
export function normalizeSeoPath(pathname: string): string {
  let path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/en") return "/";
  if (path.startsWith("/en/")) path = path.slice(3) || "/";
  return path;
}

/** Absolute URL for a locale + path (`/` or `/about`, etc.). */
export function absoluteUrl(path: string, locale: "fr" | "en" = "fr"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") {
    if (clean === "/") return `${SITE_URL}/en`;
    return `${SITE_URL}/en${clean}`;
  }
  return clean === "/" ? `${SITE_URL}/` : `${SITE_URL}${clean}`;
}
