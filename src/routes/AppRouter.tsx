import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { TopNavBar } from "../components/TopNavBar/index.component";
import { CarRetail } from "../pages/CarRetail.page";
import { FavoriteCars } from "../pages/FavoriteCars.page";
import { Home } from "../pages/Home.page";
import { Login } from "../pages/Login.page";
import { PublishCar } from "../pages/PublishCar.page";
import { PATHNAME } from "../utils/constants";
import { ProtectedOutlet } from "./ProtectedOutlet";

export function AppRouter() {
  return (
    <Routes>
      <Route path={PATHNAME.LOGIN} element={<Login />} />
      <Route path="/" element={<TopNavBar />}>
        <Route path="/" element={<Home />} />
        <Route path={PATHNAME.RETAIL_CARS} element={<CarRetail />} />
        <Route path={PATHNAME.PUBLISH_FORM} element={<PublishCar />} />
        <Route element={<ProtectedOutlet />}>
          <Route path={PATHNAME.WATCH_LIST} element={<FavoriteCars />} />
        </Route>
      </Route>
      {/* Protected Routes Below */}
    </Routes>
  );
}
