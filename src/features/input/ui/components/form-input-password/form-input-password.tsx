import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

import { InputPassword, type InputPasswordProps } from "../input-password/input-password";

export type FormInputPasswordProps<TFieldValues extends FieldValues> = Omit<
  InputPasswordProps,
  "value" | "onChange" | "onBlur" | "name"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
};

export function FormInputPassword<TFieldValues extends FieldValues>({
  name,
  control,
  ...props
}: FormInputPasswordProps<TFieldValues>) {
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
