import { useState, type ReactNode } from "react";
import { CourseTopNav } from "./CourseTopNav";
import { CourseBar } from "./CourseBar";
import { Sidebar } from "./Sidebar";
import { BackToTopButton } from "./BackToTopButton";
import { CourseAreaContext, type CourseArea } from "./courseArea";

/**
 * Layout for a course learning area (React, SVC…).
 * Combines the course-scoped nav, the phase/module sidebar,
 * and a back-to-top button. The `area` drives branding and links.
 */
export function CourseLayout({
  area,
  children,
}: {
  area: CourseArea;
  children: ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <CourseAreaContext.Provider value={area}>
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-base">
        <CourseTopNav />
        <CourseBar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
        />
      </header>
      <div className="relative flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <BackToTopButton />
    </div>
    </CourseAreaContext.Provider>
  );
}
