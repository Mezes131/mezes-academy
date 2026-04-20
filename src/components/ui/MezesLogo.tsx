import { cn } from "@/lib/utils";
import faviconUrl from "@/assets/images/favicon.png";
import mezesDarkUrl from "@/assets/images/mezes-dark.png";
import mezesLightUrl from "@/assets/images/mezes-light.png";

interface MezesLogoProps {
  /** Hauteur du logo en pixels. Pilote aussi la taille de la typo. */
  size?: number;
  className?: string;
  /** Afficher la typographie "mezes." à côté du mark (true = logo complet). */
  showText?: boolean;
  /** Alt accessible pour le lien/l'image. */
  title?: string;
}

/**
 * Logo Mezes Academy.
 * - Mark : l'image `favicon.png` (M rouge/bleu marine sur fond circulaire).
 * - Typographie : `mezes-dark.png` (pour th\u00e8me sombre) ou `mezes-light.png`
 *   (pour th\u00e8me clair) \u2014 bascule g\u00e9r\u00e9e par Tailwind gr\u00e2ce \u00e0 la classe
 *   `dark` / `light` appliqu\u00e9e sur <html>.
 */
export function MezesLogo({
  size = 32,
  className,
  showText = false,
  title = "Mezes Academy",
}: MezesLogoProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label={title}
    >
      <img
        src={faviconUrl}
        alt=""
        width={size}
        height={size}
        className="select-none flex-shrink-0"
        draggable={false}
        style={{ height: size, width: size }}
      />

      {showText && (
        <span
          className="relative inline-block flex-shrink-0"
          style={{ height: Math.round(size * 0.72) }}
        >
          {/* Logo typo pour th\u00e8me sombre (texte blanc) \u2014 visible quand <html> a .dark */}
          <img
            src={mezesDarkUrl}
            alt={title}
            className="hidden dark:block h-full w-auto select-none"
            draggable={false}
          />
          {/* Logo typo pour th\u00e8me clair (texte fonc\u00e9) \u2014 visible par d\u00e9faut / avec .light */}
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
