import { ApolloError } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { CarRowInfo } from "../interfaces/Car";
import { IMG_URL } from "../utils/index";
import { CarInfo } from "./CarInfo.component";
import { FlexColumn, H3, ValidationText } from "./styled";
import Loader from "./styled/Loader.component";

interface Props {
  data: {
    cars: CarRowInfo[] | null;
    error: ApolloError | undefined;
    loading: boolean;
  };
}

export const CarContainer = ({ data }: Props) => {
  const { cars, error, loading } = data;

  if (loading) return <Loader />;

  if (error)
    return (
      <ValidationText>Couldn&apos;t load data - Try again later</ValidationText>
    );

  if (!cars?.length) {
    return <Empty>There&apos;s nothing to show here!</Empty>;
  }

  return (
    <Container>
      {cars?.map((car) => (
        <CarInfo key={car.vin} car={car} img={`${IMG_URL}/${car.id}/300/200`} />
      ))}
    </Container>
  );
};
const Empty = styled(H3)`
  text-align: center;
  margin-top: 80px;
`;
const Container = styled(FlexColumn)`
  margin-top: 8px;
  padding-bottom: 8px;
  gap: 28px;
`;
