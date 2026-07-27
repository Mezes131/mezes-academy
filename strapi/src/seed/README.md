# Course seeds

## Export (from repo root)

```bash
npm run export:strapi-seed            # React course (default)
npm run export:strapi-seed -- svc     # Secure Vibe Coding
```

Writes `strapi/src/seed/data/<courseId>-course.json` from the live TypeScript
course registry (`src/data/courses/`).

## Import (Strapi running against Postgres)

With docker compose (the running container already uses port 1337, so start
the console on another port):

```bash
docker compose --env-file .env exec -e PORT=1338 strapi npm run strapi -- console
```

```js
const { importCourse } = require("./dist/src/seed/import-course");
await importCourse(strapi, "react");
await importCourse(strapi, "svc");
```

If the JSON is missing inside the container (`dist/src/seed/data/`), copy it in:

```bash
docker compose cp strapi/src/seed/data/svc-course.json strapi:/app/dist/src/seed/data/
```

All records are created/updated as **drafts** keyed by `legacyId`. Publish in
the admin UI after review. Re-running the importer updates matching `legacyId`
rows instead of duplicating.
