# Componente Select

Um componente customizado de seleção (Select) construído usando a primitiva Combobox do `@base-ui/react`. Ele suporta filtro de busca por padrão, acessibilidade total via teclado e utiliza CSS modules padrão para estilização.

## Dependências

Para utilizar o componente `Select`, você precisa instalar a seguinte biblioteca no seu projeto:

- `@base-ui/react`: Fornece componentes acessíveis não estilizados (utilizado o componente combobox).
- `react-hook-form` (Opcional): Necessária apenas se for utilizar a versão de formulário (`FormSelect`).

**Instalação:**

```bash
npm install @base-ui/react react-hook-form
# ou
yarn add @base-ui/react react-hook-form
# ou
pnpm add @base-ui/react react-hook-form
```

Após instalar a dependência, basta copiar a pasta `select` para dentro de `src/features/` do seu projeto.

## Estrutura

- `index.ts`: Arquivo de exportação (API pública).
- `select.tsx`: Arquivo principal do componente.
- `select-trigger.tsx`: Subcomponente responsável pelo botão de gatilho (trigger).
- `select-dropdown.tsx`: Subcomponente responsável pelo menu suspenso (popup/dropdown).
- `theme.css`: **API de Design!** Contém todos os tokens de design (variáveis CSS) para o componente. Edite este arquivo para customizar cores, bordas, tipografia, etc. facilmente.
- `select.module.css`: Estilos estruturais base (contêiner, rótulo).
- `select-trigger.module.css`: Estilos estruturais específicos do gatilho (trigger).
- `select-dropdown.module.css`: Estilos estruturais específicos do menu suspenso (dropdown).

## Como Usar

```tsx
import { Select } from "@/features/select/ui";

const options = [
  { value: "apple", label: "Maçã" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Laranja", disabled: true },
];

export function MyForm() {
  return (
    <Select label="Escolha uma fruta" options={options} onChange={(value) => console.log(value)} />
  );
}
```

## AsyncSelect

O `AsyncSelect` é um wrapper do `Select` que busca as opções diretamente em uma API. Ele recebe uma função assíncrona (`loadOptions`) que retorna um resultado tipado, e funções `getArray`, `getLabel` e `getValue` para mapear o resultado para as opções do select. A busca é feita ao digitar no campo (com debounce), passando o termo como parâmetro para `loadOptions`. Todos os dados são cacheados por instância, garantindo que o valor selecionado nunca desapareça.

### Dependências

As mesmas do `Select` (`@base-ui/react` e, opcionalmente, `react-hook-form` para o `FormAsyncSelect`).

### Estrutura

- `async-select.tsx`: Componente principal (wrapper do `Select`).
- `form-async-select.tsx`: Versão integrada ao `react-hook-form`.

### Como Usar

```tsx
import { AsyncSelect } from "@/features/select/ui";

interface Product {
  id: number;
  title: string;
}

async function loadProducts(search?: string): Promise<{ data: Product[] }> {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();
  const filtered = search
    ? products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    : products;
  return { data: filtered };
}

export function MyForm() {
  return (
    <AsyncSelect
      label="Produto"
      placeholder="Buscar produto..."
      loadOptions={loadProducts}
      getArray={(result) => result.data}
      getLabel={(product) => product.title}
      getValue={(product) => String(product.id)}
      onChange={(value) => console.log(value)}
    />
  );
}
```

## FormAsyncSelect

Versão do `AsyncSelect` integrada ao `react-hook-form` (mesmo padrão do `FormSelect`). Use `name` e `control`:

```tsx
import { useForm } from "react-hook-form";
import { FormAsyncSelect } from "@/features/select/ui";

export function MyForm() {
  const { control } = useForm<{ productId: string }>();
  return (
    <FormAsyncSelect
      name="productId"
      control={control}
      loadOptions={loadProducts}
      getArray={(result) => result.data}
      getLabel={(product) => product.title}
      getValue={(product) => String(product.id)}
    />
  );
}
```
