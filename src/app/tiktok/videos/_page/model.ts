import { createEvent, createStore } from 'effector'

export const $selectedVideoId = createStore<string | null>(null)
export const selectVideo = createEvent<string | null>()
$selectedVideoId.on(selectVideo, (_, id) => id)
