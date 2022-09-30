import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "../contexts/User";

export const ProtectedOutlet = () => {
  const { userLogged } = useUser();

  return userLogged ? <Outlet /> : <Navigate to="/login" />;
};
