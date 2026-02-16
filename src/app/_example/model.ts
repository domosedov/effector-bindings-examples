import { createFormFactory } from '@/form-factory'
import { zodResolver } from '@hookform/resolvers/zod'
import { invoke } from '@withease/factories'
import { createEvent } from 'effector'
import { createFormControl } from 'react-hook-form'
import { z } from 'zod'

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

const formSubmitted = createEvent<User>()

const formControl = createFormControl({
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
})

export const formModel = invoke(() =>
  createFormFactory({
    formControl,
    onSubmit: formSubmitted,
  }),
)

formSubmitted.watch((values) => {
  console.log('Form submitted: ', values)
})
