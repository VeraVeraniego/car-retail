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
import { CarSearchForm } from "../../components/CarSearchForm";
import { PATHNAME, REPLACE } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useHandleCars } from "../../hooks/useHandleCars";

const HEADERS = [
  "Image",
  "Batch Info",
  "Vehicle Info",
  "Condition",
  "Sell Info",
];

export const CarRetail = () => {
  const { data, toogleOrder, searchInInventory } = useHandleCars();
  const navigate = useNavigate();

  return (
    <Container>
      <FirstRow>
        <PublishNewCarButton
          onClick={() => navigate(PATHNAME.PUBLISH_FORM, REPLACE)}
        >
          Publish New Car
        </PublishNewCarButton>
        {/* TODO: CHANGE REQUEST:  CALL HOOK ON SONS */}
        <CarSearchForm searchInInventory={searchInInventory} />
        <OrderBy toogleOrder={toogleOrder} />
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
