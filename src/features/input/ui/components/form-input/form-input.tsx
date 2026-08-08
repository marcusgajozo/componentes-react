import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

import { Input, type InputProps } from "../input/input";

export type FormInputProps<TFieldValues extends FieldValues> = Omit<
  InputProps,
  "value" | "onChange" | "onBlur" | "name"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
};

export function FormInput<TFieldValues extends FieldValues>({
  name,
  control,
  ...props
}: FormInputProps<TFieldValues>) {
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
