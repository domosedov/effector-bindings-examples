import { zodResolver } from '@hookform/resolvers/zod'
import { invoke } from '@withease/factories'
import { createEffect } from 'effector'
import * as z from 'zod'

import { createFormFactory } from './form-factory'

const userSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(1),
  }),
})

type User = z.infer<typeof userSchema>

const logCreatedUserFx = createEffect<User, User, Error>((user) => {
  console.log('User created: ', user)
  return user
})

export const formModel = invoke(() =>
  createFormFactory({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
      },
    },
    onSubmit: logCreatedUserFx,
  }),
)
