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
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Radio({
  options,
  value,
  defaultValue,
  onChange,
  name,
  label,
  required = false,
  disabled = false,
  className,
  id,
}: RadioProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string>(defaultValue ?? "");

  const selectedValue = isControlled ? value : internalValue;

  const defaultName = React.useId();
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
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.optionsContainer}>
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
    </div>
  );
}
