/**
 * Translate raw Supabase auth errors into short, actionable French messages.
 * Falls back to the raw message when no rule matches so unexpected errors
 * are still surfaced to the user instead of being silently swallowed.
 */
export function humanizeAuthError(raw: string): string {
  const lower = raw.toLowerCase();

  if (lower.includes("invalid login")) {
    return "Email ou mot de passe incorrect.";
  }
  if (lower.includes("email not confirmed")) {
    return "Ton email n'est pas encore confirmé. Vérifie ta boîte mail.";
  }
  if (lower.includes("already registered") || lower.includes("user already")) {
    return "Un compte existe déjà avec cet email. Essaie de te connecter.";
  }
  if (lower.includes("password") && lower.includes("short")) {
    return "Le mot de passe doit contenir au moins 6 caractères.";
  }
  if (lower.includes("rate limit")) {
    return "Trop de tentatives. Réessaie dans quelques minutes.";
  }
  if (lower.includes("provider is not enabled")) {
    return "Cette méthode de connexion n'est pas encore activée. Réessaie plus tard.";
  }
  return raw;
}
