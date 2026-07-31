import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { InputFile } from "../ui/index";

const uiFiles = import.meta.glob("../ui/**/*", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const zipFiles = Object.entries(uiFiles).map(([path, content]) => ({
  name: path.replace("../ui/", ""),
  content,
}));

const meta = {
  title: "Components/InputFile",
  component: InputFile,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof InputFile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "padded" },
  args: {
    label: "Documento de Identidade",
    description: "Faça upload de um arquivo PDF ou imagem (máx 5MB)",
  },
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

export const Required: Story = {
  parameters: { layout: "padded" },
  args: {
    label: "Currículo",
    required: true,
    showRequiredText: true,
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <InputFile {...args} />
        </div>
      </div>
    </div>
  ),
};

export const ErrorState: Story = {
  parameters: { layout: "padded" },
  args: {
    label: "Comprovante de Residência",
    errorMessage: "Arquivo inválido ou muito grande.",
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <InputFile {...args} />
        </div>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  parameters: { layout: "padded" },
  args: {
    label: "Contrato",
    disabled: true,
    description: "Você não tem permissão para alterar este arquivo.",
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <InputFile {...args} />
        </div>
      </div>
    </div>
  ),
};

export const Multiple: Story = {
  parameters: { layout: "padded" },
  args: {
    label: "Fotos Adicionais",
    multiple: true,
    description: "Selecione vários arquivos de uma vez.",
    accept: "image/*",
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <InputFile {...args} />
        </div>
      </div>
    </div>
  ),
};

export const ReadOnly: Story = {
  parameters: { layout: "padded" },
  args: {
    label: "Arquivos Enviados",
    readOnly: true,
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <InputFile {...args} />
        </div>
      </div>
    </div>
  ),
};
