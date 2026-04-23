/**
 * Shared helpers around user identity (initials, URL validation, display name).
 * Used by both the account page and the compact user menu.
 */

export function getInitials(name: string, email: string): string {
  const source = name.trim() || email;
  if (!source) return "?";

  const parts = source
    .replace(/@.*/, "")
    .split(/[\s._-]+/)
    .filter(Boolean);

  if (parts.length === 0) return source.slice(0, 1).toUpperCase();
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getDisplayName(
  fullName: string | null | undefined,
  email: string | null | undefined,
  fallback = "Mon compte",
): string {
  const trimmed = fullName?.trim();
  if (trimmed) return trimmed;
  const handle = email?.split("@")[0];
  if (handle) return handle;
  return fallback;
}

/**
 * Basic URL sanity check for public profile links.
 * Empty string is treated as valid (= no link).
 */
export function isPlausibleUrl(raw: string): boolean {
  const value = raw.trim();
  if (!value) return true;
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
