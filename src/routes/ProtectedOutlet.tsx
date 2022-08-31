import React from "react";
import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";

export const ProtectedOutlet = (props: any) => {
  const isLoggedIn: boolean = true;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  // return <Route {...props} />;
};
