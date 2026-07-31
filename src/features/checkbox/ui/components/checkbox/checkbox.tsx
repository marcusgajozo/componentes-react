import "../../theme.css";

import * as React from "react";

import styles from "./checkbox.module.css";

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxProps {
  options: Option[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
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

export function Checkbox({
  options,
  value,
  defaultValue,
  onChange,
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
}: CheckboxProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue ?? []);

  const selectedValues = isControlled ? value : internalValue;

  const handleChange = (optionValue: string, checked: boolean) => {
    let newValues = [...selectedValues];
    if (checked) {
      newValues.push(optionValue);
    } else {
      newValues = newValues.filter((v) => v !== optionValue);
    }

    if (!isControlled) {
      setInternalValue(newValues);
    }
    if (onChange) {
      onChange(newValues);
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
          {selectedValues.length > 0
            ? selectedValues
                .map((val) => options.find((o) => o.value === val)?.label)
                .filter(Boolean)
                .join(", ")
            : "-"}
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
            const isChecked = selectedValues.includes(opt.value);
            const isDisabled = disabled || opt.disabled;
            return (
              <label
                key={opt.value}
                className={[styles.optionLabel, isDisabled ? styles.disabled : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                <input
                  type="checkbox"
                  className={styles.input}
                  value={opt.value}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={(e) => handleChange(opt.value, e.target.checked)}
                />
                <span className={styles.customCheckbox}>{isChecked && <CheckIcon />}</span>
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

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.checkIcon}
    >
      <polyline points="2 6 5 9 10 3" />
    </svg>
  );
}
