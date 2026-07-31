import { Controller, useFormContext } from "react-hook-form";

import { InputFile, type InputFileProps } from "../input-file";

export interface FormInputFileProps extends Omit<
  InputFileProps,
  "value" | "onChange" | "onBlur" | "name"
> {
  name: string;
}

export function FormInputFile({ name, ...props }: FormInputFileProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { value: _value, ...field }, fieldState: { error } }) => (
        <InputFile {...props} {...field} errorMessage={error?.message || props.errorMessage} />
      )}
    />
  );
}
