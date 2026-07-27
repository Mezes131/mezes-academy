# Course seeds

## Export (from repo root)

```bash
npm run export:strapi-seed                         # React FR (default)
npm run export:strapi-seed -- svc                  # SVC FR
npm run export:strapi-seed -- svc --locale en      # SVC EN
```

Writes:

- `strapi/src/seed/data/<courseId>-course.<locale>.json`
- `strapi/src/seed/data/<courseId>-course.json` for `fr` (compat)

Payload includes a top-level `locale` field for the importer.

## Import (Strapi running against Postgres)

Locales `fr` (default) and `en` must exist in Strapi i18n (Settings → Internationalization). Content-types for course / phase / module / lesson / exercise / quiz are localized.

```bash
# FR (default file)
docker compose --env-file .env exec strapi node dist/src/seed/run-import.js react svc

# EN (pass locale as 3rd arg pattern: course:locale)
docker compose --env-file .env exec strapi node dist/src/seed/run-import.js svc:en
```

From `strapi console`:

```js
const { importCourse } = require("./dist/src/seed/import-course");
await importCourse(strapi, "svc", "fr");
await importCourse(strapi, "svc", "en");
```

All records are created/updated as **drafts** keyed by `legacyId` **per locale**. Publish in the admin UI after review.
