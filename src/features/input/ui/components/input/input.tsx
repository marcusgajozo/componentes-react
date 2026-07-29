import "../../theme.css";

import * as React from "react";
import { IMaskInput } from "react-imask";

import styles from "./input.module.css";
import { MASKS, type MaskType } from "./masks";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  mask?: MaskType;
  error?: string;
}

const TypedIMaskInput = IMaskInput as unknown as React.ComponentType<
  React.InputHTMLAttributes<HTMLInputElement> & {
    mask?: string;
    inputRef?: React.Ref<HTMLInputElement>;
  }
>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, mask, error, className, id, required, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const maskOptions = mask ? MASKS[mask] : undefined;
    const isError = Boolean(error);

    return (
      <div className={[styles.container, className].filter(Boolean).join(" ")}>
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label} {required && <span className={styles.required}>*</span>}
          </label>
        )}

        {maskOptions ? (
          <TypedIMaskInput
            {...maskOptions}
            {...props}
            inputRef={ref}
            id={inputId}
            className={[styles.input, isError ? styles.inputError : ""].filter(Boolean).join(" ")}
          />
        ) : (
          <input
            {...props}
            ref={ref}
            id={inputId}
            className={[styles.input, isError ? styles.inputError : ""].filter(Boolean).join(" ")}
          />
        )}

        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
