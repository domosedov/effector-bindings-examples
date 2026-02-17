import { createEvent, createStore } from 'effector'

export type AudienceTab = 'demographics' | 'geography' | 'activity'

export const $activeTab = createStore<AudienceTab>('demographics')
export const setActiveTab = createEvent<AudienceTab>()
$activeTab.on(setActiveTab, (_, tab) => tab)
