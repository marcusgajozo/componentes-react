import { Controller, useFormContext } from "react-hook-form";

import { Radio, type RadioProps } from "../radio/radio";

export interface FormRadioProps extends Omit<RadioProps, "value" | "onChange" | "name"> {
  name: string;
}

export function FormRadio({ name, ...props }: FormRadioProps) {
  const { control } = useFormContext();

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
