# Course seeds

## Export (from repo root)

```bash
npm run export:strapi-seed            # React course (default)
npm run export:strapi-seed -- svc     # Secure Vibe Coding
```

Writes `strapi/src/seed/data/<courseId>-course.json` from the live TypeScript
course registry (`src/data/courses/`).

## Import (Strapi running against Postgres)

The importer uses the Strapi v5 **Documents API**, so dynamic zones (lesson
content blocks) are populated. One-shot CLI (loads Strapi without starting
the HTTP server, safe next to the live container):

```bash
docker compose --env-file .env exec strapi node dist/src/seed/run-import.js react svc
```

Also available from `strapi console`:

```js
const { importCourse } = require("./dist/src/seed/import-course");
await importCourse(strapi, "svc");
```

If the compiled files or JSON are missing inside the container
(`dist/src/seed/`), compile locally (`npx tsc -p tsconfig.json` in `strapi/`)
and copy them in:

```bash
docker compose cp strapi/dist/src/seed/run-import.js strapi:/app/dist/src/seed/
docker compose cp strapi/dist/src/seed/import-course.js strapi:/app/dist/src/seed/
docker compose cp strapi/dist/src/seed/data/svc-course.json strapi:/app/dist/src/seed/data/
```

All records are created/updated as **drafts** keyed by `legacyId`. Publish in
the admin UI after review. Re-running the importer updates matching `legacyId`
documents instead of duplicating.
