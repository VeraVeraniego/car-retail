import React, { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { UserState } from "./interfaces/User";
import { AppRouter } from "./routes/AppRouter";
import { STORAGE_KEY } from "./utils/constants";

const App = () => {
  const [storedUser] = useLocalStorage(STORAGE_KEY.USER, "");
  const [loggedUser, setLoggedUser] = useState<UserState>(storedUser);

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      <AppRouter />
    </UserContext.Provider>
  );
};

export default App;
