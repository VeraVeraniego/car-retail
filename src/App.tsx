import { UserProvider } from "./contexts/User";
import { AppRouter } from "./routes/AppRouter";

const App = () => {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
};

export default App;
