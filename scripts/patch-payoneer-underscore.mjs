import { cpSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PATCHED_VERSION = "1.13.8";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const patched = join(root, "node_modules", "underscore");
const bundled = join(
  root,
  "node_modules",
  "@payoneer",
  "op-payment-widget-v3",
  "node_modules",
  "underscore",
);
const lockfile = join(root, "package-lock.json");

function patchBundledUnderscore() {
  if (!existsSync(patched) || !existsSync(bundled)) {
    return;
  }

  cpSync(patched, bundled, { recursive: true, force: true });
}

function syncLockfileUnderscoreVersion() {
  if (!existsSync(lockfile)) {
    return;
  }

  const marker =
    '"node_modules/@payoneer/op-payment-widget-v3/node_modules/underscore"';
  const source = readFileSync(lockfile, "utf8");
  const start = source.indexOf(marker);

  if (start === -1) {
    return;
  }

  const updated = source.replace(
    /("node_modules\/@payoneer\/op-payment-widget-v3\/node_modules\/underscore":\s*\{\s*"version":\s*")[^"]+(")/,
    `$1${PATCHED_VERSION}$2`,
  );

  if (updated !== source) {
    writeFileSync(lockfile, updated);
  }
}

patchBundledUnderscore();
syncLockfileUnderscoreVersion();
