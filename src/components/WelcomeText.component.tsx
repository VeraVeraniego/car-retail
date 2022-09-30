import React, { useContext } from "react";
import styled from "styled-components";

import { useUser } from "../contexts/User";
import { defaultTheme } from "../theme";

export const WelcomeText = () => {
  const { userLogged } = useUser();
  const fullname =
    userLogged && userLogged.first_name + " " + userLogged.last_name;

  const userWelcome = (
    <span>
      Welcome&nbsp;<b>{fullname}</b>!
    </span>
  );

  const callToLogin = <span>Log in to see your favorite cars!</span>;

  return <Text>{userLogged ? userWelcome : callToLogin}</Text>;
};

const Text = styled.span`
  color: ${defaultTheme.palette.white};
  position: absolute;
  bottom: 8px;
  right: 8px;
`;
