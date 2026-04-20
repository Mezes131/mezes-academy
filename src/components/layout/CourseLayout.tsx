import type { ReactNode } from "react";
import { CourseTopNav } from "./CourseTopNav";
import { Sidebar } from "./Sidebar";
import { BackToTopButton } from "./BackToTopButton";

/**
 * Layout de la zone d'apprentissage (parcours React).
 * Combine la nav scoping-course, la sidebar des phases/modules
 * et un bouton de retour en haut.
 */
export function CourseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <CourseTopNav />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <BackToTopButton />
    </div>
  );
}
