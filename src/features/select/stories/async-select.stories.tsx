import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Controls, Markdown, Primary, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { AsyncSelect, type AsyncSelectProps } from "../ui/index";
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

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

async function loadProducts(search?: string): Promise<{ data: Product[] }> {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();
  const filtered = search
    ? products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    : products;
  return { data: filtered };
}

const meta = {
  title: "Components/AsyncSelect",
  component: AsyncSelect,
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
    loadOptions: loadProducts,
    getArray: (result: { data: Product[] }) => result.data,
    getLabel: (product: Product) => product.title,
    getValue: (product: Product) => String(product.id),
    placeholder: "Buscar produto...",
    onChange: fn(),
    icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
  },
  argTypes: {
    loadOptions: {
      description: "Função assíncrona que busca os dados na API.",
      table: { type: { summary: "(params?: string) => Promise<TResult>" } },
    },
    getArray: {
      description: "Seleciona qual array do resultado será usado como opções.",
      table: { type: { summary: "(result: TResult) => TItem[]" } },
    },
    getLabel: {
      description: "Extrai o rótulo (label) de cada item.",
      table: { type: { summary: "(item: TItem) => string" } },
    },
    getValue: {
      description: "Extrai o valor (value) de cada item.",
      table: { type: { summary: "(item: TItem) => string" } },
    },
    debounceMs: {
      description: "Tempo de debounce (ms) para a busca ao digitar.",
      table: { type: { summary: "number" } },
      defaultValue: { summary: "300" },
    },
  },
} satisfies Meta<AsyncSelectProps<{ data: Product[] }, Product>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: "320px" }}>
          <AsyncSelect {...args} />
        </div>
      </div>
      <DownloadZipButton files={zipFiles} zipName="select" />
    </div>
  ),
};
