import { useMemo, useState, type ReactNode } from "react";
import { CourseTopNav } from "./CourseTopNav";
import { CourseBar } from "./CourseBar";
import { Sidebar } from "./Sidebar";
import { BackToTopButton } from "./BackToTopButton";
import { DeferredFontAwesome } from "./DeferredFontAwesome";
import {
  CourseAreaContext,
  resolveCourseArea,
  type CourseAreaBase,
} from "./courseArea";
import { useLocale } from "@/i18n/LocaleProvider";

/**
 * Layout for a course learning area (React, SVC…).
 * Combines the course-scoped nav, the phase/module sidebar,
 * and a back-to-top button. The `area` drives branding and links.
 */
export function CourseLayout({
  area,
  children,
}: {
  area: CourseAreaBase;
  children: ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { locale } = useLocale();
  const resolved = useMemo(
    () => resolveCourseArea(area, locale),
    [area, locale],
  );

  return (
    <CourseAreaContext.Provider value={resolved}>
    <div className="min-h-screen flex flex-col">
      <DeferredFontAwesome />
      <header className="sticky top-0 z-50 bg-bg border-b border-base">
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
        <main id="main" className="flex-1 min-w-0">
          {children}
        </main>
      </div>
      <BackToTopButton />
    </div>
    </CourseAreaContext.Provider>
  );
}
