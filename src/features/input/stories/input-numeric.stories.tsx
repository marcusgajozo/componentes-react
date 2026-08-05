import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Controls, Markdown, Primary, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { InputNumeric } from "../ui/index";
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
  title: "Components/InputNumeric",
  component: InputNumeric,
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
    label: "Valor",
    placeholder: "R$ 0,00",
    onValueChange: fn(),
    thousandSeparator: ".",
    decimalSeparator: ",",
    prefix: "R$ ",
    decimalScale: 2,
    fixedDecimalScale: true,
    allowNegative: false,
    icon: <FontAwesomeIcon icon={faDollarSign} />,
  },
  argTypes: {
    label: {
      description: "Texto do rótulo exibido acima do campo (herdado de `InputProps`).",
      table: { type: { summary: "string" } },
    },
    placeholder: {
      description: "Texto placeholder do input.",
      table: { type: { summary: "string" } },
    },
    thousandSeparator: {
      description: "Separador de milhar (ex: '.').",
      table: { type: { summary: "string | boolean" } },
    },
    decimalSeparator: {
      description: "Separador decimal (ex: ',').",
      table: { type: { summary: "string" } },
    },
    prefix: {
      description: "Prefixo exibido antes do valor (ex: 'R$ ').",
      table: { type: { summary: "string" } },
    },
    suffix: {
      description: "Sufixo exibido após o valor (ex: '%').",
      table: { type: { summary: "string" } },
    },
    decimalScale: {
      description: "Número de casas decimais.",
      table: { type: { summary: "number" } },
    },
    fixedDecimalScale: {
      description: "Garante que as casas decimais sejam sempre exibidas.",
      table: { type: { summary: "boolean" } },
    },
    allowNegative: {
      description: "Permite valores negativos.",
      table: { type: { summary: "boolean" } },
    },
    icon: {
      description: "Ícone renderizado à esquerda do input (herdado de `InputProps`).",
      table: { type: { summary: "React.ReactNode" } },
      control: false,
    },
    errorMessage: {
      description: "Mensagem de erro exibida abaixo do campo (herdado de `InputProps`).",
      table: { type: { summary: "string" } },
    },
    onValueChange: {
      description: "Callback disparado quando o valor numérico muda.",
      table: { type: { summary: "(values: NumberFormatValues) => void" } },
    },
    isAllowed: {
      description: "Função para validar/limitar o valor inserido.",
      table: { type: { summary: "(values: NumberFormatValues) => boolean" } },
    },
  },
} satisfies Meta<typeof InputNumeric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <InputNumeric {...args} />
        </div>
      </div>
      <DownloadZipButton files={zipFiles} zipName="input-numeric" />
    </div>
  ),
};
