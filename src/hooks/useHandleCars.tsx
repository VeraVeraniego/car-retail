import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import {
  Cars,
  Order_By,
  useCarsLazyQuery,
  useCarsQuery,
  User_Cars,
} from "../graphql/generated/graphql";
import {
  fetchVariables,
  orderVariables,
  searchByBatchVariables,
  searchByTitleVariables,
  searchByVINVariables,
  variableWrapper,
} from "../graphql/variables";
import { CarRowInfo } from "../interfaces/Car";
import {
  adaptFavorites,
  adaptResponse,
  removeFavorites,
} from "../utils/CarAdapter.util";
import { URL_PARAMS } from "../utils/constants";

function isUUID(text: string) {
  return text.match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
  );
}

type Key = "favorites" | "all";
export const useHandleCars = (key: Key) => {
  const [cars, setCars] = useState<CarRowInfo[] | null>(null);
  const [search, setSearch] = useSearchParams();
  const sortInUrl = search.get(URL_PARAMS.SALE_DATE_SORT) as Order_By;
  const searchInUrl = search.get(URL_PARAMS.SEARCH);
  const { loggedUser } = useContext(UserContext);
  const [getCars, { data, error, loading, refetch }] = useCarsLazyQuery();
  // TODO: TEST CACHE WITH REGULAR QUERY BELOW
  // const {
  //   data,
  //   error,
  //   loading,
  //   refetch: getCars,
  // } = useCarsQuery({
  //   fetchPolicy: "network-only",
  // });

  useEffect(() => {
    if (!data) {
      if (!loggedUser) {
        // refetch(fetchVariables(sortInUrl, searchInUrl));
        refetch({ variables: fetchVariables(sortInUrl, searchInUrl) });
      } else {
        // refetch(fetchVariables(sortInUrl, searchInUrl, loggedUser.id));
        refetch(fetchVariables(sortInUrl, searchInUrl, loggedUser.id));
      }
      return;
    }
    if (key === "favorites") {
      const filteredCars = adaptFavorites(
        data.cars as Cars[],
        data.user_cars as User_Cars[]
      );
      setCars(filteredCars);
    } else {
      const adaptedCars = adaptResponse(
        data.cars as Cars[],
        data.user_cars as User_Cars[]
      );
      setCars(adaptedCars);
    }
  }, [data]);

  useEffect(() => {
    if (!data) return;
    if (!loggedUser) {
      const removedFavorites = removeFavorites(cars as CarRowInfo[]);
      setCars(removedFavorites);
    }
  }, [loggedUser]);
  // TODO: MAY ADD USER ID TO REFETCH WHEN LOGGED OUT

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
    await getCars(variableWrapper(orderVariables(orderToSet)));
  }

  async function searchInInventory(searchText: string) {
    search.set(URL_PARAMS.SEARCH, searchText);
    setSearch(search);
    if (!searchText) {
      await refetch();
      return;
    }
    if (isUUID(searchText)) {
      await refetch(searchByBatchVariables(searchText));
      return;
    } else {
      const titleResponse = await refetch(searchByTitleVariables(searchText));
      if (titleResponse.data?.cars.length) return;
      else {
        const vinResponse = await refetch(searchByVINVariables(searchText));
        if (vinResponse.data?.cars.length) return;
        else return;
      }
    }
  }
  return { data: { cars, error, loading }, toggleOrder, searchInInventory };
};
