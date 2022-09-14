import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Cars,
  Order_By,
  useCarsLazyQuery,
  useCarsQuery,
} from "../graphql/generated/graphql";
import {
  fetchVariables,
  orderVariables,
  searchByBatchVariables,
  searchByTitleVariables,
  searchByVINVariables,
  variableWrapper,
} from "../graphql/variables";
import { CarRowInfo, Filters, SortOrder } from "../interfaces/Car";
import { adaptResponse } from "../utils/CarAdapter.util";
import { URL_PARAMS } from "../utils/constants";

function isUUID(text: string) {
  return text.match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
  );
}

export const useHandleCars = () => {
  const [cars, setCars] = useState<CarRowInfo[] | null>(null);
  const [getCars, { data, error, loading, refetch }] = useCarsLazyQuery();
  const [search, setSearch] = useSearchParams();
  const sortInUrl = search.get(URL_PARAMS.SALE_DATE_SORT) as Order_By;
  const searchInUrl = search.get(URL_PARAMS.SEARCH);
  const { loggedUser } = useContext(UserContext);

  useEffect(() => {
    if (!data) {
      if (!loggedUser) {
        getCars(variableWrapper(fetchVariables(sortInUrl, searchInUrl)));
      } else {
        getCars(
          variableWrapper(fetchVariables(sortInUrl, searchInUrl, loggedUser.id))
        );
      }
      return;
    }
    const adaptedCars = adaptResponse(data.cars as Cars[]);
    setCars(adaptedCars);
  }, [data]);

  async function toggleOrder() {
    let orderToSet: Order_By;
    if (sortInUrl === Order_By.Asc) {
      orderToSet = Order_By.Desc;
      search.set(URL_PARAMS.SALE_DATE_SORT, Order_By.Desc);
      setSearch(search);
    } else {
      search.set(URL_PARAMS.SALE_DATE_SORT, Order_By.Asc);
      setSearch(search);
      orderToSet = Order_By.Asc;
    }
    await refetch(orderVariables(orderToSet));
    // return;
  }
  //   if (!search.get(URL_PARAMS.SALE_DATE_SORT))
  //   setSearch({ orderBySaleDate: Order_By.Asc });

  // if (search.get(URL_PARAMS.SALE_DATE_SORT) === Order_By.Desc)
  //   setSearch({ orderBySaleDate: Order_By.Asc });
  // else if (search.get(URL_PARAMS.SALE_DATE_SORT) === Order_By.Asc)
  //   setSearch({ orderBySaleDate: Order_By.Desc });

  async function searchInInventory(searchText: string) {
    search.set(URL_PARAMS.SEARCH, searchText);
    setSearch(search);
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
  return { data: { cars, error, loading }, toggleOrder, searchInInventory };
};

// async function toggleOrder() {
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
