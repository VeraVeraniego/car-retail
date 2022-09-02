import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../theme";
import { Button, FlexColumn, FlexRow, H3, H4, P } from "../styled";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
interface CarRowInfo {
  img: string;
  title: string;
  batch: string;
  odo: number;
  price: string;
  condition: string;
  damageType: string;
  saleDate: string;
  state: string;
}

export const CarInfo = ({
  title,
  batch,
  odo,
  price,
  condition,
  damageType,
  saleDate,
  state,
}: CarRowInfo) => {
  return (
    <Container>
      <CarImage></CarImage>
      {/* Batch Info */}
      <Column>
        <Title>{title}</Title>
        <Value>{batch}</Value>
        <FavoriteButton>
          <WatchIcon />
          Watch
        </FavoriteButton>
      </Column>
      <Column>
        <Title>
          ODOmeter
          <br />
          <Value>{odo}</Value>
        </Title>
        <Title>
          Estimated Price
          <br />
          <Value>{price}</Value>
        </Title>
      </Column>
      <Column>
        <Title>{condition}</Title>
        <Title>{damageType}</Title>
      </Column>
      <Column>
        <Title>
          Sale Date
          <br />
          <Value>{saleDate}</Value>
          <Value>{state}</Value>
        </Title>
      </Column>
      {/* TODO: <ReactIco3dots></ReactIco3dots> */}
    </Container>
  );
};
const WatchIcon = styled(AiOutlineEye)`
  font-size: 16px;
`;
const FavoriteButton = styled(Button)`
  line-height: 12px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 2px;
  border: 1px solid;
  background-color: inherit;
  color: ${defaultTheme.palette.red};
  width: 80px;
  &:hover {
    color: ${defaultTheme.palette.darkblue};
    background-color: ${defaultTheme.palette.lightyellow};
  }
`;
const Value = styled(P)``;
const Title = styled(H4)`
  color: ${defaultTheme.palette.darkblue};
  font-weight: 600;
`;
// TODO: change line below from div to img
const CarImage = styled.div`
  flex-grow: 1;
  margin-right: 8px;
  background-color: ${defaultTheme.palette.red};
  border-radius: 8px;
  max-width: 160px;
  min-width: 160px;
  height: 104px;
  padding: 8px;
`;
const Column = styled(FlexColumn)`
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-grow: 1;
`;
const Container = styled(FlexRow)`
  padding-left: 8px;
  align-items: center;
  justify-content: flex-start;
  height: 120px;
  background-color: ${defaultTheme.palette.white};
  border-radius: 8px;
`;
