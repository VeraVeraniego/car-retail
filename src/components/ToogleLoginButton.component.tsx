import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useUser } from "../contexts/User";
import { UserContext } from "../contexts/UserContext";
import { PATHNAME, REPLACE } from "../utils/constants";
import { NavButton } from "./styled";

export const ToogleLoginButton = () => {
  // const { loggedUser, setLoggedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { logout, userLogged } = useUser();

  // function handleLogout() {
  //   // window.localStorage.clear();
  //   // setLoggedUser(null);
  //   // toast.success("Logged out successfully");
  // }

  function handleLogin() {
    navigate(PATHNAME.LOGIN, REPLACE);
  }

  return (
    <>
      {userLogged ? (
        <NavButton onClick={() => logout()}>LOGOUT</NavButton>
      ) : (
        <NavButton onClick={() => navigate(PATHNAME.LOGIN)}>LOGIN</NavButton>
      )}
    </>
  );
};
