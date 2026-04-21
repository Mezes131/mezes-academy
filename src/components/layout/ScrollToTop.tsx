import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Automatically scrolls to the top on every route change.
 * Mount this once inside <BrowserRouter>.
 *
 * Skip scrolling when a hash anchor is present in the URL (`#hash`):
 * the browser already targets the corresponding element.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    // `instant` avoids a visible animation during real navigation; we want
    // the new page to open at the top, not with a scrolling effect.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
