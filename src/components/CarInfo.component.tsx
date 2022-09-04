import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../theme";
import { Button, FlexColumn, FlexRow, H3, H4, P } from "./styled";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { CarRowInfo } from "../interfaces/Car";

export const CarInfo = ({
  img,
  title,
  batch,
  odo,
  price,
  condition,
  damageType,
  saleDate,
  place,
}: CarRowInfo) => {
  const now = new Date();
  return (
    <Container>
      <CarImage src={img} alt={title} />
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
        {odo && (
          <Title>
            ODOmeter
            <br />
            <Value>{odo}</Value>
          </Title>
        )}
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
          {now < new Date(saleDate) ? (
            <Value>{saleDate}</Value>
          ) : (
            <RedValue>{`${saleDate} - sold`}</RedValue>
          )}
          <Value>{place}</Value>
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
const RedValue = styled(Value)`
  color: ${defaultTheme.palette.red};
`;

const Title = styled(H4)`
  color: ${defaultTheme.palette.darkblue};
  font-weight: 600;
`;
const CarImage = styled.img`
  margin-right: 8px;
  max-width: 160px;
  min-width: 160px;
  flex-grow: 1;
  border-radius: 8px;
  height: 104px;
  background-color: ${defaultTheme.palette.gray};
`;
const Column = styled(FlexColumn)`
  height: 100%;
  max-width: 350px;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-basis: 300px;
  flex-grow: 1;
  flex-shrink: 1;
`;
const Container = styled(FlexRow)`
  padding-left: 8px;
  align-items: center;
  justify-content: flex-start;
  height: 120px;
  background-color: ${defaultTheme.palette.white};
  border-radius: 8px;
  div:first-of-type {
    min-width: 310px;
  }
`;
