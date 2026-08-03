import { faArrowRight, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { Button } from "../ui/index";

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
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    children: "Salvar Alterações",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <Button {...args} />
      </div>
      <DownloadZipButton files={zipFiles} zipName="button" />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  render: Default.render,
};

export const WithIcons: Story = {
  args: {
    leftIcon: <FontAwesomeIcon icon={faSave} />,
    rightIcon: <FontAwesomeIcon icon={faArrowRight} />,
  },
  render: Default.render,
};
