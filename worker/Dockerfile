FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
# Shrink known Alpine/OS CVEs picked up by image scans
RUN apk upgrade --no-cache
RUN chown node:node /app
USER node
COPY --chown=node:node package.json package-lock.json* ./
RUN npm install --omit=dev
COPY --chown=node:node --from=builder /app/dist ./dist
EXPOSE 8090
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8090/health || exit 1
CMD ["node", "dist/index.js"]
