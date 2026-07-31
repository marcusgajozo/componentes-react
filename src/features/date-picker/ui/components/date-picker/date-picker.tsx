import "../../theme.css";
import "@daypicker/react/style.css";

import { Popover } from "@base-ui/react/popover";
import { type DateRange } from "@daypicker/react";
import { format, isValid, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as React from "react";

import { DatePickerInput } from "../date-picker-input";
import { DatePickerPopup } from "../date-picker-popup";
import styles from "./date-picker.module.css";

export type DatePickerProps = {
  mode?: "single" | "range";
  showTime?: boolean;
  value?: Date | DateRange;
  onChange?: (value: Date | DateRange | undefined) => void;
  label?: string;
  errorMessage?: string;
  description?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  showRequiredText?: boolean;
  disabled?: boolean;
};

export function DatePicker({
  mode = "single",
  showTime = false,
  value,
  onChange,
  label,
  errorMessage,
  description,
  placeholder = "Selecione uma data...",
  readOnly = false,
  required = false,
  showRequiredText = false,
  disabled = false,
}: DatePickerProps) {
  const id = React.useId();
  const isError = Boolean(errorMessage);

  const [timeStr, setTimeStr] = React.useState<string>("00:00");
  const [endTimeStr, setEndTimeStr] = React.useState<string>("23:59");

  const [month, setMonth] = React.useState<Date>(() => {
    if (value) {
      if (mode === "single" && value instanceof Date) return value;
      if (mode === "range" && (value as DateRange).from) return (value as DateRange).from as Date;
    }
    return new Date();
  });

  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(() => {
    if (!value) return "";
    if (mode === "single" && value instanceof Date) {
      return format(value, "dd/MM/yyyy");
    } else if (mode === "range" && (value as DateRange).from) {
      const range = value as DateRange;
      if (range.to) {
        return `${format(range.from, "dd/MM/yyyy")} - ${format(range.to, "dd/MM/yyyy")}`;
      } else {
        return `${format(range.from, "dd/MM/yyyy")} - `;
      }
    }
    return "";
  });
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [prevValue, setPrevValue] = React.useState(value);
  const [prevMode, setPrevMode] = React.useState(mode);

  if (value !== prevValue || mode !== prevMode) {
    setPrevValue(value);
    setPrevMode(mode);

    if (value) {
      if (mode === "single" && value instanceof Date) {
        setMonth(value);
        setInputValue(format(value, "dd/MM/yyyy"));
      } else if (mode === "range" && (value as DateRange).from) {
        setMonth((value as DateRange).from as Date);
        const range = value as DateRange;
        if (range.to) {
          setInputValue(`${format(range.from, "dd/MM/yyyy")} - ${format(range.to, "dd/MM/yyyy")}`);
        } else {
          setInputValue(`${format(range.from, "dd/MM/yyyy")} - `);
        }
      }
    } else {
      setInputValue("");
    }
  }

  const getDisplayText = () => {
    if (!value) return null;

    if (mode === "single") {
      const date = value as Date;
      let text = format(date, "dd/MM/yyyy", { locale: ptBR });
      if (showTime) text += ` às ${timeStr}`;
      return text;
    }

    if (mode === "range") {
      const range = value as DateRange;
      if (!range.from) return null;

      let text = format(range.from, "dd/MM/yyyy", { locale: ptBR });
      if (showTime) text += ` ${timeStr}`;

      if (range.to) {
        text += ` até ${format(range.to, "dd/MM/yyyy", { locale: ptBR })}`;
        if (showTime) text += ` ${endTimeStr}`;
      }
      return text;
    }
    return null;
  };

  const displayText = getDisplayText();

  const handleSingleSelect = (date: Date | undefined) => {
    onChange?.(date);
    if (date) setOpen(false);
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    onChange?.(range);
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);

    if (val === "") {
      onChange?.(undefined);
      return;
    }

    if (mode === "single" && val.length === 10) {
      const parsed = parse(val, "dd/MM/yyyy", new Date());
      if (isValid(parsed) && parsed.getFullYear() > 1900) {
        setMonth(parsed);
        onChange?.(parsed);
      }
    } else if (mode === "range" && val.length === 23) {
      const [startStr, endStr] = val.split(" - ");
      const parsedStart = parse(startStr, "dd/MM/yyyy", new Date());
      const parsedEnd = parse(endStr, "dd/MM/yyyy", new Date());
      if (
        isValid(parsedStart) &&
        isValid(parsedEnd) &&
        parsedStart.getFullYear() > 1900 &&
        parsedEnd.getFullYear() > 1900
      ) {
        setMonth(parsedStart);
        onChange?.({ from: parsedStart, to: parsedEnd });
      }
    }
  };

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}{" "}
          {showRequiredText && (
            <span className={styles.required}>{required ? "(obrigatório)" : "(opcional)"}</span>
          )}
        </label>
      )}
      {description && <span className={styles.description}>{description}</span>}

      {readOnly ? (
        <p className={styles.viewText}>{displayText || "-"}</p>
      ) : (
        <Popover.Root open={open} onOpenChange={setOpen}>
          <DatePickerInput
            anchorRef={anchorRef}
            inputRef={inputRef}
            id={id}
            mode={mode}
            disabled={disabled}
            isError={isError}
            inputValue={inputValue}
            placeholder={placeholder}
            onInputChange={handleInputChange}
          />
          <DatePickerPopup
            anchorRef={anchorRef}
            mode={mode}
            value={value}
            month={month}
            setMonth={setMonth}
            onSingleSelect={handleSingleSelect}
            onRangeSelect={handleRangeSelect}
            showTime={showTime}
            timeStr={timeStr}
            setTimeStr={setTimeStr}
            endTimeStr={endTimeStr}
            setEndTimeStr={setEndTimeStr}
          />
        </Popover.Root>
      )}

      {errorMessage && !readOnly && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}
