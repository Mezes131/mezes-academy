import type { OAuthProvider } from "@/hooks/useAuth";
import { OAuthButton } from "./OAuthButton";

interface OAuthProvidersProps {
  /** Which provider (if any) is currently redirecting. */
  busyProvider: OAuthProvider | null;
  /** Disable every button (e.g. while the email form is submitting). */
  disabled?: boolean;
  onSelect: (provider: OAuthProvider) => void;
  /** Restrict the rendered providers (default: all supported). */
  providers?: OAuthProvider[];
}

const LABELS: Record<OAuthProvider, string> = {
  google: "Google",
  github: "GitHub",
};

/**
 * Stacked list of OAuth sign-in buttons.
 * Reusable in the public auth page and in any future variant
 * (e.g. re-linking accounts from the profile page).
 */
export function OAuthProviders({
  busyProvider,
  disabled = false,
  onSelect,
  providers = ["google", "github"],
}: OAuthProvidersProps) {
  return (
    <div className="flex gap-2">
      {providers.map((provider) => (
        <OAuthButton
          key={provider}
          provider={provider}
          label={LABELS[provider]}
          busy={busyProvider === provider}
          disabled={disabled || (busyProvider !== null && busyProvider !== provider)}
          onClick={() => onSelect(provider)}
        />
      ))}
    </div>
  );
}
