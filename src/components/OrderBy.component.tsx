import React from "react";
import styled from "styled-components";
import { CarsAndFilters } from "../interfaces/Car";
import { defaultTheme } from "../theme";
import { ButtonOnHoverOppacity, H4 } from "./styled";

export const OrderBy = ({
  cars,
  setCars,
  filters,
  setFilters,
}: CarsAndFilters) => {
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
      <OrderButton onClick={toogleOrderBy}>Sale Date</OrderButton>
    </H4>
  );
};

const OrderButton = styled(ButtonOnHoverOppacity)`
  background-color: ${defaultTheme.palette.red};
  margin-left: 8px;
  width: 90px;
`;