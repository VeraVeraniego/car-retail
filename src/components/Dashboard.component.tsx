import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import { UserContext } from "../contexts/UserContext";
import { GlobalStyle, defaultTheme } from "../theme";
import { PATHNAME, REPLACE } from "../utils/constants";
import { ToogleLoginButton } from "./ToogleLoginButton.component";
import { WelcomeText } from "./WelcomeText.component";
import { H1, NavButton } from "./styled";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { loggedUser } = useContext(UserContext);

  return (
    <PageContainer>
      <BarContainer>
        <GlobalStyle />
        <TitleH1>COOLCARS.COM</TitleH1>
        {loggedUser && (
          <NavButton onClick={() => navigate(PATHNAME.WATCH_LIST, REPLACE)}>
            FAVORITES
          </NavButton>
        )}
        <NavButton onClick={() => navigate(PATHNAME.RETAIL_CARS, REPLACE)}>
          CARS
        </NavButton>
        <ToogleLoginButton />
        <WelcomeText />
      </BarContainer>
      <Outlet />
      <ToastContainer position="top-center" />
    </PageContainer>
  );
};

const TitleH1 = styled(H1)`
  margin: 16px auto 16px 16px;
`;

const BarContainer = styled.section`
  background-color: ${defaultTheme.palette.darkblue};
  position: relative;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: flex-end;
  max-height: 77px;
  button:last-of-type {
    margin-right: 8px;
  }
`;
const PageContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;
