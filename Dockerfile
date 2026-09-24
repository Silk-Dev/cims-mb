# CIMS Radiologie — production image (Next.js + Payload CMS)
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat && corepack enable pnpm
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# The build does not need a database: pages are rendered on first request and cached.
RUN DATABASE_URL=postgres://build:build@127.0.0.1:1/build PAYLOAD_SECRET=build pnpm build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app ./
RUN mkdir -p media && chown -R node:node media .next
USER node
EXPOSE 3000
# Committed migrations run automatically on start (prodMigrations).
CMD ["pnpm", "start"]
