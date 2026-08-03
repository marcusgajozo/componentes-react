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
      description: {
        component: readme,
      },
    },
  },
  tags: ["autodocs"],
  args: {
    label: "CPF",
    placeholder: "000.000.000-00",
    mask: "CPF",
    onChange: fn(),
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

export const WithoutMask: Story = {
  parameters: { layout: "padded" },
  args: {
    label: "Nome",
    placeholder: "Digite seu nome...",
    mask: undefined,
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <Input {...args} />
        </div>
      </div>
    </div>
  ),
};

export const WithError: Story = {
  parameters: { layout: "padded" },
  args: {
    label: "E-mail",
    placeholder: "Digite seu e-mail...",
    mask: undefined,
    errorMessage: "E-mail inválido",
    defaultValue: "usuario@errado",
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <Input {...args} />
        </div>
      </div>
    </div>
  ),
};
