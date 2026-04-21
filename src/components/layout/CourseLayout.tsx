import type { ReactNode } from "react";
import { CourseTopNav } from "./CourseTopNav";
import { Sidebar } from "./Sidebar";
import { BackToTopButton } from "./BackToTopButton";

/**
 * Layout for the learning area (React track).
 * Combines the course-scoped nav, the phase/module sidebar,
 * and a back-to-top button.
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
