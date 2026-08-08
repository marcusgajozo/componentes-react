import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

import { InputNumeric, type InputNumericProps } from "../input-numeric/input-numeric";

export type FormInputNumericProps<TFieldValues extends FieldValues> = Omit<
  InputNumericProps,
  "value" | "onChange" | "onBlur" | "name"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
};

export function FormInputNumeric<TFieldValues extends FieldValues>({
  name,
  control,
  ...props
}: FormInputNumericProps<TFieldValues>) {
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
