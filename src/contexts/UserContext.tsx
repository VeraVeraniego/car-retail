import { createContext, Dispatch, SetStateAction, useState } from "react";
interface User {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  uuid?: string;
}
export interface IUserContext {
  loggedUser: User | false;
  setLoggedUser: React.Dispatch<React.SetStateAction<User | false>>;
}
// const [loggedUser, setLoggedUser] = useLocalStorage(STORAGE_KEY.USER, "");
const contextInitializer = {
  loggedUser: false,
  setLoggedUser: () => {},
} as IUserContext;

export const UserContext = createContext<IUserContext>(contextInitializer);
