import { useEffect } from "react";

/**
 * Loads Font Awesome after first paint so it does not block LCP/FCP.
 * Course content and chrome still use FA class names.
 */
export function DeferredFontAwesome() {
  useEffect(() => {
    void import("@fortawesome/fontawesome-free/css/all.min.css");
  }, []);
  return null;
}
