import axiosInstance from '../../../lib/axios';

export const getTenantBySlugApi = (slug) =>
  axiosInstance.get('/api/auth/tenant', { params: { slug } });

