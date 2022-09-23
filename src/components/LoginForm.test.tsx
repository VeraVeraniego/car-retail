import { MockedProvider } from "@apollo/client/testing";
import {
  findByDisplayValue,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import * as router from "react-router-dom";
import { MemoryRouter } from "react-router-dom";

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
          <LoginForm />
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
          <LoginForm />
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
  // test("should navigate to home when user allowed", async () => {
  //   // const navigate = vi.fn();
  //   // const spy = vi
  //   //   .spyOn(ruter, "useNavigate")
  //   //   .mockImplementation(() => navigate);
  //   // ///////
  //   // vi.mock("react-router-dom");
  //   // (router as any).useNavigate = vi.fn();
  //   // });
  //   // const navigate = useNavigate();
  //   // const spy = vi.spyOn(router, "useNavigate");
  //   // ////
  //   const email = screen.getByPlaceholderText(/email/i);
  //   const loginButton = screen.getByRole("button", { name: /login/i });
  //   await user.type(email, acceptedEmail);
  //   await user.click(loginButton);

  //   await waitFor(async () =>
  //     expect(await screen.findByPlaceholderText(/email/i)).toHaveTextContent(
  //       /redirecting/i
  //     )
  //   );
  // });
});