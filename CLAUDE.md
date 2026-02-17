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
- **Mantine UI 9** via `@mantine/core` and `@mantine/hooks`
- **oxlint** / **oxfmt** for linting and formatting (not ESLint/Prettier)
- **pnpm** as package manager

## Architecture

- `src/app/` — Next.js App Router pages and layouts. Root layout wraps children with `<EffectorNext>` for effector scope propagation.
- `src/shared/ui/navigation.tsx` — Global navigation (`AppShell`) with header links and footer (Terms, Privacy).
- `src/shared/lib/tiktok/` — TikTok integration utilities:
  - `config.ts` — API URLs, scopes, env helpers (`getTiktokConfig`, `useMocks`)
  - `token.ts` — AES-256-GCM token encryption, HttpOnly cookie management (`setTokens`, `getAccessToken`, `hasToken`, `clearTokens`)
- `src/app/tiktok/` — TikTok Business Dashboard feature:
  - `layout.tsx` — client layout with Mantine `Tabs` (Overview / Videos / Audience)
  - `page.tsx` — server component: shows "Login with TikTok" if unauthenticated, otherwise prefetches account data and renders `OverviewContent`
  - `_shared/types.ts` — Zod schemas for Account, Video, Audience, FollowerTrend
  - `_shared/mock-data.ts` — realistic mock data for dev mode (`TIKTOK_USE_MOCKS=true`)
  - `_shared/api.ts` — React Query keys and fetch helpers
  - `_shared/model.ts` — Effector stores: `$isAuthenticated`, `$dateRange`
  - `_overview/ui.tsx` — client component: profile header, stat cards, follower trend LineChart (recharts)
  - `videos/page.tsx` + `videos/_page/model.ts` + `videos/_page/ui.tsx` — video list with table, selection via `$selectedVideoId`, engagement BarChart
  - `audience/page.tsx` + `audience/_page/model.ts` + `audience/_page/ui.tsx` — audience analytics with `SegmentedControl` tabs (`$activeTab`): demographics PieChart, geo BarChart, activity AreaChart
  - `loading.tsx`, `videos/loading.tsx`, `audience/loading.tsx` — skeleton loaders
- `src/app/api/tiktok/` — API route handlers (proxy to TikTok API or return mocks):
  - `auth/route.ts` — OAuth redirect to TikTok
  - `callback/route.ts` — code→token exchange, saves encrypted cookies
  - `account/route.ts`, `videos/route.ts`, `audience/route.ts` — data proxies
- `src/app/terms/page.tsx`, `src/app/privacy/page.tsx` — Terms of Service and Privacy Policy pages
- `src/app/_example/` — Example feature using the form factory. `model.ts` defines the effector model (schema, factory invocation), `ui.tsx` is the `'use client'` component consuming it via `useUnitShape` + `useForm`.
- `src/form-factory.ts` — Core library: `createFormFactory` built with `createFactory` from `@withease/factories`. Bridges react-hook-form's `createFormControl` with effector. Returns:
  - `$formControl` — effector store holding the form control instance
  - Effects wrapping all form control methods: `setValueFx`, `resetFx`, `setErrorFx`, `setFocusFx`, `clearErrorsFx`, `getValuesFx`, `getFieldStateFx`, `resetFieldFx`, `triggerFx` — each uses `attach` to read form control from the store
  - `__` — internal access to the patched `formControl` instance (with `handleSubmit` wrapper)
  - `handleSubmit` is patched to integrate optional effector `onSubmit` and `onInvalid` events/effects via `scopeBind`
  - Uses `ParamsToObject` utility type to convert tuple parameters into named object params for better DX

## TikTok Dashboard: Data Flow

- **React Query** — серверное состояние (кеш, prefetch через `HydrationBoundary` + `dehydrate`)
- **Effector** — UI-состояние (выбранное видео, активная вкладка аудитории, фильтр дат)
- **recharts** — SVG-графики: LineChart (тренды), BarChart (демография, видео), PieChart (пол), AreaChart (активность)
- **Mock mode** — `TIKTOK_USE_MOCKS=true` в `.env.local` — route handlers возвращают моки, авторизация не требуется

## Env Variables

```
TIKTOK_CLIENT_KEY=          # TikTok app client key
TIKTOK_CLIENT_SECRET=       # TikTok app client secret
TIKTOK_REDIRECT_URI=http://localhost:3000/api/tiktok/callback
TIKTOK_USE_MOCKS=true       # true = mock data, false = real TikTok API
```

## Code Style

- No semicolons, single quotes, JSX single quotes (configured in `.oxfmtrc.json`)
- Import sorting enabled via `experimentalSortImports`: type imports first, then value imports, grouped by builtin → external → internal → relative, with newlines between groups
- Path alias: `@/*` maps to `./src/*`
- Feature folders use `model.ts` / `ui.tsx` convention
