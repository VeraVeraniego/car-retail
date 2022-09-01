import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IUserContext, UserContext } from "../../context/UserContext";
import { VALIDATE_EMAIL } from "../../graphql/queries";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { defaultTheme, GlobalStyle } from "../../theme";
import { PATHNAME, STORAGE_KEY } from "../../utils/constants";
import { Button, H1 } from "../styled";

import { EmailVars, Response } from "./types";

export const LoginForm = () => {
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [userInStorage, setUserInStorage] = useLocalStorage(
    STORAGE_KEY.USER,
    ""
  );
  const [validateEmail, { loading, error, data }] = useLazyQuery<
    Response,
    EmailVars
  >(VALIDATE_EMAIL);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) return;
    // console.log("data.users", data?.users);
    if (!data?.users.length) {
      console.log("!data.users");
      return;
    }
    console.log("data.users passed", data?.users[0]);
    setLoggedUser(data?.users[0]);
    navigate(PATHNAME.HOME);
    setUserInStorage(data?.users[0]);
    // NOTE: SAVE USER IN LOCALSTORAGE (CREATE CUSTOM HOOK)
  }, [data]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(emailInput)) {
      setErrorMessage("Invalid Email");
      return;
    }
    const resp = await validateEmail({
      // TODO: CHECK APOLLO CLIENT ERROR HANDLING
      variables: { where: { email: { _eq: emailInput } } },
    });
    if (resp?.data?.users?.length) {
      // TODO: AGREGAR LOGICA CONDICIONAL DE MODAL Y PAGE
      return;
    }
    setErrorMessage("Not Allowed");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setEmailInput(e.target.value);
  };

  function isValidEmail(email: string) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  return (
    <Form>
      <GlobalStyle />
      <LoginH1>WELCOME!</LoginH1>
      <Input
        type="text"
        name="username"
        placeholder="username"
        disabled={loading}
        onChange={handleChange}
      />
      <ButtonAndValidation>
        <LoginButton disabled={!emailInput || loading} onClick={handleSubmit}>
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

const LoginH1 = styled(H1)`
  padding-top: 32px;
`;

const Form = styled.form`
  width: 700px;
  height: 450px;
  background: ${defaultTheme.palette.darkblue};
  display: flex;
  flex-direction: column;
  gap: 56px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 8px;
`;
// const Title = styled.h1`
//   width: 203px;
//   height: 48px;
//   color: #fff;
//   font-style: normal;
//   font-size: 40px;
//   line-height: 48px;
//   text-align: center;
// `;
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
const LoginButton = styled(Button)`
  font-size: 24px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  width: 530px;
  height: 90px;
`;
const ValidationText = styled.p`
  font-size: 16px;
  color: ${defaultTheme.palette.red};
  margin-top: 16px;
`;
