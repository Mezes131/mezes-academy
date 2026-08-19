import { lazy, Suspense, type ReactNode } from "react";
import {
  Routes,
  Route,
  useRoutes,
  type RouteObject,
} from "react-router-dom";
import { AppRouter } from "@/router/AppRouter";
import { ProgressProvider } from "@/hooks/useProgress";
import { AuthProvider } from "@/hooks/useAuth";
import { LandingLayout } from "@/components/layout/LandingLayout";
import { CourseLayout } from "@/components/layout/CourseLayout";
import { reactCourseArea, svcCourseArea } from "@/components/layout/courseArea";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { LandingPage } from "@/pages/LandingPage";
import { AboutPage } from "@/pages/academy/AboutPage";
import { AcademyDocPage } from "@/pages/academy/AcademyDocPage";
import { useThemeEffect } from "@/hooks/useThemeEffect";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { LocaleRouteSync } from "@/i18n/LocaleRouteSync";
import { useT } from "@/i18n/useT";

const AuthPage = lazy(() =>
  import("@/pages/AuthPage").then((m) => ({ default: m.AuthPage })),
);
const ResetPasswordPage = lazy(() =>
  import("@/pages/ResetPasswordPage").then((m) => ({
    default: m.ResetPasswordPage,
  })),
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

function ThemeApplier({ children }: { children: ReactNode }) {
  useThemeEffect();
  return <>{children}</>;
}

function RouteFallback() {
  const t = useT();
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-fg-3 text-sm">
      {t("common.loading")}
    </div>
  );
}

function withLanding(page: ReactNode) {
  return <LandingLayout>{page}</LandingLayout>;
}

function SvcCourseRoutes() {
  return (
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
  );
}

function ReactCourseRoutes() {
  return (
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
  );
}

function siteRouteObjects(prefix: "" | "/en"): RouteObject[] {
  const p = (path: string) => {
    if (path === "/") return prefix === "" ? "/" : "/en";
    return `${prefix}${path}`;
  };

  return [
    { path: p("/"), element: withLanding(<LandingPage />) },
    { path: p("/about"), element: withLanding(<AboutPage />) },
    {
      path: p("/contact"),
      element: withLanding(<AcademyDocPage doc="contact" />),
    },
    { path: p("/terms"), element: withLanding(<AcademyDocPage doc="terms" />) },
    {
      path: p("/privacy"),
      element: withLanding(<AcademyDocPage doc="privacy" />),
    },
    { path: p("/legal"), element: withLanding(<AcademyDocPage doc="legal" />) },
    { path: p("/auth"), element: withLanding(<AuthPage />) },
    {
      path: p("/reset-password"),
      element: withLanding(<ResetPasswordPage />),
    },
    {
      path: p("/account"),
      element: (
        <RequireAuth>{withLanding(<AccountPage />)}</RequireAuth>
      ),
    },
    {
      path: p("/secure-vibe-coding/*"),
      element: <SvcCourseRoutes />,
    },
    { path: p("/react/*"), element: <ReactCourseRoutes /> },
  ];
}

function AppRoutes() {
  return useRoutes([
    ...siteRouteObjects("/en"),
    ...siteRouteObjects(""),
    { path: "*", element: withLanding(<LandingPage />) },
  ]);
}

export default function App() {
  return (
    <LocaleProvider>
      <AuthProvider>
        <ProgressProvider>
          <ThemeApplier>
            <AppRouter>
              <LocaleRouteSync />
              <ScrollToTop />
              <Suspense fallback={<RouteFallback />}>
                <AppRoutes />
              </Suspense>
            </AppRouter>
          </ThemeApplier>
        </ProgressProvider>
      </AuthProvider>
    </LocaleProvider>
  );
}
