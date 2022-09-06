import React, { useEffect, useState } from "react";
import {
  Cars,
  Order_By,
  useCarsLazyQuery,
  useCarsQuery,
} from "../graphql/generated/graphql";
import {
  orderVariables,
  searchByBatchVariables,
  searchByTitleVariables,
  searchByVINVariables,
} from "../graphql/variables";
import { CarRowInfo, Filters, SortOrder } from "../interfaces/Car";
import { adaptResponse } from "../utils/CarAdapter.util";

function isUUID(text: string) {
  return text.match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
  );
}
export const useHandleCars = () => {
  const [cars, setCars] = useState<CarRowInfo[] | null>(null);
  const [orderBy, setOrderBy] = useState<Order_By | "">("");
  const [getCars, { data, error, loading, refetch }] = useCarsLazyQuery();

  useEffect(() => {
    if (!data) {
      getCars();
      return;
    }
    const adaptedCars = adaptResponse(data.cars as Cars[]);
    setCars(adaptedCars);
  }, [data]);

  async function toogleOrder() {
    if (!cars) return "";
    let orderToSet: Order_By;
    if (orderBy === Order_By.Asc) {
      orderToSet = Order_By.Asc;
      setOrderBy(Order_By.Desc);
    } else {
      if (orderBy === Order_By.Desc || orderBy === "") {
        setOrderBy(Order_By.Asc);
        orderToSet = Order_By.Desc;
      }
    }
    await refetch(orderVariables(orderToSet!));

    return orderToSet!;
  }

  async function searchInInventory(searchText: string) {
    if (!searchText) {
      await getCars();
      return;
    }
    if (isUUID(searchText)) {
      await refetch(searchByBatchVariables(searchText));
      return;
    } else {
      const titleResponse = await refetch(searchByTitleVariables(searchText));
      if (titleResponse.data.cars.length) return;
      else {
        const vinResponse = await refetch(searchByVINVariables(searchText));
        if (vinResponse.data.cars.length) return;
        else return;
      }
    }
  }

  return { data: { cars, error, loading }, toogleOrder, searchInInventory };
};

// async function toogleOrder() {
//   if (!cars) return "";
//   if (orderBy === "ASC") {
//     setOrderBy("DESC");
//     const carsSortedAsc = cars?.sort((a, b) => {
//       return new Date(a.saleDate).valueOf() - new Date(b.saleDate).valueOf();
//     });
//     setCars(carsSortedAsc);
//   } else {
//     // NOTE: the bug on this commented code was fixed in the current code
//     if (orderBy === "DESC" || orderBy === "") {
//       setOrderBy("ASC");
//       const carsSortedDesc = cars?.sort((a, b) => {
//         return (
//           new Date(b.saleDate).valueOf() - new Date(a.saleDate).valueOf()
//         );
//       });
//       setCars(carsSortedDesc);
//     }
//   }

//   console.log("end", orderBy);
//   return orderBy;
// }

// function searchInInventory(searchText: string) {
//   const filteredCars = cars?.filter((e) => {
//     if (
//       e.title.toLowerCase().includes(searchText.toLowerCase()) ||
//       e.batch === searchText ||
//       e.vin?.toUpperCase() === searchText.toUpperCase()
//     ) {
//       return e;
//     }
//   });
//   if (!filteredCars) setCars(null);
//   else setCars(filteredCars);
// }
