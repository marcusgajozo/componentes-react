import { flexRender } from "@tanstack/react-table";

import { useDataTableContext } from "../data-table-context";
import { TableBody, TableCell, TableRow } from "../table";

export function DataTableBody<TData, TValue>() {
  const { table, columns } = useDataTableContext<TData, TValue>();
  const rows = table.getRowModel().rows;

  return (
    <TableBody>
      {rows.length > 0 ? (
        rows.map((row) => (
          <TableRow
            key={row.id}
            data-testid="data-table-row"
            data-state={row.getIsSelected() && "selected"}
          >
            {row.getVisibleCells().map((cell) => {
              const cellValue = cell.getValue();
              const title =
                typeof cellValue === "string" || typeof cellValue === "number"
                  ? String(cellValue)
                  : undefined;

              const isCustomSize = cell.column.columnDef.size !== 150;
              const isCustomMinSize = cell.column.columnDef.minSize !== 20;
              const isCustomMaxSize = cell.column.columnDef.maxSize !== Number.MAX_SAFE_INTEGER;

              let minWidth: string | number = "max-content";
              if (isCustomMinSize) {
                minWidth = cell.column.columnDef.minSize as number;
              } else if (isCustomSize) {
                minWidth = cell.column.getSize();
              }

              return (
                <TableCell
                  key={cell.id}
                  title={title}
                  style={{
                    width: isCustomSize ? cell.column.getSize() : undefined,
                    minWidth,
                    maxWidth: isCustomMaxSize
                      ? cell.column.columnDef.maxSize
                      : isCustomSize
                        ? cell.column.getSize()
                        : undefined,
                    overflow: isCustomSize ? "hidden" : undefined,
                    textOverflow: isCustomSize ? "ellipsis" : undefined,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} style={{ textAlign: "center" }}>
            Nenhum resultado encontrado.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
