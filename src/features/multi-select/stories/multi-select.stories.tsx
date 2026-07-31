import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { MultiSelect } from "../ui/index";
import readme from "../ui/README.md?raw";

const uiFiles = import.meta.glob("../ui/*", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const zipFiles = Object.entries(uiFiles).map(([path, content]) => ({
  name: path.split("/").pop()!,
  content,
}));

const FRAMEWORKS: { value: string; label: string; disabled?: boolean }[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "ember", label: "Ember", disabled: true },
];

const meta = {
  title: "Components/MultiSelect",
  component: MultiSelect,
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
    options: FRAMEWORKS,
    placeholder: "Selecione frameworks...",
    onChange: fn(),
    icon: <FontAwesomeIcon icon={faTags} />,
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "320px" }}>
          <MultiSelect {...args} />
        </div>
      </div>
      <DownloadZipButton files={zipFiles} zipName="multi-select" />
    </div>
  ),
};

export const WithError: Story = {
  parameters: { layout: "padded" },
  args: {
    errorMessage: "Selecione pelo menos um framework.",
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "320px" }}>
          <MultiSelect {...args} />
        </div>
      </div>
    </div>
  ),
};

export const ReadOnly: Story = {
  parameters: { layout: "padded" },
  args: {
    label: "Frameworks Selecionados",
    value: ["react", "vue"],
    readOnly: true,
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "320px" }}>
          <MultiSelect {...args} />
        </div>
      </div>
    </div>
  ),
};
