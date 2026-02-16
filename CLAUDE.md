# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm dev` — start Next.js dev server
- `pnpm build` — production build
- `pnpm lint` — lint with oxlint (type-aware)
- `pnpm lint:fix` — lint and auto-fix
- `pnpm format` — format with oxfmt
- `pnpm check` — run both format check and lint check

## Tech Stack

- **Next.js 16** (App Router) with React 19 and React Compiler enabled
- **Effector** for state management with `@effector/next` for SSR scope support and `@effector/swc-plugin` for SID injection
- **react-hook-form** with zod resolvers for form handling
- **@withease/factories** for creating reusable effector factories
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **oxlint** / **oxfmt** for linting and formatting (not ESLint/Prettier)
- **pnpm** as package manager

## Architecture

- `src/app/` — Next.js App Router pages and layouts. Root layout wraps children with `<EffectorNext>` for effector scope propagation.
- `src/form-factory.ts` — Core library: a `createFormFactory` built with `@withease/factories` that bridges react-hook-form's `createFormControl` with effector. It exposes a `$formControl` store and typed effector effects (`setValueFx`, `resetFx`, `setErrorFx`, etc.) that delegate to the underlying form control via `attach`. The `handleSubmit` wrapper integrates an optional effector `onSubmit` event using `scopeBind`.

## Code Style

- No semicolons, single quotes, JSX single quotes (configured in `.oxfmtrc.json`)
- Path alias: `@/*` maps to `./src/*`
