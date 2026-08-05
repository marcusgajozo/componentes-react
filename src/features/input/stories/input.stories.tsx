import { Controls, Markdown, Primary, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { Input } from "../ui/index";
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
  title: "Components/Input",
  component: Input,
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
    label: "CPF",
    placeholder: "000.000.000-00",
    mask: "CPF",
    onChange: fn(),
  },
  argTypes: {
    label: {
      description: "Texto do rótulo exibido acima do campo.",
      table: { type: { summary: "string" } },
    },
    mask: {
      description: "Máscara aplicada ao input (ex: CPF, CNPJ, TELEFONE).",
      table: { type: { summary: "MaskType" } },
    },
    errorMessage: {
      description: "Mensagem de erro exibida abaixo do campo.",
      table: { type: { summary: "string" } },
    },
    description: {
      description: "Texto descritivo auxiliar exibido abaixo do campo.",
      table: { type: { summary: "string" } },
    },
    showRequiredText: {
      description: "Exibe o texto de obrigatório visualmente.",
      table: { type: { summary: "boolean" } },
    },
    icon: {
      description: "Ícone renderizado à esquerda do input.",
      table: { type: { summary: "React.ReactNode" } },
      control: false,
    },
    rightIcon: {
      description: "Ícone renderizado à direita do input.",
      table: { type: { summary: "React.ReactNode" } },
      control: false,
    },
    placeholder: {
      description: "Texto placeholder do input (herdado de `InputHTMLAttributes`).",
      table: { type: { summary: "string" } },
    },
    required: {
      description: "Indica que o campo é obrigatório (herdado de `InputHTMLAttributes`).",
      table: { type: { summary: "boolean" } },
    },
    readOnly: {
      description: "Modo somente leitura (herdado de `InputHTMLAttributes`).",
      table: { type: { summary: "boolean" } },
    },
    disabled: {
      description: "Desabilita o campo (herdado de `InputHTMLAttributes`).",
      table: { type: { summary: "boolean" } },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <Input {...args} />
        </div>
      </div>
      <DownloadZipButton files={zipFiles} zipName="input" />
    </div>
  ),
};
