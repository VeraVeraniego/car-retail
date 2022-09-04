import React from "react";
import styled from "styled-components";
import { LoginForm } from "../../components/LoginForm.component";
import { defaultTheme } from "../../theme";

export const Login = () => {
  return (
    <LoginContainer>
      <LoginForm />
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  background: ${defaultTheme.palette.green};
  width: auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
