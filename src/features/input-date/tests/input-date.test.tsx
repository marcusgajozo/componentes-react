import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { afterEach, describe, expect, test, vi } from "vitest";

import { FormInputDate } from "../ui/components/form-input-date/form-input-date";
import { InputDate } from "../ui/components/input-date/input-date";

afterEach(cleanup);

describe("InputDate Component", () => {
  test("renders label, description and required text", () => {
    render(
      <InputDate
        label="Data de nascimento"
        description="Informe a data"
        required
        showRequiredText
      />
    );

    expect(screen.getByText("Data de nascimento")).toBeTruthy();
    expect(screen.getByText("Informe a data")).toBeTruthy();
    expect(screen.getByText("(obrigatório)")).toBeTruthy();
  });

  test("calls onChange with the native value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<InputDate data-testid="input-date" onChange={onChange} />);

    const input = screen.getByTestId("input-date") as HTMLInputElement;
    await user.clear(input);
    await user.type(input, "2024-01-15");

    expect(onChange).toHaveBeenCalled();
    expect(input.value).toBe("2024-01-15");
  });

  test("switches between date and datetime-local types", () => {
    const { rerender } = render(<InputDate data-testid="input-date" type="date" />);

    const input = screen.getByTestId("input-date") as HTMLInputElement;
    expect(input.type).toBe("date");

    rerender(<InputDate data-testid="input-date" type="datetime-local" />);
    expect(screen.getByTestId("input-date").getAttribute("type")).toBe("datetime-local");
  });

  test("disables the input", () => {
    render(<InputDate data-testid="input-date" disabled />);

    const input = screen.getByTestId("input-date") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  test("works with react-hook-form via FormInputDate", async () => {
    type FormValues = { birthDate: string };

    const onSubmit: SubmitHandler<FormValues> = vi.fn();

    function TestForm() {
      const form = useForm<FormValues>({ defaultValues: { birthDate: "" } });

      return (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInputDate
              control={form.control}
              name="birthDate"
              label="Data"
              data-testid="form-input-date"
            />
            <button type="submit">Enviar</button>
          </form>
        </FormProvider>
      );
    }

    render(<TestForm />);

    const input = screen.getByTestId("form-input-date") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "2024-02-20" } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));

    expect(onSubmit).toHaveBeenCalledWith({ birthDate: "2024-02-20" }, expect.anything());
  });
});
