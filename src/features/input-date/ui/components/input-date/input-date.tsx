import "../../theme.css";

import * as React from "react";

import resetStyles from "../../reset.module.css";
import { CalendarIcon } from "../calendar-icon/calendar-icon";
import styles from "./input-date.module.css";

export type InputDateType = "date" | "datetime-local";

export interface InputDateProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: InputDateType;
  label?: string;
  description?: string;
  errorMessage?: string;
  showRequiredText?: boolean;
}

export const InputDate = React.forwardRef<HTMLInputElement, InputDateProps>(
  (
    {
      type = "date",
      label,
      description,
      errorMessage,
      className,
      id,
      required,
      showRequiredText = false,
      readOnly = false,
      disabled = false,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [generatedId] = React.useState(() => `id-${Math.random().toString(36).slice(2, 9)}`);
    const inputId = id || generatedId;
    const inputRef = React.useRef<HTMLInputElement>(null);
    const isError = Boolean(errorMessage);

    const handleIconClick = () => {
      const input = inputRef.current;
      if (!input) return;

      if (typeof input.showPicker === "function") {
        input.showPicker();
        return;
      }

      input.focus();
    };

    const setInputRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;

        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const displayValue = String(value ?? defaultValue ?? "");

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
            <input
              {...props}
              ref={setInputRef}
              id={inputId}
              type={type}
              value={value}
              defaultValue={defaultValue}
              onChange={onChange}
              className={[styles.input, isError ? styles.inputError : ""].filter(Boolean).join(" ")}
              disabled={disabled}
              readOnly={readOnly}
            />
            <button
              type="button"
              className={styles.iconButton}
              onClick={handleIconClick}
              aria-label="Abrir seletor de data"
              disabled={disabled || readOnly}
            >
              <CalendarIcon />
            </button>
          </div>
        )}

        {errorMessage && !readOnly && <span className={styles.errorMessage}>{errorMessage}</span>}
      </div>
    );
  }
);

InputDate.displayName = "InputDate";
