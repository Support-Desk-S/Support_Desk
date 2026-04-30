import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { useTenant } from '../../features/tenant/hooks/useTenant';
import NotFoundPage from '../../shared/components/pages/NotFoundPage';
import { PageLoader } from '../../shared/components/ui/Spinner';

/**
 * TenantLoader — Layer 1 of protection.
 * Resolves :tenantSlug → fetches tenant from backend → stores in Redux.
 * If 404 → renders TenantNotFoundPage.
 */
const TenantLoader = () => {
  const { tenantSlug } = useParams();
  const { loadTenant, currentTenant, loading, error } = useTenant();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (tenantSlug) {
      loadTenant(tenantSlug);
    }
  }, [tenantSlug]);

  // Waiting for tenant resolution
  if (loading) return <PageLoader />;

  // Tenant not found
  if (error) return <NotFoundPage />;

  // Not yet loaded (initial state before loadTenant fires)
  if (!currentTenant) return <PageLoader />;

  // Cross-tenant protection (Layer 3):
  // If user is logged in and their tenantId doesn't match the resolved tenant → block
  if (user && currentTenant._id && String(user.tenantId) !== String(currentTenant._id)) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <h1 className="text-2xl font-semibold text-[#111111] mb-2">Wrong Workspace</h1>
          <p className="text-sm text-[#6b7280]">
            You're logged into a different workspace. Please log out and sign in to <strong>{currentTenant.name}</strong>.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default TenantLoader;
