import React from "react";

import { CarContainer } from "../../components/CarContainer.component";
import { CarSearchForm } from "../../components/CarSearchForm";
import { OrderBy } from "../../components/OrderBy.component";
import {
  Container,
  FirstRow,
  HeadersRow,
  TableHead,
} from "../../components/styled/CarView.styles";
import { useHandleCars } from "../../hooks/useHandleCars";

const HEADERS = [
  "Image",
  "Batch Info",
  "Vehicle Info",
  "Condition",
  "Sell Info",
];

export const FavoriteCars = () => {
  const { data, toggleOrder, searchInInventory } = useHandleCars("favorites");

  return (
    <Container>
      <FirstRow>
        <CarSearchForm searchInInventory={searchInInventory} />
        <OrderBy toggleOrder={toggleOrder} />
      </FirstRow>
      <HeadersRow>
        {HEADERS.map((ele, index) => (
          <TableHead key={index + ele}>{ele}</TableHead>
        ))}
      </HeadersRow>
      <CarContainer data={data} />
    </Container>
  );
};
