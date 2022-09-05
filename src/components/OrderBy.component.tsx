import React from "react";
import styled from "styled-components";
import { CarsAndFiltersState } from "../interfaces/Car";
import { defaultTheme } from "../theme";
import { ButtonOnHoverOppacity, H4 } from "./styled";
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti";
export const OrderBy = ({ carsState, filtersState }: CarsAndFiltersState) => {
  const [cars, setCars] = carsState;
  const [filters, setFilters] = filtersState;

  const currentSort =
    filters.orderBy === "ASC" ? (
      <TiArrowSortedUp />
    ) : filters.orderBy === "DESC" ? (
      <TiArrowSortedDown />
    ) : (
      <TiArrowUnsorted />
    );

  function toogleOrderBy() {
    if (!cars) return console.error("Cars not available");
    // const saleDate = new Date(cars![0].saleDate);
    // const offset = saleDate.getTimezoneOffset();
    // const utcDate = new Date(saleDate.getTime() - offset * 60 * 1000);
    if (filters.orderBy === "ASC") {
      const carsSortedAsc = cars?.sort((a, b) => {
        return new Date(b.saleDate).valueOf() - new Date(a.saleDate).valueOf();
      });
      setCars(carsSortedAsc);
      setFilters({ ...filters, orderBy: "DESC" });
    } else if (filters.orderBy === "DESC" || filters.orderBy === "") {
      const carsSortedDesc = cars?.sort((a, b) => {
        return new Date(a.saleDate).valueOf() - new Date(b.saleDate).valueOf();
      });

      setCars(carsSortedDesc);
      setFilters({ ...filters, orderBy: "ASC" });
    }
  }

  return (
    <H4>
      Order By:
      <OrderButton onClick={toogleOrderBy}>{currentSort}Sale Date</OrderButton>
    </H4>
  );
};

const OrderButton = styled(ButtonOnHoverOppacity)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: inherit;
  border: 1px solid ${defaultTheme.palette.red};
  color: ${defaultTheme.palette.red};
  line-height: 12px;
  margin-left: 8px;
  width: 90px;
`;
