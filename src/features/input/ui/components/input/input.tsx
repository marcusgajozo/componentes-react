import "../../theme.css";

import * as React from "react";
import { IMask, IMaskInput } from "react-imask";

import resetStyles from "../../reset.module.css";
import styles from "./input.module.css";
import { MASKS, type MaskType } from "./masks";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  mask?: MaskType;
  errorMessage?: string;
  description?: string;
  showRequiredText?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const TypedIMaskInput = IMaskInput as unknown as React.ComponentType<
  React.InputHTMLAttributes<HTMLInputElement> & {
    mask?: string;
    inputRef?: React.Ref<HTMLInputElement>;
  }
>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      mask,
      errorMessage,
      description,
      icon,
      rightIcon,
      className,
      id,
      required,
      showRequiredText = false,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const [generatedId] = React.useState(() => `id-${Math.random().toString(36).slice(2, 9)}`);
    const inputId = id || generatedId;

    const maskOptions = mask ? MASKS[mask] : undefined;
    const isError = Boolean(errorMessage);

    let displayValue = String(props.value ?? props.defaultValue ?? "");
    if (readOnly && displayValue && maskOptions) {
      const pipe = IMask.createPipe(
        maskOptions as unknown as Parameters<typeof IMask.createPipe>[0]
      );
      displayValue = pipe(displayValue);
    }

    return (
      <div className={[resetStyles.base, styles.container, className].filter(Boolean).join(" ")}>
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}{" "}
            {showRequiredText && (
              <span className={styles.required}>{required ? "(obrigatório)" : "(opcional)"}</span>
            )}
          </label>
        )}
        {description && <span className={styles.description}>{description}</span>}

        {readOnly ? (
          <p className={styles.viewText}>{displayValue || "-"}</p>
        ) : (
          <div className={styles.inputWrapper}>
            {icon && <span className={styles.iconWrapper}>{icon}</span>}
            {maskOptions ? (
              <TypedIMaskInput
                {...maskOptions}
                {...props}
                inputRef={ref}
                id={inputId}
                className={[
                  styles.input,
                  isError ? styles.inputError : "",
                  icon ? styles.inputWithIcon : "",
                  rightIcon ? styles.inputWithRightIcon : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            ) : (
              <input
                {...props}
                ref={ref}
                id={inputId}
                className={[
                  styles.input,
                  isError ? styles.inputError : "",
                  icon ? styles.inputWithIcon : "",
                  rightIcon ? styles.inputWithRightIcon : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            )}
            {rightIcon && <span className={styles.rightIconWrapper}>{rightIcon}</span>}
          </div>
        )}

        {errorMessage && !readOnly && <span className={styles.errorMessage}>{errorMessage}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
