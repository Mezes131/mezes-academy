import type { OAuthProvider } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { ProviderIcon } from "./ProviderIcon";

interface OAuthButtonProps {
  provider: OAuthProvider;
  label: string;
  /** Show a loading state (disables click). */
  busy?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

/**
 * Single-provider sign-in button. The parent owns the async flow and toggles
 * `busy` accordingly. Visual style aligns with the design system (ghost card
 * + bordered background, accent focus ring).
 */
export function OAuthButton({
  provider,
  label,
  busy = false,
  disabled,
  onClick,
}: OAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || busy}
      className={cn(
        "w-full h-11 inline-flex items-center justify-center gap-2 rounded-lg border-base bg-bg-3 text-sm font-semibold",
        "hover:bg-bg-4 transition",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
      )}
    >
      {busy ? (
        <i
          aria-hidden
          className="fa-solid fa-spinner fa-spin text-fg-2"
        />
      ) : (
        <ProviderIcon provider={provider} />
      )}
      <span>{busy ? "Redirection..." : label}</span>
    </button>
  );
}
