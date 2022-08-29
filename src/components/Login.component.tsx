import React from "react";
import { Link, Outlet } from "react-router-dom";
import { PATHNAME } from "../utils/constants";

export const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <Link to={PATHNAME.HOME}>Welcome Back user</Link>
      <br />
      <Link to={PATHNAME.WATCH_LIST}>Watch List</Link>
      <br />
      <div></div>
      <Outlet />
    </div>
  );
};
