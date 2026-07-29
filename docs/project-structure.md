# Estrutura do Projeto: Arquitetura Baseada em Funcionalidades (Features)

Este projeto segue uma **Arquitetura Baseada em Funcionalidades (Feature-Based Architecture)**, o que significa que o código é organizado em torno de funcionalidades autônomas e voltadas para regras de negócio ou componentes de UI, ao invés de camadas técnicas (ex: separar todos os componentes, testes e estilos em pastas globais próprias).

## Por que Baseado em Funcionalidades?

- **Coesão**: Tudo relacionado a uma funcionalidade específica (componentes, estilos, testes e documentação) vive no mesmo lugar.
- **Escalabilidade**: Conforme o projeto cresce, torna-se muito mais fácil navegar e manter, porque você não precisa pular entre várias pastas distantes para alterar uma única funcionalidade.
- **Encapsulamento**: Funcionalidades podem definir sua própria lógica interna e expor apenas o necessário através da sua API pública (`index.ts`).

## O Diretório `src/features/`

Todas as principais funcionalidades de UI estão localizadas dentro de `src/features/`. Cada funcionalidade (por exemplo, `modal`, `select`, etc.) possui seu próprio diretório isolado.

### Estrutura Típica de uma Funcionalidade

Abaixo está um exemplo de como é a estrutura padrão de um diretório de funcionalidade:

```text
src/
└── features/
    └── [nome-da-funcionalidade]/   # Ex: modal, select, data-table, etc.
        ├── ui/                     # Detalhes de implementação e código fonte
        │   ├── components/         # Pastas isoladas para cada subcomponente visual
        │   │   └── [sub-componente]/
        │   │       ├── [sub-componente].tsx
        │   │       └── [sub-componente].module.css # Estilização local do componente
        │   ├── hooks/              # (Opcional) Hooks customizados de lógica de UI
        │   │   └── use-[hook].ts
        │   ├── theme.css           # Variáveis globais/CSS para tematização base
        │   ├── index.ts            # API Pública / Barrel file para exportar a UI
        │   └── README.md           # Documentação específica (dependências, uso)
        ├── tests/                  # Testes de unidade e integração (Vitest)
        │   └── [componente].test.tsx
        └── stories/                # Histórias do Storybook para documentação da UI
            └── [componente].stories.tsx
```

### Responsabilidades das Pastas

1. **`ui/`**:
   Contém o código-fonte principal da funcionalidade. Diferente de uma estrutura "plana", ele é subdividido em:
   - **`components/`**: Cada parte visual (o "root", o "trigger", o "dropdown", etc.) ganha sua própria sub-pasta contendo o arquivo `.tsx` e seu respectivo `.module.css`.
   - **`hooks/`**: Para custom hooks isolados que controlam comportamento (se a funcionalidade precisar, como um `useModal`).
   - Os arquivos de base como o `theme.css` (para tokens CSS da feature inteira), o `index.ts` que decide o que será exportado, e um `README.md` explicando dependências.

2. **`tests/`**:
   Contém todos os testes automatizados (`Vitest` / `Testing Library`) relacionados à funcionalidade. Manter os testes dentro da pasta da funcionalidade facilita encontrá-los e atualizá-los quando a UI mudar.

3. **`stories/`**:
   Contém histórias do `Storybook`. Esses arquivos são usados para documentar os estados dos componentes visualmente e permitir desenvolvimento interativo e testes.

4. **`ui/index.ts` (A API Pública)**:
   Este é um arquivo crucial. Ele atua como um "barrel file" ou a interface pública para os componentes de UI da funcionalidade. Outras partes do aplicativo devem importar **apenas** deste arquivo. Arquivos internos de `ui/` não devem ser importados diretamente por módulos externos sem passar por esse index.

   _Exemplo:_

   ```ts
   // ✅ FAÇA ISSO:
   import { Modal } from "@/features/modal/ui";

   // ❌ NÃO FAÇA ISSO:
   import { Popup } from "@/features/modal/ui/modal";
   ```

## Compatibilidade

A ideia fundamental deste projeto é garantir total compatibilidade com o **React 16** e todas as suas versões posteriores. O objetivo é que os componentes construídos funcionem de maneira estável e possam ser facilmente adaptados, copiados e colados em bases de código de diferentes idades — desde os projetos legados baseados em React 16 até os mais modernos utilizando as versões mais recentes do ecossistema.

## Consumindo Componentes

Como somos uma biblioteca baseada no conceito "copiar-colar", você não instala nossos componentes via `npm` ou `yarn`. Em vez disso, você copia o código-fonte diretamente para o seu projeto.

Para facilitar esse processo, a documentação de cada componente no **Storybook** possui um botão interativo chamado **"Baixar Código-Fonte (ZIP)"**.

Ao clicar neste botão:

1. Um arquivo `.zip` será baixado contendo todo o conteúdo do diretório `ui/` daquela funcionalidade (arquivos `.tsx`, `.ts`, `.module.css` e `.css`).
2. Extraia o conteúdo e coloque-o na pasta apropriada do seu projeto (ex: `src/components/[nome-do-componente]`).
3. Instale as dependências externas que o componente possa exigir (geralmente documentadas no `README.md` do próprio componente, como `@base-ui/react` ou `zustand`).

## Criando uma Nova Funcionalidade

Ao criar uma nova funcionalidade, sempre siga esta estrutura estabelecida. Certifique-se de que:

- Você crie os subdiretórios `ui/`, `tests/` e `stories/`.
- Você exporte corretamente os componentes públicos e tipos em `ui/index.ts`.
- Você use CSS Modules (`.module.css`) para estilização com escopo a fim de evitar conflitos.
- Sempre crie um arquivo `theme.css` na pasta `ui/` que contenha as variáveis CSS do componente, facilitando a customização por quem consumi-lo.
- Você escreva testes de unidade e histórias para os novos componentes.
- Nas histórias do Storybook (`.stories.tsx`), defina sempre o `title` iniciando com `Components/` (ex: `title: "Components/NomeDoComponente"`) em vez de `Features/`.
