import { gql } from "@apollo/client";

export const VALIDATE_EMAIL = gql`
  query Users($where: users_bool_exp) {
    users(where: $where) {
      email
      first_name
      id
      last_name
    }
  }
`;
export const GET_CARS = gql`
  query Cars {
    cars {
      batch
      city {
        name
        id
        state {
          id
          name
        }
      }
      color {
        id
        name
      }
      condition
      damage_type
      description
      id
      odometer
      price
      sale_date
      title
      vin
      year
      model {
        id
        name
        brand {
          id
          name
        }
      }
    }
  }
`;

export const GET_BRANDS_AND_MODELS = gql`
  query Brands {
    brands {
      name
      id
      cars_count
      models {
        name
        id
      }
    }
  }
`;
