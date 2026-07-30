import * as React from "react";
import { NumericFormat, type NumericFormatProps } from "react-number-format";

import { Input, type InputProps } from "../input/input";

export type InputNumericProps = NumericFormatProps<React.InputHTMLAttributes<HTMLInputElement>> &
  Omit<InputProps, "mask" | "value" | "defaultValue" | "onChange" | "type"> & {};

export const InputNumeric = React.forwardRef<HTMLInputElement, InputNumericProps>((props, ref) => {
  return <NumericFormat {...props} getInputRef={ref} customInput={Input} />;
});

InputNumeric.displayName = "InputNumeric";
