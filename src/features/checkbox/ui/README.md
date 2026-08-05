# Componente Checkbox

Um componente de seleção múltipla (Checkbox) flexível e acessível, com suporte a controle controlado e não-controlado, orientação vertical/horizontal e estados de erro e somente leitura.

## Dependências

Nenhuma dependência externa além do React é necessária para utilizar o componente `Checkbox`.

## Como Usar

```tsx
import { Checkbox } from "@/features/checkbox/ui";

const OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

export function MyForm() {
  return (
    <Checkbox
      label="Quais frameworks você conhece?"
      options={OPTIONS}
      onChange={(value) => console.log(value)}
    />
  );
}
```

## Estilização

A estilização é feita utilizando CSS Modules puros (Vanilla CSS) para garantir que as classes não sofram conflitos com o restante do projeto.
