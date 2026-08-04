import "../../theme.css";

import * as React from "react";

import resetStyles from "../../reset.module.css";
import { DropZone } from "../drop-zone";
import { FileList } from "../file-list";
import { UploadIcon } from "../icons";
import styles from "./input-file.module.css";

export interface InputFileProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  errorMessage?: string;
  description?: string;
  showRequiredText?: boolean;
  showDropZone?: boolean;
  maxFiles?: number;
  readOnly?: boolean;
}

export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  (
    {
      label,
      errorMessage,
      description,
      className,
      id,
      required,
      showRequiredText = false,
      showDropZone = true,
      maxFiles,
      onChange,
      disabled,
      multiple,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const [generatedId] = React.useState(() => `id-${Math.random().toString(36).slice(2, 9)}`);
    const inputId = id || generatedId;
    const isError = Boolean(errorMessage);
    const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
    const [isDragging, setIsDragging] = React.useState(false);
    const [uploadVersion, setUploadVersion] = React.useState(0);

    const isLimitReached = maxFiles !== undefined && selectedFiles.length >= maxFiles;
    const effectivelyDisabled = disabled || isLimitReached;

    const updateFiles = (newFiles: File[]) => {
      setSelectedFiles(newFiles);

      const inputElement = document.getElementById(inputId) as HTMLInputElement;
      if (inputElement) {
        const dataTransfer = new DataTransfer();
        newFiles.forEach((file) => dataTransfer.items.add(file));
        try {
          inputElement.files = dataTransfer.files;
        } catch {
          void 0;
        }

        if (onChange) {
          const synthEvent = Object.create(new Event("change", { bubbles: true }));
          Object.defineProperty(synthEvent, "target", { value: inputElement, enumerable: true });
          Object.defineProperty(synthEvent, "currentTarget", {
            value: inputElement,
            enumerable: true,
          });

          onChange(synthEvent as React.ChangeEvent<HTMLInputElement>);
        }
      }
    };

    const handleFiles = (files: File[]) => {
      setUploadVersion((prev) => prev + 1);
      if (multiple) {
        const nextFiles = [...selectedFiles];
        files.forEach((newFile) => {
          const existingIndex = nextFiles.findIndex((f) => f.name === newFile.name);
          if (existingIndex >= 0) {
            nextFiles[existingIndex] = newFile;
          } else {
            nextFiles.push(newFile);
          }
        });
        updateFiles(maxFiles ? nextFiles.slice(0, maxFiles) : nextFiles);
      } else {
        updateFiles([files[0]]);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFiles(Array.from(e.target.files));
      }
    };

    const handleDragEnter = (e: React.DragEvent) => {
      if (effectivelyDisabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      if (effectivelyDisabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
      if (effectivelyDisabled) return;
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) setIsDragging(true);
    };

    const handleDrop = (e: React.DragEvent) => {
      if (effectivelyDisabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(Array.from(e.dataTransfer.files));
      }
    };

    const handleDownload = (file: File) => {
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    const removeFile = (indexToRemove: number) => {
      const newFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
      updateFiles(newFiles);
    };

    const removeAllFiles = () => {
      updateFiles([]);
    };

    return (
      <div className={[resetStyles.base, styles.container, className].filter(Boolean).join(" ")}>
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}{" "}
            {showRequiredText && (
              <span className={styles.required}>{required ? "(obrigatório)" : "(opcional)"}</span>
            )}
          </label>
        )}

        {!readOnly && (
          <div className={styles.inputWrapper}>
            <input
              {...props}
              type="file"
              ref={ref}
              id={inputId}
              onChange={handleChange}
              required={required}
              disabled={effectivelyDisabled}
              multiple={multiple}
              className={styles.hiddenInput}
            />
            {showDropZone ? (
              <DropZone
                inputId={inputId}
                isError={isError}
                isDragging={isDragging}
                handleDragEnter={handleDragEnter}
                handleDragLeave={handleDragLeave}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
              />
            ) : (
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => {
                  const input = document.getElementById(inputId);
                  if (input) input.click();
                }}
                disabled={effectivelyDisabled}
              >
                <UploadIcon className={styles.uploadButtonIcon} />
                {multiple ? "Escolher arquivos" : "Escolher arquivo"}
              </button>
            )}
          </div>
        )}

        {description && <span className={styles.description}>{description}</span>}

        {errorMessage && !readOnly && <span className={styles.errorMessage}>{errorMessage}</span>}

        {readOnly && selectedFiles.length === 0 ? (
          <p className={styles.viewText}>Nenhum arquivo</p>
        ) : (
          <FileList
            selectedFiles={selectedFiles}
            multiple={multiple}
            disabled={effectivelyDisabled}
            removeAllFiles={removeAllFiles}
            handleDownload={handleDownload}
            removeFile={removeFile}
            uploadVersion={uploadVersion}
            readOnly={readOnly}
          />
        )}
      </div>
    );
  }
);

InputFile.displayName = "InputFile";
