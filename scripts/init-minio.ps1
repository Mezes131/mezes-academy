# Create the private MinIO bucket (run once after minio is up).
# Usage: .\scripts\init-minio.ps1
# Requires: MinIO running on localhost:9000 (docker compose up -d minio)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$envFile = Join-Path $root ".env"

$user = "minioadmin"
$pass = "minioadmin"
$bucket = "mezes-videos"

if (Test-Path $envFile) {
  foreach ($line in Get-Content $envFile) {
    if ($line -match '^\s*MINIO_ROOT_USER=(.+)$') { $user = $matches[1].Trim() }
    if ($line -match '^\s*MINIO_ROOT_PASSWORD=(.+)$') { $pass = $matches[1].Trim() }
    if ($line -match '^\s*MINIO_BUCKET=(.+)$') { $bucket = $matches[1].Trim() }
  }
}

Write-Host "Initializing MinIO bucket '$bucket' on localhost:9000 ..."

$cmd = "mc alias set local http://host.docker.internal:9000 $user $pass && mc mb --ignore-existing local/$bucket && mc anonymous set none local/$bucket"
docker run --rm minio/mc:latest /bin/sh -c $cmd

Write-Host "Done. Bucket '$bucket' is ready."
