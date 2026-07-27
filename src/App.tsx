import { Routes, Route } from "react-router-dom";
import { AppRouter } from "@/router/AppRouter";
import { ProgressProvider } from "@/hooks/useProgress";
import { AuthProvider } from "@/hooks/useAuth";
import { LandingLayout } from "@/components/layout/LandingLayout";
import { CourseLayout } from "@/components/layout/CourseLayout";
import { reactCourseArea, svcCourseArea } from "@/components/layout/courseArea";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { LandingPage } from "@/pages/LandingPage";
import { AuthPage } from "@/pages/AuthPage";
import { AccountPage } from "@/pages/account/AccountPage";
import { ReactCoursePage } from "@/pages/ReactCoursePage";
import { SvcCoursePage } from "@/pages/SvcCoursePage";
import { PhasePage } from "@/pages/PhasePage";
import { PhaseChallengePage } from "@/pages/PhaseChallengePage";
import { ModulePage } from "@/pages/ModulePage";
import { ProgressPage } from "@/pages/ProgressPage";
import { BookmarksPage } from "@/pages/BookmarksPage";
import { SearchPage } from "@/pages/SearchPage";
import { CapstoneGatePage } from "@/pages/capstone/CapstoneGatePage";
import { useThemeEffect } from "@/hooks/useThemeEffect";
import { LocaleProvider } from "@/i18n/LocaleProvider";

function ThemeApplier({ children }: { children: React.ReactNode }) {
  useThemeEffect();
  return <>{children}</>;
}

export default function App() {
  return (
    <LocaleProvider>
    <AuthProvider>
      <ProgressProvider>
        <ThemeApplier>
          <AppRouter>
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

              {/* Secure Vibe Coding learning area (public syllabus, protected lessons) */}
              <Route
                path="/secure-vibe-coding/*"
                element={
                  <CourseLayout area={svcCourseArea}>
                    <Routes>
                      <Route index element={<SvcCoursePage />} />
                      <Route
                        path="phase/:phaseId"
                        element={<RequireAuth><PhasePage /></RequireAuth>}
                      />
                      <Route
                        path="module/:moduleId"
                        element={<RequireAuth><ModulePage /></RequireAuth>}
                      />
                      <Route
                        path="progress"
                        element={<RequireAuth><ProgressPage /></RequireAuth>}
                      />
                      <Route
                        path="bookmarks"
                        element={<RequireAuth><BookmarksPage /></RequireAuth>}
                      />
                      <Route
                        path="search"
                        element={<RequireAuth><SearchPage /></RequireAuth>}
                      />
                      <Route path="*" element={<SvcCoursePage />} />
                    </Routes>
                  </CourseLayout>
                }
              />

              {/* React learning area (public syllabus, protected lessons) */}
              <Route
                path="/react/*"
                element={
                  <CourseLayout area={reactCourseArea}>
                    <Routes>
                      <Route index element={<ReactCoursePage />} />
                      <Route
                        path="phase/:phaseId"
                        element={<RequireAuth><PhasePage /></RequireAuth>}
                      />
                      <Route
                        path="phase/:phaseId/challenge"
                        element={<RequireAuth><PhaseChallengePage /></RequireAuth>}
                      />
                      <Route
                        path="module/:moduleId"
                        element={<RequireAuth><ModulePage /></RequireAuth>}
                      />
                      <Route
                        path="progress"
                        element={<RequireAuth><ProgressPage /></RequireAuth>}
                      />
                      <Route
                        path="final-project"
                        element={<RequireAuth><CapstoneGatePage /></RequireAuth>}
                      />
                      <Route
                        path="bookmarks"
                        element={<RequireAuth><BookmarksPage /></RequireAuth>}
                      />
                      <Route
                        path="search"
                        element={<RequireAuth><SearchPage /></RequireAuth>}
                      />
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
          </AppRouter>
        </ThemeApplier>
      </ProgressProvider>
    </AuthProvider>
    </LocaleProvider>
  );
}
