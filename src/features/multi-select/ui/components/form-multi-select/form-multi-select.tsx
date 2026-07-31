import { Controller, useFormContext } from "react-hook-form";

import { MultiSelect, type MultiSelectProps } from "../multi-select/multi-select";

export interface FormMultiSelectProps extends Omit<
  MultiSelectProps,
  "value" | "onChange" | "name"
> {
  name: string;
}

export function FormMultiSelect({ name, ...props }: FormMultiSelectProps) {
  const { control } = useFormContext();

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
