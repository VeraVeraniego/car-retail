import React, { useState } from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import {
  ButtonOnHoverOppacity,
  FlexRow,
  Form,
  H4,
  Input,
} from "../components/styled";
import { defaultTheme } from "../theme";
import { CarContainer } from "../components/CarContainer/index.component";
import { OrderBy } from "../components/OrderBy.component";
import { CarRowInfo, Filters } from "../interfaces/Car";

export const CarRetail = () => {
  const [cars, setCars] = useState<CarRowInfo[] | null>(null);

  const [filters, setFilters] = useState<Filters>({
    searchInput: "",
    orderBy: "",
  });
  const HEADERS = [
    "Image",
    "Bach Info",
    "Vehicle Info",
    "Condition",
    "Sell Info",
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <Container>
      <FirstRow>
        <PublishNewCarButton>Publish New Car</PublishNewCarButton>
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
        <OrderBy
          cars={cars}
          setCars={setCars}
          filters={filters}
          setFilters={setFilters}
        />
      </FirstRow>
      <HeadersRow>
        {HEADERS.map((ele, index) => (
          <TableHead key={index}>{ele}</TableHead>
        ))}
      </HeadersRow>
      <CarContainer cars={cars} setCars={setCars} />
    </Container>
  );
};

const SearchVector = styled(MdSearch)`
  font-size: 16px;
  margin-left: 8px;
  margin-right: 8px;
`;

const FirstRow = styled(FlexRow)`
  margin-top: 16px;
  padding-top: 40px;
  gap: 24px;
  align-items: center;
  justify-content: center;
`;

const PublishNewCarButton = styled(ButtonOnHoverOppacity)`
  background-color: ${defaultTheme.palette.blue};
  color: ${defaultTheme.palette.white};
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
const HeadersRow = styled(FlexRow)`
  padding-left: 8px;
  margin-top: 24px;
  justify-content: flex-start;

  h4:first-of-type {
    max-width: 160px;
  }
`;
const TableHead = styled(H4)`
  flex-grow: 1;
`;
const Container = styled.section`
  background-color: ${defaultTheme.palette.bglightgray};
  padding-left: 24px;
  padding-right: 24px;
  min-height: calc(100vh - 93px);
  height: auto;
`;
