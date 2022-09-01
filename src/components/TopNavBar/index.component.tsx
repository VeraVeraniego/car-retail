import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { defaultTheme, GlobalStyle } from "../../theme";
import { PATHNAME, REPLACE } from "../../utils/constants";
import { H1, NavButton } from "../styled";
import { ToogleLoginButton } from "../ToogleLoginButton.component";
import { WelcomeText } from "../WelcomeText";

export const TopNavBar = () => {
  const navigate = useNavigate();
  const { loggedUser, setLoggedUser } = useContext(UserContext);

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
  button:last-of-type {
    margin-right: 8px;
  }
`;
const PageContainer = styled.div``;
