import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { CarRetail } from ".";

describe("Car Retail Test Suite", () => {
  render(
    <MemoryRouter>
      <MockedProvider>
        <CarRetail />
      </MockedProvider>
    </MemoryRouter>
  );

  test("should render cars", () => {
    waitFor(() => screen.debug, 5000);
  });
});
