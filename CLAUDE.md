# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the repo root via pnpm:

```bash
pnpm dev          # Start all apps (web on :3000, api on :3001)
pnpm build        # Build all packages and apps
pnpm lint         # Lint all packages
pnpm check-types  # TypeScript type-check all packages
pnpm format       # Format with Prettier
```

Run commands in a single app/package:

```bash
pnpm --filter @repo/shared build
pnpm --filter web dev
pnpm --filter api test
pnpm --filter api test:e2e
```

## Architecture

**Monorepo layout:**
- `apps/web` — Next.js 16 + React 19 + Tailwind CSS v4 frontend
- `apps/api` — NestJS 11 (Express) backend, runs on port 3001
- `packages/shared` — Shared TypeScript types and Zod schemas, compiled to `dist/`
- `packages/ui` — Radix UI component library used by web
- `packages/eslint-config` — Shared ESLint configs (base, next-js, react-internal)
- `packages/typescript-config` — Shared tsconfig presets (base, nextjs, react-library)

**Shared types (`packages/shared`):**
Types and schemas live in `src/index.ts` and are exported from the package. Both `apps/web` and `apps/api` import from `@repo/shared`. Zod is used for runtime validation schemas; types are inferred via `z.infer<>`. The package must be built (`pnpm --filter @repo/shared build`) before changes are picked up by consuming apps — in dev mode, Turbo handles this via `"dependsOn": ["^build"]`.

**API (`apps/api`):**
NestJS with standard module/controller/service pattern. TypeScript is configured with `emitDecoratorMetadata: true` and `experimentalDecorators: true` for NestJS decorators. Module resolution is `NodeNext`.

**Web (`apps/web`):**
Next.js App Router. Tailwind CSS v4 (PostCSS plugin). Components from `@repo/ui` are imported directly from source (`./src/*.tsx`), not compiled.
