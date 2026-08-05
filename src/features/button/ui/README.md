# Componente Button

Um componente de botão flexível e reutilizável que suporta estados de carregamento, ícones e múltiplas variantes visuais. Construído com CSS Modules para estilização isolada.

## Dependências

Nenhuma dependência externa além do React é necessária para utilizar o componente `Button`.

## Como Usar

```tsx
import { Button } from "@/features/button/ui";

export function MyComponent() {
  return <Button onClick={() => console.log("Clicou!")}>Salvar Alterações</Button>;
}
```

### Com Ícones

```tsx
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

<Button leftIcon={<FontAwesomeIcon icon={faSave} />}>Salvar</Button>;
```

### Com Loading

```tsx
<Button isLoading={isLoading}>Processando...</Button>
```

## Estilização

A estilização é feita utilizando CSS Modules puros (Vanilla CSS) para garantir que as classes não sofram conflitos com o restante do projeto.
