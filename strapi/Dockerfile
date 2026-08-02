# ── Build stage ───────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
# ponytail: registry idle timeouts on large Strapi trees; cache mount survives retries
RUN --mount=type=cache,target=/root/.npm \
    npm ci --fetch-retries=8 --fetch-retry-mintimeout=20000 \
      --fetch-retry-maxtimeout=180000 --fetch-timeout=900000

COPY . .
RUN npm run build

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app

RUN apk upgrade --no-cache

# Own the workdir once (cheap) then install/copy as node — avoid chown -R on node_modules
RUN chown node:node /app
USER node

COPY --chown=node:node package.json package-lock.json ./
RUN --mount=type=cache,target=/home/node/.npm,uid=1000,gid=1000 \
    npm ci --omit=dev --fetch-retries=8 --fetch-retry-mintimeout=20000 \
      --fetch-retry-maxtimeout=180000 --fetch-timeout=900000

COPY --chown=node:node . .
COPY --chown=node:node --from=builder /app/dist ./dist
# .dockerignore excludes public/uploads — recreate writable media dir at runtime
RUN mkdir -p public/uploads

EXPOSE 1337

# Strapi v5 health endpoint returns 204 on HEAD /_health
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget -qO- http://localhost:1337/_health || exit 1

CMD ["npm", "run", "start"]
