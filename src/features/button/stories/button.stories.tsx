import { faArrowRight, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Controls, Markdown, Primary, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { Button } from "../ui/index";
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
  title: "Components/Button",
  component: Button,
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
    children: "Salvar Alterações",
    onClick: fn(),
  },
  argTypes: {
    isLoading: {
      description: "Exibe um spinner de carregamento e desabilita o botão.",
      table: { type: { summary: "boolean" } },
    },
    leftIcon: {
      description: "Ícone renderizado à esquerda do texto do botão.",
      table: { type: { summary: "React.ReactNode" } },
      control: false,
    },
    rightIcon: {
      description: "Ícone renderizado à direita do texto do botão.",
      table: { type: { summary: "React.ReactNode" } },
      control: false,
    },
    variant: {
      description: "Variante visual do botão.",
      table: { type: { summary: '"primary" | "outline" | "ghost"' } },
      defaultValue: { summary: '"primary"' },
    },
    children: {
      description: "Conteúdo textual do botão.",
      table: { type: { summary: "React.ReactNode" } },
      control: false,
    },
    disabled: {
      description: "Desabilita o botão (herdado de `ButtonHTMLAttributes`).",
      table: { type: { summary: "boolean" } },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftIcon: <FontAwesomeIcon icon={faSave} />,
    rightIcon: <FontAwesomeIcon icon={faArrowRight} />,
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <Button {...args} />
      </div>
      <DownloadZipButton files={zipFiles} zipName="button" />
    </div>
  ),
};
