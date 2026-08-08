import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

import { Checkbox, type CheckboxProps } from "../checkbox/checkbox";

export type FormCheckboxProps<TFieldValues extends FieldValues> = Omit<
  CheckboxProps,
  "value" | "onChange" | "name"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
};

export function FormCheckbox<TFieldValues extends FieldValues>({
  name,
  control,
  ...props
}: FormCheckboxProps<TFieldValues>) {
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
