# syntax=docker/dockerfile:1
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
RUN --mount=type=cache,target=/root/.npm \
    npm install -g turbo@2.8.12
WORKDIR /app

FROM base AS pruner
COPY . .
RUN turbo prune web --docker

FROM base AS installer
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/full/.npmrc .
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --store-dir=/pnpm/store

FROM base AS builder
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
ENV NEXT_TELEMETRY_DISABLED=1
RUN --mount=type=cache,id=turbo-web,target=/app/.turbo \
    --mount=type=cache,id=next-cache,target=/app/apps/web/.next/cache \
    turbo run build --filter=web

FROM node:20-alpine AS runner
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
WORKDIR /app
# standalone contient uniquement les fichiers nécessaires (sans node_modules complets)
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
# Les assets statiques doivent être copiés séparément (non inclus dans standalone)
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
USER nextjs
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
