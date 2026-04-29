import { useEffect } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const { loadUser } = useAuth();

  useEffect(() => {
    loadUser();
  }, []);

  return <AppRoutes />;
};

export default App;