import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

import { InputDate, type InputDateProps } from "../input-date/input-date";

export type FormInputDateProps<TFieldValues extends FieldValues> = Omit<
  InputDateProps,
  "value" | "onChange" | "onBlur" | "name"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
};

export function FormInputDate<TFieldValues extends FieldValues>({
  name,
  control,
  ...props
}: FormInputDateProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <InputDate
          {...props}
          {...field}
          value={field.value ?? ""}
          errorMessage={error?.message || props.errorMessage}
        />
      )}
    />
  );
}
