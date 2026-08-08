import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

import { AsyncSelect, type AsyncSelectProps } from "../async-select/async-select";

export type FormAsyncSelectProps<TFieldValues extends FieldValues, TResult, TItem> = Omit<
  AsyncSelectProps<TResult, TItem>,
  "value" | "onChange" | "name"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
};

export function FormAsyncSelect<TFieldValues extends FieldValues, TResult, TItem>({
  name,
  control,
  ...props
}: FormAsyncSelectProps<TFieldValues, TResult, TItem>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <AsyncSelect
          {...props}
          value={field.value}
          onChange={field.onChange}
          errorMessage={error?.message || props.errorMessage}
        />
      )}
    />
  );
}
