# Agent Guidelines

## Commands
- Build all: `pnpm build` — Dev all: `pnpm dev` — Docker: `just dev up` / `just dev down` / `just dev reset`
- Lint dashboard: `pnpm --filter @arrhes/application-dashboard run lint`
- Typecheck dashboard: `packages/dashboard/node_modules/.bin/tsc --noEmit --project packages/dashboard/tsconfig.json`
- No test framework exists in this repository.

## Monorepo Layout
`packages/{api, dashboard, metadata, tools, ui}` — all ESM (`"type": "module"`), TypeScript strict mode.
- **api** (`@arrhes/application-api`): Hono backend, Drizzle ORM, PostgreSQL, Nodemailer, Puppeteer, S3
- **dashboard** (`@arrhes/application-dashboard`): React 19, TanStack Router/Query/Table, React Hook Form, Radix UI primitives, Panda CSS
- **metadata** (`@arrhes/application-metadata`): Shared models, schemas (valibot), route definitions. Consumed via subpath exports (`@arrhes/application-metadata/models`, `/schemas`, `/routes`, `/components`)
- **ui** (`@arrhes/ui`): Shared components/styles/fonts using Panda CSS. Consumed via `@arrhes/ui`, `@arrhes/ui/utilities/cn.js`, `@arrhes/ui/styled-system/css`
- **tools** (`@arrhes/application-tools`): DB migrations/seeds via drizzle-kit and tsx scripts

## Code Style
- **Imports**: all use relative paths with `.ts`/`.tsx` extensions (dashboard) or `.js` extensions (api, metadata). Cross-package via `@arrhes/*`. No path aliases are used in practice. Order: workspace packages → external deps → relative internal.
- **Files**: all `camelCase.ts[x]` (including components). Barrel files are `_index.ts`.
- **Exports**: components `PascalCase` functions, models/schemas/utilities `camelCase`. Models use `Model` suffix (`accountModel`), schemas have no suffix.
- **Validation**: `import * as v from "valibot"` — use `v.object()`, `v.string()`, `v.InferOutput<>`.
- **Styling**: Panda CSS via `css()` and `cx()` from `@arrhes/ui/utilities/cn.js`. Component variants via `class-variance-authority`.
- **IDs**: nanoid with custom alphabet, 16 chars.
- **Error handling**: try/catch with structured logging in API; toast notifications in dashboard; structured error responses via Hono.
