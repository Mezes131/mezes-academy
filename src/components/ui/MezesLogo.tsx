import { cn } from "@/lib/utils";

interface MezesLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

/**
 * Logo Mezes Academy — un M stylisé formé par deux obliques qui évoquent
 * à la fois une montagne (l'ascension, la progression) et un chevron
 * (une flèche qui pointe vers l'avant). Le tout dans un carré arrondi.
 *
 * Utilisable partout : nav, footer, hero, favicons.
 */
export function MezesLogo({
  size = 32,
  className,
  showText = false,
}: MezesLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mezes-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#6c63ff" />
            <stop offset="1" stopColor="#4da3ff" />
          </linearGradient>
          <linearGradient id="mezes-glow" x1="8" y1="10" x2="32" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* Fond carré arrondi */}
        <rect x="0" y="0" width="40" height="40" rx="10" fill="url(#mezes-bg)" />

        {/* Le "M" : deux obliques reliées en haut par un point médian bas,
            dessinées en un seul chemin. Le trait principal évoque une
            crête de montagne et trois sommets (m) */}
        <path
          d="M8.5 28.5 L13.5 12 L20 23 L26.5 12 L31.5 28.5"
          stroke="url(#mezes-glow)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Petit point signature sous le M */}
        <circle cx="20" cy="31.5" r="1.6" fill="#ffffff" fillOpacity="0.9" />
      </svg>

      {showText && (
        <span className="flex flex-col leading-none">
          <span className="font-extrabold tracking-tight text-[15px] text-fg">
            Mezes
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-fg-3 mt-0.5">
            Academy
          </span>
        </span>
      )}
    </div>
  );
}
