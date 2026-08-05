# Componente Radio

Um componente de seleção única (Radio) flexível e acessível, com suporte a controle controlado e não-controlado, orientação vertical/horizontal e estados de erro e somente leitura.

## Dependências

Nenhuma dependência externa além do React é necessária para utilizar o componente `Radio`.

## Como Usar

```tsx
import { Radio } from "@/features/radio/ui";

const OPTIONS = [
  { value: "light", label: "Tema Claro" },
  { value: "dark", label: "Tema Escuro" },
  { value: "system", label: "Sistema" },
];

export function MyForm() {
  return (
    <Radio label="Escolha o tema:" options={OPTIONS} onChange={(value) => console.log(value)} />
  );
}
```

## Estilização

A estilização é feita utilizando CSS Modules puros (Vanilla CSS) para garantir que as classes não sofram conflitos com o restante do projeto.
