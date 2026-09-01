import { describe, expect, it, vi, afterEach } from "vitest";
import { fetchVideoPlaybackUrl } from "./fetchVideoPlayback";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("fetchVideoPlaybackUrl", () => {
  it("returns signed url on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          url: "https://minio.example/signed",
          expiresAt: "2030-01-01T00:00:00Z",
        }),
      }),
    );

    const result = await fetchVideoPlaybackUrl(
      "https://proj.supabase.co",
      "token-abc",
      "courses/react/phase-core/modules/react-core-m06.mp4",
    );

    expect(result.url).toBe("https://minio.example/signed");
    expect(fetch).toHaveBeenCalledWith(
      "https://proj.supabase.co/functions/v1/video-playback?key=courses%2Freact%2Fphase-core%2Fmodules%2Freact-core-m06.mp4",
      { headers: { Authorization: "Bearer token-abc" } },
    );
  });

  it("throws on 403", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 403 }),
    );

    await expect(
      fetchVideoPlaybackUrl("https://proj.supabase.co", "token", "courses/x.mp4"),
    ).rejects.toThrow("playback 403");
  });
});
