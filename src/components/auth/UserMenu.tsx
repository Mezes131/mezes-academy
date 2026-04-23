import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookMarked,
  ChevronDown,
  LogOut,
  TrendingUp,
  UserCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getDisplayName, getInitials } from "@/lib/identity";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  /** Extra classes applied to the trigger button wrapper. */
  className?: string;
  /**
   * When `true`, the full name is shown next to the avatar on larger screens.
   * Useful on the landing nav; disabled in dense bars.
   */
  showName?: boolean;
  /** Avatar size in px (default: 32). */
  size?: number;
}

/**
 * Compact user avatar that opens a dropdown with common account actions.
 * Falls back to nothing if no user is signed in; the caller should render
 * its own "sign in" CTA when relevant.
 */
export function UserMenu({
  className,
  showName = false,
  size = 32,
}: UserMenuProps) {
  const { user, profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function onMouseDown(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!user) return null;

  const email = user.email ?? "";
  const displayName = getDisplayName(profile?.fullName, email);
  const initials = getInitials(displayName, email);
  const avatarUrl = profile?.avatarUrl ?? null;
  const isAdmin = profile?.role === "admin";

  async function handleSignOut() {
    setOpen(false);
    try {
      await signOut();
    } catch (error) {
      alert((error as Error).message);
    }
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-2 rounded-full pl-1 pr-2 py-1 transition",
          "hover:bg-bg-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
          open && "bg-bg-3",
        )}
      >
        <Avatar initials={initials} size={size} src={avatarUrl} />
        <ChevronDown
          size={14}
          className={cn(
            "text-fg-3 transition-transform duration-150",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            "absolute right-0 top-[calc(100%+6px)] z-50 w-64 rounded-xl border-base bg-bg-2/95 backdrop-blur-md shadow-soft overflow-hidden",
            "animate-fade-in origin-top-right",
          )}
        >
          <div className="p-3 flex items-center gap-3 border-b border-base">
            <Avatar initials={initials} size={40} src={avatarUrl} />
            <div className="min-w-0">
              <div className="text-[13px] font-semibold truncate">
                {displayName}
              </div>
              <div className="text-[11px] text-fg-3 truncate">{email}</div>
              {isAdmin && (
                <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent/10 text-accent-2 border border-accent/20">
                  Admin
                </div>
              )}
            </div>
          </div>

          <div className="py-1.5">
            <MenuItem
              to="/account"
              icon={<UserCircle size={14} />}
              label="Mon profil"
              onClick={() => setOpen(false)}
            />
            <MenuItem
              to="/react/progress"
              icon={<TrendingUp size={14} />}
              label="Ma progression"
              onClick={() => setOpen(false)}
            />
            <MenuItem
              to="/react/bookmarks"
              icon={<BookMarked size={14} />}
              label="Mes favoris"
              onClick={() => setOpen(false)}
            />
          </div>

          <div className="border-t border-base py-1.5">
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="w-full flex items-center gap-2.5 px-3 h-9 text-[13px] text-fg-2 hover:text-red-300 hover:bg-red-500/10 transition"
              role="menuitem"
            >
              <LogOut size={14} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────────── */

function Avatar({
  initials,
  size,
  src,
}: {
  initials: string;
  size: number;
  src?: string | null;
}) {
  const fontSize = Math.max(10, Math.round(size * 0.4));

  if (src) {
    return (
      <span
        className={cn(
          "inline-block rounded-full flex-shrink-0 overflow-hidden",
          "shadow-soft border border-white/10",
        )}
        style={{ width: size, height: size }}
        aria-hidden
      >
        <img
          src={src}
          alt=""
          draggable={false}
          className="w-full h-full object-cover"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full flex-shrink-0 select-none",
        "bg-gradient-to-br from-accent/90 to-accent-2/80 text-white font-bold shadow-soft",
        "border border-white/10",
      )}
      style={{ width: size, height: size, fontSize }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

function MenuItem({
  to,
  icon,
  label,
  onClick,
  accent,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  accent?: boolean;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      role="menuitem"
      className={cn(
        "flex items-center gap-2.5 px-3 h-9 text-[13px] transition",
        accent
          ? "text-accent-2 hover:text-accent-2 hover:bg-accent/10 font-semibold"
          : "text-fg-2 hover:text-fg hover:bg-bg-3",
      )}
    >
      <span className="text-fg-3">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

