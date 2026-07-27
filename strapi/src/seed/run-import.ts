/**
 * CLI wrapper around the course importer. Loads a Strapi instance without
 * starting the HTTP server, so it can run next to a live container.
 *
 * Run (from the strapi app root, compiled):
 *   node dist/src/seed/run-import.js react svc
 */
import { createStrapi } from "@strapi/strapi";
import { importCourse } from "./import-course";

async function main() {
  const courseIds = process.argv.slice(2);
  if (courseIds.length === 0) courseIds.push("react");

  const app = await createStrapi({ distDir: "dist" }).load();
  try {
    for (const courseId of courseIds) {
      await importCourse(app, courseId);
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
