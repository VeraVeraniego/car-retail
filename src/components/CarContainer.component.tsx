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
  const [renderedCars, setRenderedCars] = useState<CarRowInfo[] | null>(null);

  useEffect(() => {
    setRenderedCars(cars);
  }, [cars]);

  const mapCars = () => {
    if (renderedCars?.length) {
      return renderedCars?.map((car) => (
        <CarInfo
          key={car.vin}
          isFavorite={car.isFavorite}
          id={car.id}
          img={`${IMG_URL}/${car.id}/300/200`}
          title={car.title}
          batch={car.batch}
          odo={car.odo}
          price={car.price}
          condition={car.condition}
          damageType={car.damageType}
          saleDate={car.saleDate}
          place={car.place}
        />
      ));
    } else {
      return <Empty>There's nothing to show here!</Empty>;
    }
  };

  return (
    <Container>
      {loading || error ? (
        <>
          {loading && <Loader />}
          {error && (
            <ValidationText>
              Couldn't load data - Try again later
            </ValidationText>
          )}
        </>
      ) : (
        mapCars()
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
