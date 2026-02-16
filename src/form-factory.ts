import type { EventCallable } from 'effector'
import type {
  FieldValues,
  UseFormClearErrors,
  UseFormGetFieldState,
  UseFormGetValues,
  UseFormReset,
  UseFormResetField,
  UseFormSetError,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form'
import type { createFormControl } from 'react-hook-form'

import { createFactory } from '@withease/factories'
import { attach, createStore, is, scopeBind } from 'effector'

type Simplify<T> = { [K in keyof T]: T[K] } & {}

/**
 * Преобразует tuple в объект с именованными свойствами.
 * Имена передаются явно, т.к. TypeScript не извлекает label'ы из tuple.
 * Учитываются только индексы (0, 1, 2...), без length и методов массива.
 * Опциональные элементы tuple становятся опциональными свойствами объекта.
 *
 * @example
 * type Fn = (key: string, value: string, options?: unknown) => void;
 * type Params = ParamsToObject<Parameters<Fn>, ["key", "value", "options"]>;
 * // => { key: string; value: string; options?: unknown }
 */
type ParamsToObject<
  TTuple extends readonly unknown[],
  TNames extends { readonly [K in keyof TTuple]: string },
> = Simplify<
  {
    [K in Extract<keyof TTuple, `${number}`> as {} extends Pick<TTuple, K & keyof TTuple>
      ? never
      : TNames[K]]: TTuple[K]
  } & {
    [K in Extract<keyof TTuple, `${number}`> as {} extends Pick<TTuple, K & keyof TTuple>
      ? TNames[K]
      : never]?: TTuple[K]
  }
>

type FactoryOptions<TFieldValues extends FieldValues = FieldValues> = {
  formControl: ReturnType<typeof createFormControl<TFieldValues>>
  onSubmit?: EventCallable<TFieldValues>
}

function factoryImplementation<T extends FieldValues>({
  formControl: _formControl,
  onSubmit,
}: FactoryOptions<T>) {
  const formControl = {
    ..._formControl,
    handleSubmit: ((...args: Parameters<typeof _formControl.handleSubmit>) => {
      const [onValid, onInvalid] = args
      return _formControl.handleSubmit((values, event) => {
        if (is.event(onSubmit)) {
          scopeBind(onSubmit, { safe: true })(values)
        }
        return onValid(values, event)
      }, onInvalid)
    }) as typeof _formControl.handleSubmit,
  }

  const $formControl = createStore(formControl)

  const setValueFx = attach({
    source: {
      formControl: $formControl,
    },
    effect: (
      { formControl },
      params: ParamsToObject<Parameters<UseFormSetValue<T>>, ['name', 'value', 'options']>,
    ) => {
      formControl.setValue(params.name, params.value, params.options)
    },
  })

  const resetFx = attach({
    source: {
      formControl: $formControl,
    },
    effect: (
      { formControl },
      params: ParamsToObject<Parameters<UseFormReset<T>>, ['values', 'options']>,
    ) => {
      formControl.reset(params.values, params.options)
    },
  })

  const setErrorFx = attach({
    source: {
      formControl: $formControl,
    },
    effect: (
      { formControl },
      params: ParamsToObject<Parameters<UseFormSetError<T>>, ['name', 'error', 'options']>,
    ) => {
      formControl.setError(params.name, params.error, params.options)
    },
  })

  const setFocusFx = attach({
    source: {
      formControl: $formControl,
    },
    effect: (
      { formControl },
      params: ParamsToObject<Parameters<UseFormSetFocus<T>>, ['name', 'options']>,
    ) => {
      formControl.setFocus(params.name, params.options)
    },
  })

  const clearErrorsFx = attach({
    source: {
      formControl: $formControl,
    },
    effect: (
      { formControl },
      params: ParamsToObject<Parameters<UseFormClearErrors<T>>, ['name']>,
    ) => {
      formControl.clearErrors(params.name)
    },
  })

  const getValuesFx = attach({
    source: {
      formControl: $formControl,
    },
    effect: (
      { formControl },
      params: ParamsToObject<Parameters<UseFormGetValues<T>>, ['name', 'config']>,
    ) => {
      return formControl.getValues(params.name, params.config)
    },
  })

  const getFieldStateFx = attach({
    source: {
      formControl: $formControl,
    },
    effect: (
      { formControl },
      params: ParamsToObject<Parameters<UseFormGetFieldState<T>>, ['name', 'formState']>,
    ) => {
      return formControl.getFieldState(params.name, params.formState)
    },
  })

  const resetFieldFx = attach({
    source: {
      formControl: $formControl,
    },
    effect: (
      { formControl },
      params: ParamsToObject<Parameters<UseFormResetField<T>>, ['name', 'options']>,
    ) => {
      formControl.resetField(params.name, params.options)
    },
  })

  const triggerFx = attach({
    source: {
      formControl: $formControl,
    },
    effect: (
      { formControl },
      params: ParamsToObject<Parameters<UseFormTrigger<T>>, ['name', 'options']>,
    ) => {
      return formControl.trigger(params.name, params.options)
    },
  })

  return {
    $formControl,
    setValueFx,
    resetFx,
    setErrorFx,
    setFocusFx,
    clearErrorsFx,
    getValuesFx,
    getFieldStateFx,
    resetFieldFx,
    triggerFx,
    __: {
      formControl: _formControl,
    },
  }
}

export const createFormFactory = createFactory(factoryImplementation)
