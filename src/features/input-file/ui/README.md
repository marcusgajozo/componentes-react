# Componente InputFile

Um componente customizado, moderno e completamente nativo de upload de arquivos (`Input File`), focado em usabilidade e design sem dependências UI externas pesadas. Ele suporta seleção múltipla, Drag & Drop (área de arrasto), paginação inteligente de arquivos listados e limite máximo configurável (`maxFiles`).

O componente é altamente modularizado com CSS Modules e não "vaza" CSS para outras áreas, podendo ser baixado e utilizado de maneira totalmente _standalone_.

## Dependências

Este componente foi construído utilizando as APIs padrão do HTML5 (DataTransfer e File API), mas tem uma dependência opcional de formulário:

- `react-hook-form` (Opcional): Necessária apenas se for utilizar a versão integrada de formulário (`FormInputFile`).

**Instalação da dependência (caso utilize formulários complexos):**

```bash
npm install react-hook-form
# ou
yarn add react-hook-form
# ou
pnpm add react-hook-form
```

Após instalar as dependências, basta copiar a pasta `input-file` para dentro de `src/features/` do seu projeto.

## Estrutura

A arquitetura do componente é modularizada em "barrel exports" limpos para facilitar manutenção:

- `index.ts`: Arquivo de exportação (API pública).
- `theme.css`: **API de Design!** Contém todos os tokens de design (variáveis CSS) para o componente.
- `components/input-file/`: O componente central que orquestra a lógica de estado e uploads (`input-file.tsx` e `input-file.module.css`).
- `components/drop-zone/`: Subcomponente focado na área interativa pontilhada e estados de drag-and-drop.
- `components/file-list/`: Subcomponente focado na renderização da lista de arquivos selecionados, incluindo o botão de exclusão e a lógica de paginação "Mostrar mais".
- `components/form-input-file/`: Componente Wrapper que integra o `InputFile` ao contexto do `react-hook-form` através do `<Controller>`.
- `components/icons/`: Centraliza os SVGs nativos usados no componente sem depender de bibliotecas externas de ícones.

## Como Usar

### Uso Básico

```tsx
import { InputFile } from "@/features/input-file/ui";

export function FileUploadExample() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Input File Simples com DropZone */}
      <InputFile label="Foto de Perfil" description="Selecione sua melhor foto" />

      {/* Múltiplos Arquivos com Limite de 5 */}
      <InputFile
        label="Documentos Fiscais"
        multiple
        maxFiles={5}
        description="Você pode enviar no máximo 5 PDFs"
      />

      {/* Botão Simples (Desabilitando a área de DropZone) */}
      <InputFile label="Certificado" showDropZone={false} />
    </div>
  );
}
```

### Principais Props (InputFile)

- `label` _(string)_: O texto de cabeçalho do campo.
- `description` _(string)_: Texto auxiliar renderizado abaixo da área de upload.
- `errorMessage` _(string)_: Mensagem de erro (renderizada em vermelho acima da lista de arquivos).
- `multiple` _(boolean)_: Se `true`, permite selecionar vários arquivos e os **acrescenta** (`append`) aos arquivos previamente selecionados, atualizando se já existirem.
- `maxFiles` _(number)_: Limita a quantidade máxima de arquivos no modo `multiple`. Quando atingido, bloqueia o dropzone e o botão automaticamente.
- `showDropZone` _(boolean, default: true)_: Se `false`, remove a zona pontilhada e passa a renderizar um `<button>` esticado com a cor principal (primary) para trigger do seletor.

## Recursos Integrados

- **Atualização Silenciosa (Deduplicação)**: Ao arrastar um arquivo com o mesmo nome de um já selecionado, ele _atualiza_ a entrada no estado (preservando novas modificações e tamanho) sem gerar um arquivo repetido na lista.
- **Paginação de Lista**: Se a seleção for maior que 3 arquivos, o componente esconde o excedente para não poluir a tela, e oferece um botão **"Mostrar mais (x)"** que carrega pacotes de mais 5 arquivos sucessivamente. O reset é automático caso novos arquivos sejam submetidos.
- **Isolamento de CSS**: Regras complexas baseadas no pseudo-selector `+ label` evitam conflitos de focus-ring entre filhos e pais no CSS Modules.
