import { ReactNode } from "react";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerProps,
  FieldPath,
  FieldPathValue,
  FieldValues,
  Noop,
  RefCallBack,
  UseFormStateReturn,
} from "react-hook-form";

type DefaultValueIfNeeded<TValue extends any> = TValue extends undefined
  ? { defaultValue?: TValue }
  : { defaultValue: TValue };

type FieldValuesFromControl<TControl extends Control<any>> =
  TControl extends Control<infer TFieldValues> ? TFieldValues : never;

function useControlledForm<
  TControl extends Control<any>,
  TFieldValues extends FieldValues = FieldValuesFromControl<TControl>
>(control: TControl) {
  const controlledRender = <TName extends FieldPath<TFieldValues>>(
    name: TName,
    controllerProps:
      | null
      | (Omit<
          ControllerProps<TFieldValues, TName>,
          "name" | "render" | "control" | "defaultVariants"
        > &
          DefaultValueIfNeeded<FieldPathValue<TFieldValues, TName>>),
    render: (renderArgs: {
      field: {
        onChange: (newValue: FieldPathValue<TFieldValues, TName>) => void;
        onBlur: Noop;
        value: FieldPathValue<TFieldValues, TName>;
        name: TName;
        ref: RefCallBack;
      };
      fieldState: ControllerFieldState;
      formState: UseFormStateReturn<TFieldValues>;
    }) => ReactNode
  ) => (
    <Controller
      {...((controllerProps || {}) as {})}
      name={name}
      control={control}
      render={(renderArgs) => (
        <>
          {render({
            ...renderArgs,
            field: {
              ...renderArgs.field,
              value: renderArgs.field.value as any,
            },
          })}
        </>
      )}
    />
  );

  return controlledRender;
}

export default useControlledForm;
