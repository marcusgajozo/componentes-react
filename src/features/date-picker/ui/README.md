# DatePicker

Um componente de seleção de data altamente customizável e acessível, construído em cima do `@daypicker/react` (v10).

## Funcionalidades

- 📅 Seleção individual de data
- ↔️ Seleção de intervalo (Range)
- 🕓 Possibilidade de selecionar hora
- 🎨 Design premium e animado (Popovers)
- ♿️ Acessível via teclado
- 🌍 Traduzido para PT-BR por padrão
- 🔒 Modo de leitura (`readOnly`)

## Utilização Básica

```tsx
import { useState } from "react";
import { DatePicker } from "gajozo-ui/date-picker";

export function App() {
  const [date, setDate] = useState<Date>();

  return (
    <DatePicker label="Data de Aniversário" value={date} onChange={(val) => setDate(val as Date)} />
  );
}
```

## Opções de Manutenção Futura

Para manter este componente, utilizamos o `@daypicker/react` na sua versão mais moderna (v10), que remove dependências legadas e foca no uso direto da API nativa de datas (ou `date-fns` que é nossa recomendação nativa). Se precisar mudar a linguagem ou formatos no futuro, ajuste a prop `locale` internamente na raiz do componente.
