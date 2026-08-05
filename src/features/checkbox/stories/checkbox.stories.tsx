import { Controls, Markdown, Primary, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { Checkbox } from "../ui/index";
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

const OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte", disabled: true },
];

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
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
    options: OPTIONS,
    label: "Quais frameworks você conhece?",
    onChange: fn(),
  },
  argTypes: {
    options: {
      description: "Lista de opções disponíveis para seleção.",
      table: { type: { summary: "Option[]" } },
    },
    value: {
      description: "Valor controlado (array de strings selecionadas).",
      table: { type: { summary: "string[]" } },
    },
    defaultValue: {
      description: "Valor inicial quando não-controlado.",
      table: { type: { summary: "string[]" } },
    },
    onChange: {
      description: "Callback disparado quando a seleção muda.",
      table: { type: { summary: "(value: string[]) => void" } },
    },
    label: {
      description: "Texto do rótulo exibido acima das opções.",
      table: { type: { summary: "string" } },
    },
    description: {
      description: "Texto descritivo auxiliar exibido abaixo do rótulo.",
      table: { type: { summary: "string" } },
    },
    required: {
      description: "Indica que o campo é obrigatório.",
      table: { type: { summary: "boolean" } },
    },
    showRequiredText: {
      description: "Exibe o texto de obrigatório visualmente.",
      table: { type: { summary: "boolean" } },
    },
    disabled: {
      description: "Desabilita todas as opções.",
      table: { type: { summary: "boolean" } },
    },
    className: {
      description: "Classe CSS adicional para o contêiner.",
      table: { type: { summary: "string" } },
    },
    id: {
      description: "ID personalizado para o contêiner.",
      table: { type: { summary: "string" } },
    },
    orientation: {
      description: "Orientação das opções.",
      table: { type: { summary: '"vertical" | "horizontal"' } },
      defaultValue: { summary: '"vertical"' },
    },
    errorMessage: {
      description: "Mensagem de erro exibida abaixo das opções.",
      table: { type: { summary: "string" } },
    },
    readOnly: {
      description: "Modo somente leitura (impede alterações).",
      table: { type: { summary: "boolean" } },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <Checkbox {...args} />
        </div>
      </div>
      <DownloadZipButton files={zipFiles} zipName="checkbox" />
    </div>
  ),
};
