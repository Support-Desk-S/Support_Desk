import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router';
import { PageLoader } from '../../shared/components/ui/Spinner';

/**
 * ProtectedRoute — Layer 2 of protection.
 * Checks if user is authenticated. Redirects to /auth if not.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const { tenantSlug } = useParams();

  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/auth" replace />;

  return children;
};

export default ProtectedRoute;