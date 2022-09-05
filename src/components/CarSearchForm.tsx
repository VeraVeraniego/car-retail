import React from "react";
import { MdSearch } from "react-icons/md";
import styled from "styled-components";
import { ButtonOnHoverOppacity, Form, Input } from "./styled";
import { CarsAndFiltersState, FiltersState } from "../interfaces/Car";
import { defaultTheme } from "../theme";
import { useCarsLazyQuery } from "../graphql/generated/graphql";

export const CarSearchForm = ({
  carsState,
  filtersState,
}: //TODO: refetchCars Props
CarsAndFiltersState) => {
  const [filters, setFilters] = filtersState;
  const [cars, setCars] = carsState;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: REFETCH DATA BEFORE FILTER
    const filteredCars = cars?.filter((e) => {
      if (
        e.title.toLowerCase().includes(filters.searchInput.toLowerCase()) ||
        e.batch == filters.searchInput ||
        e.vin?.toUpperCase() == filters.searchInput.toUpperCase()
      ) {
        console.log("existance");
        return e;
      }
    });

    if (!filteredCars) setCars(null);
    else setCars(filteredCars);
  }
  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchVector />
      <SearchInput
        placeholder="Search"
        onChange={(e) =>
          setFilters({
            ...filters,
            searchInput: e.target.value,
          })
        }
      ></SearchInput>
      {/* <SearchLogo /> */}
      <SearchButton>Search in Inventory</SearchButton>
    </SearchForm>
  );
};

const SearchVector = styled(MdSearch)`
  font-size: 16px;
  margin-left: 8px;
  margin-right: 8px;
`;
const SearchForm = styled(Form)`
  background-color: ${defaultTheme.palette.white};
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
  flex-basis: 500px;

  width: 100%;
  height: 29px;
  border-radius: 4px;
`;
const SearchInput = styled(Input)`
  width: 100%;
  outline: none;
`;
const SearchButton = styled(ButtonOnHoverOppacity)`
  width: 160px;
  color: ${defaultTheme.palette.darkblue};
  background-color: ${defaultTheme.palette.green};
`;
