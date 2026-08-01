import { Bookmark, Home, List, TrendingUp } from "lucide-react";
import { useCourseArea } from "./courseArea";
import { useT } from "@/i18n/useT";
import { MobileBottomBar, type BottomNavItem } from "./MobileBottomBar";

interface CourseBottomBarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

/**
 * Course bottom nav (mobile + tablet): home, modules, progress, bookmarks.
 * Fixed to the viewport bottom until the desktop layout (lg).
 */
export function CourseBottomBar({
  isSidebarOpen,
  onToggleSidebar,
}: CourseBottomBarProps) {
  const { basePath } = useCourseArea();
  const t = useT();

  const items: BottomNavItem[] = [
    {
      kind: "link",
      to: basePath,
      end: true,
      label: t("bottomNav.course"),
      icon: Home,
    },
    {
      kind: "button",
      label: t("bottomNav.modules"),
      icon: List,
      onClick: onToggleSidebar,
      active: isSidebarOpen,
    },
    {
      kind: "link",
      to: `${basePath}/progress`,
      label: t("bottomNav.progress"),
      icon: TrendingUp,
    },
    {
      kind: "link",
      to: `${basePath}/bookmarks`,
      label: t("bottomNav.bookmarks"),
      icon: Bookmark,
    },
  ];

  return <MobileBottomBar items={items} hideFromClassName="lg:hidden" />;
}
