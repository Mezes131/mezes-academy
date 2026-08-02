# Build stage: compile TypeScript and bundle with Vite
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
# ponytail: retries/timeouts because the Sandpack deps are large and the registry
# connection resets mid-download; upgrade path is a local registry mirror.
RUN npm ci --fetch-retries=8 --fetch-retry-mintimeout=20000 \
      --fetch-retry-maxtimeout=180000 --fetch-timeout=900000

COPY . .

# Build-time env vars for Vite (.env* is dockerignored — must come from build args)
ARG VITE_STRAPI_URL=
ARG VITE_SUPABASE_URL=
ARG VITE_SUPABASE_ANON_KEY=
ARG VITE_SUPABASE_PUBLISHABLE_KEY=
ARG VITE_STRAPI_CONTENT_ENABLED=

ENV VITE_STRAPI_URL=$VITE_STRAPI_URL \
    VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
    VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY \
    VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY \
    VITE_STRAPI_CONTENT_ENABLED=$VITE_STRAPI_CONTENT_ENABLED

RUN npm run build

# Serve stage: unprivileged Nginx (listens on 8080, runs as non-root)
FROM nginxinc/nginx-unprivileged:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Explicit non-root (image default is nginx/101; Trivy DS-0002 requires USER in this file)
USER nginx
EXPOSE 8080
