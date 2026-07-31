import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";

import { InputFile } from "../ui/components/input-file/input-file";

afterEach(cleanup);

describe("InputFile Component", () => {
  test("Renders properly", () => {
    render(<InputFile label="Arquivo" description="Envie seu arquivo" />);

    expect(screen.getByText("Arquivo")).toBeTruthy();
    expect(screen.getByText("Envie seu arquivo")).toBeTruthy();
    expect(screen.getByText("Clique para selecionar")).toBeTruthy();
  });

  test("Shows required indicator", () => {
    render(<InputFile label="Arquivo" required showRequiredText />);

    expect(screen.getByText("(obrigatório)")).toBeTruthy();
  });

  test("Shows error message", () => {
    render(<InputFile errorMessage="Arquivo inválido" />);

    expect(screen.getByText("Arquivo inválido")).toBeTruthy();
  });

  test("Handles file selection", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputFile onChange={onChange} data-testid="file-input" />);

    const input = screen.getByTestId("file-input") as HTMLInputElement;
    const file = new File(["hello"], "hello.png", { type: "image/png" });

    await user.upload(input, file);

    expect(onChange).toHaveBeenCalled();
    expect(input.files?.[0]).toBe(file);
    expect(screen.getByText("hello.png")).toBeTruthy();
  });

  test("Handles multiple file selection", async () => {
    const user = userEvent.setup();
    render(<InputFile multiple data-testid="file-input" />);

    const input = screen.getByTestId("file-input") as HTMLInputElement;
    const file1 = new File(["hello"], "hello.png", { type: "image/png" });
    const file2 = new File(["world"], "world.png", { type: "image/png" });

    await user.upload(input, [file1, file2]);

    expect(input.files?.length).toBe(2);
    expect(screen.getByText("2 arquivo(s) selecionado(s)")).toBeTruthy();
  });

  test("Disables the input", () => {
    render(<InputFile disabled data-testid="file-input" />);

    const input = screen.getByTestId("file-input") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});
