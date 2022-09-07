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
export const GET_PUBLIS_FORM_VALUES = gql`
  query PublishData {
    brands {
      name
      id
      cars_count
      models {
        name
        id
      }
    }
    cities {
      id
      name
      state {
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
