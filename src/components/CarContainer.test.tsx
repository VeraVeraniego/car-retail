import { MockedProvider } from "@apollo/client/testing";
import {
  cleanup,
  findByTitle,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import { CarContainer } from "./CarContainer.component";

const dataMock = {
  cars: [
    {
      id: 1,
      title: "Toyota Yaris 2020",
      batch: "521161a4-0022-452c-92c6-76fcfde50e4f",
      vin: "MTE4584",
      odo: 45000,
      price: "$10,600.00",
      condition: "New",
      damageType: "No damage",
      saleDate: "2022-09-23",
      place: "San Diego-CALIFORNIA",
      isFavorite: true,
    },
    {
      id: 2,
      title: "Ford Mustang 2021",
      batch: "521161a4-0022-452c-92c6-76fcfde50e4f",
      vin: "MTE4585",
      odo: 45000,
      price: "$10,600.00",
      condition: "New",
      damageType: "No damage",
      saleDate: "2022-09-23",
      place: "San Diego-CALIFORNIA",
      isFavorite: false,
    },
  ],
  error: undefined,
  loading: false,
};
const emptydataMock = {
  cars: [],
  error: undefined,
  loading: false,
};
describe("CarContainer with 2 elements", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <MockedProvider>
          <CarContainer data={dataMock} />
        </MockedProvider>
      </MemoryRouter>
    );
  });
  afterEach(cleanup);
  test("should find 2 rendered elements", async () => {
    // screen.debug();
    expect(await screen.findByText("Toyota Yaris 2020")).toBeInTheDocument();
    expect(await screen.findByText("Ford Mustang 2021")).toBeInTheDocument();
  });
  test("should be a watch button and a unwatch button", async () => {
    expect(await screen.findByText("Watch")).toBeInTheDocument();
    expect(await screen.findByText("Unwatch")).toBeInTheDocument();
  });
  test("should toggle favorite button on click", async () => {
    const user = userEvent.setup();
    const favButton = await screen.findByText("Watch");
    expect(favButton).toBeInTheDocument();
    await user.click(favButton);
    await waitFor(() => expect(favButton).toHaveTextContent("Unwatch"));
  });
});

test("should show a message asserting that there's not cars", async () => {
  render(
    <MemoryRouter>
      <MockedProvider>
        <CarContainer data={emptydataMock} />
      </MockedProvider>
    </MemoryRouter>
  );
  expect(
    await screen.findByText("There's nothing to show here!")
  ).toBeInTheDocument();
});
