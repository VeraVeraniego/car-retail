import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login.component";
import { ProtectedOutlet } from "./components/ProtectedOutlet";
import { TopBar } from "./components/TopBar.component";
import { PATHNAME } from "./utils/constants";

function App() {
  return (
    <Routes>
      <Route path={PATHNAME.LOGIN} element={<Login />} />
      <Route path="/" element={<TopBar />}>
        <Route path={PATHNAME.HOME} element={<TopBar />} />
        {/* Protected Routes Below */}
        <Route element={<ProtectedOutlet />}>
          <Route path={PATHNAME.WATCH_LIST} element={<TopBar />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
