import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { defaultTheme, GlobalStyle } from "../theme";

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    password: "unused",
  });
  const auth = {
    email: "admin",
    password: "admin",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // why the console.log commented below doesn't wait for the await?
    // console.log("test", data);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <GlobalStyle />
      <EmailInput
        type="text"
        name="username"
        placeholder="username"
        onChange={(e) =>
          setCredentials({ ...credentials, name: e.target.value })
        }
      />
      {/*!!!!!!!WEIRD INPUT NAMING BELOW */}
      <EmailInput type="password" placeholder="password" disabled />
      {/* <button disabled={!credentials.name || !credentials.password || loading}> */}
      <ButtonAndValidation>
        <LoginButton disabled={!credentials.name || !credentials.password}>
          {/* {loading ? "Loading..." : "Form"} */}
          {"Form"}
        </LoginButton>
        <ValidationText
          data-testid="validator"
          style={{ visibility: errorMessage ? "visible" : "hidden" }}
        >
          {errorMessage}
        </ValidationText>
      </ButtonAndValidation>
    </Form>
  );
};
const Form = styled.form`
  width: 100vw;
  height: 100vh;
  padding-top: 33vh;
  background: ${defaultTheme.palette.green};
  display: flex;
  flex-direction: column;
  gap: 28px;
  justify-content: flex-start;
  align-items: center;
`;
const Title = styled.h1`
  width: 203px;
  height: 48px;
  color: #fff;
  font-style: normal;
  font-size: 40px;
  line-height: 48px;
  text-align: center;
`;
const EmailInput = styled.input`
  width: 530px;
  border: 0px solid;
  height: 90px;
  background-color: #fff;
  padding-left: 22px;
`;
const ButtonAndValidation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoginButton = styled.button`
  position: relative;
  font-size: 24px;
  line-height: 29px;
  width: 530px;
  height: 90px;
  background: ${defaultTheme.palette.lightorange};
  color: #fff;
  border: 0px solid;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  line-height: 29px;
  cursor: pointer;
  :disabled {
    background-color: ${defaultTheme.palette.gray};
  }
`;
const ValidationText = styled.p`
  color: #fff;
  margin-top: 16px;
`;
