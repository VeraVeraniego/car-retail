/* eslint-disable indent */
import { UserState } from "../interfaces/User";
import { Order_By } from "./generated/graphql";

export function orderVariables(order: Order_By | null) {
  return {
    orderBy: [
      {
        sale_date: order,
      },
    ],
  };
}

export function searchByVinAndTitleVariables(searchText: string) {
  return {
    where: {
      _or: [
        {
          title: {
            _iregex: searchText,
          },
        },
        {
          vin: {
            _ilike: searchText,
          },
        },
      ],
    },
  };
}

export function searchByBatchVariables(batch: string) {
  return {
    where: {
      batch: {
        _eq: batch,
      },
    },
  };
}

export function modelsbyBrandIdVariables(brandId: string | number) {
  return {
    where: {
      brand_id: {
        _eq: parseInt(brandId as string),
      },
    },
  };
}

export function userCarVariables(userId: number, carId: number | string) {
  return { car_id: carId, user_id: userId };
}

export function queryUserCarVariables(user: UserState) {
  return {
    where: {
      user_id: user
        ? {
            _eq: user.id,
          }
        : {
            _is_null: true,
          },
    },
  };
}

export function deleteCarVariables(userId: number, carId: number | string) {
  return {
    where: {
      user_id: {
        _eq: userId,
      },
      car_id: {
        _eq: carId,
      },
    },
  };
}
