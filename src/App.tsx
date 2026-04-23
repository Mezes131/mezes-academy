import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "@/hooks/useProgress";
import { AuthProvider } from "@/hooks/useAuth";
import { LandingLayout } from "@/components/layout/LandingLayout";
import { CourseLayout } from "@/components/layout/CourseLayout";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { LandingPage } from "@/pages/LandingPage";
import { AuthPage } from "@/pages/AuthPage";
import { AccountPage } from "@/pages/account/AccountPage";
import { ReactCoursePage } from "@/pages/ReactCoursePage";
import { PhasePage } from "@/pages/PhasePage";
import { PhaseChallengePage } from "@/pages/PhaseChallengePage";
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
    <AuthProvider>
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

              <Route
                path="/auth"
                element={
                  <LandingLayout>
                    <AuthPage />
                  </LandingLayout>
                }
              />

              <Route
                path="/account"
                element={
                  <RequireAuth>
                    <LandingLayout>
                      <AccountPage />
                    </LandingLayout>
                  </RequireAuth>
                }
              />

              {/* React course learning area */}
              <Route
                path="/react/*"
                element={
                  <RequireAuth>
                    <CourseLayout>
                      <Routes>
                        <Route index element={<ReactCoursePage />} />
                        <Route path="phase/:phaseId" element={<PhasePage />} />
                        <Route
                          path="phase/:phaseId/challenge"
                          element={<PhaseChallengePage />}
                        />
                        <Route path="module/:moduleId" element={<ModulePage />} />
                        <Route path="progress" element={<ProgressPage />} />
                        <Route path="bookmarks" element={<BookmarksPage />} />
                        <Route path="search" element={<SearchPage />} />
                        <Route path="*" element={<ReactCoursePage />} />
                      </Routes>
                    </CourseLayout>
                  </RequireAuth>
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
    </AuthProvider>
  );
}
