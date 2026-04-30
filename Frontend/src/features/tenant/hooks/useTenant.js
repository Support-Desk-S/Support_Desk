import { useDispatch, useSelector } from 'react-redux';
import { getTenantBySlugApi } from '../services/tenant.service';
import { setTenant, setTenantLoading, setTenantError } from '../state/tenantSlice';

export const useTenant = () => {
  const dispatch = useDispatch();
  const { currentTenant, loading, error } = useSelector((state) => state.tenant);

  const loadTenant = async (slug) => {
    // Skip if already loaded the same tenant
    if (currentTenant?.slug === slug) return;
    try {
      dispatch(setTenantLoading(true));
      const res = await getTenantBySlugApi(slug);
      dispatch(setTenant(res.data.data));
    } catch (err) {
      dispatch(setTenantError(err.response?.data?.message || 'Tenant not found'));
    } finally {
      dispatch(setTenantLoading(false));
    }
  };

  return { loadTenant, currentTenant, loading, error };
};
