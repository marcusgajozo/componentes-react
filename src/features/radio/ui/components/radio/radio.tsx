import "../../theme.css";

import * as React from "react";

import styles from "./radio.module.css";

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioProps {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  label?: string;
  description?: string;
  required?: boolean;
  showRequiredText?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  orientation?: "vertical" | "horizontal";
  errorMessage?: string;
  readOnly?: boolean;
}

export function Radio({
  options,
  value,
  defaultValue,
  onChange,
  name,
  label,
  description,
  required = false,
  showRequiredText = false,
  disabled = false,
  className,
  id,
  orientation = "vertical",
  errorMessage,
  readOnly = false,
}: RadioProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string>(defaultValue ?? "");

  const selectedValue = isControlled ? value : internalValue;

  const [defaultName] = React.useState(() => `name-${Math.random().toString(36).slice(2, 9)}`);
  const groupName = name || defaultName;

  const handleChange = (optionValue: string) => {
    if (!isControlled) {
      setInternalValue(optionValue);
    }
    if (onChange) {
      onChange(optionValue);
    }
  };

  return (
    <div className={[styles.container, className].filter(Boolean).join(" ")} id={id}>
      {label && (
        <label className={styles.label}>
          {label}{" "}
          {showRequiredText && (
            <span className={styles.required}>{required ? "(obrigatório)" : "(opcional)"}</span>
          )}
        </label>
      )}
      {description && <span className={styles.description}>{description}</span>}

      {readOnly ? (
        <p className={styles.viewText}>
          {options.find((o) => o.value === selectedValue)?.label || "-"}
        </p>
      ) : (
        <div
          className={
            orientation === "horizontal"
              ? styles.optionsContainerHorizontal
              : styles.optionsContainer
          }
        >
          {options.map((opt) => {
            const isChecked = selectedValue === opt.value;
            const isDisabled = disabled || opt.disabled;
            return (
              <label
                key={opt.value}
                className={[styles.optionLabel, isDisabled ? styles.disabled : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                <input
                  type="radio"
                  name={groupName}
                  className={styles.input}
                  value={opt.value}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => handleChange(opt.value)}
                />
                <span className={styles.customRadio}>
                  {isChecked && <span className={styles.radioDot} />}
                </span>
                <span className={styles.labelText}>{opt.label}</span>
              </label>
            );
          })}
        </div>
      )}
      {errorMessage && !readOnly && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}
