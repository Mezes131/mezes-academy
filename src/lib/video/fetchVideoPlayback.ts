export interface VideoPlaybackResponse {
  url: string;
  expiresAt: string;
}

export function resolveVideoPlaybackEndpoint(supabaseUrl: string): string {
  if (import.meta.env.DEV) {
    return "/api/video-playback";
  }
  return `${supabaseUrl}/functions/v1/video-playback`;
}

export async function fetchVideoPlaybackUrl(
  supabaseUrl: string,
  accessToken: string,
  objectKey: string,
): Promise<VideoPlaybackResponse> {
  const endpoint = resolveVideoPlaybackEndpoint(supabaseUrl);
  const res = await fetch(
    `${endpoint}?key=${encodeURIComponent(objectKey)}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  if (!res.ok) {
    throw new Error(`playback ${res.status}`);
  }
  return (await res.json()) as VideoPlaybackResponse;
}
