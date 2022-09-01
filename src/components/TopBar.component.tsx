import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { defaultTheme, GlobalStyle } from "../theme";
import { PATHNAME } from "../utils/constants";
import { LoginButton } from "./LoginForm/styled";
import { Button, H1 } from "./styled";

export const TopBar = () => {
  return (
    <PageContainer>
      <BarContainer>
        <GlobalStyle />
        <TitleH1>COOLCARS.COM</TitleH1>
        <Link to={PATHNAME.PUBLISH_FORM}>
          <NavButton>FAVORITES</NavButton>
        </Link>
        <NavButton>CARS</NavButton>
        <NavButton>LOGOUT</NavButton>
      </BarContainer>
      <Outlet />
    </PageContainer>
  );
};

const TitleH1 = styled(H1)`
  margin-right: auto;
`;
const NavButton = styled(Button)`
  border-radius: 4px;
  &:hover {
    background-color: ${defaultTheme.palette.orange};
  }
`;
const BarContainer = styled.section`
  background-color: ${defaultTheme.palette.darkblue};
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: flex-end;
`;
const PageContainer = styled.div``;
