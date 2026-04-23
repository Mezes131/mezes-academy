import { useMemo } from "react";
import { AtSign, FileText, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useAuth, type UserProfile } from "@/hooks/useAuth";
import { getInitials } from "@/lib/identity";
import { AvatarUploader } from "../../components/account/AvatarUploader";
import { InlineText } from "../../components/account/InlineText";
import { LinksEditor } from "../../components/account/LinksEditor";
import { SidePanel } from "../../components/account/SidePanel";

export interface ProfileHeaderProps {
  email: string;
  profile: UserProfile;
  completeness: number;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
}

/**
 * Account page header: assembles avatar, inline identity editors, links and
 * a right-side panel with completeness ring + learning-progress snapshot.
 *
 * This file is intentionally thin — layout + wiring only. Every widget lives
 * under `./components/` to stay reusable and testable.
 */
export function ProfileHeader({
  email,
  profile,
  completeness,
  onError,
  onSuccess,
}: ProfileHeaderProps) {
  const { updateProfile } = useAuth();

  const initials = useMemo(
    () => getInitials(profile.fullName ?? "", email),
    [profile.fullName, email],
  );

  async function onSave<K extends keyof UserProfile>(
    field: K,
    value: unknown,
  ): Promise<void> {
    try {
      await updateProfile({ [field]: value } as never);
      onSuccess("Enregistré.");
    } catch (error) {
      onError((error as Error).message);
      throw error;
    }
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border-base bg-bg-2">
      <Cover />

      <div className="px-5 sm:px-8 pb-6 sm:pb-8 -mt-16 sm:-mt-14">
        <div className="flex md:flex-nowrap flex-wrap gap-5 sm:gap-6 lg:gap-8 items-end justify-between">
          
          <div className="w-full flex flex-col gap-3 flex-1">
            <AvatarUploader
              userId={profile.id}
              currentUrl={profile.avatarUrl}
              initials={initials}
              onError={onError}
              onSuccess={onSuccess}
              onChange={(next) => onSave("avatarUrl", next)}
            />

            <IdentityBadges
              role={profile.role}
              isPublic={profile.isPublic}
              email={email}
            />

            <InlineText
              label="Nom complet"
              icon={<UserCircle size={14} />}
              value={profile.fullName ?? ""}
              placeholder="Ex : Ada Lovelace"
              emptyLabel="Ajouter ton nom"
              valueClassName="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight"
              onSave={(next) => onSave("fullName", next || null)}
            />

            <InlineText
              label="Pseudo public"
              icon={<AtSign size={14} />}
              value={profile.username ?? ""}
              placeholder="ada_lovelace"
              emptyLabel="Choisir un pseudo"
              prefix="@"
              valueClassName="text-[15px] font-semibold text-accent-2"
              normalize={(raw) => raw.trim().toLowerCase()}
              validate={validateUsername}
              onSave={(next) => onSave("username", next || null)}
            />

            <InlineText
              label="Bio courte"
              icon={<FileText size={14} />}
              value={profile.bio ?? ""}
              placeholder="Une phrase qui te décrit..."
              emptyLabel="Ajouter une bio"
              multiline
              maxLength={240}
              valueClassName="text-[14px] text-fg-2 leading-relaxed"
              onSave={(next) => onSave("bio", next || null)}
            />

            <LinksEditor
              links={profile.links}
              onSave={(next) => onSave("links", next)}
            />
          </div>

          <aside className="w-full md:flex-shrink-0 md:w-auto">
            <SidePanel completeness={completeness} />
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ─── Local subcomponents ───────────────────────────────────── */

function Cover() {
  return (
    <div className="relative h-28 sm:h-32">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(500px 260px at 20% 30%, rgba(99,102,241,0.45), transparent 60%), radial-gradient(500px 260px at 80% 70%, rgba(236,72,153,0.35), transparent 60%), linear-gradient(120deg, rgba(16,185,129,0.18), rgba(99,102,241,0.18))",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-2"
      />
    </div>
  );
}

function IdentityBadges({
  role,
  isPublic,
  email,
}: {
  role: "student" | "admin";
  isPublic: boolean;
  email: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {role === "admin" && (
        <Badge variant="default" className="uppercase tracking-wider">
          Admin
        </Badge>
      )}
      {isPublic ? (
        <Badge variant="success">Profil public</Badge>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-full border border-base bg-bg-3 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-fg-3">
          Privé
        </span>
      )}
      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-fg-3 truncate max-w-[260px]">
        {email}
      </span>
    </div>
  );
}

/* ─── Validators ─────────────────────────────────────────────── */

function validateUsername(raw: string): string | null {
  if (!raw) return null;
  if (!/^[a-z0-9_]{3,30}$/.test(raw)) {
    return "3 à 30 caractères : lettres, chiffres ou _.";
  }
  return null;
}
