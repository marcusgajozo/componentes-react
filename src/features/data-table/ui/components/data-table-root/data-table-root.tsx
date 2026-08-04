import "../../theme.css";

import * as React from "react";

import resetStyles from "../../reset.module.css";
import styles from "./data-table-root.module.css";

export interface DataTableRootProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export function DataTableRoot({ children, isLoading }: DataTableRootProps) {
  return (
    <div
      className={[resetStyles.base, styles.container].join(" ")}
      data-loading={isLoading ? "" : undefined}
    >
      {children}
    </div>
  );
}
