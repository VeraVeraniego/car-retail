import React from "react";
import styled from "styled-components";

import { FlexColumn } from "../../components/styled";
import { PublishCarForm } from "./PublishCarForm.component";

export const PublishCar = () => {
  return (
    <Container>
      <PublishCarForm />
    </Container>
  );
};
const Container = styled(FlexColumn)`
  align-items: center;
`;
