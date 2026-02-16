import type { Effect, EventCallable } from 'effector'
import type {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormGetFieldState,
  UseFormGetValues,
  UseFormProps,
  UseFormReset,
  UseFormResetField,
  UseFormSetError,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form'

import { createFactory } from '@withease/factories'
import { attach, createStore, is, scopeBind } from 'effector'
import { createFormControl } from 'react-hook-form'

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

function factoryImplementation<
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>({
  onSubmit,
  onInvalid,
  ...formProps
}: UseFormProps<TFieldValues, TContext, TTransformedValues> & {
  onSubmit?: Effect<TTransformedValues, any, Error> | EventCallable<TTransformedValues>
  onInvalid?:
    | Effect<FieldErrors<TFieldValues>, any, Error>
    | EventCallable<FieldErrors<TFieldValues>>
}) {
  const _formControl = createFormControl<TFieldValues, TContext, TTransformedValues>(formProps)
  console.log(_formControl)
  const formControl = {
    ..._formControl,
    handleSubmit: ((...args: Parameters<typeof _formControl.handleSubmit>) => {
      const [handleSubmitValid, handleSubmitInvalid] = args
      return _formControl.handleSubmit(
        (values, event) => {
          if (is.unit(onSubmit) && is.targetable(onSubmit)) {
            void scopeBind(onSubmit, { safe: true })(values)
          }
          return handleSubmitValid(values, event)
        },
        (values, event) => {
          if (is.unit(onInvalid) && is.targetable(onInvalid)) {
            void scopeBind(onInvalid, { safe: true })(values)
          }
          return handleSubmitInvalid?.(values, event)
        },
      )
    }) as typeof _formControl.handleSubmit,
  }

  const $formControl = createStore(formControl)

  const setValueFx = attach({
    source: {
      formControl: $formControl,
    },
    effect: (
      { formControl },
      params: ParamsToObject<
        Parameters<UseFormSetValue<TFieldValues>>,
        ['name', 'value', 'options']
      >,
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
      params: ParamsToObject<Parameters<UseFormReset<TFieldValues>>, ['values', 'options']>,
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
      params: ParamsToObject<
        Parameters<UseFormSetError<TFieldValues>>,
        ['name', 'error', 'options']
      >,
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
      params: ParamsToObject<Parameters<UseFormSetFocus<TFieldValues>>, ['name', 'options']>,
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
      params: ParamsToObject<Parameters<UseFormClearErrors<TFieldValues>>, ['name']>,
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
      params: ParamsToObject<Parameters<UseFormGetValues<TFieldValues>>, ['name', 'config']>,
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
      params: ParamsToObject<Parameters<UseFormGetFieldState<TFieldValues>>, ['name', 'formState']>,
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
      params: ParamsToObject<Parameters<UseFormResetField<TFieldValues>>, ['name', 'options']>,
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
      params: ParamsToObject<Parameters<UseFormTrigger<TFieldValues>>, ['name', 'options']>,
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
