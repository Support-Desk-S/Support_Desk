import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import UnauthorizedPage from '../../shared/components/pages/UnauthorizedPage';

/**
 * AdminGuard — Layer 4 of protection.
 * Only allows users with role === 'admin'.
 * Agents see UnauthorizedPage.
 */
const AdminGuard = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== 'admin') {
    return <UnauthorizedPage />;
  }

  return children;
};

export default AdminGuard;
