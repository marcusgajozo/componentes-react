import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { Checkbox } from "../ui/index";

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
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    options: OPTIONS,
    label: "Quais frameworks você conhece?",
    onChange: fn(),
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

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <div style={{ padding: "32px 0", maxWidth: "400px" }}>
      <Checkbox {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    errorMessage: "Selecione pelo menos uma opção válida.",
  },
  render: (args) => (
    <div style={{ padding: "32px 0", maxWidth: "280px" }}>
      <Checkbox {...args} />
    </div>
  ),
};

export const ReadOnly: Story = {
  args: {
    label: "Frameworks Selecionados",
    value: ["react", "angular"],
    readOnly: true,
  },
  render: (args) => (
    <div style={{ padding: "32px 0", maxWidth: "280px" }}>
      <Checkbox {...args} />
    </div>
  ),
};
