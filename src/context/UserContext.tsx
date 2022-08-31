import { createContext, Dispatch, SetStateAction, useState } from "react";
interface User {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  uuid: string;
}
export interface IUserContext {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}
const contextInitializer = { user: undefined, setUser: () => {} };

export const UserContext = createContext<IUserContext>(contextInitializer);
