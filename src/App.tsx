import React, { useState } from "react";
import { UserContext } from "./context/UserContext";
import { User } from "./interfaces/User";
import { AppRouter } from "./routes/AppRouter";

const App = () => {
  const [user, setUser] = useState<User | undefined>();
  //TODO: get from local storage and put insedo provider
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppRouter />;
    </UserContext.Provider>
  );
};

export default App;
