import * as React from "react";

import { UploadIcon } from "../icons";
import styles from "./drop-zone.module.css";

interface DropZoneProps {
  inputId: string;
  isError: boolean;
  isDragging: boolean;
  handleDragEnter: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
}

export function DropZone({
  inputId,
  isError,
  isDragging,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
}: DropZoneProps) {
  return (
    <label
      htmlFor={inputId}
      className={[
        styles.fileDropZone,
        isError ? styles.dropZoneError : "",
        isDragging ? styles.dropZoneActive : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.iconWrapper}>
        <UploadIcon />
      </div>
      <div className={styles.textWrapper}>
        <span className={styles.primaryText}>Clique para selecionar</span>
        <span className={styles.secondaryText}>ou arraste e solte o arquivo aqui</span>
      </div>
    </label>
  );
}
