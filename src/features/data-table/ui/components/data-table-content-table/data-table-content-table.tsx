import { type ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import * as React from "react";

import type { DataTableAction } from "../../hooks/use-create-action-column";
import { DataTableContext, type DataTableContextValue } from "../data-table-context";
import { Table } from "../table";
import { createActionColumn } from "./create-action-column";
import { createSelectColumn } from "./create-select-column";

export interface DataTableProps<TData = unknown, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalItems?: number;
  onSelectRow?: (rows: TData[]) => void;
  actionColumn?: DataTableAction<TData>[];
  optionsPerPage?: number[];
  isLoading?: boolean;
}

export interface DataTableContentTableProps<TData, TValue> extends Omit<
  DataTableProps<TData, TValue>,
  "totalItems" | "optionsPerPage" | "isLoading"
> {
  children: React.ReactNode;
}

export function DataTableContentTable<TData, TValue>({
  columns,
  data,
  onSelectRow,
  actionColumn,
  children,
}: DataTableContentTableProps<TData, TValue>) {
  const finalColumns = React.useMemo(() => {
    let cols = [...columns];
    if (onSelectRow) {
      cols = [createSelectColumn<TData>(), ...cols];
    }
    if (actionColumn && actionColumn.length > 0) {
      cols = [...cols, createActionColumn<TData>(actionColumn)];
    }
    return cols;
  }, [columns, onSelectRow, actionColumn]);

  const [rowSelection, setRowSelection] = React.useState({});

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: (updaterOrValue) => {
      const newSelection =
        typeof updaterOrValue === "function" ? updaterOrValue(rowSelection) : updaterOrValue;

      setRowSelection(newSelection);

      if (onSelectRow) {
        const selectedData = Object.keys(newSelection)
          .filter((id) => newSelection[id])
          .map((id) => {
            try {
              return table.getRow(id)?.original;
            } catch {
              return undefined;
            }
          })
          .filter((v) => v !== undefined) as TData[];

        onSelectRow(selectedData);
      }
    },
    state: {
      rowSelection,
    },
  });

  const contextValue = React.useMemo(
    () => ({ table, columns: finalColumns }),
    [table, finalColumns]
  );

  return (
    <DataTableContext.Provider
      value={contextValue as unknown as DataTableContextValue<unknown, unknown>}
    >
      <Table>{children}</Table>
    </DataTableContext.Provider>
  );
}
