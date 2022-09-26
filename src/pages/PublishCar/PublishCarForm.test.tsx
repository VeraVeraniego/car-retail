import { MockedProvider } from "@apollo/client/testing";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  FormDataDocument,
  ModelsDocument,
} from "../../graphql/generated/graphql";
import { PublishCarForm } from "./PublishCarForm.component";

describe("Publish Form", () => {
  const user = userEvent.setup();
  beforeEach(() => {
    render(
      <MockedProvider mocks={mockedFormData} addTypename={false}>
        <PublishCarForm />
      </MockedProvider>
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
    const optionBrand1: HTMLOptionElement = screen.getByText(/BMW/i);
    expect(optionBrand1.selected).toBe(true);
    const modelFromBrand1 = await screen.findByText(/Serie 7/i);
    expect(modelFromBrand1).toBeInTheDocument();
    await user.selectOptions(brandSelect!, "4");
    const optionBrand2: HTMLOptionElement = screen.getByText(/Ford/i);
    expect(optionBrand2.selected).toBe(true);
    expect(await screen.findByText(/Mustang/i)).toBeInTheDocument();
    expect(modelFromBrand1).not.toBeInTheDocument();
  });
  test("should show validation messages on empty input", async () => {
    const button = await screen.findByRole("button");
    await user.click(button);
    expect(screen.getByText(/Select your car's Brand/i)).toBeInTheDocument();
    expect(screen.getByText(/Select your car's Model/i)).toBeInTheDocument();
  });
});

const mockedFormData = [
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
