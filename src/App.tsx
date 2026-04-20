import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "@/hooks/useProgress";
import { LandingLayout } from "@/components/layout/LandingLayout";
import { CourseLayout } from "@/components/layout/CourseLayout";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { LandingPage } from "@/pages/LandingPage";
import { ReactCoursePage } from "@/pages/ReactCoursePage";
import { PhasePage } from "@/pages/PhasePage";
import { ModulePage } from "@/pages/ModulePage";
import { ProgressPage } from "@/pages/ProgressPage";
import { BookmarksPage } from "@/pages/BookmarksPage";
import { SearchPage } from "@/pages/SearchPage";
import { useThemeEffect } from "@/hooks/useThemeEffect";

function ThemeApplier({ children }: { children: React.ReactNode }) {
  useThemeEffect();
  return <>{children}</>;
}

export default function App() {
  return (
    <ProgressProvider>
      <ThemeApplier>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <ScrollToTop />
          <Routes>
            {/* Landing Mezes Academy */}
            <Route
              path="/"
              element={
                <LandingLayout>
                  <LandingPage />
                </LandingLayout>
              }
            />

            {/* Zone d'apprentissage du parcours React */}
            <Route
              path="/react/*"
              element={
                <CourseLayout>
                  <Routes>
                    <Route index element={<ReactCoursePage />} />
                    <Route path="phase/:phaseId" element={<PhasePage />} />
                    <Route path="module/:moduleId" element={<ModulePage />} />
                    <Route path="progress" element={<ProgressPage />} />
                    <Route path="bookmarks" element={<BookmarksPage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="*" element={<ReactCoursePage />} />
                  </Routes>
                </CourseLayout>
              }
            />

            {/* 404 → landing */}
            <Route
              path="*"
              element={
                <LandingLayout>
                  <LandingPage />
                </LandingLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeApplier>
    </ProgressProvider>
  );
}
