import { createContext } from "react";

import { UserState } from "../interfaces/User";

export interface IUserContext {
  loggedUser: UserState;
  setLoggedUser: React.Dispatch<React.SetStateAction<UserState>>;
}
// const [loggedUser, setLoggedUser] = useLocalStorage(STORAGE_KEY.USER, "");
const contextInitializer = {
  loggedUser: null,
  setLoggedUser: () => {},
} as IUserContext;

export const UserContext = createContext<IUserContext>(contextInitializer);
