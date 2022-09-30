import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useUser } from "../contexts/User";
import { Cars, Order_By, User_Cars } from "../graphql/generated/graphql";
import { GET_CARS, GET_USER_CARS } from "../graphql/queries";
import {
  orderVariables,
  queryUserCarVariables,
  searchByBatchVariables,
  searchByVinAndTitleVariables,
} from "../graphql/variables";
import { CarRowInfo } from "../interfaces/Car";
import { adaptFavorites, adaptResponse } from "../utils/CarAdapter.util";
import { URL_PARAMS } from "../utils/constants";

function isUUID(text: string | null) {
  return text?.match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
  );
}

type Key = "favorites" | "all";
export const useHandleCars = (key: Key) => {
  const [cars, setCars] = useState<CarRowInfo[] | null>(null);
  const [search, setSearch] = useSearchParams();
  const sortInUrl = search.get(URL_PARAMS.SALE_DATE_SORT) as Order_By;
  const searchInUrl = search.get(URL_PARAMS.SEARCH);
  const { userLogged } = useUser();
  const [getCars, { data, error, loading, refetch }] = useLazyQuery(GET_CARS, {
    fetchPolicy: "cache-and-network",
  });

  const { data: userCarsData } = useQuery(GET_USER_CARS, {
    variables: queryUserCarVariables(userLogged),
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (!data || !userCarsData) {
      let filterQuery: Record<string, unknown>;
      if (!searchInUrl && !sortInUrl) {
        getCars();
        return;
      }
      if (isUUID(searchInUrl))
        filterQuery = searchByBatchVariables(searchInUrl!);
      else filterQuery = searchByVinAndTitleVariables(searchInUrl ?? "");
      getCars({
        variables: {
          ...orderVariables(sortInUrl),
          ...filterQuery,
        },
      });
      console.info({
        variables: {
          ...orderVariables(sortInUrl),
          ...filterQuery,
        },
      });
      return;
    }
    if (key === "favorites") {
      const filteredCars = adaptFavorites(
        data.cars as Cars[],
        userCarsData.user_cars as User_Cars[]
      );
      setCars(filteredCars);
    } else {
      const adaptedCars = adaptResponse(
        data.cars as Cars[],
        userCarsData.user_cars as User_Cars[]
      );
      setCars(adaptedCars);
    }
  }, [data, userCarsData]);

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
  }

  async function searchInInventory(searchText: string) {
    let filterQuery: Record<string, unknown>;
    if (!searchText) {
      await getCars();
      return;
    }
    if (isUUID(searchText)) {
      filterQuery = searchByBatchVariables(searchText);
    } else {
      filterQuery = searchByVinAndTitleVariables(searchText);
    }
    try {
      // DEBUG: Why line below won't work with a lazy function call?
      await refetch(filterQuery);
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
    }
  }
  return { data: { cars, error, loading }, toggleOrder, searchInInventory };
};
