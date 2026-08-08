import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputDate } from "../ui";

const meta = {
  title: "Components/InputDate",
  component: InputDate,
  parameters: { layout: "centered" },
  args: {
    label: "Data",
    description: "Selecione uma data",
    type: "date",
  },
} satisfies Meta<typeof InputDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: "280px" }}>
      <InputDate {...args} />
    </div>
  ),
};

export const DateTime: Story = {
  args: { type: "datetime-local", label: "Data e hora" },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Desabilitado" },
};
