import { Popover } from "@base-ui/react/popover";
import { type DateRange, DayPicker } from "@daypicker/react";
import { ptBR } from "date-fns/locale";
import * as React from "react";

import styles from "./date-picker-popup.module.css";

type DatePickerPopupProps = {
  anchorRef: React.RefObject<HTMLDivElement | null>;
  mode: "single" | "range";
  value?: Date | DateRange;
  month: Date;
  setMonth: (date: Date) => void;
  onSingleSelect: (date: Date | undefined) => void;
  onRangeSelect: (range: DateRange | undefined) => void;
  showTime: boolean;
  timeStr: string;
  setTimeStr: (time: string) => void;
  endTimeStr: string;
  setEndTimeStr: (time: string) => void;
};

export function DatePickerPopup({
  anchorRef,
  mode,
  value,
  month,
  setMonth,
  onSingleSelect,
  onRangeSelect,
  showTime,
  timeStr,
  setTimeStr,
  endTimeStr,
  setEndTimeStr,
}: DatePickerPopupProps) {
  return (
    <Popover.Portal>
      <Popover.Positioner sideOffset={4} align="start" anchor={anchorRef}>
        <Popover.Popup className={styles.popup} initialFocus={false}>
          {mode === "single" ? (
            <DayPicker
              mode="single"
              selected={value as Date}
              onSelect={onSingleSelect}
              locale={ptBR}
              month={month}
              onMonthChange={setMonth}
            />
          ) : (
            <DayPicker
              mode="range"
              selected={value as DateRange}
              onSelect={onRangeSelect}
              locale={ptBR}
              month={month}
              onMonthChange={setMonth}
            />
          )}

          <button type="button" className={styles.todayButton} onClick={() => setMonth(new Date())}>
            Hoje
          </button>

          {showTime && (
            <div className={styles.timeContainer}>
              {mode === "single" ? (
                <>
                  <span className={styles.timeContainer}>Horário</span>
                  <input
                    type="time"
                    className={styles.timeInput}
                    value={timeStr}
                    onChange={(e) => setTimeStr(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span className={styles.timeLabel} style={{ fontSize: "12px" }}>
                      Início
                    </span>
                    <input
                      type="time"
                      className={styles.timeInput}
                      value={timeStr}
                      onChange={(e) => setTimeStr(e.target.value)}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span className={styles.timeLabel} style={{ fontSize: "12px" }}>
                      Fim
                    </span>
                    <input
                      type="time"
                      className={styles.timeInput}
                      value={endTimeStr}
                      onChange={(e) => setEndTimeStr(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  );
}
