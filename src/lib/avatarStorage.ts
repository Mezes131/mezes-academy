import { supabase } from "@/lib/supabase";

const BUCKET = "avatars";
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const AVATAR_MAX_SIZE_LABEL = "2 Mo";
export const AVATAR_ALLOWED_LABEL = "JPEG, PNG ou WEBP";

export interface UploadAvatarResult {
  path: string;
  publicUrl: string;
}

/**
 * Upload a new avatar for the given user.
 * - Validates mime type and size client-side (bucket-side policy still applies).
 * - Stores the object under `<userId>/avatar-<timestamp>.<ext>`.
 * - Returns the public URL with a cache-busting query param so the UI
 *   can refresh immediately after upload.
 */
export async function uploadAvatar(
  userId: string,
  file: File,
): Promise<UploadAvatarResult> {
  if (!supabase) {
    throw new Error("Supabase n'est pas configuré.");
  }
  if (!userId) {
    throw new Error("Utilisateur introuvable.");
  }
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(`Format non supporté. Utilise ${AVATAR_ALLOWED_LABEL}.`);
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error(`Fichier trop lourd (max ${AVATAR_MAX_SIZE_LABEL}).`);
  }

  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const safeExt = /^(jpe?g|png|webp)$/.test(ext) ? ext : "jpg";
  const path = `${userId}/avatar-${Date.now()}.${safeExt}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    if (/row-level security|new row violates/i.test(uploadError.message)) {
      throw new Error(
        "Upload refusé par le serveur. Vérifie que le bucket `avatars` existe et que les policies sont bien appliquées.",
      );
    }
    throw uploadError;
  }

  // Best-effort: wipe previous avatars for that user so storage doesn't grow.
  try {
    await deleteOtherAvatarsForUser(userId, path);
  } catch (err) {
    console.warn("[avatar] Nettoyage des anciens fichiers échoué:", err);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  const publicUrl = `${data.publicUrl}?t=${Date.now()}`;
  return { path, publicUrl };
}

/**
 * Delete every object under the user's avatar folder.
 * Safe to call when the user removes their avatar.
 */
export async function deleteAllAvatarsForUser(userId: string): Promise<void> {
  if (!supabase || !userId) return;
  const files = await listUserAvatarFiles(userId);
  if (files.length === 0) return;
  const paths = files.map((name) => `${userId}/${name}`);
  const { error } = await supabase.storage.from(BUCKET).remove(paths);
  if (error) throw error;
}

async function listUserAvatarFiles(userId: string): Promise<string[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.storage.from(BUCKET).list(userId);
  if (error) {
    if (/not found/i.test(error.message)) return [];
    throw error;
  }
  return (data ?? []).map((entry) => entry.name);
}

async function deleteOtherAvatarsForUser(
  userId: string,
  keepPath: string,
): Promise<void> {
  if (!supabase) return;
  const files = await listUserAvatarFiles(userId);
  const keepName = keepPath.split("/").pop();
  const paths = files
    .filter((name) => name !== keepName)
    .map((name) => `${userId}/${name}`);
  if (paths.length === 0) return;
  await supabase.storage.from(BUCKET).remove(paths);
}
