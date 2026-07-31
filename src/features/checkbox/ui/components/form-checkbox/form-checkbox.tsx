import { Controller, useFormContext } from "react-hook-form";

import { Checkbox, type CheckboxProps } from "../checkbox/checkbox";

export interface FormCheckboxProps extends Omit<CheckboxProps, "value" | "onChange" | "name"> {
  name: string;
}

export function FormCheckbox({ name, ...props }: FormCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Checkbox
          {...props}
          value={field.value}
          onChange={field.onChange}
          errorMessage={error?.message || props.errorMessage}
        />
      )}
    />
  );
}
