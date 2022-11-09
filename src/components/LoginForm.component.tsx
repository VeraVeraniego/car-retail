import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useUser } from "../contexts/User";
import { VALIDATE_EMAIL } from "../graphql/queries";
import { EmailVars, Response } from "../interfaces/User";
import { GlobalStyle } from "../theme";
import { Button, Form, H1, Input, ValidationText } from "./styled";

function isValidEmail(email: string) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [validateEmail, { loading, error, data }] = useLazyQuery<
    Response,
    EmailVars
  >(VALIDATE_EMAIL);
  const navigate = useNavigate();
  const { userLogged, login } = useUser();

  useEffect(() => {
    if (userLogged) {
      navigate("/");
    }
    if (!data || !data?.users.length) return;
    login(data?.users[0]);
    navigate("/");
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

    if (resp?.data?.users?.length === 0) setErrorMessage("Not Allowed");
    else {
      if (error) console.error(error.message);
      else setErrorMessage("Couldn't login, try again later.");
    }
    return;

    // TODO: AGREGAR LOGICA CONDICIONAL DE MODAL Y PAGE
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setEmailInput(e.target.value);
  };

  return (
    <FormContainer>
      <GlobalStyle />
      <LoginH1>WELCOME!</LoginH1>
      <EmailInput
        type="text"
        placeholder="Email"
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
