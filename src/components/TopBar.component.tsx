import React from "react";
import { Outlet } from "react-router-dom";

export const TopBar = () => {
  return (
    <div>
      TopBar
      <br />
      <Outlet />
    </div>
  );
};
