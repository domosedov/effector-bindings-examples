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
      className='max-w-md mx-auto p-6 rounded-xl border border-zinc-200 bg-white shadow-sm'
    >
      <div className='space-y-4'>
        <div>
          <label htmlFor='name' className='block text-sm font-medium text-zinc-700 mb-1'>
            Name
          </label>
          <input
            id='name'
            {...register('name')}
            className='w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent'
            placeholder='John Doe'
          />
        </div>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-zinc-700 mb-1'>
            Email
          </label>
          <input
            id='email'
            type='email'
            {...register('email')}
            className='w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent'
            placeholder='john@example.com'
          />
        </div>
        <fieldset className='space-y-4 pt-2 border-t border-zinc-200'>
          <legend className='text-sm font-medium text-zinc-700'>Address</legend>
          <div>
            <label htmlFor='address.street' className='block text-sm text-zinc-600 mb-1'>
              Street
            </label>
            <input
              id='address.street'
              {...register('address.street')}
              className='w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent'
              placeholder='123 Main St'
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label htmlFor='address.city' className='block text-sm text-zinc-600 mb-1'>
                City
              </label>
              <input
                id='address.city'
                {...register('address.city')}
                className='w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent'
                placeholder='New York'
              />
            </div>
            <div>
              <label htmlFor='address.state' className='block text-sm text-zinc-600 mb-1'>
                State
              </label>
              <input
                id='address.state'
                {...register('address.state')}
                className='w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent'
                placeholder='NY'
              />
            </div>
          </div>
          <div>
            <label htmlFor='address.zip' className='block text-sm text-zinc-600 mb-1'>
              ZIP
            </label>
            <input
              id='address.zip'
              {...register('address.zip')}
              className='w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent'
              placeholder='10001'
            />
          </div>
        </fieldset>
      </div>
      <button
        type='submit'
        className='mt-6 w-full py-2.5 px-4 bg-zinc-900 text-white font-medium rounded-lg hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-colors'
      >
        Submit
      </button>
    </form>
  )
}
