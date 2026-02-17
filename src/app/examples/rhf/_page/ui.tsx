'use client'

import { Button, Fieldset, Paper, SimpleGrid, Stack, TextInput } from '@mantine/core'
import { useUnitShape } from 'effector-use-unit-shape'
import { Controller, useForm } from 'react-hook-form'

import { formModel } from './model'

export function ExampleForm() {
  const { formControl } = useUnitShape(formModel)
  const { control, handleSubmit } = useForm({ formControl })

  return (
    <Paper shadow='sm' p='lg' radius='md' maw={480} mx='auto'>
      <form
        onSubmit={handleSubmit((values) => {
          console.log(values)
        })}
      >
        <Stack gap='md'>
          <Controller
            control={control}
            name='name'
            render={({ field, fieldState }) => (
              <TextInput
                label='Name'
                placeholder='John Doe'
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='email'
            render={({ field, fieldState }) => (
              <TextInput
                label='Email'
                type='email'
                placeholder='john@example.com'
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />
          <Fieldset legend='Address' pt='md'>
            <Stack gap='md' mt='xs'>
              <Controller
                control={control}
                name='address.street'
                render={({ field, fieldState }) => (
                  <TextInput
                    label='Street'
                    placeholder='123 Main St'
                    {...field}
                    error={fieldState.error?.message}
                  />
                )}
              />
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
                <Controller
                  control={control}
                  name='address.city'
                  render={({ field, fieldState }) => (
                    <TextInput
                      label='City'
                      placeholder='New York'
                      {...field}
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='address.state'
                  render={({ field, fieldState }) => (
                    <TextInput
                      label='State'
                      placeholder='NY'
                      {...field}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </SimpleGrid>
              <Controller
                control={control}
                name='address.zip'
                render={({ field, fieldState }) => (
                  <TextInput
                    label='ZIP'
                    placeholder='10001'
                    {...field}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </Stack>
          </Fieldset>
          <Button type='submit' fullWidth mt='md'>
            Submit
          </Button>
        </Stack>
      </form>
    </Paper>
  )
}
