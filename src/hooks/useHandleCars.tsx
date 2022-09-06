import React, { useEffect, useState } from "react";
import {
  Cars,
  useCarsQuery,
  useOrderedCarsLazyQuery,
  useOrderedCarsQuery,
} from "../graphql/generated/graphql";
import { CarRowInfo, Filters, SortOrder } from "../interfaces/Car";
import { adaptResponse } from "../utils/CarAdapter.util";

export const useHandleCars = () => {
  const [cars, setCars] = useState<CarRowInfo[] | null>(null);
  // const {
  //   data: dataOnInit,
  //   error: errorOnInit,
  //   loading: loadingOnInit,
  // } = useCarsQuery();
  const [orderBy, setOrderBy] = useState<SortOrder>("DESC");
  const { data, error, loading, refetch } = useOrderedCarsQuery();

  useEffect(() => {
    if (!data) return;
    const adaptedCars = adaptResponse(data.cars as Cars[]);
    setCars(adaptedCars);
  }, [data]);

  function toogleOrder() {
    if (!cars) return "";
    if (orderBy === "ASC") {
      setOrderBy("DESC");
      const carsSortedAsc = cars?.sort((a, b) => {
        return new Date(a.saleDate).valueOf() - new Date(b.saleDate).valueOf();
      });
      setCars(carsSortedAsc);
    } else {
      // FIXME: bug on states when initialized on ""
      if (orderBy === "DESC" || orderBy === "") {
        setOrderBy("ASC");
        const carsSortedDesc = cars?.sort((a, b) => {
          return (
            new Date(b.saleDate).valueOf() - new Date(a.saleDate).valueOf()
          );
        });
        setCars(carsSortedDesc);
      }
    }

    console.log("end", orderBy);
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
