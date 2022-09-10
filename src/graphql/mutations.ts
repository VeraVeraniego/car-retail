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
