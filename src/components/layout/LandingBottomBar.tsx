import {
  BookOpen,
  GraduationCap,
  Home,
  LogIn,
  UserCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useT } from "@/i18n/useT";
import { MobileBottomBar, type BottomNavItem } from "./MobileBottomBar";

/**
 * Landing mobile bottom nav: home, catalog, continue course, account/sign-in.
 */
export function LandingBottomBar() {
  const { user } = useAuth();
  const t = useT();

  const items: BottomNavItem[] = [
    {
      kind: "link",
      to: "/",
      end: true,
      label: t("nav.home"),
      icon: Home,
    },
    {
      kind: "link",
      to: "/#catalog",
      hash: "#catalog",
      label: t("nav.catalog"),
      icon: BookOpen,
    },
    {
      kind: "link",
      to: "/react",
      label: t("bottomNav.myCourse"),
      icon: GraduationCap,
    },
    user
      ? {
          kind: "link",
          to: "/account",
          label: t("bottomNav.account"),
          icon: UserCircle,
        }
      : {
          kind: "link",
          to: "/auth",
          label: t("nav.signInShort"),
          icon: LogIn,
        },
  ];

  return <MobileBottomBar items={items} />;
}
