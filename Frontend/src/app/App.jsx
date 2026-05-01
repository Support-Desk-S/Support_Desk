import { useEffect } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const { loadUser } = useAuth();

  useEffect(() => {
    // Skip trying to restore user session if we are in the public embed widget
    if (window.location.pathname.startsWith("/embed")) {
      return;
    }
    
    // Silently try to restore user session from httpOnly cookie
    loadUser();
  }, []);

  return <AppRoutes />;
};

export default App;