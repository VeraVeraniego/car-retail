import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IUserContext, UserContext } from "../../context/UserContext";
import { VALIDATE_EMAIL } from "../../graphql/queries";
import { defaultTheme, GlobalStyle } from "../../theme";
import { PATHNAME } from "../../utils/constants";
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
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [validateEmail, { loading, error, data }] = useLazyQuery<
    Response,
    EmailVars
  >(VALIDATE_EMAIL);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("lol", data);
    if (!data?.users) {
      console.log("Not defined");
      setUser(data?.users[9]);
      return;
    }
    navigate(PATHNAME.HOME);
    // TODO: SAVE USER IN LOCALSTORAGE (CREATE CUSTOM HOOK)
  }, [data]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const resp = await validateEmail({
      // TODO: check _ilike
      // TODO: CHECK APOLLO CLIENTE ERROR HANDLING
      variables: { where: { email: { _ilike: emailInput } } },
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
