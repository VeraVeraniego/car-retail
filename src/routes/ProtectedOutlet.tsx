import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

export const ProtectedOutlet = (props: any) => {
  const { loggedUser } = useContext(UserContext);
  return loggedUser ? <Outlet /> : <Navigate to="/login" />;
};
