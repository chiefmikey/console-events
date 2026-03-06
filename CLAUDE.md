# Project CLAUDE.md - Console Events

## Project Overview

Isomorphic console event listener library. Wraps the native `console` object with an event-driven API — subscribe to any console method call (log, warn, error, etc.) and optionally `preventDefault()` to suppress output. Published to npm as `console-events`.

## Tech Stack

- **Language:** TypeScript (ESM, `"type": "module"`)
- **Runtime:** Node.js / Browser (isomorphic)
- **Build:** `tsc` compiles `src/` to `lib/`
- **Output:** `dist/` contains compiled JS + type declarations
- **Linting:** mikey-pro (ESLint 10 flat config)
- **Formatting:** Prettier via `mikey-pro/prettier`, Stylelint via `mikey-pro/stylelint`
- **Publishing:** npm (`console-events`), yalc for local dev

## Commands

```bash
npm run build             # Compile TypeScript (tsc)
npm run publish-local     # Build + publish to yalc (local dev)
npm run publish-prod      # Build + publish to npm (public)
```

## Conventions

- ESM only (`"type": "module"`)
- Entry point: `index.ts` re-exports from `src/ConsoleEvents.ts`
- Published files: `lib/`, `README.md`, `LICENSE`
- No test framework configured
- Conventional commits: `feat:`, `fix:`, `chore:`, etc.
