import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Controls, Markdown, Primary, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { Select } from "../ui/index";
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

const COUNTRIES: { value: string; label: string; disabled?: boolean }[] = [
  { value: "br", label: "Brasil" },
  { value: "us", label: "Estados Unidos" },
  { value: "pt", label: "Portugal" },
  { value: "ar", label: "Argentina" },
  { value: "de", label: "Alemanha", disabled: true },
  { value: "fr", label: "França" },
];

const meta = {
  title: "Components/Select",
  component: Select,
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
    options: COUNTRIES,
    placeholder: "Selecione um país...",
    onChange: fn(),
    icon: <FontAwesomeIcon icon={faGlobe} />,
  },
  argTypes: {
    options: {
      description: "Lista de opções disponíveis para seleção.",
      table: { type: { summary: "Option[]" } },
    },
    value: {
      description: "Valor controlado (string selecionada).",
      table: { type: { summary: "string" } },
    },
    defaultValue: {
      description: "Valor inicial quando não-controlado.",
      table: { type: { summary: "string" } },
    },
    onChange: {
      description: "Callback disparado quando a seleção muda.",
      table: { type: { summary: "(value: string) => void" } },
    },
    placeholder: {
      description: "Texto placeholder do trigger.",
      table: { type: { summary: "string" } },
      defaultValue: { summary: '"Select..."' },
    },
    disabled: {
      description: "Desabilita o componente.",
      table: { type: { summary: "boolean" } },
    },
    id: {
      description: "ID personalizado para o contêiner.",
      table: { type: { summary: "string" } },
    },
    className: {
      description: "Classe CSS adicional.",
      table: { type: { summary: "string" } },
    },
    label: {
      description: "Texto do rótulo exibido acima do componente.",
      table: { type: { summary: "string" } },
    },
    description: {
      description: "Texto descritivo auxiliar.",
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
    noOptionsMessage: {
      description: "Mensagem exibida quando nenhuma opção está disponível.",
      table: { type: { summary: "string" } },
      defaultValue: { summary: '"Nenhuma opção encontrada"' },
    },
    icon: {
      description: "Ícone renderizado no trigger.",
      table: { type: { summary: "React.ReactNode" } },
      control: false,
    },
    errorMessage: {
      description: "Mensagem de erro exibida abaixo do componente.",
      table: { type: { summary: "string" } },
    },
    readOnly: {
      description: "Modo somente leitura (impede alterações).",
      table: { type: { summary: "boolean" } },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <Select {...args} />
        </div>
      </div>
      <DownloadZipButton files={zipFiles} zipName="select" />
    </div>
  ),
};
