import {
  CreateCarDocument,
  FormDataDocument,
  ModelsDocument,
} from "../graphql/generated/graphql";

export const mockedFormData = [
  {
    request: {
      query: CreateCarDocument,

      variables: {
        object: {
          brand_id: 6,
          city_id: 8,
          color_id: 2,
          condition: "N",
          model_id: 24,
          odometer: "10000",
          price: "42000",
          sale_date: "2022-12-25",
          state_id: 3,
          title: "BMW M4 2020",
          vin: "DUPL1C4T3DV1N",
          year: "2020",
        },
      },
    },
    error: new Error(
      "Uniqueness violation. duplicate key value violates unique constraint 'cars_vin_key'"
    ),
  },
  {
    request: {
      query: CreateCarDocument,
      variables: {
        object: {
          brand_id: 6,
          city_id: 8,
          color_id: 2,
          condition: "N",
          model_id: 24,
          odometer: "10000",
          price: "42000",
          sale_date: "2022-12-25",
          state_id: 3,
          title: "BMW M4 2020",
          vin: "G00DV1N",
          year: "2020",
        },
      },
    },
    result: {
      data: {
        insert_cars_one: {
          brand_id: 6,
          city_id: 8,
          color_id: 2,
          condition: "N",
          model_id: 24,
          odometer: 10000,
          price: "$42,000.00",
          sale_date: "2022-12-25",
          state_id: 3,
          title: "BMW M4 2020",
          vin: "G00DV1N",
          year: 2020,
        },
      },
    },
  },

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
