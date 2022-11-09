import { gql } from "@apollo/client";

export const CREATE_CAR = gql`
  mutation CreateCar($object: cars_insert_input!) {
    insert_cars_one(object: $object) {
      brand_id
      city_id
      color_id
      condition
      # damage_type
      model_id
      odometer
      price
      sale_date
      state_id
      title
      vin
      year
    }
  }
`;
export const CREATE_USER_CAR = gql`
  mutation Insert_user_cars_one($object: user_cars_insert_input!) {
    insert_user_cars_one(object: $object) {
      car_id
      id
      user_id
      uuid
    }
  }
`;
export const DELETE_USER_CAR = gql`
  mutation Delete_user_cars($where: user_cars_bool_exp!) {
    delete_user_cars(where: $where) {
      returning {
        car_id
        user_id
        id
      }
    }
  }
`;
