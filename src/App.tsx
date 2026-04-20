import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "@/hooks/useProgress";
import { Layout } from "@/components/layout/Layout";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { HomePage } from "@/pages/HomePage";
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
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phase/:phaseId" element={<PhasePage />} />
              <Route path="/module/:moduleId" element={<ModulePage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeApplier>
    </ProgressProvider>
  );
}
