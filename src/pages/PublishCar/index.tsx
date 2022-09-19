import React from "react";
import styled from "styled-components";

import { PublishCarForm } from "../../components/PublishCarForm.component";
import { FlexColumn } from "../../components/styled";

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
