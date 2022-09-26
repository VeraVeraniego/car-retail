import { MockedProvider } from "@apollo/client/testing";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";

import { mockedFormData } from "../../test/form-mocks";
import { PublishCarForm } from "./PublishCarForm.component";

describe("Publish Form", () => {
  const user = userEvent.setup();
  beforeEach(() => {
    render(
      <>
        <MockedProvider mocks={mockedFormData} addTypename={false}>
          <PublishCarForm />
        </MockedProvider>
        <ToastContainer />
      </>
    );
  });
  afterEach(cleanup);

  test("Form is rendered", async () => {
    expect(await screen.findByText(/brand*/i)).toBeInTheDocument();
  });

  test("should load color, brands and city options", async () => {
    const colorOption = await screen.findByRole("option", { name: /White/i });
    const brandOption = await screen.findByRole("option", { name: /Ford/i });
    const cityOption = await screen.findByRole("option", { name: /Miami/i });
    expect(colorOption).toBeInTheDocument();
    expect(brandOption).toBeInTheDocument();
    expect(cityOption).toBeInTheDocument();
  });

  test("should reload models on brand select", async () => {
    const brandSelect = (await screen.findByText(/BMW/i)).closest("select");
    await user.selectOptions(brandSelect!, "6");
    const brandsOption1: HTMLOptionElement = screen.getByText(/BMW/i);
    expect(brandsOption1.selected).toBe(true);
    const modelFromBrand1 = await screen.findByText(/Serie 7/i);
    expect(modelFromBrand1).toBeInTheDocument();
    await user.selectOptions(brandSelect!, "4");
    const optionBrand2: HTMLOptionElement = screen.getByText(/Ford/i);
    expect(optionBrand2.selected).toBe(true);
    expect(await screen.findByText(/Mustang/i)).toBeInTheDocument();
    expect(modelFromBrand1).not.toBeInTheDocument();
  });

  test("should show validation messages on submitting empty inputs", async () => {
    const button = await screen.findByRole("button");
    await user.click(button);
    expect(screen.getByText(/Select your car's Brand/i)).toBeInTheDocument();
    expect(screen.getByText(/Select your car's Model/i)).toBeInTheDocument();
  });

  test("should show toast error when car VIN is duplicated", async () => {
    const brandSelect = (await screen.findByText(/BMW/i)).closest("select");
    await user.selectOptions(brandSelect!, "6");
    const modelsSelect = (await screen.findByText(/M4/i)).closest("select");
    await user.selectOptions(modelsSelect!, "24");
    const citySelect = (await screen.findByText(/Miami/i)).closest("select");
    await user.selectOptions(citySelect!, "8");
    const vinInput = screen.getByPlaceholderText("8YTN4YPFK375ZNV");
    await user.type(vinInput, "DUPL1C4T3DV1N");
    const colorSelect = (await screen.findByText(/White/i)).closest("select");
    await user.selectOptions(colorSelect!, "2");
    user.click(screen.getByLabelText("New"));
    const datePicker = screen.getByTestId("sale_date");
    await user.type(datePicker, "2022-12-25");
    const priceInput = screen.getByPlaceholderText("10500");
    await user.type(priceInput, "42000");
    await user.click(screen.getByRole("button"));
    expect(
      await screen.findByText(
        "Car could not be published, you may have already added this car."
      )
    ).toBeInTheDocument();
  });

  test("should show success toast when car successfully created", async () => {
    const brandSelect = (await screen.findByText(/BMW/i)).closest("select");
    await user.selectOptions(brandSelect!, "6");
    const modelsSelect = (await screen.findByText(/M4/i)).closest("select");
    await user.selectOptions(modelsSelect!, "24");
    const citySelect = (await screen.findByText(/Miami/i)).closest("select");
    await user.selectOptions(citySelect!, "8");
    const vinInput = screen.getByPlaceholderText("8YTN4YPFK375ZNV");
    await user.type(vinInput, "G00DV1N");
    const colorSelect = (await screen.findByText(/White/i)).closest("select");
    await user.selectOptions(colorSelect!, "2");
    user.click(screen.getByLabelText("New"));
    const datePicker = screen.getByTestId("sale_date");
    await user.type(datePicker, "2022-12-25");
    const priceInput = screen.getByPlaceholderText("10500");
    await user.type(priceInput, "42000");
    await user.click(screen.getByRole("button"));
    expect(
      await screen.findByText("Successfully added car")
    ).toBeInTheDocument();
  });
});
