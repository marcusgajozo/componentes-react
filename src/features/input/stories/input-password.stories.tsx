import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Controls, Markdown, Primary, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { InputPassword } from "../ui/index";
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
  title: "Components/InputPassword",
  component: InputPassword,
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
    label: "Senha",
    placeholder: "Digite sua senha...",
    onChange: fn(),
    icon: <FontAwesomeIcon icon={faLock} />,
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
    errorMessage: {
      description: "Mensagem de erro exibida abaixo do campo (herdado de `InputProps`).",
      table: { type: { summary: "string" } },
    },
    description: {
      description: "Texto descritivo auxiliar (herdado de `InputProps`).",
      table: { type: { summary: "string" } },
    },
    icon: {
      description: "Ícone renderizado à esquerda do input (herdado de `InputProps`).",
      table: { type: { summary: "React.ReactNode" } },
      control: false,
    },
    required: {
      description: "Indica que o campo é obrigatório (herdado de `InputHTMLAttributes`).",
      table: { type: { summary: "boolean" } },
    },
    showRequiredText: {
      description: "Exibe o texto de obrigatório visualmente (herdado de `InputProps`).",
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
    onChange: {
      description: "Callback disparado quando o valor muda (herdado de `InputHTMLAttributes`).",
      table: { type: { summary: "(e: React.ChangeEvent<HTMLInputElement>) => void" } },
    },
  },
} satisfies Meta<typeof InputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <InputPassword {...args} />
        </div>
      </div>
      <DownloadZipButton files={zipFiles} zipName="input-password" />
    </div>
  ),
};
