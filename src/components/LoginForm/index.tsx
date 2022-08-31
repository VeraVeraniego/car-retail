import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VALIDATE_EMAIL } from "../../graphql/queries";
import { defaultTheme, GlobalStyle } from "../../theme";
import {
  ButtonAndValidation,
  Form,
  Input,
  LoginButton,
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

    // why the console.log commented below doesn't wait for the await?
    // console.log("test", data);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setCredentials(e.target.value);
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
      <ButtonAndValidation>
        <LoginButton disabled={!credentials || loading} onClick={handleSubmit}>
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
