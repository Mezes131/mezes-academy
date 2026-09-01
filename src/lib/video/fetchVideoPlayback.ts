export interface VideoPlaybackResponse {
  url: string;
  expiresAt: string;
}

export async function fetchVideoPlaybackUrl(
  supabaseUrl: string,
  accessToken: string,
  objectKey: string,
): Promise<VideoPlaybackResponse> {
  const res = await fetch(
    `${supabaseUrl}/functions/v1/video-playback?key=${encodeURIComponent(objectKey)}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  if (!res.ok) {
    throw new Error(`playback ${res.status}`);
  }
  return (await res.json()) as VideoPlaybackResponse;
}
