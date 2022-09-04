import React from "react";
import styled from "styled-components";
import { GlobalStyle } from "../theme";
import { H1 } from "./styled";

export const PublishCarForm = () => {
  return (
    <Container>
      <GlobalStyle />
      <H1>Publish Car</H1>
    </Container>
  );
};
export const Container = styled.section``;
