import {
  BrowserRouter,
  HashRouter,
  type FutureConfig,
} from "react-router-dom";
import type { ReactNode } from "react";

const routerFuture: FutureConfig = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

/**
 * Avec `base: "./"`, le build est souvent ouvert via file:// ou Live Server
 * sur `dist/index.html` (pathname ≠ "/"). BrowserRouter ne matche alors aucune
 * route → écran vide alors que le CSS (fond sombre) est chargé.
 */
function needsHashRouter(): boolean {
  if (import.meta.env.BASE_URL !== "./") return false;
  if (typeof window === "undefined") return false;

  if (window.location.protocol === "file:") return true;

  const path = window.location.pathname.replace(/\/index\.html$/i, "");
  return path !== "" && path !== "/";
}

function browserBasename(): string | undefined {
  const base = import.meta.env.BASE_URL;
  if (!base || base === "/" || base === "./") return undefined;
  return base.replace(/\/$/, "");
}

export function AppRouter({ children }: { children: ReactNode }) {
  if (needsHashRouter()) {
    return <HashRouter future={routerFuture}>{children}</HashRouter>;
  }

  return (
    <BrowserRouter basename={browserBasename()} future={routerFuture}>
      {children}
    </BrowserRouter>
  );
}
