import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CarsAndFiltersState, SortOrder } from "../interfaces/Car";
import { defaultTheme } from "../theme";
import { ButtonOnHoverOppacity, H4 } from "./styled";
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti";
import { Order_By } from "../graphql/generated/graphql";

interface Props {
  toogleOrder: () => Promise<Order_By | "">;
}

export const OrderBy = ({ toogleOrder }: Props) => {
  const [orderBy, setOrderBy] = useState<Order_By | "">("");

  const currentSort =
    orderBy === Order_By.Asc ? (
      <TiArrowSortedUp />
    ) : orderBy === Order_By.Desc ? (
      <TiArrowSortedDown />
    ) : (
      <TiArrowUnsorted />
    );

  async function handleClick() {
    const order = await toogleOrder();
    setOrderBy(order);
  }

  return (
    <H4>
      Order By:
      <OrderButton onClick={handleClick}>{currentSort}Sale Date</OrderButton>
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
