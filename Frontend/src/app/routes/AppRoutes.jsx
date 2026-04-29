import { Routes, Route, Navigate } from "react-router";
import AuthPage from "../../features/auth/pages/AuthPage";
import ProtectedRoute from "./ProtectedRoute";

// temp dashboard
const Dashboard = () => <div>Dashboard</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<Navigate to="/auth" replace />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
};
export default AppRoutes;
