import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GET_CARS } from "../../graphql/queries";
import { FlexColumn } from "../styled";
import { CarInfo } from "./CarInfo.component";

export const CarContainer = () => {
  const { data, error, loading } = useQuery(GET_CARS);
  const [cars, setCars] = useState(null);

  useEffect(() => {
    if (data) {
      console.log("data", data);
      console.log("test", data.cars[0]);
    }
  }, [data]);

  return (
    <Container>
      <CarInfo
        img="http://ravn.co"
        title="test"
        batch="testBatchiNumber"
        odo={345}
        price="testprice"
        condition="testcondition"
        damageType="testdamagetype"
        saleDate="testsaledate"
        state="teststate"
      />
    </Container>
  );
};

const Container = styled(FlexColumn)`
  margin-top: 8px;
  gap: 28px;
`;
