import { S3Client, GetObjectCommand } from "https://esm.sh/@aws-sdk/client-s3@3.758.0";
import { getSignedUrl } from "https://esm.sh/@aws-sdk/s3-request-presigner@3.758.0";
import { corsHeaders } from "../_shared/cors.ts";
import {
  createServiceClient,
  getUserFromRequest,
} from "../_shared/billing-helpers.ts";
import { isValidVideoKey } from "../_shared/video-key.ts";

function isEntitlementActive(expiresAt: string | null): boolean {
  if (!expiresAt) return true;
  return new Date(expiresAt) > new Date();
}

function createMinioClient() {
  const endpoint = Deno.env.get("MINIO_ENDPOINT");
  const accessKey = Deno.env.get("MINIO_ACCESS_KEY");
  const secretKey = Deno.env.get("MINIO_SECRET_KEY");
  const region = Deno.env.get("MINIO_REGION") ?? "us-east-1";
  if (!endpoint || !accessKey || !secretKey) {
    throw new Error("MinIO credentials are not configured");
  }
  return new S3Client({
    region,
    endpoint,
    forcePathStyle: true,
    credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
  });
}

function json(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const user = await getUserFromRequest(req);
    if (!user) return json({ error: "Unauthorized" }, 401);

    const url = new URL(req.url);
    const key = url.searchParams.get("key")?.trim() ?? "";
    if (!isValidVideoKey(key)) {
      return json({ error: "Invalid key" }, 400);
    }

    const supabase = createServiceClient();
    const { data: rows, error: entError } = await supabase
      .from("entitlements")
      .select("expires_at")
      .eq("user_id", user.id)
      .eq("feature", "video_access");

    if (entError) {
      console.error("[video-playback] entitlement", entError.message);
      return json({ error: "Entitlement check failed" }, 500);
    }

    const hasAccess = (rows ?? []).some((r) =>
      isEntitlementActive(r.expires_at ?? null),
    );
    if (!hasAccess) return json({ error: "Forbidden" }, 403);

    const bucket = Deno.env.get("MINIO_BUCKET") ?? "mezes-videos";
    const ttl = Number(Deno.env.get("VIDEO_SIGNED_URL_TTL_SECONDS") ?? "3600");
    const client = createMinioClient();
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const signedUrl = await getSignedUrl(client, command, { expiresIn: ttl });
    const expiresAt = new Date(Date.now() + ttl * 1000).toISOString();

    return json({ url: signedUrl, expiresAt }, 200);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message.includes("NoSuchKey") || message.includes("Not Found")) {
      return json({ error: "Not found" }, 404);
    }
    console.error("[video-playback]", message);
    return json({ error: "Playback failed" }, 500);
  }
});
