import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { TopBar } from "../components/TopBar.component";
import { Home } from "../pages/Home.page";
import { Login } from "../pages/Login.page";
import { PublishCar } from "../pages/PublishCar.page";
import { PATHNAME } from "../utils/constants";
import { ProtectedOutlet } from "./ProtectedOutlet";

export function AppRouter() {
  return (
    <Routes>
      <Route path={PATHNAME.LOGIN} element={<Login />} />
      <Route path="/" element={<TopBar />}>
        <Route path={PATHNAME.HOME} element={<Home />} />
        <Route path={PATHNAME.PUBLISH_FORM} element={<PublishCar />} />
        <Route element={<ProtectedOutlet />}>
          <Route
            path={PATHNAME.WATCH_LIST}
            element={<Home />} /* TODO: PAGE  */
          />
        </Route>
      </Route>
      {/* Protected Routes Below */}
    </Routes>
  );
}
