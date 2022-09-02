import React from "react";
import styled from "styled-components";
import { FlexColumn } from "../styled";
import { CarInfo } from "./CarInfo.component";

export const CarContainer = () => {
  return (
    <Container>
      <CarInfo
        title="test"
        batch="testbatsdfchnmbr"
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
