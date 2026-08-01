import type { MessageTree } from "@/i18n/messages/fr";
import { translate, type MessageKey } from "@/i18n/useT";

/**
 * Translate raw Supabase auth errors into short, actionable messages.
 * Falls back to the raw message when no rule matches.
 */
export function humanizeAuthError(
  raw: string,
  messages: MessageTree,
): string {
  const t = (key: MessageKey) => translate(messages, key);
  const lower = raw.toLowerCase();

  if (lower.includes("invalid login")) return t("auth.errInvalidLogin");
  if (lower.includes("email not confirmed")) return t("auth.errEmailNotConfirmed");
  if (lower.includes("already registered") || lower.includes("user already")) {
    return t("auth.errAlreadyRegistered");
  }
  if (lower.includes("password") && lower.includes("short")) {
    return t("auth.errPasswordShort");
  }
  if (lower.includes("rate limit")) return t("auth.errRateLimit");
  if (lower.includes("provider is not enabled")) return t("auth.errProviderDisabled");
  return raw;
}
