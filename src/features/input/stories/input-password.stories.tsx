import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { InputPassword } from "../ui/index";

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
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "Senha",
    placeholder: "Digite sua senha...",
    onChange: fn(),
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

export const WithError: Story = {
  parameters: { layout: "padded" },
  args: {
    errorMessage: "A senha deve ter no mínimo 8 caracteres.",
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <InputPassword {...args} />
        </div>
      </div>
    </div>
  ),
};

export const WithLeftIcon: Story = {
  parameters: { layout: "padded" },
  args: {
    icon: <FontAwesomeIcon icon={faLock} />,
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <InputPassword {...args} />
        </div>
      </div>
    </div>
  ),
};
