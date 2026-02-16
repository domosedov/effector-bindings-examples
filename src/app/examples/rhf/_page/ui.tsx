'use client'

import { useUnitShape } from 'effector-use-unit-shape'
import { useForm } from 'react-hook-form'

import { formModel } from './model'

export function ExampleForm() {
  const { formControl } = useUnitShape(formModel)
  const { register, handleSubmit } = useForm({ formControl })

  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log(values)
      })}
      className='mx-auto max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm'
    >
      <div className='space-y-4'>
        <div>
          <label htmlFor='name' className='mb-1 block text-sm font-medium text-zinc-700'>
            Name
          </label>
          <input
            id='name'
            {...register('name')}
            className='w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-transparent focus:ring-2 focus:ring-zinc-900 focus:outline-none'
            placeholder='John Doe'
          />
        </div>
        <div>
          <label htmlFor='email' className='mb-1 block text-sm font-medium text-zinc-700'>
            Email
          </label>
          <input
            id='email'
            type='email'
            {...register('email')}
            className='w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-transparent focus:ring-2 focus:ring-zinc-900 focus:outline-none'
            placeholder='john@example.com'
          />
        </div>
        <fieldset className='space-y-4 border-t border-zinc-200 pt-2'>
          <legend className='text-sm font-medium text-zinc-700'>Address</legend>
          <div>
            <label htmlFor='address.street' className='mb-1 block text-sm text-zinc-600'>
              Street
            </label>
            <input
              id='address.street'
              {...register('address.street')}
              className='w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-transparent focus:ring-2 focus:ring-zinc-900 focus:outline-none'
              placeholder='123 Main St'
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label htmlFor='address.city' className='mb-1 block text-sm text-zinc-600'>
                City
              </label>
              <input
                id='address.city'
                {...register('address.city')}
                className='w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-transparent focus:ring-2 focus:ring-zinc-900 focus:outline-none'
                placeholder='New York'
              />
            </div>
            <div>
              <label htmlFor='address.state' className='mb-1 block text-sm text-zinc-600'>
                State
              </label>
              <input
                id='address.state'
                {...register('address.state')}
                className='w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-transparent focus:ring-2 focus:ring-zinc-900 focus:outline-none'
                placeholder='NY'
              />
            </div>
          </div>
          <div>
            <label htmlFor='address.zip' className='mb-1 block text-sm text-zinc-600'>
              ZIP
            </label>
            <input
              id='address.zip'
              {...register('address.zip')}
              className='w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-transparent focus:ring-2 focus:ring-zinc-900 focus:outline-none'
              placeholder='10001'
            />
          </div>
        </fieldset>
      </div>
      <button
        type='submit'
        className='mt-6 w-full rounded-lg bg-zinc-900 px-4 py-2.5 font-medium text-white transition-colors hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:outline-none'
      >
        Submit
      </button>
    </form>
  )
}
