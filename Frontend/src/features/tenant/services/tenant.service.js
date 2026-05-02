import axiosInstance from '../../../lib/axios';

export const getTenantBySlugApi = (slug) =>
  axiosInstance.get('/api/auth/tenant', { params: { slug } });

export const updateIntegrationsApi = (integrations) =>
  axiosInstance.put('/api/admin/integrations', { integrations });
