import "../../theme.css";

import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { MultiSelectDropdown } from "../multi-select-dropdown";
import { MultiSelectTrigger } from "../multi-select-trigger";
import styles from "./multi-select.module.css";

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: Option[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  label?: string;
  description?: string;
  required?: boolean;
  showRequiredText?: boolean;
  noOptionsMessage?: string;
  maxSelected?: number;
  icon?: React.ReactNode;
  errorMessage?: string;
}

export function MultiSelect({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select...",
  disabled = false,
  id,
  className,
  label,
  description,
  required = false,
  showRequiredText = false,
  noOptionsMessage = "No options found",
  maxSelected,
  icon,
  errorMessage,
}: MultiSelectProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue ?? []);
  const selectedObjs = React.useMemo(() => {
    const vals = isControlled ? (value ?? []) : internalValue;
    return vals
      .map((val) => options.find((o) => o.value === val))
      .filter((o): o is Option => o !== undefined);
  }, [options, isControlled, value, internalValue]);

  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const selectableOptions = React.useMemo(() => options.filter((o) => !o.disabled), [options]);

  const commitValues = React.useCallback(
    (newVals: Option[]) => {
      const newValues = newVals.map((v) => v.value);
      if (!isControlled) setInternalValue(newValues);
      if (onChange) onChange(newValues);
    },
    [isControlled, onChange]
  );

  const handleSelectAll = React.useCallback(() => {
    const selectedSelectable = selectedObjs.filter((o) => !o.disabled);
    if (selectedSelectable.length === selectableOptions.length) {
      commitValues(selectedObjs.filter((o) => o.disabled));
    } else {
      commitValues([...selectedObjs.filter((o) => o.disabled), ...selectableOptions]);
    }
  }, [selectedObjs, selectableOptions, commitValues]);

  const handleValueChange = React.useCallback(
    (vals: Option[]) => {
      if (vals.some((v) => v.value === "ALL_SELECT_TOGGLE")) {
        handleSelectAll();
        setTimeout(() => {
          setOpen(true);
        }, 0);
        return;
      }

      commitValues(vals);

      setTimeout(() => {
        setInputValue("");
        setOpen(true);
      }, 0);
    },
    [commitValues, handleSelectAll]
  );

  const filteredOptions = React.useMemo(() => {
    return options.filter((o) => o.label.toLowerCase().includes(inputValue.toLowerCase()));
  }, [options, inputValue]);

  const clearAll = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.stopPropagation();
      commitValues([]);
    },
    [commitValues]
  );

  const clearSearch = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.stopPropagation();
      setInputValue("");
      const inputEl = document.getElementById(id ?? "") as HTMLInputElement | null;
      if (inputEl) inputEl.focus();
    },
    [id]
  );

  return (
    <div
      className={[styles.container, disabled ? styles.disabled : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}{" "}
          {showRequiredText && (
            <span className={styles.required}>{required ? "(obrigatório)" : "(opcional)"}</span>
          )}
        </label>
      )}
      {description && <span className={styles.description}>{description}</span>}
      <Combobox.Root
        multiple
        open={open}
        onOpenChange={setOpen}
        value={selectedObjs}
        onValueChange={handleValueChange}
        inputValue={inputValue}
        onInputValueChange={setInputValue}
        disabled={disabled}
      >
        <MultiSelectTrigger
          id={id}
          selectedObjs={selectedObjs}
          placeholder={placeholder}
          clearAll={clearAll}
          disabled={disabled}
          icon={icon}
          isOpen={open}
          inputValue={inputValue}
          clearSearch={clearSearch}
          isError={Boolean(errorMessage)}
        />
        {!disabled && (
          <MultiSelectDropdown
            options={filteredOptions}
            noOptionsMessage={noOptionsMessage}
            maxSelected={maxSelected}
            currentSelectedCount={selectedObjs.length}
            isAllSelected={
              selectedObjs.filter((o) => !o.disabled).length > 0 &&
              selectedObjs.filter((o) => !o.disabled).length === selectableOptions.length
            }
            isIndeterminate={
              selectedObjs.filter((o) => !o.disabled).length > 0 &&
              selectedObjs.filter((o) => !o.disabled).length < selectableOptions.length
            }
          />
        )}
      </Combobox.Root>
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}
