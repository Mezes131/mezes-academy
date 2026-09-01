export const VIDEO_KEY_PREFIX = "courses/";

export function isValidVideoKey(key: string): boolean {
  const trimmed = key.trim();
  if (!trimmed.startsWith(VIDEO_KEY_PREFIX)) return false;
  if (trimmed.includes("..")) return false;
  if (trimmed.includes("\\")) return false;
  if (trimmed.includes("//")) return false;
  if (trimmed.length <= VIDEO_KEY_PREFIX.length) return false;
  return true;
}
