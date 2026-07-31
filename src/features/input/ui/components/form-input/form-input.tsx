import { Controller, useFormContext } from "react-hook-form";

import { Input, type InputProps } from "../input/input";

export interface FormInputProps extends Omit<InputProps, "value" | "onChange" | "onBlur" | "name"> {
  name: string;
}

export function FormInput({ name, ...props }: FormInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input {...props} {...field} errorMessage={error?.message || props.errorMessage} />
      )}
    />
  );
}
