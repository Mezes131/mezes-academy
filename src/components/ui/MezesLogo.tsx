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
  /** Accessible name exposed via image alt (not aria-label on a bare div). */
  title?: string;
}

/**
 * Mezes Academy logo.
 * Name comes from img alt text so the accessibility tree stays valid.
 */
export function MezesLogo({
  size = 32,
  className,
  showMark = true,
  showText = false,
  title = "Mezes Academy",
}: MezesLogoProps) {
  const markAlt = showText ? "" : title;

  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      {showMark && (
        <img
          src={faviconUrl}
          alt={markAlt}
          width={size}
          height={size}
          decoding="async"
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
          <img
            src={mezesDarkUrl}
            alt={title}
            width={160}
            height={Math.round(size * 0.72)}
            decoding="async"
            className="hidden dark:block h-full w-auto select-none"
            draggable={false}
          />
          <img
            src={mezesLightUrl}
            alt={title}
            width={160}
            height={Math.round(size * 0.72)}
            decoding="async"
            className="block dark:hidden h-full w-auto select-none"
            draggable={false}
          />
        </span>
      )}
    </div>
  );
}
