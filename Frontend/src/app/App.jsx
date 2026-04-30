import { useEffect } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const { loadUser } = useAuth();

  useEffect(() => {
    // Silently try to restore user session from httpOnly cookie
    loadUser();
  }, []);

  return <AppRoutes />;
};

export default App;