import { Controls, Markdown, Primary, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { InputFile } from "../ui/index";
import readme from "../ui/README.md?raw";

const uiFiles = import.meta.glob("../ui/**/*", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const zipFiles = Object.entries(uiFiles).map(([path, content]) => ({
  name: path.split("/ui/")[1] || path,
  content,
}));

const meta = {
  title: "Components/InputFile",
  component: InputFile,
  parameters: {
    layout: "centered",
    docs: {
      page: () => (
        <>
          <Title />
          <Primary />
          <Controls />
          <Markdown>{readme}</Markdown>
        </>
      ),
    },
  },
  tags: ["autodocs"],
  args: {
    onChange: fn(),
    label: "Documento de Identidade",
    description: "Faça upload de um arquivo PDF ou imagem (máx 5MB)",
  },
  argTypes: {
    label: {
      description: "Texto do rótulo exibido acima da área de upload.",
      table: { type: { summary: "string" } },
    },
    errorMessage: {
      description: "Mensagem de erro exibida abaixo da área de upload.",
      table: { type: { summary: "string" } },
    },
    description: {
      description: "Texto descritivo auxiliar exibido abaixo da área de upload.",
      table: { type: { summary: "string" } },
    },
    showRequiredText: {
      description: "Exibe o texto de obrigatório visualmente.",
      table: { type: { summary: "boolean" } },
    },
    showDropZone: {
      description: "Se false, remove a zona de drag-and-drop e renderiza um botão simples.",
      table: { type: { summary: "boolean" } },
      defaultValue: { summary: "true" },
    },
    maxFiles: {
      description: "Limita a quantidade máxima de arquivos no modo `multiple`.",
      table: { type: { summary: "number" } },
    },
    readOnly: {
      description: "Modo somente leitura (impede alterações).",
      table: { type: { summary: "boolean" } },
    },
    multiple: {
      description: "Permite selecionar múltiplos arquivos (herdado de `InputHTMLAttributes`).",
      table: { type: { summary: "boolean" } },
    },
    accept: {
      description: "Tipos de arquivo aceitos (herdado de `InputHTMLAttributes`).",
      table: { type: { summary: "string" } },
    },
    required: {
      description: "Indica que o campo é obrigatório (herdado de `InputHTMLAttributes`).",
      table: { type: { summary: "boolean" } },
    },
    disabled: {
      description: "Desabilita o campo (herdado de `InputHTMLAttributes`).",
      table: { type: { summary: "boolean" } },
    },
  },
} satisfies Meta<typeof InputFile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <InputFile {...args} />
        </div>
      </div>
      <DownloadZipButton files={zipFiles} zipName="input-file" />
    </div>
  ),
};
