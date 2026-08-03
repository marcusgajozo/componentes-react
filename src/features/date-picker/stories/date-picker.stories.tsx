import type { DateRange } from "@daypicker/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { DatePicker } from "../ui/index";
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
  title: "Components/DatePicker",
  component: DatePicker,
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
    label: "Data de Nascimento",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date>();
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
          <div style={{ width: "320px" }}>
            <DatePicker {...args} value={date} onChange={(val) => setDate(val as Date)} />
          </div>
        </div>
        <DownloadZipButton files={zipFiles} zipName="date-picker" />
      </div>
    );
  },
};

export const Range: Story = {
  args: {
    label: "Período da Viagem",
    mode: "range",
  },
  render: (args) => {
    const [range, setRange] = useState<DateRange>();
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "320px" }}>
          <DatePicker {...args} value={range} onChange={(val) => setRange(val as DateRange)} />
        </div>
      </div>
    );
  },
};

export const WithTime: Story = {
  args: {
    label: "Agendamento",
    showTime: true,
  },
  render: (args) => {
    const [date, setDate] = useState<Date>();
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "320px" }}>
          <DatePicker {...args} value={date} onChange={(val) => setDate(val as Date)} />
        </div>
      </div>
    );
  },
};

export const WithError: Story = {
  args: {
    errorMessage: "A data informada é inválida.",
  },
  render: (args) => (
    <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
      <div style={{ width: "320px" }}>
        <DatePicker {...args} />
      </div>
    </div>
  ),
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: new Date(2026, 6, 31),
  },
  render: (args) => (
    <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
      <div style={{ width: "320px" }}>
        <DatePicker {...args} />
      </div>
    </div>
  ),
};
