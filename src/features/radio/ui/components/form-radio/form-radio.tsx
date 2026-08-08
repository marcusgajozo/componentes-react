import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

import { Radio, type RadioProps } from "../radio/radio";

export type FormRadioProps<TFieldValues extends FieldValues> = Omit<
  RadioProps,
  "value" | "onChange" | "name"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
};

export function FormRadio<TFieldValues extends FieldValues>({
  name,
  control,
  ...props
}: FormRadioProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Radio
          {...props}
          name={name}
          value={field.value}
          onChange={field.onChange}
          errorMessage={error?.message || props.errorMessage}
        />
      )}
    />
  );
}
