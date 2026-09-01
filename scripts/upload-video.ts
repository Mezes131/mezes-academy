/**
 * Upload a local MP4 to MinIO (S3-compatible).
 * Usage: npx tsx scripts/upload-video.ts <local-file> <object-key>
 * Reads react-learn/.env (MINIO_ROOT_USER, MINIO_ROOT_PASSWORD, MINIO_BUCKET, MINIO_ENDPOINT).
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const envPath = resolve(rootDir, ".env");

function loadDotEnv(path: string) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

function resolveMinioEndpoint(raw: string | undefined): string {
  const value = raw?.trim();
  if (!value) return "http://localhost:9000";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  // docker hostname — script runs on the host, not inside compose network
  if (value.startsWith("minio:")) return "http://localhost:9000";
  return `http://${value}`;
}

loadDotEnv(envPath);

const [localPath, objectKey] = process.argv.slice(2);
if (!localPath || !objectKey) {
  console.error("usage: npx tsx scripts/upload-video.ts <local-file> <object-key>");
  process.exit(1);
}

const endpoint = resolveMinioEndpoint(process.env.MINIO_ENDPOINT);
const accessKey = process.env.MINIO_ACCESS_KEY ?? process.env.MINIO_ROOT_USER;
const secretKey = process.env.MINIO_SECRET_KEY ?? process.env.MINIO_ROOT_PASSWORD;
const bucket = process.env.MINIO_BUCKET ?? "mezes-videos";
const region = process.env.MINIO_REGION ?? "us-east-1";

if (!accessKey || !secretKey) {
  console.error(
    "Missing MinIO credentials. Set MINIO_ROOT_USER/MINIO_ROOT_PASSWORD in .env",
  );
  process.exit(1);
}

if (!existsSync(localPath)) {
  console.error(`File not found: ${localPath}`);
  process.exit(1);
}

const client = new S3Client({
  region,
  endpoint,
  forcePathStyle: true,
  credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
});

const body = readFileSync(localPath);

await client.send(
  new PutObjectCommand({
    Bucket: bucket,
    Key: objectKey,
    Body: body,
    ContentType: "video/mp4",
  }),
);

console.log(`Uploaded ${localPath} → ${endpoint}/${bucket}/${objectKey}`);
