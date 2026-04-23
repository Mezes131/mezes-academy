import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Automatically scrolls on every route change:
 * - If the URL carries a hash (`#foo`), smooth-scroll to that element once
 *   the destination page has rendered. React Router doesn't do this by
 *   default on client-side navigations (the browser only handles it on
 *   initial page load).
 * - Otherwise, scroll to the top of the page.
 *
 * Mount this once inside <BrowserRouter>.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target page has had the chance to mount its DOM.
      const raf = window.requestAnimationFrame(() => {
        const id = hash.startsWith("#") ? hash.slice(1) : hash;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // Fallback: ensure we don't keep an unrelated scroll position.
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      });
      return () => window.cancelAnimationFrame(raf);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
