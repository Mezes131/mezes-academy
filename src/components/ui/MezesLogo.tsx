import { cn } from "@/lib/utils";
import faviconUrl from "@/assets/images/favicon.png";
import mezesDarkUrl from "@/assets/images/mezes-dark.png";
import mezesLightUrl from "@/assets/images/mezes-light.png";

interface MezesLogoProps {
  /** Logo height in pixels. Also drives wordmark sizing. */
  size?: number;
  className?: string;
  /** Show the circular mark icon. */
  showMark?: boolean;
  /** Show the "mezes." wordmark next to the mark (true = full logo). */
  showText?: boolean;
  /** Accessible alt text for the link/image. */
  title?: string;
}

/**
 * Mezes Academy logo.
 * - Mark: `favicon.png` (red/navy M on a circular background).
 * - Wordmark: `mezes-dark.png` (dark theme) or `mezes-light.png` (light theme).
 *   Theme switching is handled by Tailwind via `dark` / `light` on <html>.
 */
export function MezesLogo({
  size = 32,
  className,
  showMark = true,
  showText = false,
  title = "Mezes Academy",
}: MezesLogoProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label={title}
    >
      {showMark && (
        <img
          src={faviconUrl}
          alt=""
          width={size}
          height={size}
          className="select-none flex-shrink-0"
          draggable={false}
          style={{ height: size, width: size }}
        />
      )}

      {showText && (
        <span
          className="relative inline-block flex-shrink-0"
          style={{ height: Math.round(size * 0.72) }}
        >
          {/* Dark-theme wordmark (white text), visible when <html> has .dark */}
          <img
            src={mezesDarkUrl}
            alt={title}
            className="hidden dark:block h-full w-auto select-none"
            draggable={false}
          />
          {/* Light-theme wordmark (dark text), visible by default / with .light */}
          <img
            src={mezesLightUrl}
            alt={title}
            className="block dark:hidden h-full w-auto select-none"
            draggable={false}
          />
        </span>
      )}
    </div>
  );
}
