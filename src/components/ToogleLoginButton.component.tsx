import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { useUser } from "../contexts/User";
import { PATHNAME } from "../utils/constants";
import { NavButton } from "./styled";

export const ToogleLoginButton = () => {
  const navigate = useNavigate();
  const { logout, userLogged } = useUser();

  return (
    <>
      {userLogged ? (
        <NavButton onClick={() => logout()}>LOGOUT</NavButton>
      ) : (
        <NavButton onClick={() => navigate(PATHNAME.LOGIN)}>LOGIN</NavButton>
      )}
    </>
  );
};
