import type { LessonProgress } from "@/types";
import { supabase } from "@/lib/supabase";

interface UserProgressRow {
  user_id: string;
  progress: Partial<LessonProgress> | null;
}

export async function loadRemoteProgress(
  userId: string,
): Promise<Partial<LessonProgress> | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("user_progress")
    .select("user_id, progress")
    .eq("user_id", userId)
    .maybeSingle<UserProgressRow>();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return data?.progress ?? null;
}

export async function saveRemoteProgress(
  userId: string,
  progress: LessonProgress,
): Promise<void> {
  if (!supabase) return;

  const { error } = await supabase.from("user_progress").upsert(
    {
      user_id: userId,
      progress,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (error) throw error;
}
