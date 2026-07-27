# React course seed

## Export (from repo root)

```bash
npx tsx scripts/export-react-course-seed.ts
```

Writes `strapi/src/seed/data/react-course.json` from the live `reactCourse` TypeScript source.

## Import (Strapi running against Postgres)

```bash
cd strapi
npx strapi console
```

```js
const { importReactCourse } = require("./src/seed/import-react-course");
await importReactCourse(strapi);
```

All records are created/updated as **drafts** keyed by `legacyId`. Publish the first module in the admin UI after review.

Re-running the importer updates matching `legacyId` rows instead of duplicating.
