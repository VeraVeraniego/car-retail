import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { PATHNAME, REPLACE } from "../../utils/constants";
import { NavButton } from "../styled";

export const ToogleLoginButton = () => {
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.clear();
    setLoggedUser(false);
  }

  function handleLogin() {
    navigate(PATHNAME.LOGIN, REPLACE);
  }

  return (
    <>
      {loggedUser ? (
        <NavButton onClick={handleLogout}>LOGOUT</NavButton>
      ) : (
        <NavButton onClick={handleLogin}>LOGIN</NavButton>
      )}
    </>
  );
};
