# Componente Input

Um componente customizado de entrada de texto (Input) que já inclui suporte a máscaras utilizando `react-imask`. Ele utiliza CSS modules para estilização e mantém o padrão de acessibilidade e customização da biblioteca.

## Dependências

Para utilizar o componente `Input` com máscaras, você precisa instalar a seguinte biblioteca no seu projeto:

- `react-imask` e `imask`: Utilizada para o controle e aplicação das máscaras nos inputs.

**Instalação:**

```bash
npm install react-imask imask
# ou
yarn add react-imask imask
# ou
pnpm add react-imask imask
```

Após instalar as dependências, basta copiar a pasta `input` para dentro de `src/features/` do seu projeto.

## Estrutura

- `index.ts`: Arquivo de exportação (API pública).
- `theme.css`: **API de Design!** Contém todos os tokens de design (variáveis CSS) para o componente.
- `components/input/input.tsx`: Componente principal.
- `components/input/input.module.css`: Estilos do componente.
- `components/input/masks.ts`: Registro central de máscaras (ex: CPF, CNPJ, TELEFONE).

## Como Usar

```tsx
import { Input } from "@/features/input/ui";

export function MyForm() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Input Simples */}
      <Input label="Nome" placeholder="Digite seu nome" />

      {/* Input com Máscara de CPF */}
      <Input label="CPF" placeholder="000.000.000-00" mask="CPF" />

      {/* Input com Erro */}
      <Input label="E-mail" placeholder="Digite seu e-mail" error="E-mail inválido" />
    </div>
  );
}
```

## Adicionando novas máscaras

Para adicionar novas máscaras, edite o arquivo `components/input/masks.ts` inserindo novos objetos de configuração baseados na documentação do `imask`.
