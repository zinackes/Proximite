# syntax=docker/dockerfile:1
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
RUN --mount=type=cache,target=/root/.npm \
    npm install -g turbo@2.8.12
WORKDIR /app

FROM base AS pruner
COPY . .
RUN turbo prune api --docker

FROM base AS installer
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --store-dir=/pnpm/store

FROM base AS builder
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
RUN --mount=type=cache,id=turbo-api,target=/app/.turbo \
    turbo run build --filter=api
RUN pnpm --filter api deploy --prod /prod

FROM node:20-alpine AS runner
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nestjs
WORKDIR /app
COPY --from=builder --chown=nestjs:nodejs /prod/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./dist
USER nestjs
ENV NODE_ENV=production PORT=3001
EXPOSE 3001
CMD ["node", "dist/main"]
