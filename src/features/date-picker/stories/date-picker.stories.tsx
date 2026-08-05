import { Controls, Markdown, Primary, Title } from "@storybook/addon-docs/blocks";
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
      page: () => (
        <>
          <Title />
          <Primary />
          <Controls />
          <Markdown>{readme}</Markdown>
        </>
      ),
    },
  },
  tags: ["autodocs"],
  args: {
    label: "Data de Nascimento",
  },
  argTypes: {
    mode: {
      description: "Modo de seleção: data única ou intervalo.",
      table: { type: { summary: '"single" | "range"' } },
      defaultValue: { summary: '"single"' },
    },
    showTime: {
      description: "Exibe o seletor de horário.",
      table: { type: { summary: "boolean" } },
    },
    value: {
      description: "Valor controlado (Date ou DateRange).",
      table: { type: { summary: "Date | DateRange" } },
    },
    onChange: {
      description: "Callback disparado quando a data muda.",
      table: { type: { summary: "(value: Date | DateRange | undefined) => void" } },
    },
    label: {
      description: "Texto do rótulo exibido acima do campo.",
      table: { type: { summary: "string" } },
    },
    errorMessage: {
      description: "Mensagem de erro exibida abaixo do campo.",
      table: { type: { summary: "string" } },
    },
    description: {
      description: "Texto descritivo auxiliar.",
      table: { type: { summary: "string" } },
    },
    placeholder: {
      description: "Texto placeholder do input.",
      table: { type: { summary: "string" } },
      defaultValue: { summary: '"Selecione uma data..."' },
    },
    readOnly: {
      description: "Modo somente leitura (impede alterações).",
      table: { type: { summary: "boolean" } },
    },
    required: {
      description: "Indica que o campo é obrigatório.",
      table: { type: { summary: "boolean" } },
    },
    showRequiredText: {
      description: "Exibe o texto de obrigatório visualmente.",
      table: { type: { summary: "boolean" } },
    },
    disabled: {
      description: "Desabilita o campo.",
      table: { type: { summary: "boolean" } },
    },
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
