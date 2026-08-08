import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { AsyncMultiSelect } from "../ui/components/async-multi-select";
import { FormAsyncMultiSelect } from "../ui/components/form-async-multi-select";

const PRODUCTS = [
  { id: 1, title: "Backpack" },
  { id: 2, title: "T-Shirt" },
  { id: 3, title: "Jacket" },
];

interface Product {
  id: number;
  title: string;
}

const loadOptions = vi.fn(async (search?: string): Promise<{ data: Product[] }> => {
  if (search) {
    const term = search.toLowerCase();
    return { data: PRODUCTS.filter((p) => p.title.toLowerCase().includes(term)) };
  }
  return { data: PRODUCTS };
});

function renderAsyncMultiSelect() {
  return render(
    <AsyncMultiSelect
      loadOptions={loadOptions}
      getArray={(result) => result.data}
      getLabel={(product) => product.title}
      getValue={(product) => String(product.id)}
      debounceMs={0}
      placeholder="Select..."
    />
  );
}

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe("AsyncMultiSelect Component", () => {
  test("loads options on mount and selects one", async () => {
    const user = userEvent.setup();
    renderAsyncMultiSelect();

    await waitFor(() => expect(loadOptions).toHaveBeenCalled());

    const combobox = screen.getByRole("combobox");
    await user.click(combobox);
    await user.click(screen.getByRole("option", { name: /^Backpack$/ }));

    const backpacks = await screen.findAllByText("Backpack");
    expect(backpacks.length).toBeGreaterThan(0);
  });

  test("searches the API when typing", async () => {
    const user = userEvent.setup();
    renderAsyncMultiSelect();

    await waitFor(() => expect(loadOptions).toHaveBeenCalled());

    const combobox = screen.getByRole("combobox");
    await user.click(combobox);
    await user.type(combobox, "shirt");

    await waitFor(() => expect(loadOptions).toHaveBeenCalledWith("shirt"));
  });

  test("caches repeated search terms", async () => {
    const user = userEvent.setup();
    renderAsyncMultiSelect();

    await waitFor(() => expect(loadOptions).toHaveBeenCalled());

    const combobox = screen.getByRole("combobox");
    await user.click(combobox);
    await user.type(combobox, "shirt");
    await waitFor(() => expect(loadOptions).toHaveBeenCalledWith("shirt"));

    const shirtCalls = loadOptions.mock.calls.filter((call) => call[0] === "shirt").length;
    expect(shirtCalls).toBe(1);

    await user.clear(combobox);
    await user.type(combobox, "shirt");
    await waitFor(() => expect(loadOptions).toHaveBeenCalledWith("shirt"));

    const shirtCallsAfter = loadOptions.mock.calls.filter((call) => call[0] === "shirt").length;
    expect(shirtCallsAfter).toBe(1);
  });

  test("shows the loading state while fetching", async () => {
    const user = userEvent.setup();
    let resolve!: (value: { data: Product[] }) => void;
    const pendingLoad = vi.fn(() => new Promise<{ data: Product[] }>((res) => (resolve = res)));

    render(
      <AsyncMultiSelect
        loadOptions={pendingLoad}
        getArray={(result) => result.data}
        getLabel={(product) => product.title}
        getValue={(product) => String(product.id)}
        debounceMs={0}
        placeholder="Buscar..."
      />
    );

    const combobox = screen.getByRole("combobox");
    await user.click(combobox);

    await waitFor(() => expect(pendingLoad).toHaveBeenCalled());

    expect(screen.getByText("Carregando...")).toBeTruthy();

    resolve({ data: PRODUCTS });
    await waitFor(() => expect(screen.queryByText("Carregando...")).toBeNull());
  });

  test("works with react-hook-form (FormAsyncMultiSelect)", async () => {
    const user = userEvent.setup();

    function FormHarness() {
      const { control, watch } = useForm<{ productIds: string[] }>();
      const value = watch("productIds");
      return (
        <div>
          <FormAsyncMultiSelect
            name="productIds"
            control={control}
            loadOptions={loadOptions}
            getArray={(result) => result.data}
            getLabel={(product) => product.title}
            getValue={(product) => String(product.id)}
            debounceMs={0}
          />
          <span data-testid="form-value">{value ? value.join(",") : ""}</span>
        </div>
      );
    }
    render(<FormHarness />);

    await waitFor(() => expect(loadOptions).toHaveBeenCalled());

    const combobox = screen.getByRole("combobox");
    await user.click(combobox);
    await user.click(screen.getByRole("option", { name: /^Backpack$/ }));
    await user.click(screen.getByRole("option", { name: /^Jacket$/ }));

    const formValue = screen.getByTestId("form-value");
    expect(formValue.textContent).toBe("1,3");
  });
});
