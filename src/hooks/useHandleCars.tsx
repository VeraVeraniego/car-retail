import React, { useEffect, useState } from "react";
import { Cars, Order_By, useCarsQuery } from "../graphql/generated/graphql";
import { CarRowInfo, Filters, SortOrder } from "../interfaces/Car";
import { adaptResponse } from "../utils/CarAdapter.util";

export const useHandleCars = () => {
  const [cars, setCars] = useState<CarRowInfo[] | null>(null);
  // const {
  //   data: dataOnInit,
  //   error: errorOnInit,
  //   loading: loadingOnInit,
  // } = useCarsQuery();
  const [orderBy, setOrderBy] = useState<Order_By | "">(Order_By.Desc);
  const { data, error, loading, refetch } = useCarsQuery();

  useEffect(() => {
    if (!data) return;
    const adaptedCars = adaptResponse(data.cars as Cars[]);
    setCars(adaptedCars);
  }, [data]);

  async function toogleOrder() {
    if (!cars) return "";
    let order: Order_By;
    if (orderBy === Order_By.Asc) {
      setOrderBy(Order_By.Desc);
      order = Order_By.Desc;
    } else {
      // FIXME: bug on orderBy state when initialized on ""
      if (orderBy === Order_By.Desc || orderBy === "") {
        console.log("is empty string", orderBy === "");

        setOrderBy(Order_By.Asc);
        order = Order_By.Asc;
      }
    }
    const response = await refetch({
      orderBy: [
        {
          sale_date: order!,
        },
      ],
    });
    const carsSorted = adaptResponse(response.data.cars as Cars[]);
    setCars(carsSorted);
    console.log("order by ", orderBy);

    return orderBy;
  }

  function searchInInventory(searchText: string) {
    const filteredCars = cars?.filter((e) => {
      if (
        e.title.toLowerCase().includes(searchText.toLowerCase()) ||
        e.batch === searchText ||
        e.vin?.toUpperCase() === searchText.toUpperCase()
      ) {
        return e;
      }
    });
    if (!filteredCars) setCars(null);
    else setCars(filteredCars);
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
//     // FIXME: bug on orderBy state when initialized on ""
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
