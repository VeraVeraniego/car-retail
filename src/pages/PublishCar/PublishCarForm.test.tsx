import { MockedProvider } from "@apollo/client/testing";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";

import {
  CreateCarDocument,
  FormDataDocument,
  ModelsDocument,
} from "../../graphql/generated/graphql";
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
    // TODO: FIX NAMING WHEN TEST BUTTON DELETED
    const button = await screen.findByRole("button", {
      name: /publish car now/i,
    });
    await user.click(button);
    expect(screen.getByText(/Select your car's Brand/i)).toBeInTheDocument();
    expect(screen.getByText(/Select your car's Model/i)).toBeInTheDocument();
  });
  // TODO: remove expects
  test("should show toast error when car VIN is duplicated", async () => {
    const brandSelect = (await screen.findByText(/BMW/i)).closest("select");
    await user.selectOptions(brandSelect!, "6");
    const brandsOption1: HTMLOptionElement = screen.getByText(/BMW/i);
    expect(brandsOption1.selected).toBe(true);
    const modelOption: HTMLOptionElement = await screen.findByText(/M4/i);
    const modelsSelect = (await screen.findByText(/M4/i)).closest("select");
    await user.selectOptions(modelsSelect!, "24");
    expect(modelOption.selected).toBe(true);
    const citySelect = (await screen.findByText(/Miami/i)).closest("select");
    await user.selectOptions(citySelect!, "8");
    const cityOption: HTMLOptionElement = await screen.findByText(/Miami/i);
    expect(cityOption.selected).toBe(true);
    const vinInput = screen.getByPlaceholderText("8YTN4YPFK375ZNV");
    await user.type(vinInput, "DUPL1C4T3DV1N");
    expect(vinInput).toHaveDisplayValue("DUPL1C4T3DV1N");
    const colorSelect = (await screen.findByText(/White/i)).closest("select");
    await user.selectOptions(colorSelect!, "2");
    const colorOption: HTMLOptionElement = await screen.findByText(/White/i);
    expect(colorOption.selected).toBe(true);
    user.click(screen.getByLabelText("New"));
    const datePicker = screen.getByTestId("sale_date");
    // TODO: TEST OUT OF DATE RANGE
    await user.type(datePicker, "2022-12-25");
    const priceInput = screen.getByPlaceholderText("10500");
    await user.type(priceInput, "42000");
    await user.click(screen.getByRole("button"));
    expect(
      await screen.findByText(
        "Car could not be published, you may have already added this car."
      )
    ).toBeInTheDocument();
    // screen.debug();
  });

  test("should show success toast when car successfully created", async () => {
    const brandSelect = (await screen.findByText(/BMW/i)).closest("select");
    await user.selectOptions(brandSelect!, "6");
    const brandsOption1: HTMLOptionElement = screen.getByText(/BMW/i);
    expect(brandsOption1.selected).toBe(true);
    const modelOption: HTMLOptionElement = await screen.findByText(/M4/i);
    const modelsSelect = (await screen.findByText(/M4/i)).closest("select");
    await user.selectOptions(modelsSelect!, "24");
    expect(modelOption.selected).toBe(true);
    const citySelect = (await screen.findByText(/Miami/i)).closest("select");
    await user.selectOptions(citySelect!, "8");
    const cityOption: HTMLOptionElement = await screen.findByText(/Miami/i);
    expect(cityOption.selected).toBe(true);
    const vinInput = screen.getByPlaceholderText("8YTN4YPFK375ZNV");
    await user.type(vinInput, "G00DV1N");
    expect(vinInput).toHaveDisplayValue("G00DV1N");
    const colorSelect = (await screen.findByText(/White/i)).closest("select");
    await user.selectOptions(colorSelect!, "2");
    const colorOption: HTMLOptionElement = await screen.findByText(/White/i);
    expect(colorOption.selected).toBe(true);
    user.click(screen.getByLabelText("New"));
    const datePicker = screen.getByTestId("sale_date");
    // TODO: TEST OUT OF DATE RANGE
    await user.type(datePicker, "2022-12-25");
    const priceInput = screen.getByPlaceholderText("10500");
    await user.type(priceInput, "42000");
    await user.click(screen.getByRole("button"));
    expect(
      await screen.findByText("Successfully added car")
    ).toBeInTheDocument();
    // screen.debug();
  });
  // test("test", async () => {
  //   const button = await screen.findByRole("button", {
  //     name: /TEST/i,
  //   });
  //   await user.click(button);
  //   expect(
  //     await screen.findByText("test warning notification")
  //   ).toBeInTheDocument();
  // });
});

const mockedFormData = [
  {
    request: {
      query: CreateCarDocument,

      variables: {
        object: {
          brand_id: 6,
          city_id: 8,
          color_id: 2,
          condition: "N",
          model_id: 24,
          odometer: "10000",
          price: "42000",
          sale_date: "2022-12-25",
          state_id: 3,
          title: "BMW M4 2020",
          vin: "DUPL1C4T3DV1N",
          year: "2020",
        },
      },
    },
    error: new Error(
      "Uniqueness violation. duplicate key value violates unique constraint 'cars_vin_key'"
    ),
  },
  {
    request: {
      query: CreateCarDocument,
      variables: {
        object: {
          brand_id: 6,
          city_id: 8,
          color_id: 2,
          condition: "N",
          model_id: 24,
          odometer: "10000",
          price: "42000",
          sale_date: "2022-12-25",
          state_id: 3,
          title: "BMW M4 2020",
          vin: "G00DV1N",
          year: "2020",
        },
      },
    },
    result: {
      data: {
        insert_cars_one: {
          brand_id: 6,
          city_id: 8,
          color_id: 2,
          condition: "N",
          model_id: 24,
          odometer: 10000,
          price: "$42,000.00",
          sale_date: "2022-12-25",
          state_id: 3,
          title: "BMW M4 2020",
          vin: "G00DV1N",
          year: 2020,
        },
      },
    },
  },

  {
    request: {
      query: ModelsDocument,
      variables: {
        where: {
          brand_id: {
            _eq: 4,
          },
        },
      },
    },
    result: {
      data: {
        models: [
          {
            id: 1,
            name: "Mustang",
          },
          {
            id: 2,
            name: "Runner",
          },
        ],
      },
    },
  },
  {
    request: {
      query: ModelsDocument,
      variables: {
        where: {
          brand_id: {
            _eq: 6,
          },
        },
      },
    },
    result: {
      data: {
        models: [
          {
            id: 21,
            name: "Serie 7",
          },
          {
            id: 24,
            name: "M4",
          },
        ],
      },
    },
  },
  {
    request: {
      query: FormDataDocument,
      variables: {},
    },
    result: {
      data: {
        brands: [
          {
            name: "Ford",
            id: 4,
          },
          {
            name: "BMW",
            id: 6,
          },
        ],
        states: [
          {
            id: 2,
            name: "CALIFORNIA",
            cities: [
              {
                id: 5,
                name: "Los Angeles",
              },
              {
                id: 6,
                name: "San Diego",
              },
            ],
          },
          {
            id: 3,
            name: "FLORIDA",
            cities: [
              {
                id: 8,
                name: "Miami",
              },
              {
                id: 9,
                name: "Orlando",
              },
            ],
          },
        ],
        colors: [
          {
            id: 1,
            name: "Red",
          },
          {
            id: 2,
            name: "White",
          },
        ],
      },
    },
  },
];
