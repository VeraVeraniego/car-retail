import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VALIDATE_EMAIL } from "../../graphql/queries";
import { defaultTheme, GlobalStyle } from "../../theme";
interface Response {
  users: User[];
}
interface User {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  uuid: string;
}
interface EmailVars {
  where: {
    email: {
      _ilike: string;
    };
  };
}
export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
  });
  const [validateEmail, { loading, error, data }] = useLazyQuery<
    Response,
    EmailVars
  >(VALIDATE_EMAIL);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const resp = await validateEmail({
      variables: { where: { email: { _ilike: credentials.email } } },
    });
    if (resp?.data?.users?.length) {
      // TODO: AGREGAR LOGICA DE MODAL O PAGE

      console.log("logged");
      console.log(data);

      return;
    }
    setErrorMessage("Not Allowed");

    // why the console.log commented below doesn't wait for the await?
    // console.log("test", data);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setCredentials({ ...credentials, email: e.target.value });
  };
  return (
    <Form>
      <GlobalStyle />
      <Input
        type="text"
        name="username"
        placeholder="username"
        disabled={loading}
        onChange={handleChange}
      />
      {/*!!!!!!!WEIRD INPUT NAMING BELOW */}
      {/* <Input type="password" placeholder="password" disabled /> */}
      {/* <button disabled={!credentials.email || !credentials.password || loading}> */}
      <ButtonAndValidation>
        <LoginButton
          disabled={!credentials.email || loading}
          onClick={handleSubmit}
        >
          {/* {loading ? "Loading..." : "Form"} */}
          {loading ? "Loading..." : "LOGIN"}
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
const Input = styled.input`
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
