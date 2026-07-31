import * as React from "react";

import { DownloadIcon, FileIcon, XIcon } from "../icons";
import styles from "./file-list.module.css";

interface FileListProps {
  selectedFiles: File[];
  multiple?: boolean;
  disabled?: boolean;
  removeAllFiles: () => void;
  handleDownload: (file: File) => void;
  removeFile: (index: number) => void;
  uploadVersion: number;
  readOnly?: boolean;
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export function FileList({
  selectedFiles,
  multiple,
  disabled,
  removeAllFiles,
  handleDownload,
  removeFile,
  uploadVersion,
  readOnly = false,
}: FileListProps) {
  const [visibleCount, setVisibleCount] = React.useState(3);
  const [prevUploadVersion, setPrevUploadVersion] = React.useState(uploadVersion);

  if (uploadVersion !== prevUploadVersion) {
    setVisibleCount(3);
    setPrevUploadVersion(uploadVersion);
  }

  if (selectedFiles.length === 0) return null;

  const visibleFiles = selectedFiles.slice(0, visibleCount);
  const hasMore = selectedFiles.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className={styles.fileListWrapper}>
      {multiple && (
        <div className={styles.fileListHeader}>
          <span className={styles.fileListTitle}>
            {selectedFiles.length} arquivo(s) selecionado(s)
          </span>
          {!readOnly && (
            <button
              type="button"
              className={styles.removeAllButton}
              onClick={removeAllFiles}
              disabled={disabled}
              title="Limpar todos os selecionados"
            >
              Limpar todos
            </button>
          )}
        </div>
      )}
      <ul className={styles.fileList}>
        {visibleFiles.map((file, idx) => (
          <li key={`${file.name}-${idx}`} className={styles.fileItem}>
            <div className={styles.fileInfo}>
              <FileIcon className={styles.fileIcon} />
              <div className={styles.fileDetails}>
                <span className={styles.fileName} title={file.name}>
                  {file.name}
                </span>
                <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
              </div>
            </div>
            <div className={styles.fileActions}>
              <button
                type="button"
                className={styles.actionButton}
                onClick={() => handleDownload(file)}
                disabled={disabled}
                title="Baixar arquivo"
              >
                <DownloadIcon />
              </button>
              {!readOnly && (
                <button
                  type="button"
                  className={styles.actionButton}
                  onClick={() => removeFile(idx)}
                  disabled={disabled}
                  title="Remover arquivo"
                >
                  <XIcon />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button type="button" className={styles.loadMoreButton} onClick={handleLoadMore}>
          Mostrar mais ({selectedFiles.length - visibleCount})
        </button>
      )}
    </div>
  );
}
