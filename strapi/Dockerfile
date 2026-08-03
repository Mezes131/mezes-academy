# ── Build stage: compile admin ────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
# ponytail: registry idle timeouts on large Strapi trees; cache mount survives retries
RUN --mount=type=cache,target=/root/.npm \
    npm ci --fetch-retries=8 --fetch-retry-mintimeout=20000 \
      --fetch-retry-maxtimeout=180000 --fetch-timeout=900000

COPY . .
RUN npm run build

# ── Runtime: prod deps only, no system npm (avoids Trivy noise on npm's tree) ─
FROM node:20-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app

RUN apk upgrade --no-cache \
  && chown node:node /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --fetch-retries=8 --fetch-retry-mintimeout=20000 \
      --fetch-retry-maxtimeout=180000 --fetch-timeout=900000 \
  # Admin already built — drop Vite only. Keep esbuild: `strapi start` loads config/*.ts via esbuild-register.
  && find node_modules -type d -name vite -print0 | xargs -0 -r rm -rf \
  # Strip toolchain shipped with the Node image (not needed at runtime)
  && rm -rf \
    /usr/local/lib/node_modules/npm \
    /usr/local/lib/node_modules/corepack \
    /opt/yarn* \
    /usr/local/bin/npm \
    /usr/local/bin/npx \
    /usr/local/bin/corepack \
    /usr/local/bin/yarn \
    /usr/local/bin/yarnpkg \
  && chown -R node:node /app

USER node

COPY --chown=node:node . .
COPY --chown=node:node --from=builder /app/dist ./dist
# .dockerignore excludes public/uploads — recreate writable media dir at runtime
RUN mkdir -p public/uploads

EXPOSE 1337

# Strapi v5 health endpoint returns 204 on HEAD /_health
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget -qO- http://localhost:1337/_health || exit 1

# No npm in image — call the CLI entrypoint directly
CMD ["sh", "-c", "mkdir -p /app/public/uploads && node node_modules/@strapi/strapi/bin/strapi.js start"]
