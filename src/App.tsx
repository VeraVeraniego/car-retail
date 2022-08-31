import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { ProtectedOutlet } from "./components/ProtectedOutlet";
import { TopBar } from "./components/TopBar.component";
import { PATHNAME } from "./utils/constants";

function App() {
  return (
    <Routes>
      <Route path={PATHNAME.LOGIN} element={<LoginForm />} />
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

export default App;
