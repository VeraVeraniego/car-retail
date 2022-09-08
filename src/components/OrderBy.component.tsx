import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../theme";
import { ButtonOnHoverOppacity, H4 } from "./styled";
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti";
import { Order_By } from "../graphql/generated/graphql";
import { useSearchParams } from "react-router-dom";
import { URL_PARAMS } from "../utils/constants";

interface Props {
  toogleOrder: () => void;
}

export const OrderBy = ({ toogleOrder }: Props) => {
  const [search, setSearch] = useSearchParams();
  const activeSortInUrl = search.get(URL_PARAMS.SALE_DATE_SORT);

  const currentSort =
    activeSortInUrl === Order_By.Asc ? (
      <TiArrowSortedUp />
    ) : activeSortInUrl === Order_By.Desc ? (
      <TiArrowSortedDown />
    ) : (
      <TiArrowUnsorted />
    );

  async function handleClick() {
    const order = toogleOrder();
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
