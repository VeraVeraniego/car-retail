import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CarRowInfo } from "../interfaces/Car";
import { IMG_URL } from "../utils/index";
import { FlexColumn, H3, ValidationText } from "./styled";
import { CarInfo } from "./CarInfo.component";
import { ApolloError } from "@apollo/client";
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
  const [renderedCars, setRenderedCars] = useState<CarRowInfo[] | null>(null);

  useEffect(() => {
    setRenderedCars(cars);
  }, [cars]);

  return (
    <Container>
      {loading ? (
        <>
          <Loader />
        </>
      ) : error ? (
        <ValidationText>Couldn't load data - Try again later</ValidationText>
      ) : renderedCars?.length ? (
        renderedCars?.map((ele) => (
          <CarInfo
            key={ele.vin}
            isFavorite={ele.isFavorite}
            id={ele.id}
            img={`${IMG_URL}/${ele.id}/300/200`}
            title={ele.title}
            batch={ele.batch}
            odo={ele.odo}
            price={ele.price}
            condition={ele.condition}
            damageType={ele.damageType}
            saleDate={ele.saleDate}
            place={ele.place}
          />
        ))
      ) : (
        <Empty>There's nothing to show here!</Empty>
      )}
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
