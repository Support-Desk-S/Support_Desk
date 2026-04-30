import axiosInstance from '../../../lib/axios';

export const getWidgetsApi = () => axiosInstance.get('/api/admin/widgets');
export const getWidgetApi = (id) => axiosInstance.get(`/api/admin/widgets/${id}`);
export const createWidgetApi = (data) => axiosInstance.post('/api/admin/widgets', data);
export const updateWidgetApi = (id, data) => axiosInstance.put(`/api/admin/widgets/${id}`, data);
export const deleteWidgetApi = (id) => axiosInstance.delete(`/api/admin/widgets/${id}`);
export const regenerateApiKeyApi = (id) => axiosInstance.post(`/api/admin/widgets/${id}/regenerate-key`);
export const getApiKeysApi = (widgetId) => axiosInstance.get(`/api/admin/widgets/${widgetId}/api-keys`);
export const createApiKeyApi = (widgetId, data) => axiosInstance.post(`/api/admin/widgets/${widgetId}/api-keys`, data);
export const deleteApiKeyApi = (keyId) => axiosInstance.delete(`/api/admin/api-keys/${keyId}`);
