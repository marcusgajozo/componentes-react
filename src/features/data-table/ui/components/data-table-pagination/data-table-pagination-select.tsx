import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import styles from "./data-table-pagination.module.css";

export interface DataTablePaginationSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: (string | number)[];
  ariaLabel: string;
  testId?: string;
  emptyMessage?: string;
}

export function DataTablePaginationSelect({
  value,
  onChange,
  options,
  ariaLabel,
  testId,
  emptyMessage = "Nenhum",
}: DataTablePaginationSelectProps) {
  const [inputValue, setInputValue] = React.useState(value);
  const [prevValue, setPrevValue] = React.useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setInputValue(value);
  }

  const filteredOptions =
    inputValue === value || inputValue === ""
      ? options
      : options.filter((opt) => opt.toString().includes(inputValue));

  return (
    <Combobox.Root
      value={value}
      onValueChange={(val) => {
        if (val) {
          onChange(val);
          setInputValue(val);
        }
      }}
      inputValue={inputValue}
      onInputValueChange={(val) => {
        if (/^\d*$/.test(val)) {
          setInputValue(val);
        }
      }}
    >
      <Combobox.InputGroup className={styles.selectTriggerGroup}>
        <Combobox.Input
          className={styles.selectInput}
          aria-label={ariaLabel}
          data-testid={testId}
          inputMode="numeric"
        />
        <Combobox.Trigger className={styles.selectIconTrigger} tabIndex={-1}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.selectIcon}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </Combobox.Trigger>
      </Combobox.InputGroup>
      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup className={styles.selectPopup}>
            <Combobox.List className={styles.selectList}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <Combobox.Item
                    key={opt.toString()}
                    value={opt.toString()}
                    className={styles.selectItem}
                  >
                    {opt}
                  </Combobox.Item>
                ))
              ) : (
                <div className={styles.selectItem} style={{ opacity: 0.5 }}>
                  {emptyMessage}
                </div>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}
