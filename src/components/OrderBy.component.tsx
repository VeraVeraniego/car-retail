import React from "react";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { Order_By } from "../graphql/generated/graphql";
import { defaultTheme } from "../theme";
import { URL_PARAMS } from "../utils/constants";
import { ButtonOnHoverOppacity, H4 } from "./styled";

interface Props {
  toggleOrder: () => void;
}

export const OrderBy = ({ toggleOrder }: Props) => {
  const [search] = useSearchParams();
  const activeSortInUrl = search.get(URL_PARAMS.SALE_DATE_SORT);

  const currentSort =
    activeSortInUrl === Order_By.Asc ? (
      <TiArrowSortedUp />
    ) : activeSortInUrl === Order_By.Desc ? (
      <TiArrowSortedDown />
    ) : (
      <TiArrowUnsorted />
    );

  return (
    <H4>
      Order By:
      <OrderButton onClick={() => toggleOrder()}>
        {currentSort}Sale Date
      </OrderButton>
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
