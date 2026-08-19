import {
  BookOpen,
  GraduationCap,
  Home,
  LogIn,
  UserCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { useT } from "@/i18n/useT";
import { useLocalePath } from "@/i18n/useLocalePath";
import { continuePathForProgress } from "@/lib/flagshipContinue";
import { MobileBottomBar, type BottomNavItem } from "./MobileBottomBar";

/**
 * Landing mobile bottom nav: home, catalog, continue course, account/sign-in.
 */
export function LandingBottomBar() {
  const { user } = useAuth();
  const { progress } = useProgress();
  const t = useT();
  const lp = useLocalePath();
  const courseHref = lp(continuePathForProgress(progress));

  const items: BottomNavItem[] = [
    {
      kind: "link",
      to: lp("/"),
      end: true,
      label: t("nav.home"),
      icon: Home,
    },
    {
      kind: "link",
      to: lp("/#catalog"),
      hash: "#catalog",
      label: t("nav.catalog"),
      icon: BookOpen,
    },
    {
      kind: "link",
      to: courseHref,
      label: t("bottomNav.myCourse"),
      icon: GraduationCap,
    },
    user
      ? {
          kind: "link",
          to: lp("/account"),
          label: t("bottomNav.account"),
          icon: UserCircle,
        }
      : {
          kind: "link",
          to: lp("/auth"),
          label: t("nav.signInShort"),
          icon: LogIn,
        },
  ];

  return <MobileBottomBar items={items} />;
}
