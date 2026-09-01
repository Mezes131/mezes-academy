import type { Plugin } from "vite";
import type { ServerResponse } from "node:http";
import { URL } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isValidVideoKey } from "./supabase/functions/_shared/video-key";

function isEntitlementActive(expiresAt: string | null): boolean {
  if (!expiresAt) return true;
  return new Date(expiresAt) > new Date();
}

function sendJson(res: ServerResponse, status: number, body: Record<string, unknown>) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

/**
 * Dev-only: signs MinIO URLs locally because Supabase Edge cannot reach localhost:9000.
 */
export function devVideoPlaybackPlugin(env: Record<string, string>): Plugin {
  return {
    name: "dev-video-playback",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/video-playback")) {
          next();
          return;
        }

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== "GET") {
          sendJson(res, 405, { error: "Method not allowed" });
          return;
        }

        try {
          const authHeader = req.headers.authorization;
          if (!authHeader?.startsWith("Bearer ")) {
            sendJson(res, 401, { error: "Unauthorized" });
            return;
          }

          const supabaseUrl = env.VITE_SUPABASE_URL;
          const anonKey =
            env.VITE_SUPABASE_ANON_KEY ?? env.VITE_SUPABASE_PUBLISHABLE_KEY;
          if (!supabaseUrl || !anonKey) {
            sendJson(res, 500, { error: "Supabase env missing" });
            return;
          }

          const token = authHeader.slice("Bearer ".length);
          const authClient = createClient(supabaseUrl, anonKey);
          const { data: userData, error: userError } =
            await authClient.auth.getUser(token);
          if (userError || !userData.user) {
            sendJson(res, 401, { error: "Unauthorized" });
            return;
          }

          const requestUrl = new URL(req.url, "http://localhost");
          const key = requestUrl.searchParams.get("key")?.trim() ?? "";
          if (!isValidVideoKey(key)) {
            sendJson(res, 400, { error: "Invalid key" });
            return;
          }

          const userClient = createClient(supabaseUrl, anonKey, {
            global: { headers: { Authorization: `Bearer ${token}` } },
          });
          const { data: rows, error: entError } = await userClient
            .from("entitlements")
            .select("expires_at")
            .eq("user_id", userData.user.id)
            .eq("feature", "video_access");

          if (entError) {
            console.error("[dev-video-playback] entitlement", entError.message);
            sendJson(res, 500, { error: "Entitlement check failed" });
            return;
          }

          const hasAccess = (rows ?? []).some((r) =>
            isEntitlementActive(r.expires_at ?? null),
          );
          if (!hasAccess) {
            sendJson(res, 403, { error: "Forbidden" });
            return;
          }

          const endpoint = env.MINIO_ENDPOINT ?? "http://localhost:9000";
          const accessKey = env.MINIO_ACCESS_KEY ?? env.MINIO_ROOT_USER;
          const secretKey = env.MINIO_SECRET_KEY ?? env.MINIO_ROOT_PASSWORD;
          const bucket = env.MINIO_BUCKET ?? "mezes-videos";
          const ttl = Number(env.VIDEO_SIGNED_URL_TTL_SECONDS ?? "3600");

          if (!accessKey || !secretKey) {
            sendJson(res, 500, { error: "MinIO credentials missing in .env" });
            return;
          }

          const minioEndpoint = endpoint.startsWith("http")
            ? endpoint
            : `http://${endpoint}`;

          const client = new S3Client({
            region: env.MINIO_REGION ?? "us-east-1",
            endpoint: minioEndpoint,
            forcePathStyle: true,
            credentials: {
              accessKeyId: accessKey,
              secretAccessKey: secretKey,
            },
          });

          const signedUrl = await getSignedUrl(
            client,
            new GetObjectCommand({ Bucket: bucket, Key: key }),
            { expiresIn: ttl },
          );
          const expiresAt = new Date(Date.now() + ttl * 1000).toISOString();

          sendJson(res, 200, { url: signedUrl, expiresAt });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown error";
          console.error("[dev-video-playback]", message);
          sendJson(res, 500, { error: "Playback failed" });
        }
      });
    },
  };
}
