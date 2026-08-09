import { useT } from "@/i18n/useT";
import { cn } from "@/lib/utils";

export type AuthMode = "login" | "register";

interface AuthModeSwitcherProps {
  mode: AuthMode;
  onChange: (mode: AuthMode) => void;
  className?: string;
}

/**
 * Two-tab switcher: "Se connecter" / "Créer un compte".
 * Kept in its own component so it can be reused above any credentials form.
 */
export function AuthModeSwitcher({
  mode,
  onChange,
  className,
}: AuthModeSwitcherProps) {
  const t = useT();

  return (
    <div
      role="tablist"
      aria-label={t("auth.modeAria")}
      className={cn(
        "grid grid-cols-2 gap-1 rounded-xl bg-bg-3 p-1",
        className,
      )}
    >
      <TabButton
        active={mode === "login"}
        onClick={() => onChange("login")}
      >
        {t("nav.signInShort")}
      </TabButton>
      <TabButton
        active={mode === "register"}
        onClick={() => onChange("register")}
      >
        {t("nav.createAccount")}
      </TabButton>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "h-9 rounded-lg text-sm font-semibold",
        "transition-[transform,background-color,color,box-shadow] duration-150 ease-out active:scale-[0.97]",
        active
          ? "bg-bg text-fg shadow-soft"
          : "text-fg-2 hover:text-fg hover:bg-bg-2/60",
      )}
    >
      {children}
    </button>
  );
}
