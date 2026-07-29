import { lazy, Suspense } from "react";
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
import { useThemeEffect } from "@/hooks/useThemeEffect";
import { LocaleProvider } from "@/i18n/LocaleProvider";

// ponytail: landing stays eager; everything else splits the initial JS
const AuthPage = lazy(() =>
  import("@/pages/AuthPage").then((m) => ({ default: m.AuthPage })),
);
const AccountPage = lazy(() =>
  import("@/pages/account/AccountPage").then((m) => ({ default: m.AccountPage })),
);
const ReactCoursePage = lazy(() =>
  import("@/pages/ReactCoursePage").then((m) => ({ default: m.ReactCoursePage })),
);
const SvcCoursePage = lazy(() =>
  import("@/pages/SvcCoursePage").then((m) => ({ default: m.SvcCoursePage })),
);
const PhasePage = lazy(() =>
  import("@/pages/PhasePage").then((m) => ({ default: m.PhasePage })),
);
const PhaseChallengePage = lazy(() =>
  import("@/pages/PhaseChallengePage").then((m) => ({
    default: m.PhaseChallengePage,
  })),
);
const ModulePage = lazy(() =>
  import("@/pages/ModulePage").then((m) => ({ default: m.ModulePage })),
);
const ProgressPage = lazy(() =>
  import("@/pages/ProgressPage").then((m) => ({ default: m.ProgressPage })),
);
const BookmarksPage = lazy(() =>
  import("@/pages/BookmarksPage").then((m) => ({ default: m.BookmarksPage })),
);
const SearchPage = lazy(() =>
  import("@/pages/SearchPage").then((m) => ({ default: m.SearchPage })),
);
const CapstoneGatePage = lazy(() =>
  import("@/pages/capstone/CapstoneGatePage").then((m) => ({
    default: m.CapstoneGatePage,
  })),
);

function ThemeApplier({ children }: { children: React.ReactNode }) {
  useThemeEffect();
  return <>{children}</>;
}

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-fg-3 text-sm">
      Chargement…
    </div>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <AuthProvider>
        <ProgressProvider>
          <ThemeApplier>
            <AppRouter>
              <ScrollToTop />
              <Suspense fallback={<RouteFallback />}>
                <Routes>
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

                  <Route
                    path="/secure-vibe-coding/*"
                    element={
                      <CourseLayout area={svcCourseArea}>
                        <Routes>
                          <Route index element={<SvcCoursePage />} />
                          <Route
                            path="phase/:phaseId"
                            element={
                              <RequireAuth>
                                <PhasePage />
                              </RequireAuth>
                            }
                          />
                          <Route
                            path="module/:moduleId"
                            element={
                              <RequireAuth>
                                <ModulePage />
                              </RequireAuth>
                            }
                          />
                          <Route
                            path="progress"
                            element={
                              <RequireAuth>
                                <ProgressPage />
                              </RequireAuth>
                            }
                          />
                          <Route
                            path="bookmarks"
                            element={
                              <RequireAuth>
                                <BookmarksPage />
                              </RequireAuth>
                            }
                          />
                          <Route
                            path="search"
                            element={
                              <RequireAuth>
                                <SearchPage />
                              </RequireAuth>
                            }
                          />
                          <Route path="*" element={<SvcCoursePage />} />
                        </Routes>
                      </CourseLayout>
                    }
                  />

                  <Route
                    path="/react/*"
                    element={
                      <CourseLayout area={reactCourseArea}>
                        <Routes>
                          <Route index element={<ReactCoursePage />} />
                          <Route
                            path="phase/:phaseId"
                            element={
                              <RequireAuth>
                                <PhasePage />
                              </RequireAuth>
                            }
                          />
                          <Route
                            path="phase/:phaseId/challenge"
                            element={
                              <RequireAuth>
                                <PhaseChallengePage />
                              </RequireAuth>
                            }
                          />
                          <Route
                            path="module/:moduleId"
                            element={
                              <RequireAuth>
                                <ModulePage />
                              </RequireAuth>
                            }
                          />
                          <Route
                            path="progress"
                            element={
                              <RequireAuth>
                                <ProgressPage />
                              </RequireAuth>
                            }
                          />
                          <Route
                            path="final-project"
                            element={
                              <RequireAuth>
                                <CapstoneGatePage />
                              </RequireAuth>
                            }
                          />
                          <Route
                            path="bookmarks"
                            element={
                              <RequireAuth>
                                <BookmarksPage />
                              </RequireAuth>
                            }
                          />
                          <Route
                            path="search"
                            element={
                              <RequireAuth>
                                <SearchPage />
                              </RequireAuth>
                            }
                          />
                          <Route path="*" element={<ReactCoursePage />} />
                        </Routes>
                      </CourseLayout>
                    }
                  />

                  <Route
                    path="*"
                    element={
                      <LandingLayout>
                        <LandingPage />
                      </LandingLayout>
                    }
                  />
                </Routes>
              </Suspense>
            </AppRouter>
          </ThemeApplier>
        </ProgressProvider>
      </AuthProvider>
    </LocaleProvider>
  );
}
