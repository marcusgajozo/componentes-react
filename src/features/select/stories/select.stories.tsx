import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { Select } from "../ui/index";
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
      description: {
        component: readme,
      },
    },
  },
  tags: ["autodocs"],
  args: {
    options: COUNTRIES,
    placeholder: "Selecione um país...",
    onChange: fn(),
    icon: <FontAwesomeIcon icon={faGlobe} />,
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

export const WithError: Story = {
  parameters: { layout: "padded" },
  args: {
    errorMessage: "Selecione um país válido.",
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <Select {...args} />
        </div>
      </div>
    </div>
  ),
};
