/**
 * CLI wrapper around the course importer. Loads a Strapi instance without
 * starting the HTTP server, so it can run next to a live container.
 *
 * Run (from the strapi app root, compiled):
 *   node dist/src/seed/run-import.js react svc
 *   node dist/src/seed/run-import.js svc:en
 */
import { createStrapi } from "@strapi/strapi";
import { importCourse } from "./import-course";

async function main() {
  const specs = process.argv.slice(2);
  if (specs.length === 0) specs.push("react");

  const app = await createStrapi({ distDir: "dist" }).load();
  try {
    for (const spec of specs) {
      const [courseId, locale = "fr"] = spec.split(":");
      await importCourse(app, courseId, locale);
    }
  } finally {
    await app.destroy();
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
