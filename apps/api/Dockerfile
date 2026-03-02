FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
RUN npm install -g turbo@2.8.12
WORKDIR /app

FROM base AS pruner
COPY . .
RUN turbo prune api --docker

FROM base AS installer
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
RUN turbo run build --filter=api
RUN pnpm --filter api deploy --prod /prod

FROM node:20-alpine AS runner
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nestjs
WORKDIR /app
COPY --from=builder /prod/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist
USER nestjs
ENV NODE_ENV=production PORT=3001
EXPOSE 3001
CMD ["node", "dist/main"]
