# Componente MultiSelect

Um componente customizado de seleção múltipla (MultiSelect) construído usando a primitiva Combobox do `@base-ui/react`. Ele suporta filtro de busca por padrão, acessibilidade total via teclado e utiliza CSS modules padrão para estilização.

## Dependências

Para utilizar o componente `MultiSelect`, você precisa instalar a seguinte biblioteca no seu projeto:

- `@base-ui/react`: Fornece componentes acessíveis não estilizados (utilizado o componente combobox).
- `react-hook-form` (Opcional): Necessária apenas se for utilizar a versão de formulário (`FormMultiSelect`).

**Instalação:**

```bash
npm install @base-ui/react react-hook-form
# ou
yarn add @base-ui/react react-hook-form
# ou
pnpm add @base-ui/react react-hook-form
```

Após instalar a dependência, basta copiar a pasta `multi-select` para dentro de `src/features/` do seu projeto.

## Estrutura

- `index.ts`: Arquivo de exportação (API pública).
- `multi-select.tsx`: Arquivo principal do componente.
- `multi-select-trigger.tsx`: Subcomponente responsável pelo botão de gatilho e exibição das opções selecionadas (chips).
- `multi-select-dropdown.tsx`: Subcomponente responsável pelo menu suspenso (popup) e campo de busca.
- `theme.css`: **API de Design!** Contém todos os tokens de design (variáveis CSS) para o componente. Edite este arquivo para customizar cores, bordas, tipografia, etc. facilmente.
- `multi-select.module.css`: Estilos estruturais base (contêiner, rótulo).
- `multi-select-trigger.module.css`: Estilos estruturais específicos do gatilho (trigger).
- `multi-select-dropdown.module.css`: Estilos estruturais específicos do menu suspenso (dropdown).

## Como Usar

```tsx
import { MultiSelect } from "@/features/multi-select/ui";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular", disabled: true },
];

export function MyForm() {
  return (
    <MultiSelect
      label="Escolha os frameworks"
      options={options}
      onChange={(value) => console.log(value)}
      maxSelected={2}
    />
  );
}
```
