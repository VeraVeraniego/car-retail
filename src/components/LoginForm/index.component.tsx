import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IUserContext, UserContext } from "../../contexts/UserContext";
import { useUsersLazyQuery } from "../../graphql/generated/graphql";
import { VALIDATE_EMAIL } from "../../graphql/queries";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { defaultTheme, GlobalStyle } from "../../theme";
import { PATHNAME, STORAGE_KEY } from "../../utils/constants";
import { Button, Form, H1, Input } from "../styled";

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
    if (!data?.users.length) {
      return;
    }
    setLoggedUser(data?.users[0]);
    navigate("/");
    setUserInStorage(data?.users[0]);
  }, [data]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(emailInput)) {
      setErrorMessage("Invalid Email");
      return;
    }
    const resp = await validateEmail({
      variables: { where: { email: { _eq: emailInput } } },
    });
    // Error Handling
    if (resp?.data?.users?.length === 0) setErrorMessage("Not Allowed");
    else {
      if (error) setErrorMessage(`Error: ${error.message}`);
      else setErrorMessage("Something went wrong.");
    }
    return;

    // TODO: AGREGAR LOGICA CONDICIONAL DE MODAL Y PAGE
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
    <FormContainer>
      <GlobalStyle />
      <LoginH1>WELCOME!</LoginH1>
      <EmailInput
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
    </FormContainer>
  );
};

const LoginH1 = styled(H1)`
  padding-top: 32px;
`;

const FormContainer = styled(Form)`
  width: 700px;
  height: 450px;
  gap: 56px;
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
const EmailInput = styled(Input)`
  width: 530px;
  height: 90px;
  padding-left: 22px;
  border-radius: 8px;
`;
const ButtonAndValidation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ValidationText = styled.p`
  font-size: 16px;
  color: ${defaultTheme.palette.red};
  margin-top: 16px;
`;
