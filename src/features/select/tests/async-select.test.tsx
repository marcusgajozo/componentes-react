import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

afterEach(cleanup);
beforeEach(() => {
  vi.clearAllMocks();
});

import { AsyncSelect } from "../ui/components/async-select";
import { FormAsyncSelect } from "../ui/components/form-async-select";

interface Product {
  id: number;
  title: string;
}

const PRODUCTS: Product[] = [
  { id: 1, title: "Backpack" },
  { id: 2, title: "T-Shirt" },
  { id: 3, title: "Jeans" },
];

const loadOptions = vi.fn(async (search?: string): Promise<{ data: Product[] }> => {
  if (search === "Backpack") return { data: [] };
  const filtered = search
    ? PRODUCTS.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    : PRODUCTS;
  return { data: filtered };
});

function renderAsyncSelect() {
  return render(
    <AsyncSelect
      loadOptions={loadOptions}
      getArray={(result) => result.data}
      getLabel={(product) => product.title}
      getValue={(product) => String(product.id)}
      debounceMs={0}
      placeholder="Buscar..."
    />
  );
}

describe("AsyncSelect Component", () => {
  test("loads options on mount and selects one", async () => {
    const user = userEvent.setup();
    renderAsyncSelect();

    await waitFor(() => expect(loadOptions).toHaveBeenCalled());

    const combobox = screen.getByRole("combobox");
    await user.click(combobox);
    await user.click(screen.getByRole("option", { name: /^Backpack$/ }));

    expect((screen.getByRole("combobox") as HTMLInputElement).value).toContain("Backpack");
  });

  test("searches the API when typing", async () => {
    const user = userEvent.setup();
    renderAsyncSelect();

    await waitFor(() => expect(loadOptions).toHaveBeenCalled());

    const combobox = screen.getByRole("combobox");
    await user.click(combobox);
    await user.type(combobox, "shirt");

    await waitFor(() => expect(loadOptions).toHaveBeenCalledWith("shirt"));
  });

  test("caches repeated search terms", async () => {
    const user = userEvent.setup();
    renderAsyncSelect();

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

  test("keeps the selected value's label when the current result excludes it", async () => {
    const user = userEvent.setup();
    renderAsyncSelect();

    await waitFor(() => expect(loadOptions).toHaveBeenCalled());

    const combobox = screen.getByRole("combobox");
    await user.click(combobox);
    await user.click(screen.getByRole("option", { name: /^Backpack$/ }));

    await waitFor(() => expect(loadOptions).toHaveBeenCalledWith("Backpack"));

    await user.click(screen.getByRole("combobox"));
    const option = await screen.findByRole("option", { name: /^Backpack$/ });
    expect(option).toBeTruthy();
  });

  test("shows the loading state while fetching", async () => {
    const user = userEvent.setup();
    let resolve!: (value: { data: Product[] }) => void;
    const pendingLoad = vi.fn(() => new Promise<{ data: Product[] }>((res) => (resolve = res)));

    render(
      <AsyncSelect
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

  test("works with react-hook-form (FormAsyncSelect)", async () => {
    const user = userEvent.setup();

    function FormHarness() {
      const { control, watch } = useForm<{ productId: string }>();
      const value = watch("productId");
      return (
        <div>
          <FormAsyncSelect
            name="productId"
            control={control}
            loadOptions={loadOptions}
            getArray={(result) => result.data}
            getLabel={(product) => product.title}
            getValue={(product) => String(product.id)}
            debounceMs={0}
          />
          <span data-testid="form-value">{value}</span>
        </div>
      );
    }

    render(<FormHarness />);

    await waitFor(() => expect(loadOptions).toHaveBeenCalled());

    const combobox = screen.getByRole("combobox");
    await user.click(combobox);
    await user.click(screen.getByRole("option", { name: /^Backpack$/ }));

    await waitFor(() => expect(screen.getByTestId("form-value").textContent).toBe("1"));
  });
});
