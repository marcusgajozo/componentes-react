export interface CodeFile {
  name: string;
  content: string;
}

interface Props {
  files: CodeFile[];
  zipName: string;
}

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc ^= bytes[i];
    for (let j = 8; j > 0; j--) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function buildZip(files: CodeFile[]): Uint8Array<ArrayBuffer> {
  const enc = new TextEncoder();
  const now = new Date();
  const dosDate =
    (((now.getFullYear() - 1980) & 0x7f) << 9) |
    (((now.getMonth() + 1) & 0x0f) << 5) |
    (now.getDate() & 0x1f);
  const dosTime =
    ((now.getHours() & 0x1f) << 11) |
    ((now.getMinutes() & 0x3f) << 5) |
    (Math.floor(now.getSeconds() / 2) & 0x1f);

  const chunks: Uint8Array[] = [];
  const centralDirs: Uint8Array[] = [];
  let offset = 0;

  const allEntries: { name: string; content: string; isDir: boolean }[] = [];
  const addedDirs = new Set<string>();

  for (const file of files) {
    const parts = file.name.split("/");
    let currentPath = "";
    for (let i = 0; i < parts.length - 1; i++) {
      currentPath += parts[i] + "/";
      if (!addedDirs.has(currentPath)) {
        addedDirs.add(currentPath);
        allEntries.push({ name: currentPath, content: "", isDir: true });
      }
    }
    allEntries.push({ name: file.name, content: file.content, isDir: false });
  }

  for (const { name, content, isDir } of allEntries) {
    const nameBytes = enc.encode(name);
    const data = isDir ? new Uint8Array(0) : enc.encode(content);
    const crc = isDir ? 0 : crc32(data);
    const nameLen = nameBytes.length;
    const dataLen = data.length;

    const localHeader = new Uint8Array(new ArrayBuffer(30 + nameLen));
    const lv = new DataView(localHeader.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0, true);
    lv.setUint16(8, 0, true);
    lv.setUint16(10, dosTime, true);
    lv.setUint16(12, dosDate, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, dataLen, true);
    lv.setUint32(22, dataLen, true);
    lv.setUint16(26, nameLen, true);
    lv.setUint16(28, 0, true);
    localHeader.set(nameBytes, 30);

    const central = new Uint8Array(new ArrayBuffer(46 + nameLen));
    const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 0x0314, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, dosTime, true);
    cv.setUint16(14, dosDate, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, dataLen, true);
    cv.setUint32(24, dataLen, true);
    cv.setUint16(28, nameLen, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);

    const extAttr = isDir ? 0x41ed0010 : 0x81a40000;
    cv.setUint32(38, extAttr, true);
    cv.setUint32(42, offset, true);
    central.set(nameBytes, 46);

    chunks.push(localHeader, data);
    centralDirs.push(central);
    offset += 30 + nameLen + dataLen;
  }

  const cdSize = centralDirs.reduce((s, b) => s + b.length, 0);
  const eocd = new Uint8Array(new ArrayBuffer(22));
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(4, 0, true);
  ev.setUint16(6, 0, true);
  ev.setUint16(8, allEntries.length, true);
  ev.setUint16(10, allEntries.length, true);
  ev.setUint32(12, cdSize, true);
  ev.setUint32(16, offset, true);
  ev.setUint16(20, 0, true);

  const all = [...chunks, ...centralDirs, eocd];
  const total = all.reduce((s, b) => s + b.length, 0);
  const result = new Uint8Array(new ArrayBuffer(total));
  let pos = 0;
  for (const b of all) {
    result.set(b, pos);
    pos += b.length;
  }
  return result;
}

import { useState } from "react";

import { Button } from "../features/button/ui";
import { Input } from "../features/input/ui";
import { Modal } from "../features/modal/ui";

export function DownloadZipButton({ files, zipName }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefix, setPrefix] = useState("");

  const getDefaultPrefix = () => {
    const themeFile = files.find((f) => f.name === "theme.css");
    if (!themeFile) return null;
    const match = themeFile.content.match(/--([a-zA-Z0-9]+)-/);
    return match ? match[1] : null;
  };

  function handleDownload() {
    let finalFiles = files;
    const defaultPrefix = getDefaultPrefix();

    if (prefix && defaultPrefix && prefix !== defaultPrefix) {
      finalFiles = files.map((file) => ({
        ...file,
        content: file.content.replace(new RegExp(`--${defaultPrefix}-`, "g"), `--${prefix}-`),
      }));
    }

    const zip = buildZip(finalFiles);
    const blob = new Blob([zip], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${zipName}.zip`;
    a.click();
    URL.revokeObjectURL(url);
    setIsModalOpen(false);
  }

  return (
    <Modal.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Modal.Trigger>
        <Button variant="ghost" leftIcon={<DownloadIcon />}>
          Baixar Código-Fonte
        </Button>
      </Modal.Trigger>
      <Modal.Popup>
        <Modal.Title>Baixar Componente</Modal.Title>
        <Modal.Body>
          <Modal.Description>
            Você pode personalizar o prefixo das variáveis CSS para este componente. Se deixar em
            branco, o padrão será mantido.
          </Modal.Description>

          <div style={{ marginTop: "16px" }}>
            <Input
              label="Prefixo da Variável CSS"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder={getDefaultPrefix() || "ex: meu-prefixo"}
              icon={<span style={{ color: "#6b7280" }}>--</span>}
              showRequiredText
            />
          </div>
        </Modal.Body>
        <Modal.Buttons>
          <Modal.ButtonClose>Cancelar</Modal.ButtonClose>
          <Button onClick={handleDownload}>Baixar</Button>
        </Modal.Buttons>
      </Modal.Popup>
    </Modal.Root>
  );
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );
}
