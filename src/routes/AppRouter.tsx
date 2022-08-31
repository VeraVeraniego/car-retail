import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { TopBar } from "../components/TopBar.component";
import { Login } from "../pages/Login.page";
import { PATHNAME } from "../utils/constants";
import { ProtectedOutlet } from "./ProtectedOutlet";

export function AppRouter() {
  return (
    <Routes>
      <Route path={PATHNAME.LOGIN} element={<Login />} />
      <Route path="/" element={<TopBar />}>
        <Route path={PATHNAME.HOME} element={<TopBar />} />
      </Route>
      {/* Protected Routes Below */}
      <Route element={<ProtectedOutlet />}>
        <Route path={PATHNAME.WATCH_LIST} element={<TopBar />} />
      </Route>
    </Routes>
  );
}
