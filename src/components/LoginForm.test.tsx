import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import * as router from "react-router-dom";
import { MemoryRouter } from "react-router-dom";

import { UserProvider } from "../contexts/User";
import {
  acceptedEmail,
  rejectedEmail,
  validationMock,
} from "../test/user-mocks";
import { LoginForm } from "./../components/LoginForm.component";

const user = userEvent.setup();

describe("LoginForm basic rendering", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <MockedProvider>
          <UserProvider>
            <LoginForm />
          </UserProvider>
        </MockedProvider>
      </MemoryRouter>
    );
  });

  test("Welcome is rendered", () => {
    expect(screen.getByText(/welcome!/i)).toBeInTheDocument();
  });

  test("button enables on input change", async () => {
    const email = screen.getByPlaceholderText(/email/i);
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeDisabled();
    await user.type(email, rejectedEmail);
    expect(loginButton).toBeEnabled();
  });

  test("should show invalid email when applies", async () => {
    const email = screen.getByPlaceholderText(/email/i);
    const loginButton = screen.getByRole("button", { name: /login/i });
    await user.type(email, "test");
    await user.click(loginButton);
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });
});

describe("LoginForm connection to API", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={validationMock} addTypename={false}>
          <UserProvider>
            <LoginForm />
          </UserProvider>
        </MockedProvider>
      </MemoryRouter>
    );
  });
  test("should show validation text when not allowed to login", async () => {
    const email = screen.getByPlaceholderText(/email/i);
    const loginButton = screen.getByRole("button", { name: /login/i });
    await user.type(email, rejectedEmail);
    await user.click(loginButton);
    expect(screen.getByText(/not allowed/i)).toBeInTheDocument();
  });
});
