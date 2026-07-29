import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { Radio } from "../ui/index";

const uiFiles = import.meta.glob("../ui/**/*", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const zipFiles = Object.entries(uiFiles).map(([path, content]) => ({
  name: path.split("/").pop()!,
  content,
}));

const OPTIONS = [
  { value: "light", label: "Tema Claro" },
  { value: "dark", label: "Tema Escuro" },
  { value: "system", label: "Sistema" },
];

const meta = {
  title: "Components/Radio",
  component: Radio,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    options: OPTIONS,
    label: "Escolha o tema:",
    onChange: fn(),
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <Radio {...args} />
        </div>
      </div>
      <DownloadZipButton files={zipFiles} zipName="radio" />
    </div>
  ),
};
