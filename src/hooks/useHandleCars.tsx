import React, { useEffect, useState } from "react";
import {
  Cars,
  useCarsQuery,
  useOrderedCarsLazyQuery,
  useOrderedCarsQuery,
} from "../graphql/generated/graphql";
import { CarRowInfo, Filters } from "../interfaces/Car";
import { adaptResponse } from "../utils/CarAdapter.util";

type SortOrder = "" | "ASC" | "DESC";
export const useHandleCars = () => {
  const [cars, setCars] = useState<CarRowInfo[] | null>(null);
  // const {
  //   data: dataOnInit,
  //   error: errorOnInit,
  //   loading: loadingOnInit,
  // } = useCarsQuery();
  const [orderBy, setOrderBy] = useState<SortOrder>("");
  const [searchText, setSearchText] = useState<string>("");
  const { data, error, loading, refetch } = useOrderedCarsQuery();

  useEffect(() => {
    if (!data) return;
    const adaptedCars = adaptResponse(data.cars as Cars[]);
    setCars(adaptedCars);
  }, [data]);

  function toogleOrder() {
    if (!cars) return console.error("Cars not available");
    if (orderBy === "ASC") {
      const carsSortedAsc = cars?.sort((a, b) => {
        return new Date(b.saleDate).valueOf() - new Date(a.saleDate).valueOf();
      });
      setCars(carsSortedAsc);
      setOrderBy("DESC");
    } else if (orderBy === "DESC" || orderBy === "") {
      const carsSortedDesc = cars?.sort((a, b) => {
        return new Date(a.saleDate).valueOf() - new Date(b.saleDate).valueOf();
      });

      setCars(carsSortedDesc);
      setOrderBy("ASC");
    }
    return orderBy;
  }

  return { cars, toogleOrder };
};
