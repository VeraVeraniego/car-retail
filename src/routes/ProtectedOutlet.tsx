import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "../contexts/User";
import { UserContext } from "../contexts/UserContext";

export const ProtectedOutlet = (props: any) => {
  // const { loggedUser } = useContext(UserContext);
  const { userLogged } = useUser();
  return userLogged ? <Outlet /> : <Navigate to="/login" />;
};
