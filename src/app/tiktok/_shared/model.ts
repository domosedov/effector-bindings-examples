import { createEvent, createStore } from 'effector'

export const $isAuthenticated = createStore(false)
export const setAuthenticated = createEvent<boolean>()
$isAuthenticated.on(setAuthenticated, (_, v) => v)

export const $dateRange = createStore<{ from: string; to: string }>({
  from: new Date(Date.now() - 30 * 86400 * 1000).toISOString().slice(0, 10),
  to: new Date().toISOString().slice(0, 10),
})
export const setDateRange = createEvent<{ from: string; to: string }>()
$dateRange.on(setDateRange, (_, v) => v)
