import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Cars, useCarsQuery } from "../graphql/generated/graphql";
import { CarRowInfo, CarsState } from "../interfaces/Car";
import {
  CAR_SKELETON_PROPS,
  IMG_URL,
  responseCarToCarComponent,
} from "../utils/index";
import { FlexColumn, H2, ValidationText } from "./styled";
import { CarInfo } from "./CarInfo.component";
import { ApolloError } from "@apollo/client";
import { UserContext } from "../contexts/UserContext";

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
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  useEffect(() => {
    setRenderedCars(cars);
  }, [cars]);

  return (
    <Container>
      {loading ? (
        <>
          <CarInfo {...CAR_SKELETON_PROPS} />
          <CarInfo {...CAR_SKELETON_PROPS} />
          <CarInfo {...CAR_SKELETON_PROPS} />
        </>
      ) : error ? (
        <ValidationText>
          Error {error.message ? "- " + error.message : "- Unknown"}
        </ValidationText>
      ) : (
        renderedCars?.map((ele) => (
          <CarInfo
            key={ele.vin}
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
      )}
    </Container>
  );
};

const Container = styled(FlexColumn)`
  margin-top: 8px;
  padding-bottom: 8px;
  gap: 28px;
`;
