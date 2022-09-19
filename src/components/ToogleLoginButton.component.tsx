import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../contexts/UserContext";
import { PATHNAME, REPLACE } from "../utils/constants";
import { NavButton } from "./styled";

export const ToogleLoginButton = () => {
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.clear();
    setLoggedUser(null);
    toast.success("Logged out successfully");
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
