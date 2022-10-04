import { MockedProvider } from "@apollo/client/testing";
import { act, render, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { UserProvider } from "../contexts/User";
import { CarRetail } from "../pages/CarRetail";
import { useHandleCars } from "./useHandleCars";

test("test", () => {
  render(
    <MemoryRouter>
      <MockedProvider>
        <UserProvider>
          <CarRetail />
        </UserProvider>
      </MockedProvider>
    </MemoryRouter>
  );
  // const { result } = renderHook(() => useHandleCars("all"));
  expect(1).toBe(1);
  act(() => {
    // result.current.data;
  });
});
