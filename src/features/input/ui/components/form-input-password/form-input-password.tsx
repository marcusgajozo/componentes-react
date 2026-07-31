import { Controller, useFormContext } from "react-hook-form";

import { InputPassword, type InputPasswordProps } from "../input-password/input-password";

export interface FormInputPasswordProps extends Omit<
  InputPasswordProps,
  "value" | "onChange" | "onBlur" | "name"
> {
  name: string;
}

export function FormInputPassword({ name, ...props }: FormInputPasswordProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <InputPassword {...props} {...field} errorMessage={error?.message || props.errorMessage} />
      )}
    />
  );
}
