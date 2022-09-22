import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";

import { Login } from "./../pages/Login/index";

beforeEach(() => {
  render(
    <BrowserRouter>
      <MockedProvider>
        <Login />
      </MockedProvider>
    </BrowserRouter>
  );
});

test("Welcome is rendered", () => {
  expect(screen.getByText(/welcome!/i)).toBeInTheDocument();
});

test("email input is in the document", () => {
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
});

test("email input change when user input", async () => {
  const user = userEvent.setup();
  const email = screen.getByPlaceholderText(/email/i);
  await user.type(email, "test");

  waitFor(() => expect(email).toHaveTextContent("test"));
});
