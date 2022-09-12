import { gql } from "@apollo/client";
import { Order_By } from "./generated/graphql";

export function orderVariables(order: Order_By) {
  return {
    orderBy: [
      {
        year: null,
        sale_date: order,
      },
    ],
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
export function variableWrapper(obj: {}) {
  return { variables: obj };
}
