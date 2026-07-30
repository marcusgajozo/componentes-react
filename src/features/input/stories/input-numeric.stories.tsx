import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { InputNumeric } from "../ui/index";

const uiFiles = import.meta.glob("../ui/components/input-numeric/*", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const zipFiles = Object.entries(uiFiles).map(([path, content]) => ({
  name: path.split("/").pop()!,
  content,
}));

const meta = {
  title: "Components/InputNumeric",
  component: InputNumeric,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "Valor",
    placeholder: "R$ 0,00",
    onValueChange: fn(),
  },
} satisfies Meta<typeof InputNumeric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Currency: Story = {
  parameters: { layout: "padded" },
  args: {
    thousandSeparator: ".",
    decimalSeparator: ",",
    prefix: "R$ ",
    decimalScale: 2,
    fixedDecimalScale: true,
    allowNegative: false,
    icon: <FontAwesomeIcon icon={faDollarSign} />,
  },
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

export const Percentage: Story = {
  parameters: { layout: "padded" },
  args: {
    label: "Desconto",
    placeholder: "0%",
    suffix: "%",
    decimalScale: 2,
    allowNegative: false,
    isAllowed: (values) => {
      const { floatValue } = values;
      return floatValue === undefined || floatValue <= 100;
    },
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <InputNumeric {...args} />
        </div>
      </div>
    </div>
  ),
};

export const WithError: Story = {
  parameters: { layout: "padded" },
  args: {
    label: "Valor Inválido",
    errorMessage: "O valor não pode ser negativo.",
    thousandSeparator: ".",
    decimalSeparator: ",",
    prefix: "R$ ",
    decimalScale: 2,
    fixedDecimalScale: true,
  },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "280px" }}>
          <InputNumeric {...args} />
        </div>
      </div>
    </div>
  ),
};
