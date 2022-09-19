import React from "react";
import { CarContainer } from "../../components/CarContainer.component";
import { OrderBy } from "../../components/OrderBy.component";
import { CarSearchForm } from "../../components/CarSearchForm";
import { PATHNAME, REPLACE } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useHandleCars } from "../../hooks/useHandleCars";
import {
  Container,
  FirstRow,
  HeadersRow,
  PublishNewCarButton,
  TableHead,
} from "../../components/styled/CarView.styles";

const HEADERS = [
  "Image",
  "Batch Info",
  "Vehicle Info",
  "Condition",
  "Sell Info",
];

export const CarRetail = () => {
  const { data, toggleOrder, searchInInventory } = useHandleCars("all");
  const navigate = useNavigate();

  return (
    <Container>
      <FirstRow>
        <PublishNewCarButton
          onClick={() => navigate(PATHNAME.PUBLISH_FORM, REPLACE)}
        >
          Publish New Car
        </PublishNewCarButton>
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
