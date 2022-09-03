import React from "react";
import styled from "styled-components";
import { H1, H2 } from "../../components/styled";
import { defaultTheme } from "../../theme";

export const Home = () => {
  return (
    <section>
      <Title>WELCOME!</Title>
      <Subtitle>Cool Cars are waiting for you</Subtitle>
    </section>
  );
};

const Subtitle = styled(H2)`
  text-align: center;
`;
const Title = styled(H1)`
  margin-top: 33vh;
  color: ${defaultTheme.palette.darkblue};
  text-align: center;
`;
// const Container = styled.section``;
