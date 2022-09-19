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

export function fetchVariables(order: Order_By | null, search: string | null) {
  return {
    orderBy: [
      {
        sale_date: order,
      },
    ],
    where: {
      title: {
        _ilike: search ? `%${search}%` : "%%",
      },
    },
  };
}

export function searchByTitleVariables(title: string) {
  return {
    where: {
      title: {
        _ilike: `%${title}%`,
      },
    },
  };
}
export function searchByVINVariables(vin: string) {
  return {
    where: {
      vin: {
        _eq: vin,
      },
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
