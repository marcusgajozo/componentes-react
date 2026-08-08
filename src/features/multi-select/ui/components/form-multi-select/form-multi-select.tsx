import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

import { MultiSelect, type MultiSelectProps } from "../multi-select/multi-select";

export type FormMultiSelectProps<TFieldValues extends FieldValues> = Omit<
  MultiSelectProps,
  "value" | "onChange" | "name"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
};

export function FormMultiSelect<TFieldValues extends FieldValues>({
  name,
  control,
  ...props
}: FormMultiSelectProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MultiSelect
          {...props}
          value={field.value}
          onChange={field.onChange}
          errorMessage={error?.message || props.errorMessage}
        />
      )}
    />
  );
}
