import { CREATE_USER_CAR, DELETE_USER_CAR } from "../graphql/mutations";

export const dataMock = {
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
  ],
  error: undefined,
  loading: false,
};

export const emptydataMock = {
  cars: [],
  error: undefined,
  loading: false,
};

export const createDeleteMocks = [
  {
    request: {
      query: CREATE_USER_CAR,

      variables: {
        object: {
          car_id: 1,
          user_id: 5,
        },
      },
    },
    result: {
      data: {
        insert_user_cars_one: {
          car_id: 1,
          id: 1226,
          user_id: 5,
          uuid: "19f187e6-f10d-42e3-a886-ffd9a2e05aa2",
        },
      },
    },
  },
  {
    request: {
      query: DELETE_USER_CAR,
      variables: {
        where: {
          user_id: {
            _eq: 5,
          },
          car_id: {
            _eq: 1,
          },
        },
      },
    },
    result: {
      data: {
        delete_user_cars: {
          returning: [
            {
              car_id: 1,
              user_id: 5,
              id: 1524,
            },
          ],
        },
      },
    },
  },
];

export const mockUser = {
  loggedUser: {
    email: "test@test.test",
    id: 5,
    first_name: "A",
    last_name: "B",
  },
};
