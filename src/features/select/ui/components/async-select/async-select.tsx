import * as React from "react";

import { type Option, Select, type SelectProps } from "../select/select";

export type AsyncSelectProps<TResult, TItem> = {
  loadOptions: (params?: string) => Promise<TResult>;
  getArray: (result: TResult) => TItem[];
  getLabel: (item: TItem) => string;
  getValue: (item: TItem) => string;
  getDisabled?: (item: TItem) => boolean;
  debounceMs?: number;
} & Omit<SelectProps, "options" | "onSearchChange" | "isLoading">;

export function AsyncSelect<TResult, TItem>({
  loadOptions,
  getArray,
  getLabel,
  getValue,
  getDisabled,
  debounceMs = 300,
  value,
  defaultValue,
  onChange,
  ...selectProps
}: AsyncSelectProps<TResult, TItem>) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const selectedValue = isControlled ? value : internalValue;

  const [cacheByParams, setCacheByParams] = React.useState<Map<string, Option[]>>(new Map());
  const [cacheByValue, setCacheByValue] = React.useState<Map<string, Option>>(new Map());
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedTerm, setDebouncedTerm] = React.useState("");
  const requestIdRef = React.useRef(0);

  const mapResult = React.useCallback(
    (result: TResult): Option[] =>
      getArray(result).map((item) => ({
        value: getValue(item),
        label: getLabel(item),
        ...(getDisabled ? { disabled: getDisabled(item) } : {}),
      })),
    [getArray, getLabel, getValue, getDisabled]
  );

  React.useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      const key = searchTerm;
      if (cacheByParams.has(key)) return;

      const requestId = ++requestIdRef.current;

      loadOptions(key)
        .then((result) => {
          const mapped = mapResult(result);
          if (cancelled || requestId !== requestIdRef.current) return;
          setCacheByParams((prev) => new Map(prev).set(key, mapped));
          setCacheByValue((prev) => {
            const next = new Map(prev);
            mapped.forEach((opt) => next.set(opt.value, opt));
            return next;
          });
        })
        .catch(() => {
          if (cancelled || requestId !== requestIdRef.current) return;
          setCacheByParams((prev) => new Map(prev).set(key, []));
        });
    }, debounceMs);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [searchTerm, debounceMs, loadOptions, mapResult, cacheByParams]);

  const isLoading = !cacheByParams.has(debouncedTerm);

  const optionsToPass = React.useMemo(() => {
    const options = cacheByParams.get(debouncedTerm) ?? [];
    if (!selectedValue) return options;
    if (options.some((o) => o.value === selectedValue)) return options;
    const cached = cacheByValue.get(selectedValue);
    if (!cached) return options;
    return [...options, cached];
  }, [cacheByParams, debouncedTerm, selectedValue, cacheByValue]);

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) setInternalValue(newValue);
      if (onChange) onChange(newValue);
    },
    [isControlled, onChange]
  );

  return (
    <Select
      {...selectProps}
      value={value}
      defaultValue={defaultValue}
      onChange={handleValueChange}
      onSearchChange={setSearchTerm}
      isLoading={isLoading}
      options={optionsToPass}
    />
  );
}
