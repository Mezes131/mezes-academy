import { useRef, useState } from "react";
import { Camera, ImagePlus, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AVATAR_ALLOWED_LABEL,
  AVATAR_MAX_SIZE_LABEL,
  deleteAllAvatarsForUser,
  uploadAvatar,
} from "@/lib/avatarStorage";

export interface AvatarUploaderProps {
  userId: string;
  currentUrl: string | null;
  initials: string;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
  /** Called with the new public URL, or `null` when the avatar is removed. */
  onChange: (nextUrl: string | null) => Promise<void>;
}

/**
 * Circular avatar with image preview + upload overlay + small side actions.
 * Renders initials when no avatar is uploaded yet.
 */
export function AvatarUploader({
  userId,
  currentUrl,
  initials,
  onError,
  onSuccess,
  onChange,
}: AvatarUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [hover, setHover] = useState(false);
  const busy = uploading || removing;

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    try {
      const { publicUrl } = await uploadAvatar(userId, file);
      await onChange(publicUrl);
      onSuccess("Photo de profil mise à jour.");
    } catch (error) {
      onError((error as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function onRemove() {
    if (!currentUrl) return;
    const ok = window.confirm(
      "Supprimer ta photo de profil ? Tes initiales s'afficheront à la place.",
    );
    if (!ok) return;

    setRemoving(true);
    try {
      await deleteAllAvatarsForUser(userId);
      await onChange(null);
      onSuccess("Photo supprimée.");
    } catch (error) {
      onError((error as Error).message);
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div className="relative flex flex-col justify-between gap-2 mb-4">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative flex items-end justify-start gap-2"
      >
        <div
          className={cn(
            "relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden select-none",
            "border-4 border-bg-2 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]",
            "ring-1 ring-white/5",
          )}
        >
          {currentUrl ? (
            <img
              src={currentUrl}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            <div
              className={cn(
                "w-full h-full inline-flex items-center justify-center text-3xl sm:text-4xl font-bold text-white",
                "bg-gradient-to-br from-accent/90 to-accent-2/80",
              )}
              aria-hidden
            >
              {initials}
            </div>
          )}

          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition",
              "bg-black/45 backdrop-blur-[2px]",
              hover || busy
                ? "opacity-100"
                : "opacity-0 pointer-events-none",
            )}
            aria-hidden
          >
            {busy ? (
              <Loader2
                size={22}
                className="text-white animate-spin"
                strokeWidth={2.4}
              />
            ) : (
              <Camera size={20} className="text-white" />
            )}
          </div>
        </div>
        <div className="flex items-end justify-end">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={busy}
            aria-label={
              currentUrl
                ? "Changer ma photo de profil"
                : "Ajouter une photo de profil"
            }
            className={cn(
              " w-8 h-8 rounded-full inline-flex items-center justify-center",
              "bg-accent text-white shadow-soft border-2 border-bg-2",
              "hover:bg-accent/90 transition disabled:opacity-60 disabled:cursor-not-allowed",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
            )}
          >
            {currentUrl ? <Camera size={14} /> : <ImagePlus size={14} />}
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={onPickFile}
        hidden
      />

      <div className="mt-3 flex flex-col items-start sm:items-center gap-1.5 max-w-[180px]">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={busy}
            className="text-[11px] font-semibold text-accent-2 hover:underline underline-offset-4 disabled:opacity-60"
          >
            {currentUrl ? "Changer" : "Ajouter une photo"}
          </button>
          {currentUrl && (
            <>
              <span className="text-fg-4" aria-hidden>
                ·
              </span>
              <button
                type="button"
                onClick={() => void onRemove()}
                disabled={busy}
                className="inline-flex items-center gap-1 text-[11px] text-fg-3 hover:text-red-300 transition disabled:opacity-60"
              >
                <Trash2 size={10} />
                Supprimer
              </button>
            </>
          )}
        </div>
        <p className="text-[10px] text-fg-3 leading-snug sm:text-center">
          {AVATAR_ALLOWED_LABEL} · max {AVATAR_MAX_SIZE_LABEL}
        </p>
      </div>
    </div>
  );
}
