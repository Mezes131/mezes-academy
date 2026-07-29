import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CourseTopNav } from "./CourseTopNav";
import { CourseBar } from "./CourseBar";
import { CourseBottomBar } from "./CourseBottomBar";
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
 * Mobile: bottom bar; sidebar opens as a drawer via Modules.
 */
export function CourseLayout({
  area,
  children,
}: {
  area: CourseAreaBase;
  children: ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { locale } = useLocale();
  const resolved = useMemo(
    () => resolveCourseArea(area, locale),
    [area, locale],
  );

  // Desktop: sidebar open by default. Mobile: closed (use bottom bar Modules).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    function sync() {
      setIsSidebarOpen(mq.matches);
    }
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <CourseAreaContext.Provider value={resolved}>
      <div className="min-h-screen flex flex-col pb-20 lg:pb-0 overflow-x-clip max-w-full">
        <DeferredFontAwesome />
        <header className="sticky top-0 z-50 bg-bg border-b border-base">
          <CourseTopNav />
          <div className="hidden lg:block">
            <CourseBar
              isSidebarOpen={isSidebarOpen}
              onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
            />
          </div>
        </header>
        <div className="relative flex flex-1 min-w-0 overflow-x-clip">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <main id="main" className="flex-1 min-w-0 max-w-full overflow-x-clip">
            {children}
          </main>
        </div>
        <BackToTopButton />
        <CourseBottomBar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
        />
      </div>
    </CourseAreaContext.Provider>
  );
}
