import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { User, UserState } from "../interfaces/User";
import { STORAGE_KEY } from "../utils";

interface UserContext {
  userLogged: User | null;
  login: (User: User) => void;
  logout: () => void;
}

interface Props {
  children: React.ReactElement;
}

export const UserContext = createContext<UserContext | null>(null);

export const UserProvider = ({ children }: Props) => {
  const [userInStorage, setUserInStorage] = useLocalStorage(
    STORAGE_KEY.USER,
    ""
  );
  const [userLogged, setUserLogged] = useState<UserState>(userInStorage);

  const login = (user: User) => {
    setUserLogged(user);
    setUserInStorage(user);
  };

  const logout = () => {
    window.localStorage.clear();
    setUserLogged(null);
    toast.success("Logged out successfully");
  };

  const value = { userLogged, login, logout };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used with in a UserProvider");
  }
  return context;
};
