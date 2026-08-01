import type { Locale } from "./types";

/** Detect locale from a location pathname. */
export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}

/** Remove leading `/en` prefix; FR paths are returned unchanged. */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) {
    const rest = pathname.slice(3);
    return rest.length > 0 ? rest : "/";
  }
  return pathname;
}

/**
 * Prefix a root-relative path for the given locale.
 * Supports `?query` and `#hash` (including `/#catalog` style).
 */
export function localePath(to: string, locale: Locale): string {
  if (to.startsWith("http://") || to.startsWith("https://") || to.startsWith("mailto:")) {
    return to;
  }

  // Already locale-prefixed
  if (to === "/en" || to.startsWith("/en/") || to.startsWith("/en?") || to.startsWith("/en#")) {
    return locale === "en" ? to : stripLocaleFromTo(to);
  }

  if (locale === "fr") return to;

  // `/#catalog` → `/en#catalog`
  if (to.startsWith("/#")) return `/en${to.slice(1)}`;
  if (to === "/") return "/en";
  if (to.startsWith("/?")) return `/en${to.slice(1)}`;
  if (to.startsWith("/")) return `/en${to}`;
  return `/en/${to}`;
}

function stripLocaleFromTo(to: string): string {
  if (to === "/en") return "/";
  if (to.startsWith("/en/")) return to.slice(3) || "/";
  if (to.startsWith("/en?")) return `/${to.slice(3)}`;
  if (to.startsWith("/en#")) return `/${to.slice(3)}`;
  return to;
}

/** Build the equivalent path in another locale (pathname + search + hash). */
export function switchLocalePath(
  pathname: string,
  search: string,
  hash: string,
  next: Locale,
): string {
  const bare = stripLocalePrefix(pathname);
  const withSearch = `${bare}${search}`;
  const prefixed = localePath(withSearch, next);
  // localePath may already include a hash if `to` had one; append location hash otherwise
  if (hash && !prefixed.includes("#")) return `${prefixed}${hash}`;
  return prefixed;
}
