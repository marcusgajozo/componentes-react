import { DataTableRoot } from "../data-table-root";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import styles from "./data-table-skeleton.module.css";

export interface DataTableSkeletonProps {
  columnCount?: number;
  rowCount?: number;
  showPagination?: boolean;
}

const widths = ["40%", "60%", "75%", "50%", "85%", "65%", "45%", "80%"];

export function DataTableSkeleton({ columnCount = 5, rowCount = 10 }: DataTableSkeletonProps) {
  const columns = Array.from({ length: columnCount }, (_, i) => i);
  const rows = Array.from({ length: rowCount }, (_, i) => i);

  return (
    <DataTableRoot isLoading={true}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col}>
                <div className={styles.skeletonBlock} style={{ width: "80%", height: "20px" }} />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row}>
              {columns.map((col) => (
                <TableCell key={col}>
                  <div
                    className={styles.skeletonBlock}
                    style={{ width: widths[(row + col) % widths.length], height: "20px" }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTableRoot>
  );
}
