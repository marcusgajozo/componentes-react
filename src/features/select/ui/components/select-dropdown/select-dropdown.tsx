import { Combobox } from "@base-ui/react/combobox";

import type { Option } from "../select";
import styles from "./select-dropdown.module.css";

interface SelectDropdownProps {
  options: Option[];
  noOptionsMessage: string;
  isLoading?: boolean;
}

export function SelectDropdown({
  options,
  noOptionsMessage,
  isLoading = false,
}: SelectDropdownProps) {
  return (
    <Combobox.Portal>
      <Combobox.Positioner sideOffset={4} className={styles.positioner}>
        <Combobox.Popup className={styles.dropdown}>
          <Combobox.List className={styles.listbox}>
            {isLoading ? (
              <div className={styles.loading}>
                <Spinner />
                <span>Carregando...</span>
              </div>
            ) : options.length === 0 ? (
              <div className={styles.noOptions}>{noOptionsMessage}</div>
            ) : (
              options.map((opt) => (
                <Combobox.Item
                  key={opt.value}
                  value={opt}
                  disabled={opt.disabled}
                  className={styles.option}
                >
                  <span className={styles.optionLabel} title={opt.label}>
                    {opt.label}
                  </span>
                </Combobox.Item>
              ))
            )}
          </Combobox.List>
        </Combobox.Popup>
      </Combobox.Positioner>
    </Combobox.Portal>
  );
}

function Spinner() {
  return (
    <svg
      className={styles.spinner}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
    >
      <circle
        className={styles.spinnerTrack}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className={styles.spinnerHead}
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
