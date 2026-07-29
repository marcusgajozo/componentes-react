import { flexRender } from "@tanstack/react-table";

import { useDataTableContext } from "../data-table-context";
import { TableHead, TableHeader, TableRow } from "../table";

export function DataTableHeader<TData, TValue>() {
  const { table } = useDataTableContext<TData, TValue>();

  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const isCustomSize = header.column.columnDef.size !== 150;
            const isCustomMinSize = header.column.columnDef.minSize !== 20;
            const isCustomMaxSize = header.column.columnDef.maxSize !== Number.MAX_SAFE_INTEGER;

            let minWidth: string | number = "max-content";
            if (isCustomMinSize) {
              minWidth = `max(max-content, ${header.column.columnDef.minSize}px)`;
            }
            if (isCustomSize) {
              minWidth = `max(max-content, ${header.column.columnDef.size}px)`;
            }

            return (
              <TableHead
                key={header.id}
                style={{
                  width: isCustomSize ? header.column.getSize() : undefined,
                  minWidth,
                  maxWidth: isCustomMaxSize ? header.column.columnDef.maxSize : undefined,
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}
