import { DataTableBody } from "../data-table-body";
import { DataTableContentTable, type DataTableProps } from "../data-table-content-table";
import { DataTableHeader } from "../data-table-header";
import { DataTablePagination } from "../data-table-pagination";
import { DataTableRoot } from "../data-table-root";
import { DataTableSkeleton } from "../data-table-skeleton";

export type { DataTableProps };

function DataTableComponent<TData = unknown, TValue = unknown>(
  props: DataTableProps<TData, TValue>
) {
  if (props.isLoading) {
    const actionColCount = props.actionColumn && props.actionColumn.length > 0 ? 1 : 0;
    const selectColCount = props.onSelectRow ? 1 : 0;
    const totalColumns = props.columns.length + actionColCount + selectColCount;

    return <DataTableSkeleton columnCount={totalColumns} />;
  }

  return (
    <DataTableRoot isLoading={props.isLoading}>
      <DataTableContentTable<TData, TValue> {...props}>
        <DataTableHeader<TData, TValue> />
        <DataTableBody<TData, TValue> />
      </DataTableContentTable>
      <DataTablePagination
        totalItems={props.totalItems ?? props.data.length}
        optionsPerPage={props.optionsPerPage}
      />
    </DataTableRoot>
  );
}

export const DataTable = Object.assign(DataTableComponent, {
  Root: DataTableRoot,
  ContentTable: DataTableContentTable,
  Header: DataTableHeader,
  Body: DataTableBody,
  Pagination: DataTablePagination,
  Skeleton: DataTableSkeleton,
});
