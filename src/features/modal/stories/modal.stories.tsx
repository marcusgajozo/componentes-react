import { Controls, Markdown, Primary, Title } from "@storybook/addon-docs/blocks";
import type { Meta } from "@storybook/react-vite";

import { DownloadZipButton } from "../../../storybook/download-zip";
import { Modal } from "../ui/index";
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

const meta = {
  title: "Components/Modal",
  component: Modal.Root,
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
  argTypes: {
    open: {
      description: "Controla a abertura do modal (modo controlado).",
      table: { type: { summary: "boolean" } },
    },
    onOpenChange: {
      description: "Callback disparado quando o estado de abertura muda.",
      table: { type: { summary: "(open: boolean, details: DialogDetails) => void" } },
    },
    defaultOpen: {
      description: "Estado de abertura inicial (modo não-controlado).",
      table: { type: { summary: "boolean" } },
    },
    disableOutsideClick: {
      description: "Se true, impede o fechamento ao clicar no backdrop.",
      table: { type: { summary: "boolean" } },
      defaultValue: { summary: "true" },
    },
    children: {
      description: "Conteúdo filho do modal (Trigger, Popup, etc.).",
      table: { type: { summary: "React.ReactNode" } },
      control: false,
    },
  },
} satisfies Meta<typeof Modal.Root>;

export default meta;

export const Default = {
  render: () => (
    <div>
      <div style={{ padding: "32px 0", textAlign: "center" }}>
        <Modal.Root>
          <Modal.Trigger
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              borderRadius: "4px",
              backgroundColor: "#0070C1",
              color: "white",
              border: "none",
            }}
          >
            Abrir Modal
          </Modal.Trigger>
          <Modal.Popup>
            <Modal.Title>Título do Modal</Modal.Title>
            <Modal.Body>
              <Modal.Description>
                Este é um modal simples construído com o padrão de composição e Base UI.
              </Modal.Description>
            </Modal.Body>
            <Modal.Buttons>
              <Modal.ButtonClose>Cancelar</Modal.ButtonClose>
              <Modal.ButtonAction>Confirmar</Modal.ButtonAction>
            </Modal.Buttons>
          </Modal.Popup>
        </Modal.Root>
      </div>
      <DownloadZipButton files={zipFiles} zipName="modal" />
    </div>
  ),
};
