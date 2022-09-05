import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import {
  ButtonOnHoverOppacity,
  FlexRow,
  Form,
  H4,
  Input,
} from "../../components/styled";
import { defaultTheme } from "../../theme";
import { CarContainer } from "../../components/CarContainer.component";
import { OrderBy } from "../../components/OrderBy.component";
import { CarRowInfo, Filters } from "../../interfaces/Car";
import { CarSearchForm } from "../../components/CarSearchForm";
import { responseCarToCarComponent } from "../../utils";
import { Cars, useCarsQuery } from "../../graphql/generated/graphql";

export const CarRetail = () => {
  const carsState = useState<CarRowInfo[] | null>(null);
  const [cars, setCars] = carsState;
  const filtersState = useState<Filters>({
    searchInput: "",
    orderBy: "",
  });
  const [filters, setFilters] = filtersState;
  const { data, error, loading } = useCarsQuery();

  useEffect(() => {
    if (!data) return;
    const adaptedCars = data.cars.map((elem) =>
      responseCarToCarComponent(elem as Cars)
    );
    setCars(adaptedCars);
  }, [data, filters.searchInput]);
  const HEADERS = [
    "Image",
    "Bach Info",
    "Vehicle Info",
    "Condition",
    "Sell Info",
  ];

  return (
    <Container>
      <FirstRow>
        <PublishNewCarButton>Publish New Car</PublishNewCarButton>
        <CarSearchForm carsState={carsState} filtersState={filtersState} />
        <OrderBy carsState={carsState} filtersState={filtersState} />
      </FirstRow>
      <HeadersRow>
        {HEADERS.map((ele, index) => (
          <TableHead key={index}>{ele}</TableHead>
        ))}
      </HeadersRow>
      <CarContainer carsState={carsState} />
    </Container>
  );
};

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
