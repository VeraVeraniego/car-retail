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

export const GET_BRANDS = gql`
  query Brands {
    brands {
      name
      id
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
export const GET_CITIES = gql`
  query Cities {
    cities {
      id
      name
      state {
        id
        name
      }
    }
  }
`;
export const GET_STATES = gql`
  query States {
    states {
      id
      name
      cities {
        id
        name
      }
    }
  }
`;
export const GET_COLORS = gql`
  query Colors {
    colors {
      id
      name
    }
  }
`;
