import React, { useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { User } from "./interfaces/User";
import { AppRouter } from "./routes/AppRouter";
import { STORAGE_KEY } from "./utils/constants";

const App = () => {
  const [storedUser, setStoredUser] = useLocalStorage(STORAGE_KEY.USER, "");
  const [loggedUser, setLoggedUser] = useState<User | false>(storedUser);

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      <AppRouter />
    </UserContext.Provider>
  );
};

export default App;
