import { Popover } from "@base-ui/react/popover";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { IMaskInput } from "react-imask";

import styles from "./date-picker-input.module.css";

type DatePickerInputProps = {
  anchorRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  id: string;
  mode: "single" | "range";
  disabled: boolean;
  isError: boolean;
  inputValue: string;
  placeholder: string;
  onInputChange: (val: string) => void;
};

export function DatePickerInput({
  anchorRef,
  inputRef,
  id,
  mode,
  disabled,
  isError,
  inputValue,
  placeholder,
  onInputChange,
}: DatePickerInputProps) {
  return (
    <div
      role="presentation"
      ref={anchorRef}
      className={[
        styles.inputWrapper,
        isError ? styles.inputWrapperError : "",
        disabled ? styles.disabled : "",
      ]
        .filter(Boolean)
        .join(" ")}
      id={id}
      onClick={() => {
        if (!disabled) {
          inputRef.current?.focus();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!disabled) {
            inputRef.current?.focus();
          }
        }
      }}
    >
      <IMaskInput
        inputRef={inputRef}
        mask={mode === "single" ? "00/00/0000" : "00/00/0000 - 00/00/0000"}
        value={inputValue}
        onAccept={onInputChange}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.triggerInput}
      />
      <Popover.Trigger
        render={
          <button
            type="button"
            className={styles.triggerButton}
            disabled={disabled}
            aria-label="Abrir calendário"
          />
        }
      >
        <FontAwesomeIcon icon={faCalendarAlt} />
      </Popover.Trigger>
    </div>
  );
}
