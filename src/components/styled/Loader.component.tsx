import React from "react";
import styled, { keyframes } from "styled-components";

import { defaultTheme } from "../../theme";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
};

export default Loader;

const Spinner = styled.div`
  width: 30px;
  height: 30px;
  border: 5px solid ${defaultTheme.palette.hr};
  border-top: 5px solid ${defaultTheme.palette.darkgray};
  border-radius: 50%;
  animation: ${rotate} 1.5s linear infinite;
`;

const LoaderContainer = styled.div`
  height: 100%;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;
