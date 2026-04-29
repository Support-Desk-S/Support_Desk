import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!user) return <Navigate to="/auth" replace />;

  return children;
};

export default ProtectedRoute;