import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VALIDATE_EMAIL } from "../../graphql/queries";
import { defaultTheme, GlobalStyle } from "../../theme";
import { H1 } from "../styled";
import {
  ButtonAndValidation,
  Form,
  Input,
  LoginButton,
  LoginH1,
  ValidationText,
} from "./styled";
import { EmailVars, Response } from "./types";

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState("");
  const [validateEmail, { loading, error }] = useLazyQuery<Response, EmailVars>(
    VALIDATE_EMAIL
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const resp = await validateEmail({
      variables: { where: { email: { _ilike: credentials } } },
    });
    if (resp?.data?.users?.length) {
      // TODO: AGREGAR LOGICA DE MODAL O PAGE

      return;
    }
    setErrorMessage("Not Allowed");
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setCredentials(e.target.value);
  };
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
        <LoginButton disabled={!credentials || loading} onClick={handleSubmit}>
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
