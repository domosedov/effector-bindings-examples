# Effector Skills

Пет-проект для изучения Effector, React Query, react-hook-form и Next.js 16 App Router.

## TikTok Business Dashboard

Личный кабинет для аналитики бизнес-аккаунта TikTok. Позволяет просматривать статистику аккаунта, анализировать видео и изучать аудиторию — всё в одном дашборде.

### Возможности

- **Обзор аккаунта** (`/tiktok`) — профиль, ключевые метрики (подписчики, лайки, видео), график роста подписчиков за 30 дней
- **Статистика видео** (`/tiktok/videos`) — таблица всех видео с просмотрами, лайками, комментариями и шерами; график вовлечённости; выбор видео для детального просмотра
- **Аналитика аудитории** (`/tiktok/audience`) — распределение по полу (PieChart), возрасту (BarChart), географии (горизонтальный BarChart), активность по часам (AreaChart)
- **OAuth-авторизация** — вход через TikTok Business с хранением токенов в HttpOnly cookies
- **Мок-режим** — полностью рабочий дашборд без реального TikTok API для локальной разработки

### Стек

- Next.js 16 (App Router), React 19
- Effector — UI-состояние (выбранное видео, вкладки, фильтры)
- React Query — серверное состояние с SSR prefetch
- Mantine UI 9 — компоненты интерфейса
- recharts — SVG-графики
- Zod v4 — валидация данных API

### Запуск

```bash
pnpm install
pnpm dev
```

По умолчанию включён мок-режим (`TIKTOK_USE_MOCKS=true` в `.env.local`). Откройте [http://localhost:3000/tiktok](http://localhost:3000/tiktok) для просмотра дашборда.

### Настройка реального TikTok API

1. Зарегистрируйте приложение на [TikTok for Developers](https://developers.tiktok.com/)
2. Заполните `.env.local`:

```
TIKTOK_CLIENT_KEY=ваш_client_key
TIKTOK_CLIENT_SECRET=ваш_client_secret
TIKTOK_REDIRECT_URI=http://localhost:3000/api/tiktok/callback
TIKTOK_USE_MOCKS=false
```

## Другие примеры

- **React Hook Form + Effector** (`/examples/rhf`) — форма с валидацией через Zod, интеграция RHF и Effector через `createFormFactory`
- **React Query** (`/examples/rq`) — пример server-side prefetch с `HydrationBoundary`

## Команды

| Команда       | Описание                           |
| ------------- | ---------------------------------- |
| `pnpm dev`    | Запуск dev-сервера                 |
| `pnpm build`  | Production-сборка                  |
| `pnpm lint`   | Линтинг (oxlint)                   |
| `pnpm format` | Форматирование (oxfmt)             |
| `pnpm check`  | Проверка форматирования и линтинга |
