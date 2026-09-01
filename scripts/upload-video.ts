/**
 * Upload a local MP4 to MinIO (S3-compatible).
 * Usage: npx tsx scripts/upload-video.ts <local-file> <object-key>
 * Env: MINIO_ENDPOINT, MINIO_ACCESS_KEY, MINIO_SECRET_KEY, MINIO_BUCKET
 */
import { readFileSync } from "node:fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const [localPath, objectKey] = process.argv.slice(2);
if (!localPath || !objectKey) {
  console.error("usage: npx tsx scripts/upload-video.ts <local-file> <object-key>");
  process.exit(1);

}

const endpoint = process.env.MINIO_ENDPOINT ?? "http://localhost:9000";
const accessKey = process.env.MINIO_ACCESS_KEY ?? process.env.MINIO_ROOT_USER;
const secretKey = process.env.MINIO_SECRET_KEY ?? process.env.MINIO_ROOT_PASSWORD;
const bucket = process.env.MINIO_BUCKET ?? "mezes-videos";
const region = process.env.MINIO_REGION ?? "us-east-1";

if (!accessKey || !secretKey) {
  console.error("Set MINIO_ACCESS_KEY/MINIO_SECRET_KEY or MINIO_ROOT_USER/MINIO_ROOT_PASSWORD");
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

console.log(`Uploaded ${localPath} → ${bucket}/${objectKey}`);
