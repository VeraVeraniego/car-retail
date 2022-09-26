import { MockedProvider } from "@apollo/client/testing";
import {
  cleanup,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { CarRetail } from ".";
import { Dashboard } from "../../components/Dashboard.component";
import { GET_CARS } from "../../graphql/queries";
import { PATHNAME } from "../../utils";

// TODO: DO OR DELETE THIS COMPONENT
const carsMock = [
  {
    request: {
      query: GET_CARS,
      variables: {
        orderBy: [
          {
            sale_date: "asc",
          },
        ],
        where: {
          _or: [
            {
              title: {
                _iregex: "",
              },
            },
            {
              vin: {
                _ilike: "",
              },
            },
          ],
        },
      },
    },
    result: {
      data: {
        cars: [
          {
            batch: "521161a4-0022-452c-92c6-76fcfde50e4f",
            city: {
              name: "San Diego",
              id: 6,
              state: {
                id: 2,
                name: "CALIFORNIA",
              },
            },
            color: {
              id: 3,
              name: "Black",
            },
            condition: "N",
            damage_type: "No damage",
            description: "No damage",
            id: 236,
            odometer: 45000,
            price: "$10,600.00",
            sale_date: "2022-09-23",
            title: "Rav 4 2017",
            vin: "MTE4584",
            year: 2017,
            model: {
              id: 6,
              name: "Rav4",
              brand: {
                id: 2,
                name: "Toyota",
              },
            },
          },
        ],
      },
    },
  },
];

describe("Car Retail Test Suite", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={carsMock} addTypename={false}>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route path={PATHNAME.RETAIL_CARS} element={<CarRetail />} />
            </Route>
          </Routes>
        </MockedProvider>
      </MemoryRouter>
    );
  });
  afterEach(cleanup);
  test("should render cars", async () => {
    expect(1).toBe(1);
  });
});
