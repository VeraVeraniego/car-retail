import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { defaultTheme } from "../theme";

export const WelcomeText = () => {
  const { loggedUser } = useContext(UserContext);
  const fullname =
    loggedUser && loggedUser.first_name + " " + loggedUser.last_name;

  const userWelcome = (
    <span>
      Welcome&nbsp;<b>{fullname}</b>!
    </span>
  );

  const callToLogin = <span>Log in to see your favorite cars!</span>;

  return <Text>{loggedUser ? userWelcome : callToLogin}</Text>;
};

const Text = styled.span`
  color: ${defaultTheme.palette.white};
  position: absolute;
  bottom: 8px;
  right: 8px;
`;
