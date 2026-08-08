import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

import { InputFile, type InputFileProps } from "../input-file";

export type FormInputFileProps<TFieldValues extends FieldValues> = Omit<
  InputFileProps,
  "value" | "onChange" | "onBlur" | "name"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
};

export function FormInputFile<TFieldValues extends FieldValues>({
  name,
  control,
  ...props
}: FormInputFileProps<TFieldValues>) {
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
