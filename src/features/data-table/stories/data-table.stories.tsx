import { Controls, Markdown, Primary, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { DataTable, type DataTableProps } from "../ui";
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

type Viagem = {
  id: string;
  sentido: string;
  partida: string;
  chegada: string;
  placa: string;
  prefixo: string;
  assentos: number;
};

const meta: Meta<DataTableProps<Viagem>> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
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
  argTypes: {
    columns: {
      description: "Definição das colunas da tabela (TanStack Table).",
      table: { type: { summary: "ColumnDef<TData, TValue>[]" } },
    },
    data: {
      description: "Array de dados a serem exibidos na tabela.",
      table: { type: { summary: "TData[]" } },
    },
    totalItems: {
      description: "Total de itens para a paginação (geralmente do servidor).",
      table: { type: { summary: "number" } },
    },
    onSelectRow: {
      description:
        "Callback disparado quando linhas são selecionadas. Habilita a coluna de seleção.",
      table: { type: { summary: "(rows: TData[]) => void" } },
    },
    actionColumn: {
      description: "Lista de ações exibidas na coluna de ações de cada linha.",
      table: { type: { summary: "DataTableAction<TData>[]" } },
    },
    optionsPerPage: {
      description: "Opções de itens por página exibidas no seletor da paginação.",
      table: { type: { summary: "number[]" } },
      defaultValue: { summary: "[10, 20, 30, 40, 50]" },
    },
    isLoading: {
      description: "Exibe o skeleton de carregamento da tabela.",
      table: { type: { summary: "boolean" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const data: Viagem[] = [
  {
    id: "1",
    sentido: "Ida",
    partida: "06h00",
    chegada: "15h41",
    placa: "ABC1D23",
    prefixo: "001",
    assentos: 48,
  },
  {
    id: "2",
    sentido: "Volta",
    partida: "06h00",
    chegada: "15h41",
    placa: "DEF2G34",
    prefixo: "002",
    assentos: 48,
  },
  {
    id: "3",
    sentido: "Ida",
    partida: "21h00",
    chegada: "06h41",
    placa: "GHI3H45",
    prefixo: "003",
    assentos: 48,
  },
  {
    id: "4",
    sentido: "Volta",
    partida: "21h00",
    chegada: "06h41",
    placa: "JKL4I56",
    prefixo: "004",
    assentos: 48,
  },
  {
    id: "5",
    sentido: "Ida",
    partida: "21h00",
    chegada: "06h41",
    placa: "MNO5J67",
    prefixo: "005",
    assentos: 48,
  },
  {
    id: "6",
    sentido: "Volta",
    partida: "21h00",
    chegada: "06h41",
    placa: "PQR6K78",
    prefixo: "006",
    assentos: 48,
  },
  {
    id: "7",
    sentido: "Ida",
    partida: "21h00",
    chegada: "06h41",
    placa: "STU7L89",
    prefixo: "007",
    assentos: 48,
  },
  {
    id: "8",
    sentido: "Volta",
    partida: "21h00",
    chegada: "06h41",
    placa: "VWX8M90",
    prefixo: "008",
    assentos: 48,
  },
  {
    id: "9",
    sentido: "Ida",
    partida: "21h00",
    chegada: "06h41",
    placa: "YZA9N01",
    prefixo: "009",
    assentos: 48,
  },
  {
    id: "10",
    sentido: "Volta",
    partida: "21h00",
    chegada: "06h41",
    placa: "BCD0O12",
    prefixo: "010",
    assentos: 48,
  },
];

const columns: ColumnDef<Viagem>[] = [
  {
    accessorKey: "sentido",
    header: "Sentido",
  },
  {
    accessorKey: "partida",
    header: "Partida",
  },
  {
    accessorKey: "chegada",
    header: "Chegada",
  },
  {
    accessorKey: "placa",
    header: "Placa do Veículo",
  },
  {
    accessorKey: "prefixo",
    header: "Prefixo do Veículo",
  },
  {
    accessorKey: "assentos",
    header: "Assentos",
  },
];

export const Default: Story = {
  args: {
    columns,
    data,
    totalItems: 100,
    onSelectRow: fn(),
    actionColumn: [
      {
        title: "Editar",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        ),
        onAction: (row) => window.alert(`Editar item: ${row.id}`),
      },
      {
        title: "Excluir",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        ),
        onAction: (row) => window.alert(`Excluir item: ${row.id}`),
        omit: (row) => row.id === "10",
      },
    ],
  },
  render: (args) => (
    <div>
      <div style={{ padding: "32px 0" }}>
        <DataTable {...args} />
      </div>
      <DownloadZipButton files={zipFiles} zipName="data-table" />
    </div>
  ),
};
