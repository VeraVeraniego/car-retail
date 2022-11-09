import { MockedProvider } from "@apollo/client/testing";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { UserProvider } from "../contexts/User";
import {
  createDeleteMocks,
  dataMock,
  emptydataMock,
  mockUser,
} from "../test/cars-mock";
import { CarContainer } from "./CarContainer.component";

describe("CarContainer", () => {
  const user = userEvent.setup();
  beforeEach(() => {
    render(
      // <UserContext.Provider value={mockUser}>
      <MemoryRouter>
        <MockedProvider mocks={createDeleteMocks} addTypename={false}>
          <UserProvider>
            <CarContainer data={dataMock} />
          </UserProvider>
        </MockedProvider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);
  test("should find rendered elements", async () => {
    expect(await screen.findByText("Toyota Yaris 2020")).toBeInTheDocument();
  });

  test("should render a Watch button and a unwatch button", async () => {
    expect(await screen.findByText("Unwatch")).toBeInTheDocument();
  });
});

test("should show a message asserting that there's not cars", async () => {
  render(
    <MemoryRouter>
      <MockedProvider>
        <UserProvider>
          <CarContainer data={emptydataMock} />
        </UserProvider>
      </MockedProvider>
    </MemoryRouter>
  );
  expect(
    await screen.findByText("There's nothing to show here!")
  ).toBeInTheDocument();
});
