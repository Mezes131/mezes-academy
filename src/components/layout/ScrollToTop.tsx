import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll automatique en haut de page à chaque changement de route.
 * À placer une seule fois, à l'intérieur du <BrowserRouter>.
 *
 * On ignore le scroll si une ancre est présente dans l'URL (`#hash`) :
 * le navigateur cible déjà l'élément correspondant.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    // `instant` évite l'animation lors d'une vraie navigation ; on veut que
    // la nouvelle page s'ouvre "en haut", pas un défilement visible.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
