import { createStore } from 'effector'

import { getQueryClient } from './client'

export const $queryClient = createStore(getQueryClient(), {
  serialize: 'ignore',
})
