import { Controller, useFormContext } from "react-hook-form";

import { InputNumeric, type InputNumericProps } from "../input-numeric/input-numeric";

export interface FormInputNumericProps extends Omit<
  InputNumericProps,
  "value" | "onChange" | "onBlur" | "name"
> {
  name: string;
}

export function FormInputNumeric({ name, ...props }: FormInputNumericProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <InputNumeric {...props} {...field} errorMessage={error?.message || props.errorMessage} />
      )}
    />
  );
}
