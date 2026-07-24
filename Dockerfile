# Build stage: compile TypeScript and bundle with Vite
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build-time env vars for Vite — safe empty defaults, no secrets baked in
ARG VITE_STRAPI_URL=
ARG VITE_SUPABASE_URL=
ARG VITE_SUPABASE_ANON_KEY=

RUN npm run build

# Serve stage: unprivileged Nginx (listens on 8080, runs as non-root)
FROM nginxinc/nginx-unprivileged:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
