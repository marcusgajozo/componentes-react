import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

import {
  AsyncMultiSelect,
  type AsyncMultiSelectProps,
} from "../async-multi-select/async-multi-select";

export type FormAsyncMultiSelectProps<TFieldValues extends FieldValues, TResult, TItem> = Omit<
  AsyncMultiSelectProps<TResult, TItem>,
  "value" | "onChange" | "name"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
};

export function FormAsyncMultiSelect<TFieldValues extends FieldValues, TResult, TItem>({
  name,
  control,
  ...props
}: FormAsyncMultiSelectProps<TFieldValues, TResult, TItem>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <AsyncMultiSelect
          {...props}
          value={field.value}
          onChange={field.onChange}
          errorMessage={error?.message || props.errorMessage}
        />
      )}
    />
  );
}
