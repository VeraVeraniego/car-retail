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
  query Cars($orderBy: [cars_order_by!], $where: cars_bool_exp) {
    cars(order_by: $orderBy, where: $where) {
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

export const GET_FORM_DATA = gql`
  query FormData {
    brands {
      name
      id
    }
    states {
      id
      name
      cities {
        id
        name
      }
    }
    colors {
      id
      name
    }
  }
`;
export const GET_MODELS = gql`
  query Models($where: models_bool_exp) {
    models(where: $where) {
      id
      name
    }
  }
`;
