# Agent Guidelines

## Commands
- Build (all packages): `pnpm build` (recursive across packages)
- Dev (parallel): `pnpm dev`
- Lint: `pnpm -w --filter packages/platform run lint` (or `cd packages/platform && npm run lint`)
- Test: repository has no global test framework; to run a single package/test, install its dev deps and run that package's test script, e.g. `cd packages/tools && pnpm test` or `pnpm -w --filter packages/tools test`

## Code Style
- Imports: external deps first, then internal; use package-specific path prefixes: `#/` (api), `#/*` (platform), `#src/*` (metadata)
- Formatting & Types: TypeScript strict mode enabled; ES modules (`"type": "module"`); API uses Hono JSX; Platform uses React with StrictMode; use `valibot` for validation
- Naming: models `camelCase` with `Model` suffix (e.g. `accountModel`), files `camelCase.ts[x]`, components `PascalCase.tsx`, utilities `camelCase.ts`
- Error handling: prefer try/catch with structured logging; handle `uncaughtException` and `unhandledRejection` in server entry; return structured error responses via Hono

## Contributing Notes
- Monorepo layout: `packages/{api,platform,metadata,tools}`
- Prefer editing existing files; follow local tsconfig and lint rules
- Running a single test: use package scope with PNPM filters: `pnpm -w --filter packages/<pkg> test`

## Tooling Rules
- No Cursor or Copilot rules detected in `.cursor/` or `.github/copilot-instructions.md`; if added, include them here and follow their directives.

(Keep this file short; agents must follow these conventions when modifying code.)