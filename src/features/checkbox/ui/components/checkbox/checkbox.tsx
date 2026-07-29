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
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Checkbox({
  options,
  value,
  defaultValue,
  onChange,
  label,
  required = false,
  disabled = false,
  className,
  id,
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
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.optionsContainer}>
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
