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

- **Next.js 16** (App Router) with React 19 and React Compiler (`babel-plugin-react-compiler`)
- **Effector** for state management with `@effector/next` for SSR scope support and `@effector/swc-plugin` for SID injection
- **react-hook-form** v7 with `@hookform/resolvers` and **Zod v4** for form validation
- **@withease/factories** — `createFactory` for defining reusable effector factories, `invoke` for instantiation
- **effector-use-unit-shape** — `useUnitShape` hook for binding effector stores/effects to React components
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **oxlint** / **oxfmt** for linting and formatting (not ESLint/Prettier)
- **pnpm** as package manager

## Architecture

- `src/app/` — Next.js App Router pages and layouts. Root layout wraps children with `<EffectorNext>` for effector scope propagation.
- `src/app/_example/` — Example feature using the form factory. `model.ts` defines the effector model (schema, factory invocation), `ui.tsx` is the `'use client'` component consuming it via `useUnitShape` + `useForm`.
- `src/form-factory.ts` — Core library: `createFormFactory` built with `createFactory` from `@withease/factories`. Bridges react-hook-form's `createFormControl` with effector. Returns:
  - `$formControl` — effector store holding the form control instance
  - Effects wrapping all form control methods: `setValueFx`, `resetFx`, `setErrorFx`, `setFocusFx`, `clearErrorsFx`, `getValuesFx`, `getFieldStateFx`, `resetFieldFx`, `triggerFx` — each uses `attach` to read form control from the store
  - `__` — internal access to the patched `formControl` instance (with `handleSubmit` wrapper)
  - `handleSubmit` is patched to integrate optional effector `onSubmit` and `onInvalid` events/effects via `scopeBind`
  - Uses `ParamsToObject` utility type to convert tuple parameters into named object params for better DX

## Code Style

- No semicolons, single quotes, JSX single quotes (configured in `.oxfmtrc.json`)
- Import sorting enabled via `experimentalSortImports`: type imports first, then value imports, grouped by builtin → external → internal → relative, with newlines between groups
- Tailwind class sorting enabled via `experimentalTailwindcss` in oxfmt (stylesheet: `src/app/globals.css`)
- Path alias: `@/*` maps to `./src/*`
- Feature folders use `model.ts` / `ui.tsx` convention
